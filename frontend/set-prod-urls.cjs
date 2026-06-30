const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('http://localhost:3000')) {
      const newContent = content.replaceAll('http://localhost:3000', 'https://abrunails.onrender.com');
      fs.writeFileSync(filePath, newContent);
      console.log('Updated: ' + filePath);
    }
  }
});
console.log('URLs actualizadas a Producción (Render)');
