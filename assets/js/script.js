// Initialize Lucide Icons
lucide.createIcons();

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const lightbox = document.getElementById('lightbox');
const productModal = document.getElementById('product-modal');
const revealElements = document.querySelectorAll('.reveal');

// State
let isMenuOpen = false;

// Helpers
const toggleScroll = (lock) => document.body.style.overflow = lock ? 'hidden' : '';

const updateModal = (modal, show) => {
    modal.classList.toggle('hidden', !show);
    toggleScroll(show);
};

// Navbar & Animations on Scroll
const handleScroll = () => {
    // Navbar effect
    const isScrolled = window.scrollY > 50;
    navbar.classList.toggle('bg-black/95', isScrolled);
    navbar.classList.toggle('backdrop-blur-md', isScrolled);
    navbar.classList.toggle('shadow-lg', isScrolled);
    navbar.classList.toggle('shadow-pink-500/10', isScrolled);
    navbar.classList.toggle('bg-transparent', !isScrolled);

    // Reveal animations
    revealElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', handleScroll);
handleScroll(); // Initial check

// Mobile Menu
mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('hidden', !isMenuOpen);
    mobileMenuBtn.innerHTML = `<i data-lucide="${isMenuOpen ? 'x' : 'menu'}" size="28"></i>`;
    lucide.createIcons();
});

mobileMenu.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
        mobileMenu.classList.add('hidden');
        isMenuOpen = false;
        mobileMenuBtn.innerHTML = '<i data-lucide="menu" size="28"></i>';
        lucide.createIcons();
    }
});

// Gallery Lightbox
document.querySelectorAll('#gallery .group').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            document.getElementById('lightbox-img').src = img.src;
            updateModal(lightbox, true);
        }
    });
});

// Product Modal
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;

        const data = {
            img: item.querySelector('img')?.src,
            category: item.querySelector('span')?.textContent,
            name: item.querySelector('h3')?.textContent,
            desc: item.querySelector('p')?.textContent,
            price: item.querySelector('.price-tag')?.textContent,
            order: item.querySelector('a')?.href
        };

        if (data.name && data.img) {
            // Clean name (remove emojis for the WhatsApp message)
            const cleanName = data.name.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F3FB}-\u{1F3FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
            const whatsappMessage = `Hola, estoy interesado en el producto: ${cleanName}`;
            const whatsappUrl = `https://wa.me/573123253129?text=${encodeURIComponent(whatsappMessage)}`;

            document.getElementById('modal-product-img').src = data.img;
            document.getElementById('modal-product-bg').style.backgroundImage = `url('${data.img}')`;
            document.getElementById('modal-product-category').textContent = data.category;
            document.getElementById('modal-product-name').textContent = data.name;
            document.getElementById('modal-product-description').textContent = data.desc;
            document.getElementById('modal-product-price').textContent = data.price;
            document.getElementById('modal-product-order').href = whatsappUrl;
            updateModal(productModal, true);
        }
    });
});

// Universal Modal Closer
[lightbox, productModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('[id^="close-"]')) {
            updateModal(modal, false);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        updateModal(lightbox, false);
        updateModal(productModal, false);
    }
});

// Footer Year
document.getElementById('year').textContent = new Date().getFullYear();
