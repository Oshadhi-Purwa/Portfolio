const fs = require('fs');

// 1. MySQL: Orange middle stripe cylinder stack exactly like in the user's image
const mysql = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <ellipse cx="64" cy="30" rx="42" ry="15" fill="#007f9c"/>
  <ellipse cx="64" cy="30" rx="36" ry="11" fill="#009bbd"/>
  <path fill="#007f9c" d="M22 30v22c0 8.3 18.8 15 42 15s42-6.7 42-15V30H22z"/>
  <path fill="#e68a00" d="M22 50v22c0 8.3 18.8 15 42 15s42-6.7 42-15V50H22z"/>
  <path fill="#007f9c" d="M22 72v24c0 8.3 18.8 15 42 15s42-6.7 42-15V72H22z"/>
</svg>`;
fs.writeFileSync('assets/icons/mysql.svg', mysql);

// 2. Spring: Light-green concentric rings mark exactly as shown in user image
const spring = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <circle cx="64" cy="64" r="44" fill="none" stroke="#7fc836" stroke-width="14"/>
  <circle cx="64" cy="64" r="18" fill="#7fc836"/>
</svg>`;
fs.writeFileSync('assets/icons/spring.svg', spring);

// 3. Power BI: 3 ascending vertical bar charts in muted gold/ochre
const powerbi = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <rect x="24" y="66" width="20" height="42" rx="4" fill="#c69214"/>
  <rect x="54" y="44" width="20" height="64" rx="4" fill="#c69214"/>
  <rect x="84" y="24" width="20" height="84" rx="4" fill="#c69214"/>
</svg>`;
fs.writeFileSync('assets/icons/powerbi.svg', powerbi);

console.log('Saved exact matching SVGs successfully');
