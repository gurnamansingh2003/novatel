"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import "./dashboard.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminDashboard() {
  const router = useRouter();
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  const [products, setProducts] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);

  // Poora data fetch karne ka logic
  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    try {
      const [pRes, eRes] = await Promise.all([
        fetch(`${API_URL}/products`, { 
          headers: { "Authorization": `Bearer ${token}` },
          cache: 'no-store' 
        }),
        // Tera route /enquiries/all hai
        fetch(`${API_URL}/enquiries/all`, { 
          headers: { "Authorization": `Bearer ${token}` },
          cache: 'no-store' 
        })
      ]);

      const pData = await pRes.json();
      const eData = await eRes.json();

      // Backend 'data' key bhej raha hai (Controller ke hisaab se)
      const pArr = pData.data || pData.products || (Array.isArray(pData) ? pData : []);
      const eArr = eData.data || eData.enquiries || (Array.isArray(eData) ? eData : []);

      setProducts(pArr);
      setEnquiries(eArr);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) { router.push("/admin"); return; }

      try {
        const res = await fetch(`${API_URL}/auth/verify`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setAdminData(data.admin);
          await fetchData();
          setLoading(false);
        } else { throw new Error(); }
      } catch {
        localStorage.clear();
        router.push("/admin");
      }
    };

    init();
    // 10 second polling taaki enquiry turant dikhe
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [router, fetchData]);

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      category: formData.get("category"),
      stock: Number(formData.get("stock")),
      images: [formData.get("imageURL")], 
    };

    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct ? `${API_URL}/products/${editingProduct._id}` : `${API_URL}/products`;

    const res = await fetch(url, {
      method,
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingProduct(null);
      fetchData();
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Pakka delete karna hai?")) return;
    await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
    });
    fetchData();
  };

  if (loading) return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      {/* Sidebar - Teri CSS classes ke saath */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-logo">NOVATEL</h2>
          <p className="sidebar-subtitle">Admin Panel</p>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => setActiveTab("dashboard")} className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            Dashboard
          </button>
          <button onClick={() => setActiveTab("products")} className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}>
            Products
          </button>
          <button onClick={() => setActiveTab("enquiries")} className={`nav-item ${activeTab === 'enquiries' ? 'active' : ''}`}>
            Enquiries ({enquiries.length})
          </button>
        </nav>
        <button className="logout-btn" onClick={() => { localStorage.clear(); router.push("/"); }}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1 className="page-title">{activeTab.toUpperCase()}</h1>
            <p className="page-subtitle">Manage your business data</p>
          </div>
          {activeTab === "products" && (
            <button className="add-btn" onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}>
              + Add Product
            </button>
          )}
        </header>

        {/* Stats Grid */}
        {activeTab === "dashboard" && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue">📦</div>
              <div className="stat-content">
                <p className="stat-label">Total Products</p>
                <h3 className="stat-value">{products.length}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange">📧</div>
              <div className="stat-content">
                <p className="stat-label">Active Enquiries</p>
                <h3 className="stat-value">{enquiries.length}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="table-container">
          <table className="admin-table">
            <thead>
              {activeTab === "products" ? (
                <tr><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
              ) : (
                <tr><th>User</th><th>Contact</th><th>Message</th><th>Date</th></tr>
              )}
            </thead>
            <tbody>
              {activeTab === "products" ? (
                products.map((p: any) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>${p.price}</td>
                    <td>{p.stock}</td>
                    <td>
                      <button className="edit-link" onClick={() => { setEditingProduct(p); setIsModalOpen(true); }}>Edit</button>
                      <button className="delete-link" onClick={() => deleteProduct(p._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                [...enquiries].reverse().map((e: any) => (
                  <tr key={e._id}>
                    <td><strong>{e.name}</strong><br/>{e.email}</td>
                    <td>{e.phone}<br/>{e.city}</td>
                    <td className="msg-cell">{e.message}</td>
                    <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
              {((activeTab === "products" ? products.length : enquiries.length) === 0) && (
                <tr><td colSpan={4} style={{textAlign:'center', padding:'20px'}}>No data found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="modal-overlay" style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{background: 'white', padding: '32px', borderRadius: '12px', width: '450px'}}>
            <h2 style={{marginBottom: '20px'}}>{editingProduct ? "Edit Product" : "New Product"}</h2>
            <form onSubmit={handleSaveProduct} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <input name="name" placeholder="Name" defaultValue={editingProduct?.name} required style={{padding:'10px', borderRadius:'6px', border:'1px solid #ddd'}} />
              <input name="price" type="number" placeholder="Price" defaultValue={editingProduct?.price} required style={{padding:'10px', borderRadius:'6px', border:'1px solid #ddd'}} />
              <input name="stock" type="number" placeholder="Stock" defaultValue={editingProduct?.stock} required style={{padding:'10px', borderRadius:'6px', border:'1px solid #ddd'}} />
              <input name="category" placeholder="Category" defaultValue={editingProduct?.category} required style={{padding:'10px', borderRadius:'6px', border:'1px solid #ddd'}} />
              <input name="imageURL" placeholder="Image URL" defaultValue={editingProduct?.images?.[0]} required style={{padding:'10px', borderRadius:'6px', border:'1px solid #ddd'}} />
              <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px'}}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{padding:'8px 16px', border:'none', cursor:'pointer'}}>Cancel</button>
                <button type="submit" className="add-btn">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}