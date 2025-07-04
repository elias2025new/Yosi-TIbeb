  const contactLink = document.querySelector('a[href="#Co-slide"]');
  const slider = document.getElementById('co-slide');
  const closeBtn = document.getElementById('close-slide');
  

  contactLink.addEventListener('click', function(e) {
    e.preventDefault();  
    slider.classList.add('active');
  });

  closeBtn.addEventListener('click', function() {
    slider.classList.remove('active');
  });

  window.addEventListener('click', function(e) {
    if (slider.classList.contains('active') && !slider.contains(e.target) && e.target !== contactLink) {
      slider.classList.remove('active');
    }
  });

const overlay = document.getElementById('pop-up');
const closebtn = overlay.querySelector('.close-btn');
const orderLinks = document.querySelectorAll('.body-ShowCase a');

orderLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    overlay.classList.add('active');
  });
});

closebtn.addEventListener('click', () => overlay.classList.remove('active'));

overlay.addEventListener('click', e => {
  if (e.target === overlay) {
    overlay.classList.remove('active');
  }
});


