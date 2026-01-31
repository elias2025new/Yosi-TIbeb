// ===================================
// YOSE TIBEB - MODERN E-COMMERCE JS
// ===================================

// Page Load Animation
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// ===== MOBILE MENU =====
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileMenu && mobileMenu.classList.contains('active')) {
    if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  }
});

// ===== CONTACT SLIDER =====
const contactLink = document.querySelector('a[href="#Co-slide"]');
const slider = document.getElementById('co-slide');
const closeSlideBtn = document.getElementById('close-slide');

if (contactLink && slider) {
  contactLink.addEventListener('click', function (e) {
    e.preventDefault();
    slider.classList.add('active');
  });
}

if (closeSlideBtn && slider) {
  closeSlideBtn.addEventListener('click', function () {
    slider.classList.remove('active');
  });
}

// Close slider when clicking outside
window.addEventListener('click', function (e) {
  if (slider && slider.classList.contains('active') &&
    !slider.contains(e.target) &&
    e.target !== contactLink) {
    slider.classList.remove('active');
  }
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.getElementById('search-input');
const productCards = document.querySelectorAll('.product-card');

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    productCards.forEach(card => {
      const title = card.querySelector('.product-title').textContent.toLowerCase();
      if (title.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// ===== CATEGORY FILTERING =====
const categoryBtns = document.querySelectorAll('.category-btn');

categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    categoryBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');

    const category = btn.getAttribute('data-category');

    productCards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.5s ease-out';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== SHOPPING CART =====
let cart = [];
let cartCount = 0;

function updateCartCount() {
  const cartCountElement = document.querySelector('.cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

// Add to cart from product cards
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
addToCartBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const card = btn.closest('.product-card');
    const title = card.querySelector('.product-title').textContent;
    const price = card.querySelector('.product-price').textContent;

    cart.push({ title, price });
    cartCount++;
    updateCartCount();

    // Visual feedback
    btn.textContent = 'Added!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    setTimeout(() => {
      btn.textContent = 'Add to Cart';
      btn.style.background = '';
    }, 1500);
  });
});

// ===== PRODUCT POPUP =====
const popupOverlay = document.getElementById('popup-overlay');
const popupImage = document.getElementById('popup-image');
const popupTitle = document.getElementById('popup-title');
const popupDescription = document.getElementById('popup-description');
const popupPrice = document.getElementById('popup-price');
const closeeBtn = document.getElementById('close-btn');
const zoomBtn = document.getElementById('zoom-btn');
const popupLogo = document.getElementById('popup-logo');
const availabilityText = document.getElementById('availability-text');
const messageDiv = document.getElementById('message');

// Product descriptions
const descriptions = {
  "IMAGES/1.jpg": "Everyday wear designed for comfort without compromising on style. Perfect for daily activities and casual outings.",
  "IMAGES/24.jpg": "Premium traditional Ethiopian dress (ሀበሻ ቀሚስ) made with high-quality fabric. Perfect for special occasions and cultural celebrations. Features intricate traditional patterns and comfortable fit.",
  "IMAGES/2.jpg": "Modern stylish shirt with contemporary design. Made from breathable fabric for all-day comfort.",
  "IMAGES/3.jpg": "Casual wear perfect for everyday use. Combines style and comfort effortlessly.",
  "IMAGES/4.jpg": "Modern style clothing with trendy design elements. Perfect for the fashion-forward individual.",
  "IMAGES/5.jpg": "Casual collection piece that offers versatility and style for any occasion.",
  "IMAGES/6.jpg": "Formal attire designed for professional settings and special events.",
  "IMAGES/7.jpg": "Contemporary fashion piece with modern aesthetics and premium quality.",
  "IMAGES/8.jpg": "Street style clothing that makes a bold fashion statement.",
  "IMAGES/9.jpg": "Traditional wear celebrating Ethiopian heritage with modern comfort.",
  "IMAGES/10.jpg": "Modern elegance meets traditional craftsmanship in this stunning piece.",
  "IMAGES/11.jpg": "Versatile clothing piece that works for various occasions and settings.",
  "IMAGES/12.png": "Formal collection piece perfect for important occasions.",
  "IMAGES/13.jpg": "Trendy fashion item that keeps you ahead of the style curve.",
  "IMAGES/14.jpg": "Casual chic design that effortlessly transitions from day to night.",
  "IMAGES/15.jpg": "Heritage style clothing that honors traditional Ethiopian fashion.",
  "IMAGES/16.jpg": "Contemporary look with modern silhouettes and premium materials.",
  "IMAGES/17.jpg": "Elegant wear for those who appreciate refined fashion.",
  "IMAGES/18.jpg": "Relaxed fit clothing designed for ultimate comfort and style.",
  "IMAGES/19.jpg": "Urban style piece perfect for city living and modern lifestyles.",
  "IMAGES/20.jpg": "Cultural fashion that celebrates Ethiopian traditions beautifully.",
  "IMAGES/21.jpg": "Comfort wear that doesn't sacrifice style for coziness.",
  "IMAGES/22.jpg": "Premium formal wear for the most important occasions.",
  "IMAGES/23.jpg": "Fashion forward design that sets trends rather than follows them."
};

// Availability status
const availability = {
  "IMAGES/1.jpg": true,
  "IMAGES/24.jpg": true,
  "IMAGES/2.jpg": true,
  "IMAGES/3.jpg": true,
  "IMAGES/4.jpg": true,
  "IMAGES/5.jpg": true,
  "IMAGES/6.jpg": true,
  "IMAGES/7.jpg": true,
  "IMAGES/8.jpg": true,
  "IMAGES/9.jpg": true,
  "IMAGES/10.jpg": true,
  "IMAGES/11.jpg": true,
  "IMAGES/12.png": true,
  "IMAGES/13.jpg": true,
  "IMAGES/14.jpg": true,
  "IMAGES/15.jpg": true,
  "IMAGES/16.jpg": true,
  "IMAGES/17.jpg": true,
  "IMAGES/18.jpg": true,
  "IMAGES/19.jpg": true,
  "IMAGES/20.jpg": true,
  "IMAGES/21.jpg": true,
  "IMAGES/22.jpg": true,
  "IMAGES/23.jpg": true
};

// Quick view buttons
const quickViewBtns = document.querySelectorAll('.quick-view-btn');
quickViewBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const card = btn.closest('.product-card');
    const img = card.querySelector('.product-image img');
    const title = card.querySelector('.product-title').textContent;
    const price = card.querySelector('.product-price').textContent;
    const src = img.getAttribute('src');

    openPopup(src, title, price);
  });
});

function openPopup(src, title, price) {
  popupImage.src = src;
  popupTitle.textContent = title;
  popupPrice.textContent = price;

  const desc = descriptions[src] || "Premium quality clothing item from Yose Tibeb collection.";
  popupDescription.innerHTML = `<p>${desc}</p>`;

  // Show availability
  const isAvailable = availability[src] !== false;
  if (availabilityText) {
    availabilityText.textContent = isAvailable ? "✓ Available" : "✗ Not Available";
    availabilityText.classList.toggle('unavailable', !isAvailable);
  }

  // Reset zoom
  popupImage.style.transform = "scale(1)";
  popupOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (messageDiv) {
    messageDiv.textContent = '';
    messageDiv.className = 'message-box';
  }
}

// Close popup
if (closeeBtn) {
  closeeBtn.addEventListener('click', () => {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// Close popup when clicking outside
popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Zoom toggle
let zoomed = false;
if (zoomBtn) {
  zoomBtn.addEventListener('click', () => {
    zoomed = !zoomed;
    popupImage.style.transform = zoomed ? "scale(2)" : "scale(1)";
    popupImage.style.cursor = zoomed ? "zoom-out" : "zoom-in";
  });
}

// Add to cart from popup
const addToCartPopup = document.getElementById('add-to-cart-popup');
if (addToCartPopup) {
  addToCartPopup.addEventListener('click', () => {
    const title = popupTitle.textContent;
    const price = popupPrice.textContent;
    const src = popupImage.getAttribute('src');
    const isAvailable = availability[src] !== false;

    if (!isAvailable) {
      messageDiv.textContent = 'This item is currently not available';
      messageDiv.className = 'message-box error show';
      return;
    }

    cart.push({ title, price });
    cartCount++;
    updateCartCount();

    messageDiv.textContent = 'Added to cart successfully!';
    messageDiv.className = 'message-box success show';

    setTimeout(() => {
      messageDiv.className = 'message-box';
    }, 3000);
  });
}

// Order button
const orderButton = document.getElementById('order');
if (orderButton) {
  orderButton.addEventListener('click', (e) => {
    const currentImageSrc = popupImage.getAttribute('src');
    const isAvailable = availability[currentImageSrc] !== false;

    if (!isAvailable) {
      e.preventDefault();
      messageDiv.textContent = 'Item is NOT AVAILABLE';
      messageDiv.className = 'message-box error show';
    }
  });
}

// Cart icon click
const cartIcon = document.getElementById('cart-icon');
if (cartIcon) {
  cartIcon.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
    } else {
      let cartItems = 'Your Cart:\n\n';
      cart.forEach((item, index) => {
        cartItems += `${index + 1}. ${item.title} - ${item.price}\n`;
      });
      cartItems += '\nTo complete your order, please contact us via Instagram!';
      alert(cartItems);
    }
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#pop-up' && href !== '#Co-slide') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Add fade-in animation for products on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all product cards
productCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(card);
});

console.log('Yose Tibeb E-Commerce initialized successfully!');
