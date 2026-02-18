# DoubleMyRental.com — Landing Page

## Files
- `index.html` — Complete single-file landing page (inline CSS + JS, no dependencies)

## Deployment Options

### Option 1: Squarespace (Code Injection)
1. Go to **Settings → Advanced → Code Injection**
2. This won't work well for a full page replacement. Instead:
   - Create a new page, choose **Blank** layout
   - Add a **Code Block** (requires Business plan or higher)
   - Paste the entire contents of `index.html`
   - Disable the Squarespace header/footer for that page

### Option 2: Squarespace (Better — Custom CSS + Markdown)
Squarespace isn't ideal for fully custom HTML pages. Consider these alternatives:

### Option 3: Deploy to Netlify (Recommended — Free)
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop the `doublemyrental` folder onto the dashboard
3. Set custom domain: `doublemyrental.com`
4. Update DNS: point your domain's A record or CNAME to Netlify
5. SSL is automatic. Done.

### Option 4: Deploy to Vercel (Also Free)
1. Go to [vercel.com](https://vercel.com)
2. Import the folder or create a new project
3. Drop `index.html` in the root
4. Set custom domain in project settings

### Option 5: GitHub Pages (Free)
1. Create a repo, push `index.html`
2. Enable Pages in repo settings
3. Point `doublemyrental.com` via CNAME record

## DNS Setup (for any hosting)
Point `doublemyrental.com` to your host:
- **A Record**: Point to host's IP
- **CNAME**: `www` → your host's domain
- Most hosts provide specific instructions after you add the domain

## Customization
- **Calendly link**: Search for `calendly.com/chitabnb/60min` to change
- **Colors**: Edit CSS variables in `:root` at top of `<style>`
- **Content**: All text is inline HTML — edit directly
- **Email**: Update `chi@doublemyrental.com` in footer

## Tech Details
- Zero external dependencies (except Google Fonts)
- ~33KB total page size
- Mobile-first responsive
- Scroll animations via IntersectionObserver
- Works in all modern browsers
