import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting deployment process...');

// Check if dist folder exists, if not build the project
if (!existsSync(join(__dirname, 'dist'))) {
  console.log('📦 Building project...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed successfully');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Check if dist folder has content
const distPath = join(__dirname, 'dist');
if (!existsSync(join(distPath, 'index.html'))) {
  console.log('📦 Rebuilding project...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed successfully');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

console.log('✅ Deployment ready! Starting server...');

// Import and start the server
import('./server-static.js'); 