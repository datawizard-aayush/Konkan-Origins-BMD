let cart = JSON.parse(localStorage.getItem('konkan_cart')) || [];

function saveCart() {
    localStorage.setItem('konkan_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCountEl = document.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalAmt = document.getElementById('cartTotalAmt');

    if (!cartCountEl || !cartItemsContainer) return; // Not on right page

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalItems;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color: var(--text-muted); margin-top:2rem;">Your cart is empty.</p>';
        cartTotalAmt.textContent = 'Rs. 0';
        return;
    }

    let totalAmt = 0;
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const pData = productsData[item.id];
        if (!pData) return;

        totalAmt += pData.price * item.qty;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
      <div class="cart-item-img"><img src="${pData.image}" alt="${pData.name}"></div>
      <div class="cart-item-info">
        <h4>${pData.name}</h4>
        <div class="cart-item-price">Rs. ${pData.price}</div>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
          <button class="remove-item" onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
      </div>
    `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartTotalAmt.textContent = `Rs. ${totalAmt}`;
}

function addToCart(e, productId, qty = 1) {
    if (e) {
        e.stopPropagation(); // prevent modal from opening if clicked on grid card button
        const btn = e.target;
        if (btn) {
            const origText = btn.textContent;
            btn.textContent = 'Added ✓';
            setTimeout(() => btn.textContent = origText, 1500);
        }
    }

    const existing = cart.find(i => i.id === productId);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: productId, qty });
    }

    saveCart();
    updateCartUI();
    toggleCart(true); // Open cart automatically
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQty(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function toggleCart(forceOpen = null) {
    const sidebar = document.getElementById('cartSidebar');
    if (!sidebar) return;

    if (forceOpen === true) {
        sidebar.classList.add('open');
    } else if (forceOpen === false) {
        sidebar.classList.remove('open');
    } else {
        sidebar.classList.toggle('open');
    }
}

// Attach cart button listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => toggleCart(true));
    }
});
