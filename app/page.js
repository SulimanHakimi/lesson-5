"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [log, setLog] = useState("Loading products...");

  // ---- READ ALL: GET /api/products ----
  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLog(`GET /api/products -> ${data.length} products`);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // ---- CREATE: POST /api/products ----
  async function createProduct(e) {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: Number(price), category }),
    });
    const data = await res.json();
    setLog(`POST /api/products -> ${res.status}\n` + JSON.stringify(data, null, 2));
    setName("");
    setPrice("");
    setCategory("");
    loadProducts();
  }

  // ---- UPDATE (partial): PATCH /api/products/[id] ----
  async function bumpPrice(id) {
    const res = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: Math.round(Math.random() * 100) }),
    });
    const data = await res.json();
    setLog(`PATCH /api/products/${id} -> ${res.status}\n` + JSON.stringify(data, null, 2));
    loadProducts();
  }

  // ---- DELETE: DELETE /api/products/[id] ----
  async function removeProduct(id) {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const data = await res.json();
    setLog(`DELETE /api/products/${id} -> ${res.status}\n` + JSON.stringify(data, null, 2));
    loadProducts();
  }

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
      <h1>Products CRUD API</h1>
      <p style={{ color: "#94a3b8" }}>
        Next.js App Router · Route Handlers · GET · POST · PATCH · DELETE
      </p>

      <form
        onSubmit={createProduct}
        style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "20px 0" }}
      >
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          placeholder="Price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={btnStyle("#22c55e")}>
          + Add (POST)
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((p) => (
          <li key={p.id} style={cardStyle}>
            <span>
              <strong>#{p.id}</strong> {p.name} — ${p.price}{" "}
              <em style={{ color: "#94a3b8" }}>({p.category})</em>
            </span>
            <span style={{ display: "flex", gap: 8 }}>
              <button onClick={() => bumpPrice(p.id)} style={btnStyle("#3b82f6")}>
                Random price (PATCH)
              </button>
              <button onClick={() => removeProduct(p.id)} style={btnStyle("#ef4444")}>
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>

      <h3>Last response</h3>
      <pre style={preStyle}>{log}</pre>
    </main>
  );
}

const inputStyle = {
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid #334155",
  background: "#1e293b",
  color: "#e2e8f0",
};

const btnStyle = (bg) => ({
  padding: "8px 12px",
  borderRadius: 6,
  border: "none",
  background: bg,
  color: "white",
  cursor: "pointer",
});

const cardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  background: "#1e293b",
  padding: "12px 16px",
  borderRadius: 8,
  marginBottom: 8,
};

const preStyle = {
  background: "#020617",
  padding: 16,
  borderRadius: 8,
  overflowX: "auto",
  whiteSpace: "pre-wrap",
  color: "#7dd3fc",
};
