function getStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < full) stars += '★';
        else if (i === full && half) stars += '⯪';
        else stars += '☆';
    }
    return stars;
}

function openProductModal(productId) {
    const pData = productsData[productId];
    if (!pData) return;

    const modal = document.getElementById('productModal');
    const body = document.getElementById('productModalBody');

    // Set content
    body.innerHTML = `
    <div class="product-detail-view">
      <div class="product-detail-img">
        <img src="${pData.image}" alt="${pData.name}">
      </div>
      <div class="product-detail-info">
        <h2>${pData.name}</h2>
        <div class="product-rating" style="font-size: 1.1rem; margin-bottom: 1rem;">
          ${getStars(pData.rating)} <span style="font-size: 0.9rem;">(${pData.reviews} reviews)</span>
        </div>
        <div class="price">Rs. ${pData.price}</div>
        <p>${pData.desc}</p>
        
        <div class="detail-ingredients">
          <strong>Ingredients:</strong> ${pData.ingredients}<br><br>
          <strong>Origin:</strong> ${pData.origin}
        </div>
        
        <div class="detail-action-row">
          <div class="detail-qty">
            <button onclick="changeModalQty(-1)">-</button>
            <input type="number" id="modalQtyInput" value="1" min="1" readonly>
            <button onclick="changeModalQty(1)">+</button>
          </div>
          <button class="btn-primary btn-large" onclick="modalAddToCart('${productId}')">Add to Cart</button>
        </div>
      </div>
    </div>
  `;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // stop background scrolling
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function changeModalQty(change) {
    const input = document.getElementById('modalQtyInput');
    let val = parseInt(input.value) || 1;
    val += change;
    if (val < 1) val = 1;
    input.value = val;
}

function modalAddToCart(productId) {
    const input = document.getElementById('modalQtyInput');
    const qty = parseInt(input.value) || 1;
    addToCart(null, productId, qty);
    closeProductModal();
}
