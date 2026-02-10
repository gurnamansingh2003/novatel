"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import "./dashboard.css";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  const [products, setProducts] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);

  // New state for dynamic specifications
  const [specs, setSpecs] = useState([{ title: "", info: "" }]);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;
    try {
      const [pRes, eRes] = await Promise.all([
        fetch(`${API_BASE}/products`, { headers: { "Authorization": `Bearer ${token}` } }),
        fetch(`${API_BASE}/enquiries/all`, { headers: { "Authorization": `Bearer ${token}` } })
      ]);
      const pData = await pRes.json();
      const eData = await eRes.json();
      if (pData.success) setProducts(pData.data.filter((p: any) => p.isActive !== false) || []);
      if (eData.success) setEnquiries(eData.data || []);
    } catch (err) { console.error("Fetch error:", err); }
  }, [API_BASE]);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) { router.push("/admin"); return; }
      try {
        const res = await fetch(`${API_BASE}/auth/verify`, { headers: { "Authorization": `Bearer ${token}` } });
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
  }, [router, fetchData, API_BASE]);

  const handleAddSpec = () => {
    setSpecs([...specs, { title: "", info: "" }]);
  };

  const handleSpecChange = (index: number, field: string, value: string) => {
    const updatedSpecs = [...specs];
    updatedSpecs[index] = { ...updatedSpecs[index], [field]: value };
    setSpecs(updatedSpecs);
  };

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      name: formData.get("name"),
      category: formData.get("category"),
      description: formData.get("description"),
      images: [formData.get("imageURL")],
      specifications: specs.filter(s => s.title || s.info), // Only send non-empty specs
      isActive: true
    };

    const url = editingProduct ? `${API_BASE}/products/${editingProduct._id}` : `${API_BASE}/products`;
    const method = editingProduct ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setEditingProduct(null);
        setSpecs([{ title: "", info: "" }]);
        fetchData();
      }
    } catch (err) { console.error("Save error", err); }
  };

  const openModal = (product: any = null) => {
    setEditingProduct(product);
    if (product && product.specifications) {
      setSpecs(product.specifications);
    } else {
      setSpecs([{ title: "", info: "" }]);
    }
    setIsModalOpen(true);
  };

  if (loading) return <div className="loading-screen"><div className="loading-spinner"></div></div>;

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header"><h2 className="sidebar-logo">NOVATEL</h2></div>
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
            <button className="add-btn" onClick={() => openModal()}>+ Add Product</button>
          )}
        </header>

        {activeTab === "products" ? (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th><th>Category</th><th style={{ textAlign: "right", paddingRight: "30px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td><td>{p.category}</td>
                    <td style={{ textAlign: "right", paddingRight: "20px" }}>
                      <button className="edit-btn" onClick={() => openModal(p)}>Edit</button>
                      <button className="delete-btn" onClick={() => {/* delete logic */}}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === "enquiries" ? (
          <div className="table-container">
             <table className="admin-table">
              <thead><tr><th>User</th><th>Contact</th><th>Message</th></tr></thead>
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
            <div className="stat-card"><h3>{products.length}</h3><p>Active Products</p></div>
            <div className="stat-card"><h3>{enquiries.length}</h3><p>Total Enquiries</p></div>
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
            </div>
            
            <form onSubmit={handleSaveProduct}>
              <div className="modal-body">
                <input name="name" placeholder="Name" defaultValue={editingProduct?.name} required className="form-input" />
                
                <select name="category" defaultValue={editingProduct?.category || ""} required className="form-input">
                  <option value="" disabled>Select Category</option>
                  <option value="epabx">EPABX</option>
                  <option value="phones">Phones</option>
                  <option value="surveillance">Surveillance</option>
                  <option value="ip-speakers">IP Speakers</option>
                </select>

                <input name="imageURL" placeholder="Image URL" defaultValue={editingProduct?.images?.[0]} required className="form-input" />
                
                <textarea name="description" placeholder="Description" defaultValue={editingProduct?.description} className="form-input" style={{ height: '80px', minHeight: '80px' }} />

                <div className="specs-section">
                  <h3>Specifications</h3>
                  {specs.map((spec, index) => (
                    <div key={index} className="spec-row">
                      <input 
                        placeholder="Add Title" 
                        value={spec.title} 
                        className="form-input" 
                        onChange={(e) => handleSpecChange(index, 'title', e.target.value)}
                      />
                      <input 
                        placeholder="Add Information" 
                        value={spec.info} 
                        className="form-input" 
                        onChange={(e) => handleSpecChange(index, 'info', e.target.value)}
                      />
                    </div>
                  ))}
                  <button type="button" className="add-spec-btn" onClick={handleAddSpec}>+ Add More Info</button>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setIsModalOpen(false)} className="cancel-btn">Cancel</button>
                <button type="submit" className="save-btn">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}