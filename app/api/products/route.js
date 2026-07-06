// ============================================================
// /api/products   ->   collection routes (no id)
// Handles:  GET (read all)  and  POST (create new)
// ============================================================

import { products, getNextId } from "./data";

// ------------------------------------------------------------
// GET /api/products
// Read ALL products.
// ------------------------------------------------------------
export async function GET() {
  // Just send the whole array back as JSON.
  return Response.json(products);
}

// ------------------------------------------------------------
// POST /api/products
// Create a NEW product from the JSON body the client sends.
// Body example: { "name": "Monitor", "price": 199, "category": "Electronics" }
// ------------------------------------------------------------
export async function POST(request) {
  // 1. Read the JSON body the client sent.
  const body = await request.json();

  // 2. Basic validation: name and price are required.
  if (!body.name || body.price == null) {
    return Response.json(
      { message: "name and price are required" },
      { status: 400 } // 400 = Bad Request
    );
  }

  // 3. Build the new product object (server decides the id).
  const newProduct = {
    id: getNextId(),
    name: body.name,
    price: body.price,
    category: body.category || "Uncategorized",
  };

  // 4. Save it into our in-memory array.
  products.push(newProduct);

  // 5. Return the created product with status 201 (Created).
  return Response.json(newProduct, { status: 201 });
}
