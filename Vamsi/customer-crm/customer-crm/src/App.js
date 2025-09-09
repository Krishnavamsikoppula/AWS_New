import React, { useEffect, useState } from "react";

const API_BASE = "http://3.134.110.209:8080/api/customers";

function App() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    company: ""
  });

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(setCustomers)
      .catch(err => console.error("Error fetching customers:", err));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.mobile || !form.company) return;
    fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(newCustomer => {
        setCustomers([...customers, newCustomer]);
        setForm({ name: "", email: "", mobile: "", company: "" });
      });
  }

  function handleDelete(id) {
    fetch(`${API_BASE}/${id}`, { method: "DELETE" })
      .then(() => setCustomers(customers.filter(c => c.id !== id)));
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f6fa",
      fontFamily: "sans-serif",
      padding: "32px"
    }}>
      <div style={{
        maxWidth: 520,
        margin: "36px auto 20px auto",
        background: "#fff",
        borderRadius: "24px",
        boxShadow: "0 2px 12px #E4E8F0",
        padding: "32px"
      }}>
        <h1 style={{ marginBottom: 28, fontWeight: 600 }}>Customer</h1>
        <form 
          style={{ display: "flex", flexDirection: "column", gap: 16 }} 
          onSubmit={handleAdd}
        >
          <label style={{ fontWeight: 500 }}>
            Name
            <input 
              name="name"
              value={form.name}
              onChange={handleChange}
              style={{ width: "100%", borderRadius: 10, border: "1px solid #ddd", padding: "10px 16px", marginTop: 6 }}
            />
          </label>
          <label style={{ fontWeight: 500 }}>
            Email
            <input 
              name="email"
              value={form.email}
              onChange={handleChange}
              style={{ width: "100%", borderRadius: 10, border: "1px solid #ddd", padding: "10px 16px", marginTop: 6 }}
            />
          </label>
          <label style={{ fontWeight: 500 }}>
            Phone
            <input 
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              style={{ width: "100%", borderRadius: 10, border: "1px solid #ddd", padding: "10px 16px", marginTop: 6 }}
            />
          </label>
          <label style={{ fontWeight: 500 }}>
            Company
            <input 
              name="company"
              value={form.company}
              onChange={handleChange}
              style={{ width: "100%", borderRadius: 10, border: "1px solid #ddd", padding: "10px 16px", marginTop: 6 }}
            />
          </label>
          <button 
            type="submit" 
            style={{
              background: "#d9e7fc", 
              border: "none", 
              color: "#2b436a", 
              fontWeight: 600, 
              borderRadius: 10, 
              padding: "12px 0", 
              marginTop: 8, 
              cursor: "pointer"
            }}>
            Add
          </button>
        </form>
      </div>

      <div style={{
        maxWidth: 620,
        margin: "20px auto 0 auto",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 2px 12px #E4E8F0",
        padding: "32px"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 17 }}>
          <thead>
            <tr style={{ background: "#f5f6fa", fontWeight: 600 }}>
              <th style={{ padding: "10px 6px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "10px 6px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "10px 6px", textAlign: "left" }}>Phone</th>
              <th style={{ padding: "10px 6px", textAlign: "left" }}>Company</th>
              <th style={{ padding: "10px 6px", textAlign: "left" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "15px", textAlign: "center", color: "#8a9db7" }}><i>No customers found.</i></td>
              </tr>
            ) : (
              customers.map(c => (
                <tr key={c.id}>
                  <td style={{ padding: "8px" }}>{c.name}</td>
                  <td style={{ padding: "8px" }}>{c.email}</td>
                  <td style={{ padding: "8px" }}>{c.mobile}</td>
                  <td style={{ padding: "8px" }}>{c.company}</td>
                  <td style={{ padding: "8px" }}>
                    <button 
                      onClick={() => handleDelete(c.id)} 
                      style={{
                        background: "#ffeded",
                        color: "#be4444",
                        border: "none",
                        borderRadius: 7,
                        padding: "6px 14px",
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
