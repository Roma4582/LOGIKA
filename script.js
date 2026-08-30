const products = [
    { id: 1, name: 'Intel Core i5-13400F', category: 'cpu', price: 7200, icon: '💻' },
    { id: 2, name: 'AMD Ryzen 5 7600X', category: 'cpu', price: 9400, icon: '💻' },
    { id: 3, name: 'Intel Core i7-14700K', category: 'cpu', price: 16500, icon: '💻' },
    { id: 4, name: 'AMD Ryzen 7 7800X3D', category: 'cpu', price: 17200, icon: '💻' },
    { id: 5, name: 'Intel Core i9-14900K', category: 'cpu', price: 24500, icon: '💻' },
    { id: 6, name: 'AMD Ryzen 9 7950X', category: 'cpu', price: 22800, icon: '💻' },
    { id: 7, name: 'NVIDIA RTX 4060 8GB', category: 'gpu', price: 13500, icon: '🎮' },
    { id: 8, name: 'NVIDIA RTX 4070 Super 12GB', category: 'gpu', price: 28000, icon: '🎮' },
    { id: 9, name: 'AMD Radeon RX 7800 XT 16GB', category: 'gpu', price: 23000, icon: '🎮' },
    { id: 10, name: 'NVIDIA RTX 4080 Super 16GB', category: 'gpu', price: 47000, icon: '🎮' },
    { id: 11, name: 'AMD Radeon RX 7600 8GB', category: 'gpu', price: 11200, icon: '🎮' },
    { id: 12, name: 'NVIDIA RTX 4090 24GB', category: 'gpu', price: 84000, icon: '🎮' },
    { id: 13, name: 'ASUS ROG STRIX B650-A', category: 'motherboard', price: 8900, icon: '🔌' },
    { id: 14, name: 'MSI MAG B760 TOMAHAWK', category: 'motherboard', price: 7400, icon: '🔌' },
    { id: 15, name: 'Gigabyte Z790 AORUS ELITE', category: 'motherboard', price: 11500, icon: '🔌' },
    { id: 16, name: 'ASRock B550M PRO4', category: 'motherboard', price: 3900, icon: '🔌' },
    { id: 17, name: 'ASUS PRIME X670-P', category: 'motherboard', price: 10200, icon: '🔌' },
    { id: 18, name: 'MSI PRO H610M-E', category: 'motherboard', price: 2900, icon: '🔌' },
    { id: 19, name: 'Kingston Fury DDR5 2x16GB', category: 'ram', price: 4600, icon: '⚡' },
    { id: 20, name: 'Corsair Vengeance DDR4 16GB', category: 'ram', price: 1800, icon: '⚡' },
    { id: 21, name: 'G.Skill Trident Z5 RGB 32GB', category: 'ram', price: 5800, icon: '⚡' },
    { id: 22, name: 'Crucial DDR5 8GB 4800MHz', category: 'ram', price: 1100, icon: '⚡' },
    { id: 23, name: 'Team Elite DDR4 2x8GB', category: 'ram', price: 1500, icon: '⚡' },
    { id: 24, name: 'Lexar Thor DDR4 32GB', category: 'ram', price: 3100, icon: '⚡' },
    { id: 25, name: 'Samsung 990 Pro 1TB M.2', category: 'ssd', price: 4200, icon: '💾' },
    { id: 26, name: 'Crucial P3 2TB NVMe', category: 'ssd', price: 5100, icon: '💾' },
    { id: 27, name: 'Kingston NV2 500GB M.2', category: 'ssd', price: 1600, icon: '💾' },
    { id: 28, name: 'WD Blue 1TB SATA III', category: 'ssd', price: 2800, icon: '💾' },
    { id: 29, name: 'Goodram PX600 1TB', category: 'ssd', price: 2350, icon: '💾' },
    { id: 30, name: 'SanDisk Ultra 2TB SSD', category: 'ssd', price: 5900, icon: '💾' },
    { id: 31, name: 'Chieftec Proton 600W', category: 'psu', price: 2400, icon: '🔋' },
    { id: 32, name: 'Corsair RM750x 750W Gold', category: 'psu', price: 5200, icon: '🔋' },
    { id: 33, name: 'be quiet! System Power 10 850W', category: 'psu', price: 3900, icon: '🔋' },
    { id: 34, name: 'MSI MAG A650BN 650W', category: 'psu', price: 2600, icon: '🔋' },
    { id: 35, name: 'MSI MAG FORGE 100M', category: 'case', price: 2850, icon: '📦' },
    { id: 36, name: 'NZXT H5 Flow Black', category: 'case', price: 4100, icon: '📦' },
    { id: 37, name: 'be quiet! Pure Base 500DX', category: 'case', price: 4700, icon: '📦' },
    { id: 38, name: 'Crucial H300 TG RGB', category: 'case', price: 1950, icon: '📦' },
    { id: 39, name: 'PCCOOLER PALADIN EX400', category: 'cooling', price: 950, icon: '❄️' },
    { id: 40, name: 'be quiet! Dark Rock Pro 5', category: 'cooling', price: 3800, icon: '❄️' },
    { id: 41, name: 'DeepCOOL LS720 (Водяне)', category: 'cooling', price: 5400, icon: '❄️' },
    { id: 42, name: 'ID-COOLING SE-224-XTS', category: 'cooling', price: 1150, icon: '❄️' }
];

// Завантаження кошика з пам'яті браузера при старті сайту
let cart = JSON.parse(localStorage.getItem('pc_builder_cart')) || [];
let currentCategory = 'all';

function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    if (productsToRender.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem; font-size: 1.2rem;">Товарів не знайдено 🔍</div>';
        return;
    }

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-wrapper">${product.icon}</div>
            <div class="product-info">
                <div class="product-title" title="${product.name}">${product.name}</div>
                <div class="product-price">${product.price.toLocaleString()} ₴</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Додати в збірку</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function getFilteredProducts() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();
    return products.filter(product => {
        const matchesCategory = (currentCategory === 'all' || product.category === currentCategory);
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });
}

function filterCategory(category, button) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentCategory = category;
    renderProducts(getFilteredProducts());
}

function handleSearch() {
    renderProducts(getFilteredProducts());
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    // Збереження поточного стану кошика в LocalStorage
    localStorage.setItem('pc_builder_cart', JSON.stringify(cart));

    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 1rem;">Кошик порожній</div>';
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-title" title="${item.name}">${item.name} x${item.quantity}</div>
                <div>
                    <span style="margin-right: 10px; color: var(--accent);">${(item.price * item.quantity).toLocaleString()} ₴</span>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }
    cartTotal.innerText = `${total.toLocaleString()} ₴`;
}

function checkout() {
    alert(`Дякуємо! Ваша збірка на суму ${document.getElementById('cartTotal').innerText} успішно оформлена.`);
    cart = [];
    updateCart();
}

// Початкова ініціалізація сайту
renderProducts(products);
updateCart();
