// ============================================================
// /api/products/[id]   ->   single-item routes
// The [id] folder captures a variable URL segment.
//   GET    /api/products/3   -> read one product
//   PATCH  /api/products/3   -> update some fields
//   DELETE /api/products/3   -> remove the product
//
// Route handlers get { params } as the 2nd argument.
// In Next.js 15+, params is async, so we `await` it.
// params values are always STRINGS, so we convert with Number().
// ============================================================

import { products } from "../data";

// ------------------------------------------------------------
// GET /api/products/[id]
// Read a SINGLE product by its id.
// ------------------------------------------------------------
export async function GET(request, { params }) {
  const { id } = await params;

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return Response.json(
      { message: "Product not found" },
      { status: 404 } // 404 = Not Found
    );
  }

  return Response.json(product);
}

// ------------------------------------------------------------
// PATCH /api/products/[id]
// Partial update: only change the fields the client sends.
// Body example: { "price": 59.99 }
// ------------------------------------------------------------
export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();

  // Find WHERE the product sits in the array.
  const index = products.findIndex((p) => p.id === Number(id));

  if (index === -1) {
    return Response.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  // The spread trick: keep all old fields, overwrite only the
  // ones present in `body`. That is what makes it a PARTIAL update.
  // We force the id to stay the same so it can't be changed.
  products[index] = { ...products[index], ...body, id: products[index].id };

  return Response.json({
    message: "Product updated successfully",
    product: products[index],
  });
}

// ------------------------------------------------------------
// DELETE /api/products/[id]
// Remove a product permanently. No request body needed —
// the id in the URL is all the server needs.
// ------------------------------------------------------------
export async function DELETE(request, { params }) {
  const { id } = await params;

  const index = products.findIndex((p) => p.id === Number(id));

  if (index === -1) {
    return Response.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  // splice removes 1 item at that position and returns an array
  // of the removed items; [0] grabs the single deleted product.
  const deletedProduct = products.splice(index, 1)[0];

  return Response.json({
    message: "Product deleted successfully",
    deletedProduct,
  });
}
