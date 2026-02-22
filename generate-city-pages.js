/**
 * Generate city-specific landing pages for DMR
 * Each page targets "[city] airbnb investment" keywords
 */
const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.join(__dirname, 'cities', 'scottsdale.html'), 'utf8');
const outDir = path.join(__dirname, 'cities');

const cities = [
  { slug: 'nashville', name: 'Nashville', state: 'TN', adr: '$295', occ: '68%', why: 'Nashville\'s booming tourism (16M+ visitors/year), bachelorette capital of the US, and year-round events (CMA Fest, NFL games, Broadway) make it one of the highest-demand STR markets. STR-friendly regulations in Davidson County suburbs.' },
  { slug: 'joshua-tree', name: 'Joshua Tree', state: 'CA', adr: '$320', occ: '62%', why: 'Joshua Tree\'s unique desert landscape draws 3M+ visitors annually to the national park. Limited hotel supply means Airbnb dominates. Properties with hot tubs, stargazing decks, and unique architecture command premium rates year-round.' },
  { slug: 'gulf-shores', name: 'Gulf Shores', state: 'AL', adr: '$275', occ: '71%', why: 'Gulf Shores and Orange Beach offer white sand beaches at a fraction of Florida prices. Low property taxes, no state income tax, and strong seasonal demand from March-October create excellent yields for STR investors.' },
  { slug: 'gatlinburg', name: 'Gatlinburg', state: 'TN', adr: '$250', occ: '74%', why: 'Adjacent to Great Smoky Mountains National Park (12.5M visitors/year — most visited national park in the US). Year-round demand, cabin-style properties with mountain views, and STR-friendly local regulations make Gatlinburg a top investment market.' },
  { slug: 'kissimmee', name: 'Kissimmee', state: 'FL', adr: '$225', occ: '76%', why: 'Minutes from Disney World, Universal Studios, and SeaWorld. Kissimmee is the #1 STR market in Florida by volume. Large resort-style homes with pools, game rooms, and themed rooms command premium nightly rates from family travelers year-round.' },
  { slug: 'big-bear', name: 'Big Bear Lake', state: 'CA', adr: '$340', occ: '58%', why: 'Southern California\'s mountain escape draws visitors year-round — skiing in winter, lake activities in summer. Just 2 hours from LA, strong weekend demand, and limited inventory create high nightly rates for well-designed cabins.' },
  { slug: 'destin', name: 'Destin', state: 'FL', adr: '$310', occ: '69%', why: 'Known as the "World\'s Luckiest Fishing Village," Destin draws millions of beach tourists annually. Strong seasonal demand March-September with emerald coast beaches, deep sea fishing, and family attractions.' },
  { slug: 'sedona', name: 'Sedona', state: 'AZ', adr: '$350', occ: '65%', why: 'Sedona\'s red rock landscapes, wellness tourism, and year-round mild weather make it a premium STR market. High-end travelers willing to pay $400-600/night for unique properties with views and hot tubs.' },
];

for (const city of cities) {
  let page = template
    .replace(/Scottsdale, Arizona/g, `${city.name}, ${city.state}`)
    .replace(/Scottsdale/g, city.name)
    .replace(/scottsdale/g, city.slug)
    .replace(/\$385/g, city.adr)
    .replace(/72%/g, city.occ)
    .replace(/Year-round events.*?high yields\./s, city.why)
    .replace(/in the Scottsdale area/g, `in the ${city.name} area`);
  
  const outFile = path.join(outDir, `${city.slug}.html`);
  fs.writeFileSync(outFile, page);
  console.log(`✅ ${city.name} → ${city.slug}.html`);
}

console.log(`\nGenerated ${cities.length} city pages in ${outDir}`);
