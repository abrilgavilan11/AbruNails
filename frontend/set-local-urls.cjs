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
    if (content.includes('https://abrunails.onrender.com')) {
      const newContent = content.replaceAll('https://abrunails.onrender.com', 'http://localhost:3000');
      fs.writeFileSync(filePath, newContent);
      console.log('Updated: ' + filePath);
    }
  }
});
console.log('URLs actualizadas a localhost:3000');
