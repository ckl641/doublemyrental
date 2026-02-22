const script = `Hey — if you're watching this, you've got a strategy call coming up with me. I'm Chi Ta.

I wanted to give you a quick heads-up on what to expect so we can make the most of our time together.

Quick background — I've been in real estate about 20 years. I manage over 100 million dollars in short-term rental properties across 16 states. Forbes wrote about my story. And I went from completely broke in 2017 to building one of the most profitable Airbnb portfolios in the country.

But here's what actually matters to you: almost every single client I work with buys a second property. Not because I'm a good salesman — because the numbers speak for themselves.

On our call, I'm going to ask you a few questions. What's your annual income? How much are you currently paying in taxes? Do you have capital available for a down payment? What's your timeline?

No wrong answers. I just need to understand your situation so I can tell you honestly whether this makes sense for you.

Then I'll walk you through the math on a real deal. Not hypotheticals — a real property, real numbers, real returns. Usually something like a 650 thousand dollar home that generates 130 thousand a year in revenue with a 50 percent cash-on-cash return.

Here's what most people don't realize until the call: the biggest win isn't the cash flow. It's the tax savings.

Most of my clients are earning 500 thousand or more. They're writing massive checks to the IRS. With bonus depreciation and cost segregation, we can offset 50 to 150 thousand dollars in taxes — in year one. That alone pays for my entire fee.

So come prepared with your questions. Be honest about your numbers. And I'll be honest about whether this is the right fit.

If it's not, I'll tell you. If it is — I'll show you exactly what we'd build together.

See you on the call.`;

async function createVideo() {
  const resp = await fetch('https://api.heygen.com/v2/video/generate', {
    method: 'POST',
    headers: {
      'X-Api-Key': 'sk_V2_hgu_kXY677LySK7_8edNxVbtW9ClwHsuBt35OFSOIlvSfkMv',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      video_inputs: [{
        character: {
          type: 'talking_photo',
          talking_photo_id: '2411df8bdb0d40b088aa453d4c2a2d20'
        },
        voice: {
          type: 'text',
          input_text: script,
          voice_id: '1bd001e7e50f421d891986aed6828fbd',
          speed: 1.0
        }
      }],
      dimension: { width: 1920, height: 1080 }
    })
  });
  const data = await resp.json();
  console.log(JSON.stringify(data, null, 2));
  
  if (data.data && data.data.video_id) {
    console.log('\n✅ Video generation started! Video ID:', data.data.video_id);
    console.log('Polling for completion...');
    
    // Poll every 30s
    let done = false;
    while (!done) {
      await new Promise(r => setTimeout(r, 30000));
      const status = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${data.data.video_id}`, {
        headers: { 'X-Api-Key': 'sk_V2_hgu_kXY677LySK7_8edNxVbtW9ClwHsuBt35OFSOIlvSfkMv' }
      });
      const s = await status.json();
      console.log('Status:', s.data?.status || 'unknown');
      if (s.data?.status === 'completed') {
        console.log('🎬 VIDEO READY:', s.data.video_url);
        done = true;
      } else if (s.data?.status === 'failed') {
        console.log('❌ FAILED:', JSON.stringify(s.data));
        done = true;
      }
    }
  }
}
createVideo().catch(console.error);
