/**
 * Generate city-specific landing pages for DMR SEO.
 * Uses Scottsdale as template, swaps in city-specific data.
 * Run: node generate-cities.js
 */
const fs = require('fs');
const path = require('path');

const cities = [
  {
    slug: 'nashville',
    name: 'Nashville, TN',
    heroImg: 'https://images.unsplash.com/photo-1545419913-775e3e0e5fc0?w=1600',
    tagline: 'Music City meets money. Nashville STRs deliver premium returns with year-round tourism, bachelorette parties, and major events driving consistent demand.',
    adr: '$295', occupancy: '74%', annualRev: '$89K', coc: '38%+',
    dealPrice: '$550,000', downPmt: '$55,000', designCost: '$12,000', totalCash: '$67,000',
    annualRevDeal: '$105,000', annualExp: '$73,000', netCash: '$32,000/yr', cocDeal: '47.8%', taxSavings: '$60,000+',
    reasons: [
      { icon: '🎵', title: 'Event capital.', desc: 'CMA Fest, NFL games, bachelorette parties, honky tonks — Nashville draws 16M+ visitors annually. Peak weekends hit $1,500-3,000/night.' },
      { icon: '📈', title: 'Rapid appreciation.', desc: 'Nashville home values have grown 80%+ in 5 years. Your STR builds equity while cash flowing.' },
      { icon: '🏗️', title: 'Supply constraints.', desc: 'Davidson County has permit requirements that limit new STR supply. Existing permitted properties hold premium value.' },
      { icon: '🎸', title: 'Themed properties dominate.', desc: 'Our Nashville properties feature music-themed game rooms, recording studios, and rooftop decks. 30%+ above market ADR.' },
    ]
  },
  {
    slug: 'gulf-shores',
    name: 'Gulf Shores, AL',
    heroImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600',
    tagline: 'Alabama\'s Gulf Coast is the Southeast\'s best-kept secret for STR investors. Lower property prices, high summer demand, and zero state income tax.',
    adr: '$265', occupancy: '68%', annualRev: '$78K', coc: '42%+',
    dealPrice: '$425,000', downPmt: '$42,500', designCost: '$10,000', totalCash: '$52,500',
    annualRevDeal: '$85,000', annualExp: '$56,000', netCash: '$29,000/yr', cocDeal: '55.2%', taxSavings: '$45,000+',
    reasons: [
      { icon: '🏖️', title: 'Peak summer cash machine.', desc: 'June-August ADR hits $400-600/night. One summer pays for half the year\'s expenses.' },
      { icon: '💵', title: 'Low entry point.', desc: 'Quality beachfront condos from $350K-$500K vs $800K+ in Destin or Panama City. Better math, better returns.' },
      { icon: '🦀', title: 'Zero state income tax.', desc: 'Alabama has no state income tax on rental income. More cash in your pocket.' },
      { icon: '🎆', title: 'Growing tourism.', desc: 'Hangout Music Fest, Shrimp Festival, and proximity to Pensacola/Mobile drive year-round bookings.' },
    ]
  },
  {
    slug: 'orlando',
    name: 'Orlando, FL',
    heroImg: 'https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?w=1600',
    tagline: 'The world\'s #1 tourist destination. 75M+ visitors per year, Disney, Universal, and a massive vacation rental market with proven demand.',
    adr: '$325', occupancy: '76%', annualRev: '$95K', coc: '35%+',
    dealPrice: '$600,000', downPmt: '$60,000', designCost: '$14,000', totalCash: '$74,000',
    annualRevDeal: '$120,000', annualExp: '$82,000', netCash: '$38,000/yr', cocDeal: '51.4%', taxSavings: '$65,000+',
    reasons: [
      { icon: '🏰', title: '75M+ annual visitors.', desc: 'Disney, Universal, SeaWorld, convention center — demand never stops. Families book 6-12 months in advance.' },
      { icon: '🏠', title: 'STR-friendly zones.', desc: 'Osceola County and unincorporated Orange County allow STRs. We know exactly which areas are legal and profitable.' },
      { icon: '🎮', title: 'Themed homes crush it.', desc: 'Game rooms, private pools, themed bedrooms — our Orlando properties book at $400-700/night vs $200 average.' },
      { icon: '📊', title: 'Year-round demand.', desc: 'No dead season. Spring break, summer, holidays, conventions — Orlando fills 365 days/year.' },
    ]
  },
  {
    slug: 'joshua-tree',
    name: 'Joshua Tree, CA',
    heroImg: 'https://images.unsplash.com/photo-1542223616-9de22d6a4aaa?w=1600',
    tagline: 'Desert luxury meets Instagram. Joshua Tree properties command premium ADR with unique architecture and weekend warriors from LA.',
    adr: '$350', occupancy: '65%', annualRev: '$83K', coc: '40%+',
    dealPrice: '$480,000', downPmt: '$48,000', designCost: '$15,000', totalCash: '$63,000',
    annualRevDeal: '$95,000', annualExp: '$62,000', netCash: '$33,000/yr', cocDeal: '52.4%', taxSavings: '$52,000+',
    reasons: [
      { icon: '🏜️', title: 'Instagram drives bookings.', desc: 'Joshua Tree is the most-searched STR destination on social media. Unique properties go viral and book months out.' },
      { icon: '💎', title: 'Premium ADR.', desc: 'A-frames, domes, and luxury desert homes command $400-800/night. Design matters more here than anywhere.' },
      { icon: '🚗', title: '2 hours from 18M people.', desc: 'LA, San Diego, Palm Springs — the guest pool is enormous. Weekend warriors drive consistent Thursday-Sunday bookings.' },
      { icon: '⛰️', title: 'National Park demand.', desc: '3M+ annual park visitors need places to stay. Joshua Tree town has limited inventory = pricing power.' },
    ]
  },
  {
    slug: 'poconos',
    name: 'Poconos, PA',
    heroImg: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1600',
    tagline: 'The Northeast\'s playground. 2 hours from NYC and Philly, Poconos cabins generate incredible winter holiday revenue and year-round weekend bookings.',
    adr: '$310', occupancy: '70%', annualRev: '$79K', coc: '45%+',
    dealPrice: '$380,000', downPmt: '$38,000', designCost: '$12,000', totalCash: '$50,000',
    annualRevDeal: '$90,000', annualExp: '$58,000', netCash: '$32,000/yr', cocDeal: '64.0%', taxSavings: '$42,000+',
    reasons: [
      { icon: '🎿', title: 'Holiday cash machine.', desc: 'Chi Ta\'s Poconos cabin made $15K in 10 days during Christmas 2021. Thanksgiving, NYE, and ski season = premium pricing.' },
      { icon: '🏙️', title: '2 hours from 30M people.', desc: 'NYC, Philly, North Jersey — the largest urban corridor in America feeds Poconos bookings year-round.' },
      { icon: '💰', title: 'Low entry, high returns.', desc: 'Cabins from $300K-$500K with 60%+ CoC returns. Some of the best math in the country.' },
      { icon: '🎮', title: 'Game rooms differentiate.', desc: 'Our Poconos properties feature glow-in-the-dark arcades, hot tubs, and indoor pools. Families pay premium for entertainment.' },
    ]
  },
];

const template = fs.readFileSync(path.join(__dirname, 'scottsdale.html'), 'utf8');

for (const city of cities) {
  let html = template;
  
  // Replace city-specific content
  html = html.replace(/Scottsdale, AZ/g, city.name);
  html = html.replace(/Scottsdale/g, city.name.split(',')[0]);
  html = html.replace(/scottsdale/g, city.slug);
  html = html.replace(/photo-1558618666-fcd25c85f82e\?w=1600/g, city.heroImg.split('photo-')[1] || city.heroImg);
  html = html.replace(/One of America's top short-term rental markets[^<]+/g, city.tagline);
  
  // Replace stats
  html = html.replace(/\$385/g, city.adr);
  html = html.replace(/72%/g, city.occupancy);
  html = html.replace(/\$101K/g, city.annualRev);
  html = html.replace(/35%\+<\/div><div class="label">Cash-on-Cash Return/g, city.coc + '</div><div class="label">Cash-on-Cash Return');
  
  // Replace deal numbers
  html = html.replace(/\$750,000/g, city.dealPrice);
  html = html.replace(/\$75,000/g, city.downPmt);
  html = html.replace(/\$16,000/g, city.designCost);
  html = html.replace(/\$91,000/g, city.totalCash);
  html = html.replace(/\$140,000/g, city.annualRevDeal);
  html = html.replace(/\$97,000/g, city.annualExp);
  html = html.replace(/\$43,000\/yr/g, city.netCash);
  html = html.replace(/47\.3%/g, city.cocDeal);
  html = html.replace(/\$80,000\+/g, city.taxSavings);
  
  // Replace reasons (rebuild the list)
  const reasonsHtml = city.reasons.map(r => 
    `<li><span class="icon">${r.icon}</span><span><strong>${r.title}</strong> ${r.desc}</span></li>`
  ).join('\n    ');
  html = html.replace(/<li><span class="icon">🏌️[\s\S]*?<\/ul>/g, reasonsHtml + '\n  </ul>');
  
  // Replace schema
  html = html.replace(/"name": "Scottsdale"/g, `"name": "${city.name.split(',')[0]}"`);
  html = html.replace(/"addressRegion": "AZ"/g, `"addressRegion": "${city.name.split(', ')[1]}"`);

  const outPath = path.join(__dirname, `${city.slug}.html`);
  fs.writeFileSync(outPath, html);
  console.log(`✅ ${city.slug}.html`);
}

console.log(`\nGenerated ${cities.length} city pages.`);
