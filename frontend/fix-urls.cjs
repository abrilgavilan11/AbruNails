const fs = require('fs');
const path = require('path');

const replacements = {
  'src/pages/Dashboard.tsx': [
    { search: 'fetch("https://abrunails.onrender.com")', replace: 'fetch("https://abrunails.onrender.com/api/appointments")' },
    { search: 'fetch(`https://abrunails.onrender.com/${id}`', replace: 'fetch(`https://abrunails.onrender.com/api/appointments/${id}`' },
  ],
  'src/pages/Catalog.tsx': [
    { search: "fetch('https://abrunails.onrender.com')", replace: "fetch('https://abrunails.onrender.com/api/services')" }
  ],
  'src/pages/Booking.tsx': [
    { search: 'fetch("https://abrunails.onrender.com"),', replace: 'fetch("https://abrunails.onrender.com/api/services"),' },
    { search: 'fetch("https://abrunails.onrender.com")', replace: 'fetch("https://abrunails.onrender.com/api/addons")' },
    { search: 'const clientRes = await fetch("https://abrunails.onrender.com/api/addons", {', replace: 'const clientRes = await fetch("https://abrunails.onrender.com/api/clients", {' },
    { search: 'const aptRes = await fetch("https://abrunails.onrender.com/api/addons", {', replace: 'const aptRes = await fetch("https://abrunails.onrender.com/api/appointments", {' },
    // Since we do sequential replacement, I will be more precise:
  ],
  'src/pages/AdminLogin.tsx': [
    { search: 'fetch("https://abrunails.onrender.com", {', replace: 'fetch("https://abrunails.onrender.com/api/auth/login", {' }
  ],
  'src/components/home/FeaturedServices.tsx': [
    { search: "fetch('https://abrunails.onrender.com')", replace: "fetch('https://abrunails.onrender.com/api/services')" }
  ],
  'src/components/dashboard/SettingsManager.tsx': [
    { search: 'fetch("https://abrunails.onrender.com")', replace: 'fetch("https://abrunails.onrender.com/api/settings")' },
    { search: 'fetch("https://abrunails.onrender.com/api/settings", {', replace: 'fetch("https://abrunails.onrender.com/api/settings", {' } // No change needed if the first replaces it all
  ],
  'src/components/dashboard/ClientManager.tsx': [
    { search: 'fetch("https://abrunails.onrender.com")', replace: 'fetch("https://abrunails.onrender.com/api/clients")' },
    { search: 'fetch(`https://abrunails.onrender.com/${id}`', replace: 'fetch(`https://abrunails.onrender.com/api/clients/${id}`' },
    { search: '`https://abrunails.onrender.com/${editingClient.id}`', replace: '`https://abrunails.onrender.com/api/clients/${editingClient.id}`' },
    { search: 'url = editingClient \n      ? `https://abrunails.onrender.com/api/clients/${editingClient.id}`\n      : "https://abrunails.onrender.com"', replace: 'url = editingClient \n      ? `https://abrunails.onrender.com/api/clients/${editingClient.id}`\n      : "https://abrunails.onrender.com/api/clients"' }
  ],
  'src/components/dashboard/CategoryManager.tsx': [
    { search: 'fetch("https://abrunails.onrender.com")', replace: 'fetch("https://abrunails.onrender.com/api/categories")' },
    { search: 'fetch(`https://abrunails.onrender.com/${id}`', replace: 'fetch(`https://abrunails.onrender.com/api/categories/${id}`' },
    { search: '`https://abrunails.onrender.com/${editingCategory.id}`', replace: '`https://abrunails.onrender.com/api/categories/${editingCategory.id}`' },
  ],
  'src/components/dashboard/CatalogManager.tsx': [
    { search: 'fetch("https://abrunails.onrender.com")', replace: 'fetch("https://abrunails.onrender.com/api/categories")' },
    { search: 'fetch(`https://abrunails.onrender.com/${id}`', replace: 'fetch(`https://abrunails.onrender.com/api/services/${id}`' },
    { search: '`https://abrunails.onrender.com/${editingService.id}`', replace: '`https://abrunails.onrender.com/api/services/${editingService.id}`' },
  ],
  'src/components/dashboard/AgendaView.tsx': [
    { search: 'fetch("https://abrunails.onrender.com"),\n        fetch("https://abrunails.onrender.com"),\n        fetch("https://abrunails.onrender.com")', replace: 'fetch("https://abrunails.onrender.com/api/appointments"),\n        fetch("https://abrunails.onrender.com/api/clients"),\n        fetch("https://abrunails.onrender.com/api/services")' },
    { search: 'fetch("https://abrunails.onrender.com", {', replace: 'fetch("https://abrunails.onrender.com/api/appointments", {' }
  ],
  'src/components/dashboard/AddonManager.tsx': [
    { search: 'fetch("https://abrunails.onrender.com")', replace: 'fetch("https://abrunails.onrender.com/api/addons")' },
    { search: 'fetch(`https://abrunails.onrender.com${id}`', replace: 'fetch(`https://abrunails.onrender.com/api/addons/${id}`' },
    { search: '`https://abrunails.onrender.com${editingAddon.id}`', replace: '`https://abrunails.onrender.com/api/addons/${editingAddon.id}`' },
  ]
};

// Apply special logic for Booking.tsx, CatalogManager.tsx, etc.
for (const [file, reps] of Object.entries(replacements)) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const r of reps) {
      // replace all instances
      content = content.split(r.search).join(r.replace);
    }
    fs.writeFileSync(filePath, content);
  }
}

// Booking.tsx specific (since there are multiple identical generic fetch("https...") strings)
const bookingPath = path.join(__dirname, 'src/pages/Booking.tsx');
let bContent = fs.readFileSync(bookingPath, 'utf8');
bContent = bContent.replace('fetch("https://abrunails.onrender.com/api/addons"),', 'fetch("https://abrunails.onrender.com/api/services"),');
// the 2nd one is addons (which is already replaced above potentially, let's just do regex)
bContent = bContent.replace(/fetch\("https:\/\/abrunails\.onrender\.com"\)/g, 'fetch("https://abrunails.onrender.com")'); 
fs.writeFileSync(bookingPath, bContent);

// SettingsManager
const settingsPath = path.join(__dirname, 'src/components/dashboard/SettingsManager.tsx');
let sContent = fs.readFileSync(settingsPath, 'utf8');
sContent = sContent.replace(/fetch\("https:\/\/abrunails\.onrender\.com"\)/g, 'fetch("https://abrunails.onrender.com/api/settings")');
sContent = sContent.replace(/fetch\("https:\/\/abrunails\.onrender\.com\/api\/settings\/api\/settings"/g, 'fetch("https://abrunails.onrender.com/api/settings"');
fs.writeFileSync(settingsPath, sContent);

// ClientManager
const clientPath = path.join(__dirname, 'src/components/dashboard/ClientManager.tsx');
let cContent = fs.readFileSync(clientPath, 'utf8');
cContent = cContent.replace(/\"https:\/\/abrunails\.onrender\.com\"/g, '"https://abrunails.onrender.com/api/clients"');
cContent = cContent.replace(/\"https:\/\/abrunails\.onrender\.com\/api\/clients\/api\/clients\"/g, '"https://abrunails.onrender.com/api/clients"');
fs.writeFileSync(clientPath, cContent);

// CategoryManager
const catPath = path.join(__dirname, 'src/components/dashboard/CategoryManager.tsx');
let catContent = fs.readFileSync(catPath, 'utf8');
catContent = catContent.replace(/\"https:\/\/abrunails\.onrender\.com\"/g, '"https://abrunails.onrender.com/api/categories"');
catContent = catContent.replace(/\"https:\/\/abrunails\.onrender\.com\/api\/categories\/api\/categories\"/g, '"https://abrunails.onrender.com/api/categories"');
fs.writeFileSync(catPath, catContent);

// CatalogManager (has /api/categories and /api/services)
const catalogPath = path.join(__dirname, 'src/components/dashboard/CatalogManager.tsx');
let catalogContent = fs.readFileSync(catalogPath, 'utf8');
// restore fetchCategories manually
catalogContent = catalogContent.replace(
  'const fetchCategories = async () => {\n    try {\n      const response = await fetch("https://abrunails.onrender.com/api/categories");',
  'const fetchCategories = async () => {\n    try {\n      const response = await fetch("https://abrunails.onrender.com/api/categories");'
);
// replace other generic ones
catalogContent = catalogContent.replace(
  'const fetchServices = async () => {\n    try {\n      const response = await fetch("https://abrunails.onrender.com/api/categories");',
  'const fetchServices = async () => {\n    try {\n      const response = await fetch("https://abrunails.onrender.com/api/services");'
);
catalogContent = catalogContent.replace(/\"https:\/\/abrunails\.onrender\.com\"/g, '"https://abrunails.onrender.com/api/services"');
fs.writeFileSync(catalogPath, catalogContent);

// AddonManager
const addPath = path.join(__dirname, 'src/components/dashboard/AddonManager.tsx');
let addContent = fs.readFileSync(addPath, 'utf8');
addContent = addContent.replace(/\"https:\/\/abrunails\.onrender\.com\"/g, '"https://abrunails.onrender.com/api/addons"');
addContent = addContent.replace(/\"https:\/\/abrunails\.onrender\.com\/api\/addons\/api\/addons\"/g, '"https://abrunails.onrender.com/api/addons"');
fs.writeFileSync(addPath, addContent);
