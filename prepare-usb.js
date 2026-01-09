
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slides = [
    { id: 1, url: "/hero-funeral.jpg" },
    { id: 2, url: "/service-decor.png" },
    { id: 3, url: "/lincoln.jpg" },
    { id: 4, url: "/horses.png" },
    { id: 5, url: "/emperor-pecan.jpg" },
    { id: 6, url: "/Nguni-Brown-White-Closed.jpg" },
    { id: 7, url: "/service-catering.png" },
    { id: 8, url: "/raised-halfview-walnut.png" },
    { id: 9, url: "/unveiling.png" },
    { id: 10, url: "/about-img.jpg" }
];

const publicDir = path.join(__dirname, 'public');
const outputDir = path.join(__dirname, 'USB_READY_IMAGES');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

console.log('Preparing images for USB...');

slides.forEach((slide, index) => {
    // Remove leading slash
    const filename = slide.url.substring(1);
    const sourcePath = path.join(publicDir, filename);

    // Create numbered filename: 01_filename.jpg
    const ext = path.extname(filename);
    const newFilename = `${String(index + 1).padStart(2, '0')}_${path.basename(filename, ext)}${ext}`;
    const destPath = path.join(outputDir, newFilename);

    try {
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`✓ Copied: ${newFilename}`);
        } else {
            console.error(`X Missing: ${filename}`);
        }
    } catch (err) {
        console.error(`Error processing ${filename}:`, err);
    }
});

console.log('\nDone! Images are in the "USB_READY_IMAGES" folder.');
console.log('You can copy this folder to your USB drive.');
