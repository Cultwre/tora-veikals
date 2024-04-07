export async function addToCart(productId) {
  let quantity = 1;
  try {
    const response = await fetch(`${baseUrl}add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export async function removeOneProduct(productId) {
  try {
    const response = await fetch(`${baseUrl}remove-one-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export async function removeProductFromCart(productId) {
  try {
    const response = await fetch(`${baseUrl}remove-product-from-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export async function removeAllProducts() {
  try {
    const response = await fetch(`${baseUrl}remove-all-products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export async function getFromCart() {
  try {
    const response = await fetch(`${baseUrl}get-from-cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return null;
  }
}
