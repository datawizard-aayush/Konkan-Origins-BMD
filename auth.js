let currentUser = JSON.parse(localStorage.getItem('konkan_user')) || null;

function renderAuthUI() {
    const authModalBody = document.getElementById('authModalBody');
    if (!authModalBody) return;

    if (currentUser) {
        authModalBody.innerHTML = `
      <div style="padding: 2rem; text-align: center;">
        <h2 style="color: var(--primary-dark); margin-bottom: 1rem;">Welcome, ${currentUser.name}!</h2>
        <p style="margin-bottom: 2rem; color: var(--text-muted);">Email: ${currentUser.email}</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button class="btn-primary" onclick="showRewardsUI()">My Rewards & Tokens</button>
          <button class="btn-secondary" onclick="logout()">Log Out</button>
        </div>
      </div>
    `;
    } else {
        authModalBody.innerHTML = `
      <div style="padding: 2.5rem 1.5rem;">
        <h2 style="color: var(--primary-dark); margin-bottom: 1.5rem; text-align: center;">Login or Sign Up</h2>
        <input type="text" id="authName" placeholder="Full Name" style="width:100%; padding:14px; margin-bottom:15px; border:1px solid var(--border-color); border-radius:6px; font-family:inherit;">
        <input type="email" id="authEmail" placeholder="Email Address" style="width:100%; padding:14px; margin-bottom:15px; border:1px solid var(--border-color); border-radius:6px; font-family:inherit;">
        <input type="password" id="authPass" placeholder="Password" style="width:100%; padding:14px; margin-bottom:25px; border:1px solid var(--border-color); border-radius:6px; font-family:inherit;">
        <button class="btn-primary" style="width:100%; padding:14px; border-radius:8px; font-size:1.1rem; font-weight: 600;" onclick="loginMock()">Continue</button>
      </div>
    `;
    }
}

function loginMock() {
    const email = document.getElementById('authEmail').value;
    const name = document.getElementById('authName').value || email.split('@')[0] || 'User';
    if (!email) { alert("Please enter a valid email to continue."); return; }

    currentUser = { name, email };
    localStorage.setItem('konkan_user', JSON.stringify(currentUser));
    renderAuthUI();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('konkan_user');
    renderAuthUI();
}

function openAuthModal() {
    renderAuthUI();
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}
