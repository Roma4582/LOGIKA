// --- Розширена база даних товарів (30 позицій) ---
const products = [
    // Процесори (CPU)
    { id: 1, name: 'Intel Core i5-13400F', category: 'cpu', price: 7200, img: 'https://unsplash.com' },
    { id: 2, name: 'AMD Ryzen 5 7600X', category: 'cpu', price: 9400, img: 'https://unsplash.com' },
    { id: 3, name: 'Intel Core i7-14700K', category: 'cpu', price: 16500, img: 'https://unsplash.com' },
    { id: 4, name: 'AMD Ryzen 7 7800X3D', category: 'cpu', price: 17200, img: 'https://unsplash.com' },
    { id: 5, name: 'Intel Core i9-14900K', category: 'cpu', price: 24500, img: 'https://unsplash.com' },
    { id: 6, name: 'AMD Ryzen 9 7950X', category: 'cpu', price: 22800, img: 'https://unsplash.com' },

    // Відеокарти (GPU)
    { id: 7, name: 'NVIDIA RTX 4060 8GB', category: 'gpu', price: 13500, img: 'https://unsplash.com' },
    { id: 8, name: 'NVIDIA RTX 4070 Super 12GB', category: 'gpu', price: 28000, img: 'https://unsplash.com' },
    { id: 9, name: 'AMD Radeon RX 7800 XT 16GB', category: 'gpu', price: 23000, img: 'https://unsplash.com' },
    { id: 10, name: 'NVIDIA RTX 4080 Super 16GB', category: 'gpu', price: 47000, img: 'https://unsplash.com' },
    { id: 11, name: 'AMD Radeon RX 7600 8GB', category: 'gpu', price: 11200, img: 'https://unsplash.com' },
    { id: 12, name: 'NVIDIA RTX 4090 24GB', category: 'gpu', price: 84000, img: 'https://unsplash.com' },

    // Материнські плати
    { id: 13, name: 'ASUS ROG STRIX B650-A', category: 'motherboard', price: 8900, img: 'https://unsplash.com' },
    { id: 14, name: 'MSI MAG B760 TOMAHAWK', category: 'motherboard', price: 7400, img: 'https://unsplash.com' },
    { id: 15, name: 'Gigabyte Z790 AORUS ELITE', category: 'motherboard', price: 11500, img: 'https://unsplash.com' },
    { id: 16, name: 'ASRock B550M PRO4', category: 'motherboard', price: 3900, img: 'https://unsplash.com' },
    { id: 17, name: 'ASUS PRIME X670-P', category: 'motherboard', price: 10200, img: 'https://unsplash.com' },
    { id: 18, name: 'MSI PRO H610M-E', category: 'motherboard', price: 2900, img: 'https://unsplash.com' },

    // Оперативна пам'ять (RAM)
    { id: 19, name: 'Kingston Fury DDR5 2x16GB', category: 'ram', price: 4600, img: 'https://unsplash.com' },
    { id: 20, name: 'Corsair Vengeance DDR4 16GB', category: 'ram', price: 1800, img: 'https://unsplash.com' },
    { id: 21, name: 'G.Skill Trident Z5 RGB 32GB', category: 'ram', price: 5800, img: 'https://unsplash.com' },
    { id: 22, name: 'Crucial DDR5 8GB 4800MHz', category: 'ram', price: 1100, img: 'https://unsplash.com' },
    { id: 23, name: 'Team Elite DDR4 2x8GB', category: 'ram', price: 1500, img: 'https://unsplash.com' },
    { id: 24, name: 'Lexar Thor DDR4 32GB', category: 'ram', price: 3100, img: 'https://unsplash.com' },

    // Накопичувачі (SSD)
    { id: 25, name: 'Samsung 990 Pro 1TB M.2', category: 'ssd', price: 4200, img: 'https://unsplash.com' },
    { id: 26, name: 'Crucial P3 2TB NVMe', category: 'ssd', price: 5100, img: 'https://unsplash.com' },
    { id: 27, name: 'Kingston NV2 500GB M.2', category: 'ssd', price: 1600, img: 'https://unsplash.com' },
    { id: 28, name: 'WD Blue 1TB SATA III', category: 'ssd', price: 2800, img: 'https://unsplash.com' },
    { id: 29, name: 'Goodram PX600 1TB', category: 'ssd', price: 2350, img: 'https://unsplash.com' },
    { id: 30, name: 'SanDisk Ultra 2TB SSD', category: 'ssd', price: 5900, img: 'https://unsplash.com' }
];

// Поточний стан додатку
let cart = [];
let currentCategory = 'all';

// --- Генерація карток на вітрині ---
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
            <div class="product-img-wrapper">
                <img src="${product.img}" alt="${product.name}" class="product-img" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-title" title="${product.name}">${product.name}</div>
                <div class="product-price">${product.price.toLocaleString()} ₴</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Додати в збірку</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --- Комбінована фільтрація (Категорія + Пошук) ---
function getFilteredProducts() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();
    
    return products.filter(product => {
        const matchesCategory = (currentCategory === 'all' || product.category === currentCategory);
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });
}

// --- Обробка зміни категорії ---
function filterCategory(category, button) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    currentCategory = category;
    renderProducts(getFilteredProducts());
}

// --- Обробка введення в пошуковий рядок ---
function handleSearch() {
    renderProducts(getFilteredProducts());
}

// --- Функціонал кошика ---
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

// Початкове рендерення при завантаженні сторінки
renderProducts(products);
