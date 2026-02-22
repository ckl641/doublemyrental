/**
 * DMR Cold Email Sender using Resend API
 * Usage: node send-cold-email.js [--dry-run]
 * Reads from enriched-leads.json, sends personalized emails, logs results
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 're_SSr5dGeE_J7eeVR13QT6kN4JhZFSboPcV';
const FROM = 'Chi Ta <chi@bundlelive.com>'; // Will switch to DMR domain once verified
const DRY_RUN = process.argv.includes('--dry-run');
const LEADS_FILE = path.join(__dirname, 'enriched-leads.json');
const LOG_FILE = path.join(__dirname, `email-log-${new Date().toISOString().split('T')[0]}.md`);

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(LOG_FILE, line);
  console.log(msg);
}

function generateEmail(lead) {
  const firstName = lead.name.split(' ').pop(); // Use last name for Dr.
  const city = lead.location ? lead.location.split(',')[0] : 'your area';
  
  const subjects = [
    `Dr. ${firstName}, quick question about your tax strategy`,
    `How physicians in ${city} are saving $100K+ in taxes legally`,
    `The tax loophole most ${lead.specialty || 'physicians'} don't know about`,
  ];
  
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  
  const html = `
<p>Hi Dr. ${firstName},</p>

<p>I'll keep this brief — I know your time is valuable.</p>

<p>A ${lead.specialty || 'physician'} I work with in ${city} was paying over $300K/year in federal + state taxes. Last year, he legally reduced that by <strong>$127K</strong> using a specific real estate strategy.</p>

<p>The short version:</p>
<ul>
  <li>Purchase a short-term rental property (we find it, you put 10% down)</li>
  <li>Cost segregation study accelerates $70K+ in Year 1 depreciation</li>
  <li>Property cash flows $3,400/month on Airbnb (we manage everything)</li>
  <li>Tax savings alone pay for the down payment within ~12 months</li>
</ul>

<p>We handle everything — finding the property, renovation, design, furnishing, and 24/7 Airbnb management. You own it and collect checks.</p>

<p><strong>Quick math on a recent deal:</strong></p>
<ul>
  <li>$650K property → $81K total cash in</li>
  <li>$40,900/year net cash flow (50.5% cash-on-cash return)</li>
  <li>$28K Year 1 tax savings</li>
  <li>$52K appreciation</li>
  <li><strong>149% all-in Year 1 ROI</strong></li>
</ul>

<p>We guarantee a minimum 15% yield — or we manage the property for free.</p>

<p>If you're curious, I can run the numbers for your specific tax situation in a 15-minute call. No pitch — just math.</p>

<p><a href="https://doublemyrental.vercel.app/qualify.html">Book a quick strategy call here →</a></p>

<p>Best,<br>
Chi Ta<br>
Double My Rental<br>
<em>Forbes Featured | $100M+ AUM | 16 States</em></p>

<p style="font-size:11px;color:#999;margin-top:24px;">If this isn't relevant, just reply STOP and I won't email again.</p>
`;

  return { subject, html };
}

function sendEmail(to, subject, html) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      from: FROM,
      to: [to],
      subject,
      html,
    });

    const req = https.request({
      hostname: 'api.resend.com',
      path: '/emails',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(d) }); }
        catch { resolve({ status: res.statusCode, data: d }); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  log(`\n=== DMR Cold Email Run — ${new Date().toLocaleString()} ===`);
  log(DRY_RUN ? '🔵 DRY RUN MODE' : '🔴 LIVE MODE');
  
  let leads;
  try {
    leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
  } catch {
    log('❌ No enriched-leads.json found. Create it first with email addresses.');
    return;
  }

  const toSend = leads.filter(l => l.email && !l.sent);
  log(`📧 ${toSend.length} leads to email (${leads.length} total, ${leads.filter(l=>l.sent).length} already sent)`);

  let sent = 0;
  for (const lead of toSend) {
    const { subject, html } = generateEmail(lead);
    
    if (DRY_RUN) {
      log(`[DRY] Would email ${lead.email}: "${subject}"`);
      sent++;
      continue;
    }

    const result = await sendEmail(lead.email, subject, html);
    if (result.status === 200) {
      log(`✅ Sent to ${lead.email}: "${subject}"`);
      lead.sent = true;
      lead.sentAt = new Date().toISOString();
      sent++;
    } else {
      log(`❌ Failed ${lead.email}: ${JSON.stringify(result.data)}`);
    }
    
    // Save after each send (resume-safe)
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    
    // 3s delay between emails
    await new Promise(r => setTimeout(r, 3000));
  }

  log(`\n📊 Done: ${sent} emails sent`);
}

main().catch(e => log(`Fatal: ${e.message}`));
