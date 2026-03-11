let ordersCount = parseInt(localStorage.getItem('konkan_orders')) || 0;
let tokens = parseInt(localStorage.getItem('konkan_tokens')) || 0;

function addRewardOrder() {
    ordersCount++;
    localStorage.setItem('konkan_orders', ordersCount);
    if (ordersCount % 3 === 0) {
        tokens++;
        localStorage.setItem('konkan_tokens', tokens);
        // Delay alert slightly to not clash with order success
        setTimeout(() => {
            alert("🎉 Congratulations! You've earned 1 Konkan Reward Token! Redeem it for a free product on your next order.");
        }, 500);
    }
}

function showRewardsUI() {
    const authModalBody = document.getElementById('authModalBody');
    if (!authModalBody) return;

    let ordersAway = 3 - (ordersCount % 3);

    authModalBody.innerHTML = `
    <div style="padding: 2rem; text-align: center;">
      <h2 style="color: var(--primary-dark); margin-bottom: 0.5rem;">My Rewards</h2>
      <p style="color: var(--text-muted); margin-bottom: 2rem;">Earn a free product token every 3 orders!</p>
      
      <div style="background: var(--section-light-green); border: 1px solid rgba(45,106,79,0.1); border-radius: 12px; padding: 2rem; margin-bottom: 2rem; box-shadow: var(--shadow-sm);">
        <h3 style="font-size: 3.5rem; color: var(--primary); margin-bottom: 0px; line-height: 1;">${tokens}</h3>
        <p style="color: var(--primary-dark); font-weight: 600; font-size: 1.1rem; margin-top: 0.5rem;">Tokens Available</p>
      </div>
      
      <div style="margin-bottom: 2rem; padding: 1rem; border-radius: 8px; background: rgba(233, 196, 106, 0.1);">
        <p style="color: #8c6204; font-weight: 500;">Complete <strong>${ordersAway}</strong> more order(s) for your next token.</p>
      </div>
      
      <button class="btn-secondary" style="width:100%; padding:12px; font-weight:600;" onclick="renderAuthUI()">Back to Profile</button>
    </div>
  `;
}
