"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import "./dashboard.css";

const API_URL = "http://localhost:3001/api";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  const [products, setProducts] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);

  // FETCH DATA
  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    try {
      const [pRes, eRes] = await Promise.all([
        fetch(`${API_URL}/products`, { headers: { "Authorization": `Bearer ${token}` } }),
        // Check app.js mounting: singular 'enquiry' vs plural 'enquiries'
        fetch(`${API_URL}/enquiries/all`, { headers: { "Authorization": `Bearer ${token}` } })
      ]);

      const pData = await pRes.json();
      const eData = await eRes.json();

      if (pData.success) setProducts(pData.data || []);
      if (eData.success) setEnquiries(eData.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) { router.push("/admin"); return; }
      try {
        const res = await fetch(`${API_URL}/auth/verify`, { headers: { "Authorization": `Bearer ${token}` } });
        const data = await res.json();
        if (res.ok && data.success) {
          await fetchData();
          setLoading(false);
        } else { throw new Error(); }
      } catch {
        localStorage.clear();
        router.push("/admin");
      }
    };
    init();
  }, [router, fetchData]);

  // DELETE PRODUCT
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Pakka delete karna hai?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) fetchData();
    } catch (err) { console.error("Delete error", err); }
  };

  // ADD or UPDATE PRODUCT
  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      name: formData.get("name"),
      price: Number(formData.get("price")),
      category: formData.get("category"),
      stock: Number(formData.get("stock")),
      description: formData.get("description"),
      images: [formData.get("imageURL")] // Basic array format as per controller
    };

    const url = editingProduct ? `${API_URL}/products/${editingProduct._id}` : `${API_URL}/products`;
    const method = editingProduct ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setEditingProduct(null);
        fetchData();
      }
    } catch (err) { console.error("Save error", err); }
  };

  if (loading) return <div className="loading-screen"><div className="loading-spinner"></div></div>;

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-logo">NOVATEL</h2>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => setActiveTab("dashboard")} className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>Dashboard</button>
          <button onClick={() => setActiveTab("products")} className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}>Products Management</button>
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

        {activeTab === "products" ? (
          <div className="table-container">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>${p.price}</td>
                    <td>{p.stock}</td>
                    <td>
                      <button className="edit-link" onClick={() => { setEditingProduct(p); setIsModalOpen(true); }}>Edit</button>
                      <button className="delete-link" onClick={() => handleDeleteProduct(p._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === "enquiries" ? (
          <div className="table-container">
            <table className="admin-table">
              <thead><tr><th>User Details</th><th>Contact info</th><th>Message</th></tr></thead>
              <tbody>
                {enquiries.map((e) => (
                  <tr key={e._id}>
                    <td><strong>{e.name}</strong><br/>{e.email}</td>
                    <td>{e.phone}</td>
                    <td>{e.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="stats-grid">
            <div className="stat-card"><h3>{products.length}</h3><p>Total Products</p></div>
            <div className="stat-card"><h3>{enquiries.length}</h3><p>Total Enquiries</p></div>
          </div>
        )}
      </main>

      {/* PRODUCT MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2000}}>
          <div style={{background:'white', padding:'30px', borderRadius:'12px', width:'450px'}}>
            <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
            <form onSubmit={handleSaveProduct} style={{display:'flex', flexDirection:'column', gap:'15px', marginTop:'20px'}}>
              <input name="name" placeholder="Product Name" defaultValue={editingProduct?.name} required style={{padding:'10px', borderRadius:'6px', border:'1px solid #ddd'}} />
              <div style={{display:'flex', gap:'10px'}}>
                <input name="price" type="number" placeholder="Price" defaultValue={editingProduct?.price} required style={{flex:1, padding:'10px', borderRadius:'6px', border:'1px solid #ddd'}} />
                <input name="stock" type="number" placeholder="Stock" defaultValue={editingProduct?.stock} required style={{flex:1, padding:'10px', borderRadius:'6px', border:'1px solid #ddd'}} />
              </div>
              <input name="category" placeholder="Category" defaultValue={editingProduct?.category} required style={{padding:'10px', borderRadius:'6px', border:'1px solid #ddd'}} />
              <input name="imageURL" placeholder="Image URL" defaultValue={editingProduct?.images?.[0]} required style={{padding:'10px', borderRadius:'6px', border:'1px solid #ddd'}} />
              <textarea name="description" placeholder="Description" defaultValue={editingProduct?.description} style={{padding:'10px', borderRadius:'6px', border:'1px solid #ddd', height:'80px'}} />
              <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{padding:'10px 20px', border:'none', cursor:'pointer'}}>Cancel</button>
                <button type="submit" className="add-btn" style={{padding:'10px 20px'}}>Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}