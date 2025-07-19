window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});


const contactLink = document.querySelector('a[href="#Co-slide"]');
const slider = document.getElementById('co-slide');
const closeBtn = document.getElementById('close-slide');

contactLink.addEventListener('click', function (e) {
  e.preventDefault();
  slider.classList.add('active');
});

closeBtn.addEventListener('click', function () {
  slider.classList.remove('active');
});

window.addEventListener('click', function (e) {
  if (
    slider.classList.contains('active') &&
    !slider.contains(e.target) &&
    e.target !== contactLink
  ) {
    slider.classList.remove('active');
  }
});


document.getElementById('backToTop').addEventListener('click', (e) => {
  e.preventDefault(); // prevent default jump behavior
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


window.addEventListener('scroll', () => {
  const indicator = document.querySelector('.scroll-down-indicator');
  if (window.scrollY > 100) {
    indicator.style.display = 'none';
  } else {
    indicator.style.display = 'block';
  }
});


// Popup Logic
const popupOverlay = document.getElementById('popup-overlay');
const popupImage = document.getElementById('popup-image');
const popupDescription = document.getElementById('popup-description');
const closeeBtn = document.getElementById('close-btn');
const zoomBtn = document.getElementById('zoom-btn');
const popupLogo = document.getElementById('popup-logo');
const availabilityText = document.getElementById('availability-text');

// Image Descriptions
const descriptions = {
  "IMAGES/24.jpg": "This is a stylish shirt made of breathable fabric, perfect for casual outings. The design is modern and comfortable, crafted to suit various body types. Its simple yet elegant look makes it a popular choice for both indoor and outdoor activities, keeping you both trendy and relaxed. This is a stylish shirt made of breathable fabric, perfect for casual outings. The design is modern and comfortable, crafted to suit various body types. Its simple yet elegant look makes it a popular choice for both indoor and outdoor activities, keeping you both trendy and relaxed. This is a stylish shirt made of breathable fabric, perfect for casual outings. The design is modern and comfortable, crafted to suit various body types. Its simple yet elegant look makes it a popular choice for both indoor and outdoor activities, keeping you both trendy and relaxed.",
  // Add more here
  // "IMAGES/1.jpg": "Description for image 1...",
  // "IMAGES/2.jpg": "Description for image 2...",
};

// Availability status
const availability = {
  "IMAGES/24.jpg": true,
  "IMAGES/3.jpg" : true,
  "IMAGES/4.jpg" : true,
  "IMAGES/5.jpg" : true,
  "IMAGES/6.jpg" : true,
  "IMAGES/7.jpg" : true,
  "IMAGES/8.jpg" : true,
  "IMAGES/9.jpg" : true,
  "IMAGES/10.jpg" : true,
  "IMAGES/11.jpg" : true,
  "IMAGES/12.png" : true,
  "IMAGES/13.jpg" : true,
  "IMAGES/14.jpg" : true,
  "IMAGES/15.jpg" : true,
  "IMAGES/16.jpg" : true,
  "IMAGES/17.jpg" : true,
  "IMAGES/18.jpg" : true,
  "IMAGES/19.jpg" : true,
  "IMAGES/20.jpg" : true,
  "IMAGES/21.jpg" : true,
  "IMAGES/22.jpg" : true,
  "IMAGES/23.jpg" : true,
  // Add more entries here
};

// Function to update description and logo visibility
function setPopupDescription(text) {
  // Remove existing description text nodes
  popupDescription.childNodes.forEach(node => {
    if (node !== popupLogo) {
      popupDescription.removeChild(node);
    }
  });

  // Add new description
  const textNode = document.createTextNode(text);
  popupDescription.insertBefore(textNode, popupLogo);

  // Show/hide logo
  const wordCount = text.trim().split(/\s+/).length;
  popupLogo.style.display = wordCount < 150 ? 'block' : 'none';
}

// Image click listener
document.querySelectorAll('.body-ShowCase .item a img').forEach(img => {
  img.addEventListener('click', e => {
    e.preventDefault();
    const src = img.getAttribute('src');
    popupImage.src = src;
   
     messageDiv.textContent = '';

    const desc = descriptions[src] || "No description available.";
    setPopupDescription(desc);

    // Show availability
    const isAvailable = availability[src];
    if (availabilityText) {
      availabilityText.textContent = isAvailable ? "Available" : "Not Available";
      availabilityText.classList.toggle('unavailable', !isAvailable);
    }

    // Reset zoom
    popupImage.style.transform = "scale(1)";
    popupOverlay.classList.add('active');
  });
});

// Close popup
closeeBtn.addEventListener('click', () => {
  popupOverlay.classList.remove('active');
});

// Zoom toggle
let zoomed = false;
zoomBtn.addEventListener('click', () => {
  zoomed = !zoomed;
  popupImage.style.transform = zoomed ? "scale(2)" : "scale(1)";
});


const orderButton = document.getElementById('order');
const orderLink = document.getElementById('orderLink');
const messageDiv = document.getElementById('message');


orderButton.addEventListener('click', (e) => {
  const currentImageSrc = popupImage.getAttribute('src');
  const isAvailable = availability[currentImageSrc];

  if (!isAvailable) {
    e.preventDefault(); // stop the link from navigating
    messageDiv.textContent = "Item is NOT AVAILABLE";
  } else {
    messageDiv.textContent = ""; 
  }
});




