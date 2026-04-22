// App Logic for do4you
const jobs = [
  { title: "Make PPT for Final Year Project", category: "PPT Design", price: "₹600", rating: "4.9", reviews:"18", student: "Rohan D." },
  { title: "Format 50-page SIP Report", category: "Word Formatting", price: "₹400", rating: "5.0", reviews:"8", student: "Sneha M." },
  { title: "B.Tech Assignment Writing", category: "Assignment", price: "₹800", rating: "4.8", reviews:"23", student: "Arjun K." },
  { title: "Placements Resume Formatting", category: "Resume Creation", price: "₹300", rating: "4.7", reviews:"11", student: "Pooja V." }
];

function populateMarketplace() {
  const container = document.getElementById('marketplace-list');
  let html = '';
  
  jobs.forEach((job, index) => {
    const delay = 0.1 + (index * 0.1);
    html += `
      <div class="clean-card reveal" style="transition-delay: ${delay}s; display: flex; flex-direction: column; cursor: pointer;">
        <div style="height: 140px; background: var(--overlay-light); display:flex; align-items:center; justify-content:center; border-bottom: 1px solid var(--border-light); position: relative; overflow: hidden;">
            <i class="ph ph-file-text" style="font-size: 3rem; color: var(--text-secondary); opacity: 0.5;"></i>
            <div style="position: absolute; top: 12px; right: 12px; background: rgba(108, 142, 255, 0.1); color: var(--accent-glow); padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(108, 142, 255, 0.2);">
                ${job.category}
            </div>
        </div>
        <div style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
           <div class="flex align-center gap-2 mb-2">
              <img src="https://i.pravatar.cc/150?u=${job.student.replace(' ','')}" class="avatar" style="width:28px; height:28px; border-width: 1px;">
              <span style="font-size:0.9rem; font-weight:500; color: var(--text-secondary);">${job.student}</span>
           </div>
           
           <h3 style="font-size: 1.1rem; margin-bottom: 12px; font-weight: 500; line-height: 1.4; flex: 1;">I need: ${job.title}</h3>
           
           <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
               <i class="ph-fill ph-star" style="color: #f5a623;"></i>
               <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary);">${job.rating}</span>
               <span style="font-size: 0.85rem; color: var(--text-secondary);">(${job.reviews} works)</span>
           </div>
           
           <div style="border-top: 1px solid var(--border-light); padding-top: 16px; display:flex; justify-content:space-between; align-items:center;">
             <button class="btn primary" style="padding: 8px 16px; font-size: 0.85rem; height: auto;">Apply</button>
             <div style="text-align: right;">
               <div style="font-size:0.75rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing: 0.5px;">Budget</div>
               <div style="font-weight:700; font-size:1.2rem; color:var(--text-primary);">${job.price}</div>
             </div>
           </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.reveal').forEach(el => {
        // Reset state slightly if needed (though CSS handles mostly)
        el.classList.remove('active');
        // Small timeout to allow DOM to acknowledge removal
        setTimeout(() => observer.observe(el), 10);
    });
}

function navigate(screenName, navElement) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });
  
  // Update state active
  const target = document.getElementById('screen-' + screenName);
  if(target) {
     target.classList.add('active');
  }
  
  // Show/Hide navigation
  const bottomNav = document.getElementById('bottom-nav');
  const sideNav = document.getElementById('side-nav');
  
  if (screenName === 'login') {
    bottomNav.style.display = 'none';
    sideNav.style.display = 'none';
  } else {
    // Media query controls real visibility, but we reset inline displays here
    if(window.innerWidth <= 768) {
       bottomNav.style.display = 'flex';
       sideNav.style.display = 'none';
    } else {
       bottomNav.style.display = 'none';
       sideNav.style.display = 'flex';
    }
  }
  
  // Update nav active states globally
  if (navElement) {
    document.querySelectorAll('.nav-item, .nav-item-desktop').forEach(el => el.classList.remove('active'));
    // Find matching triggers and activate all (to cover both responsive states)
    const activeText = navElement.innerText.trim().split(' ')[0]; // E.g. "Home" or "Dashboard"
    document.querySelectorAll('.nav-item, .nav-item-desktop').forEach(el => {
       if(el.innerText.includes(activeText)) el.classList.add('active');
    });
  }
  
  window.scrollTo(0, 0);
  
  // Re-initialize animations for the new screen
  initScrollAnimations();
}

// Ensure layout catches resize switches
window.addEventListener('resize', () => {
   const activeScreen = document.querySelector('.screen.active');
   if(activeScreen && activeScreen.id !== 'screen-login') {
      if(window.innerWidth > 768) {
         document.getElementById('bottom-nav').style.display = 'none';
         document.getElementById('side-nav').style.display = 'flex';
      } else {
         document.getElementById('bottom-nav').style.display = 'flex';
         document.getElementById('side-nav').style.display = 'none';
      }
   }
});

// Populate on load
document.addEventListener('DOMContentLoaded', () => {
  populateMarketplace();
  initScrollAnimations();
});


function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById('theme-icon');
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    icon.classList.remove('ph-moon');
    icon.classList.add('ph-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.add('light-mode');
    icon.classList.remove('ph-sun');
    icon.classList.add('ph-moon');
    localStorage.setItem('theme', 'light');
  }
}

// Check theme on load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.classList.remove('ph-sun');
        icon.classList.add('ph-moon');
    }
  }
});
