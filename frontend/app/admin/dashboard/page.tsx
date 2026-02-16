"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import "./dashboard.css";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  const [products, setProducts] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    imageURL: ""
  });

  const [specs, setSpecs] = useState([{ title: "", info: "" }]);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

  // --- CLOUDINARY UPLOAD HANDLER ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploading(true);
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "novatel_products"); // Exactly as in your settings

  try {
    // URL confirm karein: diyel27fy
    const res = await fetch(`https://api.cloudinary.com/v1_1/dieyl27fy/image/upload`, {
      method: "POST",
      // IMPORTANT: Yahan headers bilkul MAT lagana. 
      // Agar aapne Content-Type: application/json lagaya toh Unknown API key error aayega.
      body: data, 
    });

    const result = await res.json();

    if (res.ok) {
      setFormData(prev => ({ ...prev, imageURL: result.secure_url }));
      console.log("Success! Image URL:", result.secure_url);
    } else {
      // Isse pata chalega ki preset unsigned hai ya nahi
      console.error("Cloudinary Error Detail:", result.error);
      alert(`Cloudinary Error: ${result.error.message}`);
    }
  } catch (err) {
    alert("Network error: Check your internet or Cloudinary cloud name.");
  } finally {
    setUploading(false);
  }
};

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
      // FIX: Ensure enquiries are set correctly
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

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    
    // Sync with MongoDB labels
    const filteredSpecs = specs
      .filter(s => s.title.trim() !== "" && s.info.trim() !== "")
      .map(s => ({ label: s.title, value: s.info }));

    const payload = {
      name: formData.name.trim(),
      category: formData.category,
      description: formData.description.trim(),
      images: formData.imageURL ? [formData.imageURL.trim()] : [],
      specifications: filteredSpecs,
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
        fetchData();
      }
    } catch (err) { alert("Save failed."); }
  };

  const openModal = (product: any = null) => {
    setEditingProduct(product);
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        description: product.description || "",
        imageURL: product.images?.[0] || ""
      });
      setSpecs(product.specifications?.length > 0 
        ? product.specifications.map((s: any) => ({ title: s.label, info: s.value })) 
        : [{ title: "", info: "" }]
      );
    } else {
      setFormData({ name: "", category: "", description: "", imageURL: "" });
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
          <button onClick={() => setActiveTab("products")} className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}>Products</button>
          <button onClick={() => setActiveTab("enquiries")} className={`nav-item ${activeTab === 'enquiries' ? 'active' : ''}`}>Enquiries ({enquiries.length})</button>
        </nav>
        <button className="logout-btn" onClick={() => { localStorage.clear(); router.push("/"); }}>Logout</button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1 className="page-title">{activeTab.toUpperCase()}</h1>
          {activeTab === "products" && <button className="add-btn" onClick={() => openModal()}>+ Add Product</button>}
        </header>

        {activeTab === "dashboard" && (
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div className="stat-card" style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: '#2563eb', fontSize: '24px' }}>{products.length}</h3>
              <p>Total Products</p>
            </div>
            <div className="stat-card" style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: '#10b981', fontSize: '24px' }}>{enquiries.length}</h3>
              <p>Active Enquiries</p>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="table-container">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Category</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td><td>{p.category}</td>
                    <td style={{ textAlign: "right" }}>
                      <button className="edit-btn" onClick={() => openModal(p)}>Edit</button>
                      <button className="delete-btn" onClick={async () => {
                         if (confirm("Delete?")) {
                            await fetch(`${API_BASE}/products/${p._id}`, {
                              method: "DELETE",
                              headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
                            });
                            fetchData();
                         }
                      }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- FIXED ENQUIRIES TABLE SECTION --- */}
        {activeTab === "enquiries" && (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Email & Phone</th>
                  <th>Product/Message</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.length > 0 ? enquiries.map((e) => (
                  <tr key={e._id}>
                    <td><strong>{e.name}</strong></td>
                    <td>{e.email}<br/><small>{e.phone}</small></td>
                    <td>{e.message}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={3} style={{ textAlign: 'center', padding: '40px' }}>No enquiries found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header"><h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2></div>
            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
              <div className="modal-body">
                <input name="name" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="form-input" />
                
                <select name="category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required className="form-input">
                  <option value="" disabled>Select Category</option>
                  <option value="epabx">EPABX</option>
                  <option value="phones">Phones</option>
                  <option value="surveillance">Surveillance</option>
                  <option value="ip speakers">IP Speakers</option>
                </select>

                <div className="upload-section" style={{ border: '2px dashed #e2e8f0', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                  <label className="form-label" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Product Image</label>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="form-input" />
                  {uploading && <p style={{ color: '#2563eb' }}>Uploading...</p>}
                  {formData.imageURL && <img src={formData.imageURL} alt="Preview" style={{ width: '80px', marginTop: '10px', borderRadius: '8px' }} />}
                </div>

                <textarea name="description" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="form-input" />

                <div className="specs-section">
                  <h3>Specifications</h3>
                  {specs.map((spec, index) => (
                    <div key={index} className="spec-row">
                      <input placeholder="Label" value={spec.title} className="form-input" onChange={(e) => {
                        const s = [...specs]; s[index].title = e.target.value; setSpecs(s);
                      }} />
                      <input placeholder="Value" value={spec.info} className="form-input" onChange={(e) => {
                        const s = [...specs]; s[index].info = e.target.value; setSpecs(s);
                      }} />
                    </div>
                  ))}
                  <button type="button" className="add-spec-btn" onClick={() => setSpecs([...specs, { title: "", info: "" }])}>+ Add Spec</button>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setIsModalOpen(false)} className="cancel-btn">Cancel</button>
                <button type="submit" className="save-btn" disabled={uploading}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}