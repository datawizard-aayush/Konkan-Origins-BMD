function goToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    toggleCart(false);

    // Checking tokens for applying
    let hasToken = tokens > 0;

    // Create checkout full screen overlay
    const checkoutHTML = `
    <div id="checkoutView" style="position:fixed; top:0; left:0; width:100%; height:100vh; background:var(--bg-color); z-index: 3000; overflow-y:auto; padding: 2rem;">
      <div style="max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; animation: fadeUp 0.5s ease;">
        
        <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: var(--shadow-sm);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2rem;">
            <h2 style="color: var(--primary-dark);">Checkout</h2>
            <button onclick="closeCheckout()" style="background:none; border:none; text-decoration:underline; cursor:pointer;">Back to Shop</button>
          </div>
          
          <h3 style="margin-top: 1.5rem; margin-bottom: 1rem; color: var(--text-main);">User Information</h3>
          <input type="text" placeholder="Full Name" style="width:100%; padding:12px; margin-bottom:10px; border:1px solid var(--border-color); border-radius:6px; font-family:inherit;">
          <input type="email" placeholder="Email" style="width:100%; padding:12px; margin-bottom:10px; border:1px solid var(--border-color); border-radius:6px; font-family:inherit;">
          <input type="tel" placeholder="Phone Number" style="width:100%; padding:12px; margin-bottom:10px; border:1px solid var(--border-color); border-radius:6px; font-family:inherit;">
          
          <h3 style="margin-top: 1.5rem; margin-bottom: 1rem; color: var(--text-main);">Delivery Address</h3>
          <input type="text" placeholder="Address Line" style="width:100%; padding:12px; margin-bottom:10px; border:1px solid var(--border-color); border-radius:6px; font-family:inherit;">
          <div style="display:flex; gap:10px;">
            <input type="text" placeholder="City" style="width:100%; padding:12px; margin-bottom:10px; border:1px solid var(--border-color); border-radius:6px; font-family:inherit;">
            <input type="text" placeholder="State" style="width:100%; padding:12px; margin-bottom:10px; border:1px solid var(--border-color); border-radius:6px; font-family:inherit;">
            <input type="text" placeholder="Pincode" style="width:100%; padding:12px; margin-bottom:10px; border:1px solid var(--border-color); border-radius:6px; font-family:inherit;">
          </div>

          <h3 style="margin-top: 1.5rem; margin-bottom: 1rem; color: var(--text-main);">Payment Options</h3>
          <select style="width:100%; padding:12px; margin-bottom:20px; border:1px solid var(--border-color); border-radius:6px; font-family:inherit; background:white;">
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Debit/Credit Card</option>
            <option>Net Banking</option>
          </select>
          
          <button class="btn-primary" style="width:100%; padding:15px; font-size:1.1rem; border-radius: 8px; margin-top: 1rem;" onclick="placeOrder()">Confirm Order & Pay</button>
        </div>

        <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: var(--shadow-sm); height: fit-content;">
          <h3 style="margin-bottom: 1.5rem; color: var(--primary-dark);">Order Summary</h3>
          <div id="checkoutItemsList" style="margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;"></div>
          
          ${hasToken ? `
            <div style="background: var(--bg-color); padding: 1rem; border-radius: 6px; margin-bottom: 1.5rem; border: 1px solid var(--accent);">
              <p style="font-weight: 600; color: var(--primary-dark); margin-bottom: 5px;">Loyalty Reward Available!</p>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px;">You have ${tokens} token(s). Apply to get one item free.</p>
              <button onclick="applyToken()" class="btn-secondary" style="padding: 6px 12px; font-size: 0.85rem; width: 100%;">Apply Token</button>
            </div>
          ` : ''}
          
          <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:1.4rem; color: var(--primary-dark);">
            <span>Total:</span>
            <span id="checkoutTotalAmt"></span>
          </div>
        </div>

      </div>
    </div>
  `;

    const div = document.createElement('div');
    div.innerHTML = checkoutHTML;
    document.body.appendChild(div.firstElementChild);

    // Render summary
    const list = document.getElementById('checkoutItemsList');
    let total = 0;
    cart.forEach((item, index) => {
        const pData = productsData[item.id];
        if (pData) {
            let isFree = window.checkoutTokenApplied && index === 0; // simple: make 1st item free
            let linePrice = isFree ? 0 : (pData.price * item.qty);
            if (isFree && item.qty > 1) {
                linePrice = pData.price * (item.qty - 1);
            }

            total += linePrice;

            list.innerHTML += `<div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size: 0.95rem;">
        <span>${pData.name} x${item.qty}</span>
        <span style="${isFree ? 'color: var(--primary); font-weight: bold;' : ''}">${isFree ? 'Rs. ' + linePrice + ' (FREE)' : 'Rs. ' + linePrice}</span>
      </div>`;
        }
    });
    document.getElementById('checkoutTotalAmt').textContent = 'Rs. ' + total;
    document.body.style.overflow = 'hidden';
}

function applyToken() {
    window.checkoutTokenApplied = true;
    closeCheckout();
    goToCheckout();
}

function closeCheckout() {
    const el = document.getElementById('checkoutView');
    if (el) el.remove();
    document.body.style.overflow = '';
}

function placeOrder() {
    if (window.checkoutTokenApplied) {
        tokens--;
        localStorage.setItem('konkan_tokens', tokens);
        window.checkoutTokenApplied = false;
    }

    alert("Order Placed Successfully!");
    addRewardOrder(); // Track for rewards

    cart = [];
    saveCart();
    updateCartUI();
    closeCheckout();
}
