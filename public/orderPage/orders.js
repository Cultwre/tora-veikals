document.addEventListener("DOMContentLoaded", async function (e) {
  try {
    const response = await fetch(`${baseUrl}orders/getOrders`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json();
    createSingleOrders(data);
  } catch (error) {
    console.error("Error:", error);
  }
});

const orderContainer = document.querySelector(`.order-container`);
const openModalBtn = document.getElementById("openModalBtn");
const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalBody = document.querySelector(`.modal-body`);

closeModalBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});

function createSingleOrders(orders) {
  let orderHtml;
  console.log(orders);
  orders.userOrders.forEach((e) => {
    orderHtml = `
        <div class="single-order" id="order-${e.id}">
                    <div class="date-time-order">
                        <div class="datetime-single">
                            <span class="material-symbols-outlined">
                            calendar_month
                            </span>
                            <span class="font-order">${
                              e.created_at.split(" ")[0]
                            }</span>
                        </div>
                        <div class="datetime-single">
                            <span class="material-symbols-outlined">
                            schedule
                            </span>
                            <span class="font-order">${
                              e.created_at.split(" ")[1]
                            }</span>
                        </div>  
                    </div>
                    <div class="datetime-single price-cont">
                        <span class="material-symbols-outlined">
                        shopping_cart_checkout
                        </span>
                        <span class="font-order font-price">${
                          e.total_price
                        }€</span>
                    </div>
                    <div>
                        <span class="material-symbols-outlined header-icons order-icons">
                        check_circle
                        </span>
                    </div>
                </div>  
    `;
    orderContainer.insertAdjacentHTML(`beforeend`, orderHtml);

    orderContainer
      .querySelector(`#order-${e.id}`)
      .addEventListener("click", function (e2) {
        modalOverlay.style.display = "flex";
        fetchOrderDetails(e.id, e);
      });
  });
}

function fetchOrderDetails(orderId, order) {
  fetch(`/orders/${orderId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Populate modal with fetched data
      let productsHtml = `
        <div class="two-sided-modal">
            <div class="gap-details">
                <div class="details-compact">
                    <span class="details-title">Pasūtijuma Identifikātors</span>
                    <span>${order.id}</span>
                </div>
                <div class="details-compact">
                    <span class="details-title">Apmaksāta summa</span>
                    <span>${order.total_price}€</span>
                </div>
                <div class="details-compact">
                    <span class="details-title">Adrese</span>
                    <span>${order.address}</span>
                </div>
                <div class="details-compact">
                    <span class="details-title">Pasūtijuma statuss</span>
                    <span>Piegādāts</span>
                </div>
                <div class="details-compact">
                    <span class="details-title">Pasūtijuma izveidošanas datums un laiks</span>
                    <span>${order.created_at}</span>
                </div class="details-compact">
                <div class="details-compact">
                    <span class="details-title">Pasūtijuma piegādāšanas datums un laiks</span>
                    <span>${order.delivered_at}</span>
                </div>
            </div>
            <div class="gap-details">
                <div class="details-compact">
                    <span class="details-title">Piegādes maksa</span>
                    <span>10.00€</span>
                </div>
                <div class="details-compact">
                    <span class="details-title">PVN</span>
                    <span>${(
                      (order.total_price - 10).toFixed(2) * 0.21
                    ).toFixed(2)}€</span>
                </div>
                                <div class="details-compact">
                    <span class="details-title">Preces</span>
        `;
      data.orderDetails.forEach((product) => {
        productsHtml += `
                    <span>X${product.quantity} ${product.product_name} ${product.unit_price}€</span>
            `;
      });
      productsHtml += `
      </div>
       </div>
        </div>
        `;
      modalBody.innerHTML = productsHtml;
    })
    .catch((error) => {
      console.error("Error fetching order details:", error);
    });
}
