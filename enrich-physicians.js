/**
 * Physician Lead Enrichment — scrapes practice websites for email addresses
 * Reads from airbnb-lead-engine/leads/2026-02-19-all-physicians.json
 * Outputs to doublemyrental/enriched-leads.json
 * Usage: node enrich-physicians.js [--limit 20]
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const LEADS_FILE = path.join(__dirname, '..', 'airbnb-lead-engine', 'leads', '2026-02-19-all-physicians.json');
const OUTPUT_FILE = path.join(__dirname, 'enriched-leads.json');
const LOG_FILE = path.join(__dirname, `enrich-log-${new Date().toISOString().split('T')[0]}.md`);

const limitArg = process.argv.find(a => a.startsWith('--limit'));
const LIMIT = limitArg ? parseInt(process.argv[process.argv.indexOf(limitArg) + 1]) : 20;

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(LOG_FILE, line);
  console.log(msg);
}

function fetchPage(url, timeout = 8000) {
  return new Promise((resolve) => {
    const proto = url.startsWith('https') ? https : http;
    const timer = setTimeout(() => resolve(''), timeout);
    try {
      proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          clearTimeout(timer);
          fetchPage(res.headers.location, timeout).then(resolve);
          return;
        }
        let d = '';
        res.on('data', c => { d += c; if (d.length > 500000) res.destroy(); });
        res.on('end', () => { clearTimeout(timer); resolve(d); });
        res.on('error', () => { clearTimeout(timer); resolve(''); });
      }).on('error', () => { clearTimeout(timer); resolve(''); });
    } catch { clearTimeout(timer); resolve(''); }
  });
}

function extractEmails(html) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = html.match(emailRegex) || [];
  // Filter out common junk
  return [...new Set(matches)].filter(e => 
    !e.includes('example.com') && 
    !e.includes('sentry') && 
    !e.includes('webpack') &&
    !e.includes('.png') &&
    !e.includes('.jpg') &&
    !e.endsWith('.svg') &&
    !e.includes('wixpress') &&
    !e.includes('schema.org') &&
    e.length < 60
  );
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function enrichFromGoogle(name, location) {
  // Search for "[doctor name] [location] email contact"
  const query = encodeURIComponent(`${name} ${location} email contact`);
  const url = `https://www.google.com/search?q=${query}`;
  // Can't reliably scrape Google, so we'll use the profile_url from Healthgrades
  return [];
}

async function main() {
  log(`\n=== Physician Enrichment Run ===`);
  
  const leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
  let existing = [];
  try { existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8')); } catch {}
  
  const enrichedNames = new Set(existing.filter(l => l.email).map(l => l.name));
  const toEnrich = leads.filter(l => !enrichedNames.has(l.name)).slice(0, LIMIT);
  
  log(`${toEnrich.length} leads to enrich (limit: ${LIMIT})`);
  
  let found = 0;
  for (const lead of toEnrich) {
    log(`🔍 ${lead.name} (${lead.specialty}, ${lead.location})`);
    
    // Try Healthgrades profile first
    if (lead.profile_url) {
      const html = await fetchPage(lead.profile_url);
      const emails = extractEmails(html);
      if (emails.length > 0) {
        lead.email = emails[0];
        lead.emailSource = 'healthgrades';
        log(`  ✅ Found: ${emails[0]}`);
        found++;
        existing.push(lead);
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(existing, null, 2));
        await sleep(2000);
        continue;
      }
    }
    
    // Try to find practice website via name search
    // Extract last name for a more targeted search
    const nameParts = lead.name.replace('Dr. ', '').split(' ');
    const lastName = nameParts[nameParts.length - 1];
    const searchTerms = [`dr ${nameParts.join(' ')} ${lead.location} contact`];
    
    // For now, just add without email — we'll manually enrich the highest-value ones
    lead.email = '';
    lead.emailSource = 'not_found';
    existing.push(lead);
    
    log(`  ❌ No email found`);
    await sleep(1500);
  }
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(existing, null, 2));
  log(`\n📊 Done: ${found}/${toEnrich.length} emails found`);
  log(`Total enriched leads: ${existing.length} (${existing.filter(l=>l.email).length} with emails)`);
}

main().catch(e => log(`Fatal: ${e.message}`));
