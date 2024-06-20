console.log(metadataFromPHP);

document.addEventListener("DOMContentLoaded", async function (e) {
  try {
    const response = await fetch(`${baseUrl}orders/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: metadataFromPHP.address,
        products: metadataFromPHP.products,
        total_price: metadataFromPHP.total_price,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
});
