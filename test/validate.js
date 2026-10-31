const fs = require('fs');
const path = require('path');

console.log('Running Meme Masters validation checks...');

// 1. Verify primary files exist
const criticalFiles = [
  'index.html',
  'challenge.html',
  'css/style.css',
  'js/app.js',
  'js/audio.js',
  'vercel.json',
  'favicon.svg',
  'assets/audio/nocopyright-meme.mp3',
  'assets/audio/mic_test.mpeg'
];

criticalFiles.forEach((file) => {
  const fullPath = path.join(__dirname, '..', file);
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing critical file: ${file}`);
    process.exit(1);
  }
});

console.log('All critical files exist.');

// 2. Verify all 14 default meme images exist
for (let i = 1; i <= 14; i++) {
  const ext = i === 1 ? 'png' : 'jpeg';
  const imgPath = path.join(__dirname, '..', 'assets', 'images', `meme_image${i}.${ext}`);
  if (!fs.existsSync(imgPath)) {
    console.error(`Missing meme image: assets/images/meme_image${i}.${ext}`);
    process.exit(1);
  }
}

console.log('All 14 default meme images verified.');
console.log('Validation passed successfully!');

