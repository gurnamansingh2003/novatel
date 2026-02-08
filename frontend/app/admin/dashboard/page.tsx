"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import "./dashboard.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminDashboard() {
  const router = useRouter();
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Tabs & Modals
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  // Data State
  const [products, setProducts] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);

  // Function to fetch all data from Backend
  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    try {
      // cache: 'no-store' ensures we get fresh data every time
      const [pRes, eRes] = await Promise.all([
        fetch(`${API_URL}/products`, { 
            headers: { "Authorization": `Bearer ${token}` },
            cache: 'no-store' 
        }),
        fetch(`${API_URL}/enquiries`, { 
            headers: { "Authorization": `Bearer ${token}` },
            cache: 'no-store' 
        })
      ]);

      const pData = await pRes.json();
      const eData = await eRes.json();

      // Flexible extraction depending on your API response structure
      const pArr = Array.isArray(pData) ? pData : (pData.products || pData.data || []);
      const eArr = Array.isArray(eData) ? eData : (eData.enquiries || eData.data || []);

      setProducts(pArr);
      setEnquiries(eArr);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, []);

  useEffect(() => {
    const initDashboard = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) { router.push("/admin"); return; }

      try {
        const response = await fetch(`${API_URL}/auth/verify`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok && data.success) {
          setAdminData(data.admin);
          await fetchData();
          setLoading(false);
        } else {
          throw new Error("Invalid session");
        }
      } catch (err) {
        localStorage.clear();
        router.push("/admin");
      }
    };

    initDashboard();

    // AUTO-UPDATE: Check for new enquiries every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [router, fetchData]);

  // Product Actions
  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData = {
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
      body: JSON.stringify(productData),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingProduct(null);
      fetchData();
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete product?")) return;
    await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
    });
    fetchData();
  };

  if (loading) return <div className="loading-screen"><div className="loading-spinner"></div></div>;

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-logo">NOVATEL</h2>
          <p className="sidebar-subtitle">Control Center</p>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => setActiveTab("dashboard")} className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>Dashboard</button>
          <button onClick={() => setActiveTab("products")} className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}>Products</button>
          <button onClick={() => setActiveTab("enquiries")} className={`nav-item ${activeTab === 'enquiries' ? 'active' : ''}`}>Enquiries ({enquiries.length})</button>
        </nav>
        <button className="logout-btn" onClick={() => { localStorage.clear(); router.push("/"); }}>Logout</button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1 className="page-title">{activeTab.toUpperCase()}</h1>
          {activeTab === "products" && (
            <button className="add-btn" onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}>+ Add Product</button>
          )}
        </header>

        {activeTab === "dashboard" && (
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Total Products</p>
              <h3 className="stat-value">{products.length}</h3>
            </div>
            <div className="stat-card">
              <p className="stat-label">Active Enquiries</p>
              <h3 className="stat-value">{enquiries.length}</h3>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr><th>Name</th><th>Price</th><th>Stock</th><th>Category</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {products.map((p: any) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>${p.price}</td>
                    <td>{p.stock}</td>
                    <td><span className="badge">{p.category}</span></td>
                    <td>
                      <button className="edit-btn" onClick={() => { setEditingProduct(p); setIsModalOpen(true); }}>Edit</button>
                      <button className="del-btn" onClick={() => deleteProduct(p._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "enquiries" && (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr><th>User</th><th>Contact Details</th><th>Message</th><th>Date</th></tr>
              </thead>
              <tbody>
                {[...enquiries].reverse().map((e: any) => (
                  <tr key={e._id}>
                    <td><strong>{e.name}</strong><br/>{e.email}</td>
                    <td>{e.phone}<br/>{e.city}</td>
                    <td className="msg-cell">{e.message}</td>
                    <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {enquiries.length === 0 && <tr><td colSpan={4} style={{textAlign:'center', padding:'20px'}}>No enquiries yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingProduct ? "Edit Product" : "New Product"}</h2>
            <form onSubmit={handleSaveProduct}>
              <input name="name" placeholder="Name" defaultValue={editingProduct?.name} required />
              <textarea name="description" placeholder="Description" defaultValue={editingProduct?.description} />
              <div className="form-row">
                <input name="price" type="number" placeholder="Price" defaultValue={editingProduct?.price} required />
                <input name="stock" type="number" placeholder="Stock" defaultValue={editingProduct?.stock} required />
              </div>
              <input name="category" placeholder="Category" defaultValue={editingProduct?.category} required />
              <input name="imageURL" placeholder="Image URL" defaultValue={editingProduct?.images?.[0]} required />
              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="save-btn">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}