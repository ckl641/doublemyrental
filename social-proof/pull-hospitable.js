// Pull per-property revenue from Hospitable API
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLmhvc3BpdGFibGUuY29tL3YxL2F1dGgvZGV2aWNlL2NvZGUiLCJpYXQiOjE3NzE4MTU0MTMsImV4cCI6MTc3NDIzMzUzMywibmJmIjoxNzcxODE1NDEzLCJqdGkiOiJlMFFMS2lub2hGalpjNmNNIiwic3ViIjoiMTAxNjM0IiwicHJ2IjoiMjE1MzFjYTY5ZDJiNDQyYTAzOTA5OGFmNGMyMThjMjY3OTBhNGFmZCIsIm5hbWUiOiJDaGkgVGEiLCJ0ZWFtX2lkIjoxMDE2MzR9.RtGp2kA9CrUcGxWm_mV0Q1p8_4_IUVjY73XH3_-0yow";

async function main() {
  const headers = { Authorization: `Bearer ${TOKEN}`, Accept: "application/json" };
  
  // Get all properties
  const propRes = await fetch("https://api.hospitable.com/v1/properties", { headers });
  const props = (await propRes.json()).data;
  console.log(`Found ${props.length} properties`);
  
  // For each property, get the dashboard filtered to just that property
  // Use the overview dashboard with property filter
  const dashId = "1f9f7980-9f21-4508-b31d-e5d8b7343ef0";
  
  const results = [];
  for (const prop of props) {
    try {
      const filterBody = {
        filters: {
          property: { value: [prop.id] },
          date: { column: "check_in", from: "2025-01-01", to: "2026-12-31", strategy: "custom" },
          breakdown_by_period: { value: "none" },
          group_by: { value: "none" }
        }
      };
      
      const res = await fetch(`https://api.hospitable.com/v1/dashboards/${dashId}/widgets`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(filterBody)
      });
      
      if (res.ok) {
        const data = await res.json();
        // Find net_revenue widget
        const nrWidget = data.data?.find(w => w.key === "net_revenue" || w.title?.includes("Net Revenue"));
        if (nrWidget) {
          results.push({ id: prop.id, name: prop.name, revenue: nrWidget.value || nrWidget.data });
          console.log(`${prop.name}: ${JSON.stringify(nrWidget.value || nrWidget.data)}`);
        } else {
          console.log(`${prop.name}: no net_revenue widget found`);
        }
      } else {
        console.log(`${prop.name}: HTTP ${res.status}`);
      }
    } catch (e) {
      console.log(`${prop.name}: Error - ${e.message}`);
    }
    // Rate limit
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log("\n=== RESULTS ===");
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
