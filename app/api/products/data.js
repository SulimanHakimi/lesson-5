// ============================================================
// SHARED IN-MEMORY "DATABASE"
// ============================================================
// In the slides the `products` array lives inside route.js.
// But we have TWO route files that must read/write the SAME data:
//   - app/api/products/route.js        (GET all, POST)
//   - app/api/products/[id]/route.js   (GET one, PATCH, DELETE)
//
// So we keep the array in one shared file and import it in both.
// This is just an array in memory: it resets every time the
// server restarts. A real app would use a real database here.
// ============================================================

export const products = [
  { id: 1, name: "Wireless Mouse", price: 29.99, category: "Electronics" },
  { id: 2, name: "Mechanical Keyboard", price: 79.99, category: "Electronics" },
  { id: 3, name: "Coffee Mug", price: 12.5, category: "Kitchen" },
];

// Simple helper to generate the next id for new products.
export function getNextId() {
  if (products.length === 0) return 1;
  return Math.max(...products.map((p) => p.id)) + 1;
}
