const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const RECORDINGS_DIR = path.join(ROOT_DIR, 'recordings');
const TEST_RESULTS_DIR = path.join(ROOT_DIR, 'test-results');
const OUTPUT_DIR = path.join(ROOT_DIR, 'test-report');

function resetOutputDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function formatTimestamp(date) {
  const pad = num => String(num).padStart(2, '0');
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${hours}:${minutes}-${day}-${month}-${year}`;
}

function createArchive() {
  resetOutputDir(OUTPUT_DIR);
  ensureDir(RECORDINGS_DIR);
  ensureDir(TEST_RESULTS_DIR);

  const timestamp = formatTimestamp(new Date());
  const archiveName = `test-report-${timestamp}.zip`;
  const archivePath = path.join(OUTPUT_DIR, archiveName);

  console.log('🗜️  Creating test report archive...');
  console.log(`   📁 Recordings: ${RECORDINGS_DIR}`);
  console.log(`   📁 Test results: ${TEST_RESULTS_DIR}`);
  console.log(`   🎯 Output: ${archivePath}`);

  if (process.platform === 'win32') {
    const powershellCmd = [
      '-NoLogo',
      '-NoProfile',
      '-Command',
      `Compress-Archive -Path \"${RECORDINGS_DIR}\", \"${TEST_RESULTS_DIR}\" -DestinationPath \"${archivePath}\" -Force`
    ];

    const result = spawnSync('powershell', powershellCmd, { stdio: 'inherit' });
    if (result.status !== 0) {
      throw new Error('Failed to create archive via PowerShell Compress-Archive');
    }
  } else {
    const args = ['-r', archivePath, path.basename(RECORDINGS_DIR), path.basename(TEST_RESULTS_DIR)];
    const result = spawnSync('zip', args, { cwd: ROOT_DIR, stdio: 'inherit' });
    if (result.status !== 0) {
      throw new Error('zip command failed');
    }
  }

  console.log(`✅ Archive created: ${archivePath}`);
  return archivePath;
}

try {
  createArchive();
} catch (error) {
  console.error('❌ Failed to archive report:', error.message);
  process.exit(1);
}
