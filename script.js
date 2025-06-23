// Loader and App Display
window.onload = function() {
  setTimeout(() => {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
      document.getElementById('app').classList.remove('hidden');
      animateProgressBars();
    }, 600);
  }, 3000);
};

// Day/Night Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if(!localStorage.getItem('theme')) {
  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  themeToggle.innerText = prefersDark ? '☀️' : '🌙';
} else {
  document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
  themeToggle.innerText = localStorage.getItem('theme') === 'dark' ? '☀️' : '🌙';
}
themeToggle.onclick = function() {
  let theme = document.documentElement.getAttribute('data-theme');
  if(theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerText = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerText = '☀️';
    localStorage.setItem('theme', 'dark');
  }
};

// Smooth Scroll to Section
window.scrollToSection = function(id) {
  document.getElementById(id).scrollIntoView({behavior:'smooth', block:'start'});
};

// Animate Progress Bars (About Us)
function animateProgressBars() {
  document.querySelectorAll('.progress-bar').forEach(bar => {
    const value = bar.getAttribute('data-value');
    bar.style.setProperty('--value', value);
    bar.classList.add('animated');
  });
}

// Projects Data
const projects = [
  {
    name: "Sunshine Residency",
    type: "residential",
    status: "Completed",
   // details: "Click Me",
    price: "₹65 Lakh onwards",
    mainImg: "https://raw.githubusercontent.com/CodeCr4cker/html-test/main/image/Sunshine%20Residency1.jpg",
    images: ["https://raw.githubusercontent.com/CodeCr4cker/html-test/main/image/Sunshine%20Residenc2.jpg", "https://raw.githubusercontent.com/CodeCr4cker/html-test/main/image/Sunshine%20Residency3.jpg", "https://raw.githubusercontent.com/CodeCr4cker/html-test/main/image/Sunshine%20Residency4.jpg"],
    description: "Luxury residential complex with modern amenities, 2/3 BHK apartments, gym, pool, and lush gardens.",
    floorplan: "https://raw.githubusercontent.com/CodeCr4cker/html-test/main/image/Sunshine%20Residency4.jpg",
   // location: "https://goo.gl/maps/abcd123",
 //   mapEmbed: '<iframe src="https://www.google.com/maps/embed?..."></iframe>',
 //   brochure: "brochure1.pdf",
    amenities: ["Swimming Pool", "Gym", "Children Park", "24x7 Security", "Power Backup"],
    available: "2/3 BHK - Limited units"
  },
  {
    name: "Platinum Towers",
    type: "commercial",
    status: "ongoing",
    details: "Click Me",
    price: "₹1.5 Cr onwards",
    mainImg: "project2.jpg",
    images: ["project2.jpg", "project2_2.jpg", "project2_3.jpg"],
    description: "Premium commercial spaces for offices and retail. Flexible floor sizes, modern infrastructure, ample parking.",
    floorplan: "floorplan2.jpg",
    location: "https://goo.gl/maps/efgh456",
    mapEmbed: '<iframe src="https://www.google.com/maps/embed?..."></iframe>',
    brochure: "brochure2.pdf",
    amenities: ["Cafeteria", "Parking", "Power Backup", "High-Speed Elevators"],
    available: "Office/Retail - Booking Open"
  },
  {
    name: "Elite Villas",
    type: "luxury",
    status: "Completed",
    details: "Click Me",
    price: "₹3.25 Cr onwards",
    mainImg: "project3.jpg",
    images: ["project3.jpg", "project3_2.jpg", "project3_3.jpg"],
    description: "Ultra-luxury villas with private pools, smart home features, and landscaped gardens.",
    floorplan: "floorplan3.jpg",
    location: "https://goo.gl/maps/ijkl789",
    mapEmbed: '<iframe src="https://www.google.com/maps/embed?..."></iframe>',
    brochure: "brochure3.pdf",
    amenities: ["Private Pool", "Smart Home", "Clubhouse", "Spa"],
    available: "4/5 BHK - Ready to Move"
  },
  // Add more projects as needed
];

// Render Projects Grid
function renderProjects(filter = "all") {
  const grid = document.querySelector('.projects-grid');
  grid.innerHTML = "";
  projects.filter(p => filter === "all" || p.type===filter || p.status===filter)
    .forEach((p,i) => {
      grid.innerHTML += `
        <div class="project-card" onclick="openProject(${i})">
          <img src="${p.mainImg}" alt="${p.name}">
          <div class="content">
            <span class="type">${capitalize(p.type)}</span>
            <h3>${p.name}</h3>
            <p>${p.description.substring(0, 63)}...</p>
            <span class="status">${capitalize(p.status)}</span>
            <div class="price">${p.price}</div>
          </div>
        </div>
      `;
    });
}
function capitalize(str) { return str[0].toUpperCase() + str.slice(1); }
document.querySelectorAll('.filters button').forEach(btn => {
  btn.onclick = function() {
    document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  };
});
renderProjects();

// Project Modal (with lightbox gallery)
window.openProject = function(idx) {
  const p = projects[idx];
  const modal = document.getElementById('project-modal');
  let gallery = '';
  p.images.forEach((img, i) => {
    gallery += `<span style="position:relative;">
      <img src="${img}" alt="Image" class="${i===0?'active':''}" onclick="setMainImg('${img}', this)">
      <span class="gallery-zoom" onclick="event.stopPropagation();openLightbox(${idx},${i});">&#128269;</span>
    </span>`;
  });
  document.getElementById('modal-details').innerHTML = `
    <h2>${p.name}</h2>
    <div>
      <img src="${p.images[0]}" class="gallery-main" id="main-img" alt="" onclick="openLightbox(${idx},0)">
      <div class="gallery">${gallery}</div>
    </div>
    <p>${p.description}</p>
    <b>Amenities:</b> <ul><li>${p.amenities.join('</li><li>')}</li></ul>
    <b>Price & Availability:</b> <div>${p.price} - ${p.available}</div>
    <b>Floor plan:</b><br><img src="${p.floorplan}" class="floorplan" alt="Floorplan">
    <div><a href="${p.brochure}" class="brochure" download>Download Brochure</a></div>
    <b>Location:</b>
    <div class="map-responsive">${p.mapEmbed}</div>
  `;
  modal.style.display = "flex";
};
window.setMainImg = function(src, el) {
  document.getElementById('main-img').src = src;
  el.parentElement.parentElement.querySelectorAll('img').forEach(img => img.classList.remove('active'));
  el.classList.add('active');
}
window.closeModal = function() {
  document.getElementById('project-modal').style.display = "none";
}
// Close modal on background click
document.getElementById('project-modal').onclick = function(e) {
  if(e.target === this) closeModal();
}

// Lightbox Feature
let lightboxFiles = [];
let lightboxIndex = 0;
window.openLightbox = function(projectIdx, imgIdx) {
  lightboxFiles = projects[projectIdx].images;
  lightboxIndex = imgIdx;
  showLightboxItem();
  document.getElementById('lightbox').style.display = 'flex';
  document.body.style.overflow = 'hidden';
};
window.closeLightbox = function() {
  document.getElementById('lightbox').style.display = 'none';
  document.body.style.overflow = '';
};
window.nextLightbox = function() {
  lightboxIndex = (lightboxIndex + 1) % lightboxFiles.length;
  showLightboxItem();
};
window.prevLightbox = function() {
  lightboxIndex = (lightboxIndex - 1 + lightboxFiles.length) % lightboxFiles.length;
  showLightboxItem();
};
function showLightboxItem() {
  const file = lightboxFiles[lightboxIndex];
  const imgEl = document.getElementById('lightbox-img');
  const vidEl = document.getElementById('lightbox-video');
  if(file.match(/\.(mp4|webm|ogg)$/i)) {
    imgEl.style.display = 'none';
    vidEl.style.display = '';
    vidEl.src = file;
    vidEl.load();
    vidEl.play();
  } else {
    vidEl.pause();
    vidEl.style.display = 'none';
    imgEl.style.display = '';
    imgEl.src = file;
  }
}
document.addEventListener('keydown', function(e) {
  const lb = document.getElementById('lightbox');
  if(lb.style.display === 'flex') {
    if(e.key === 'ArrowRight') nextLightbox();
    else if(e.key === 'ArrowLeft') prevLightbox();
    else if(e.key === 'Escape') closeLightbox();
  }
});
// image auto slide
  const slides = document.querySelectorAll(".slide-img");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) slide.classList.add("active");
    });
  }

  function startSlideshow() {
    showSlide(currentSlide);
    currentSlide = (currentSlide + 1) % slides.length;
    setTimeout(startSlideshow, 3000); // 3 seconds delay
  }

  window.addEventListener('load', startSlideshow);

// Contact Form Handler
document.getElementById('contact-form').onsubmit = function(e) {
  e.preventDefault();
  alert("Thank you for contacting us! We will get back to you soon.");
  this.reset();
};

// Animate Progress Bars on Scroll (if About Us comes into viewport)
let animated = false;
window.addEventListener('scroll', () => {
  const about = document.getElementById('about');
  const rect = about.getBoundingClientRect();
  if(!animated && rect.top < window.innerHeight - 120) {
    animateProgressBars();
    animated = true;
  }
});
