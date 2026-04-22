const fs = require('fs');

// 1. Update styles.css
let css = fs.readFileSync('styles.css', 'utf-8');

const root_vars = `
  /* Theme overlays */
  --overlay-light: rgba(255, 255, 255, 0.03);
  --overlay-medium: rgba(255, 255, 255, 0.05);
  --overlay-strong: rgba(255, 255, 255, 0.1);
  --overlay-extra: rgba(255, 255, 255, 0.15);
  --input-bg: rgba(26, 26, 31, 0.6);
  --nav-bg: rgba(11, 11, 13, 0.85);
`;

css = css.replace("  --border-light: rgba(255, 255, 255, 0.08);", "  --border-light: rgba(255, 255, 255, 0.08);" + root_vars);

const light_mode = `
body.light-mode {
  --bg-color: #F0F2F5;
  --card-bg: #FFFFFF;
  --text-primary: #1A1A1F;
  --text-secondary: #6B7280;
  --accent-glow: #4F46E5;
  --action-glow: #10B981;
  --success-color: #6366F1;
  --border-light: rgba(0, 0, 0, 0.08);

  --shadow-base: 8px 8px 20px rgba(0,0,0,0.05), -5px -5px 15px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,1);
  --shadow-hover: 12px 12px 25px rgba(0,0,0,0.1), -5px -5px 20px rgba(255,255,255,0.9), inset 1px 1px 2px rgba(255,255,255,1);
  
  --shadow-glow: 0 0 15px rgba(79, 70, 229, 0.15);
  --shadow-glow-hover: 0 0 25px rgba(79, 70, 229, 0.3);
  --shadow-action: 0 0 20px rgba(16, 185, 129, 0.25);

  --overlay-light: rgba(0, 0, 0, 0.02);
  --overlay-medium: rgba(0, 0, 0, 0.04);
  --overlay-strong: rgba(0, 0, 0, 0.08);
  --overlay-extra: rgba(0, 0, 0, 0.12);
  --input-bg: rgba(255, 255, 255, 0.8);
  --nav-bg: rgba(240, 242, 245, 0.85);
}

.theme-toggle-btn {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1000;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: var(--shadow-base);
  transition: all 0.3s ease;
}
.theme-toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}
`;

css += light_mode;

css = css.replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.03\s*\)/g, 'var(--overlay-light)');
css = css.replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.05\s*\)/g, 'var(--overlay-medium)');
css = css.replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.1\s*\)/g, 'var(--overlay-strong)');
css = css.replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.15\s*\)/g, 'var(--overlay-extra)');
css = css.replace(/rgba\(\s*26\s*,\s*26\s*,\s*31\s*,\s*0\.6\s*\)/g, 'var(--input-bg)');
css = css.replace(/rgba\(\s*11\s*,\s*11\s*,\s*13\s*,\s*0\.85\s*\)/g, 'var(--nav-bg)');
css = css.replace(/rgba\(26, 26, 31, 1\)/g, 'var(--card-bg)');

fs.writeFileSync('styles.css', css, 'utf-8');

// 2. Update index.html
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace('<div id="app-container">', `<button id="theme-toggle" class="theme-toggle-btn" onclick="toggleTheme()">
    <i class="ph ph-sun" id="theme-icon"></i>
  </button>
<div id="app-container">`);

html = html.replace("border: 1px solid rgba(255,255,255,0.1) !important;", "border: 1px solid var(--border-light) !important;");
html = html.replace("background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);", "background: var(--overlay-medium); border: 1px solid var(--border-light);");
html = html.replace("border: 2px dashed rgba(255,255,255,0.1);", "border: 2px dashed var(--border-light);");
html = html.replace("background: rgba(255,255,255,0.02);", "background: var(--overlay-light);");
html = html.replace("this.style.borderColor='rgba(255,255,255,0.1)'", "this.style.borderColor='var(--border-light)'");
html = html.replace("border-color: rgba(255,255,255,0.1);", "border-color: var(--border-light);");
html = html.replace("border: 1px solid rgba(255,255,255,0.1);", "border: 1px solid var(--border-light);");

fs.writeFileSync('index.html', html, 'utf-8');

// 3. Update script.js
let js = fs.readFileSync('script.js', 'utf-8');

js = js.replace("background: rgba(255,255,255,0.02);", "background: var(--overlay-light);");

const theme_script = `
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
`;

js += "\n" + theme_script;

fs.writeFileSync('script.js', js, 'utf-8');

console.log("Successfully updated theme files.");
