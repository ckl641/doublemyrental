const https = require('https');
const fs = require('fs');
const path = require('path');

const folderUrl = 'https://drive.google.com/drive/folders/1ZUwB7S33YMjUEFiiVM8FUMjtp-aLOkm7?usp=sharing';

function fetch(url) {
  return new Promise((resolve, reject) => {
    const doReq = (u) => {
      const mod = u.startsWith('https') ? https : require('http');
      mod.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return doReq(res.headers.location);
        }
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => resolve(d));
      }).on('error', reject);
    };
    doReq(url);
  });
}

function downloadFile(fileId, filename) {
  const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
  return new Promise((resolve, reject) => {
    const doReq = (u) => {
      https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return doReq(res.headers.location);
        }
        const ws = fs.createWriteStream(path.join(__dirname, filename));
        res.pipe(ws);
        ws.on('finish', () => { ws.close(); resolve(filename); });
      }).on('error', reject);
    };
    doReq(url);
  });
}

async function main() {
  const html = await fetch(folderUrl);
  
  // Extract file info from the Drive folder page
  const idPattern = /\["([A-Za-z0-9_-]{20,})"/g;
  const allIds = new Set();
  let m;
  while ((m = idPattern.exec(html)) !== null) {
    if (m[1].length > 25 && m[1].length < 50) allIds.add(m[1]);
  }
  
  // Also try data-id pattern
  const dataIdPattern = /data-id="([^"]+)"/g;
  while ((m = dataIdPattern.exec(html)) !== null) {
    allIds.add(m[1]);
  }

  // file/d/ pattern
  const fileDPattern = /\/file\/d\/([A-Za-z0-9_-]+)/g;
  while ((m = fileDPattern.exec(html)) !== null) {
    allIds.add(m[1]);
  }

  console.log('Found potential file IDs:', [...allIds]);
  
  // Try to find filenames
  const namePattern = /"([^"]*\.(png|jpg|jpeg|webp|heic))"/gi;
  const names = [];
  while ((m = namePattern.exec(html)) !== null) {
    names.push(m[1]);
  }
  console.log('Found filenames:', names);

  // Download each
  const ids = [...allIds];
  for (let i = 0; i < ids.length; i++) {
    const fname = names[i] || `photo_${i+1}.jpg`;
    console.log(`Downloading ${ids[i]} as ${fname}...`);
    try {
      await downloadFile(ids[i], fname);
      console.log(`  Done: ${fname}`);
    } catch(e) {
      console.log(`  Error: ${e.message}`);
    }
  }
}

main().catch(console.error);
