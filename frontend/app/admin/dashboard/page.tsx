"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import "./dashboard.css";

// Check kar ki tera backend port 5000 hi hai na?
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

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    try {
      // Dono calls ko check karo
      const [pRes, eRes] = await Promise.all([
        fetch(`${API_URL}/products`, { 
          headers: { "Authorization": `Bearer ${token}` },
          cache: 'no-store' 
        }),
        // Backend route 'all' hai, isliye path fix kiya:
        fetch(`${API_URL}/enquiries/all`, { 
          headers: { "Authorization": `Bearer ${token}` },
          cache: 'no-store' 
        })
      ]);

      const pData = await pRes.json();
      const eData = await eRes.json();

      // Debugging ke liye console zaroor check kar F12 daba ke
      console.log("Product Data:", pData);
      console.log("Enquiry Data:", eData);

      // Data extraction as per your controller
      // Tera controller 'data' key bhej raha hai: res.status(200).json({ data: enquiries })
      const pArr = pData.data || pData.products || (Array.isArray(pData) ? pData : []);
      const eArr = eData.data || eData.enquiries || (Array.isArray(eData) ? eData : []);

      setProducts(pArr);
      setEnquiries(eArr);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, []);

  useEffect(() => {
    const verifyAndLoad = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/auth/verify`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setAdminData(data.admin);
          await fetchData();
          setLoading(false);
        } else {
          throw new Error("Invalid Auth");
        }
      } catch (err) {
        localStorage.clear();
        router.push("/admin");
      }
    };

    verifyAndLoad();
    // Har 5 second mein refresh karega naya enquiry dekhne ke liye
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [router, fetchData]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-logo">NOVATEL</h2>
          <p className="sidebar-subtitle">Welcome, {adminData?.name || 'Admin'}</p>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => setActiveTab("dashboard")} className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            Dashboard
          </button>
          <button onClick={() => setActiveTab("products")} className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}>
            Products Management
          </button>
          <button onClick={() => setActiveTab("enquiries")} className={`nav-item ${activeTab === 'enquiries' ? 'active' : ''}`}>
            Enquiries List ({enquiries.length})
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1 className="page-title">{activeTab === 'dashboard' ? 'Overview' : activeTab.toUpperCase()}</h1>
            <p className="page-subtitle">Real-time data monitoring</p>
          </div>
          {activeTab === "products" && (
            <button className="add-btn" onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}>
              + Add New Product
            </button>
          )}
        </header>

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
              <div className="stat-icon orange">📩</div>
              <div className="stat-content">
                <p className="stat-label">Total Enquiries</p>
                <h3 className="stat-value">{enquiries.length}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="table-container">
          <table className="admin-table">
            <thead>
              {activeTab === "products" ? (
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              ) : (
                <tr>
                  <th>User Details</th>
                  <th>Contact info</th>
                  <th>Message</th>
                  <th>Received On</th>
                </tr>
              )}
            </thead>
            <tbody>
              {activeTab === "products" ? (
                products.map((p: any) => (
                  <tr key={p._id}>
                    <td><strong>{p.name}</strong></td>
                    <td>${p.price}</td>
                    <td><span className="nav-item active" style={{padding: '4px 8px'}}>{p.category}</span></td>
                    <td>
                      <button className="edit-link">Edit</button>
                      <button className="delete-link">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                [...enquiries].reverse().map((e: any) => (
                  <tr key={e._id}>
                    <td>
                      <div style={{fontWeight: '600'}}>{e.name}</div>
                      <div style={{fontSize: '12px', color: '#666'}}>{e.email}</div>
                    </td>
                    <td>{e.phone}<br/>{e.city}</td>
                    <td style={{maxWidth: '300px', whiteSpace: 'normal'}}>{e.message}</td>
                    <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
              {((activeTab === 'products' ? products.length : enquiries.length) === 0) && (
                <tr>
                  <td colSpan={4} style={{textAlign: 'center', padding: '40px', color: '#999'}}>
                    No data available at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Basic Modal for Add Product */}
      {isModalOpen && (
        <div className="modal-overlay" style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000}}>
          <div style={{background:'white', padding:'30px', borderRadius:'12px', width:'400px'}}>
            <h2>Add Product</h2>
            <p>Form logic here...</p>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}