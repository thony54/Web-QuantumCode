import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirsToScan = [
  path.join(__dirname, 'public/assets/images'),
  path.join(__dirname, 'public/assets/brands')
];

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const fullPath = path.join(dir, file);
    
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const parsedPath = path.parse(fullPath);
      const newPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);
      
      try {
        await sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(newPath);
          
        console.log(`✅ Converted: ${file} -> ${path.basename(newPath)}`);
        
        // Delete original file
        fs.unlinkSync(fullPath);
        console.log(`🗑️ Deleted: ${file}`);
      } catch (err) {
        console.error(`❌ Failed to convert ${file}:`, err);
      }
    }
  }
}

async function run() {
  console.log('Starting image conversion...');
  for (const dir of dirsToScan) {
    await processDirectory(dir);
  }
  console.log('Done!');
}

run();
