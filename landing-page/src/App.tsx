import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./components/ui/AnimatedSection";
import { PhotoPlaceholder } from "./components/ui/PhotoPlaceholder";
import {
  Search, BarChart3, Home, Paintbrush, Hammer, Settings,
  ChevronDown, Star, Shield, TrendingUp, Clock, CheckCircle2,
  XCircle, Phone, ArrowRight, Zap, Target, Users, Calendar
} from "lucide-react";

const CTA_URL = "https://calendly.com/chitabnb/60min";

function CTAButton({ className = "", size = "lg" }: { className?: string; size?: "lg" | "md" }) {
  const sizeClasses = size === "lg"
    ? "px-10 py-5 text-lg"
    : "px-8 py-4 text-base";
  return (
    <motion.a
      href={CTA_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(201,168,76,0.3)" }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center gap-3 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-navy-900 font-body font-bold rounded tracking-wide uppercase ${sizeClasses} ${className}`}
    >
      Book Your Free Strategy Call
      <ArrowRight className="w-5 h-5" />
    </motion.a>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-px bg-gold/60" />
      <span className="text-gold text-xs font-body font-semibold tracking-[0.3em] uppercase">{children}</span>
      <div className="w-8 h-px bg-gold/60" />
    </div>
  );
}

function Divider() {
  return <div className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent my-4" />;
}

/* ========== NAVBAR ========== */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { label: "Why Airbnb", href: "#problem" },
    { label: "Results", href: "#numbers" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "FAQ", href: "#faq" },
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["problem", "numbers", "how-it-works", "case-studies", "faq"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-navy-900/80 backdrop-blur-xl border-b border-gold/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-display text-xl font-bold text-gold tracking-wide">
          DOUBLE MY RENTAL
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm font-body font-medium transition-colors ${
                activeSection === link.href.replace("#", "")
                  ? "text-gold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-navy-900 text-sm font-body font-bold rounded hover:opacity-90 transition-opacity ml-2"
          >
            <Phone className="w-4 h-4" />
            Book a Call
          </a>
        </div>

        {/* Mobile: CTA + hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-navy-900 text-xs font-body font-bold rounded"
          >
            <Phone className="w-3.5 h-3.5" />
            Book a Call
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gold p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-navy-900/95 backdrop-blur-xl border-t border-gold/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-left text-base font-body font-medium py-2 transition-colors ${
                    activeSection === link.href.replace("#", "")
                      ? "text-gold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ========== 1. HERO ========== */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-800" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionLabel>Premium Airbnb Investment Advisory</SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-8"
          >
            Stop Paying the IRS $100K+.{" "}
            <span className="text-gradient-gold">Start Building Wealth</span>{" "}
            Through Airbnb.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-400 font-body leading-relaxed mb-10 max-w-xl"
          >
            We find, acquire, design, and manage high-yield Airbnb properties that eliminate your tax bill through 100% bonus depreciation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <CTAButton />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* PHOTO NEEDED: Chi Ta in professional setting — suit or business casual, confident pose, luxury property in background */}
          <PhotoPlaceholder
            description="Chi Ta in professional setting — suit or business casual, confident pose, luxury property in background"
            aspectRatio="4/5"
            className="max-w-md mx-auto lg:max-w-none"
          />
        </motion.div>
      </div>

      {/* Trust Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 bg-navy-800/60 backdrop-blur border-t border-gold/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-body">
          {[
            { icon: <Star className="w-4 h-4 text-gold fill-gold" />, text: "4.95 ★ Rating" },
            { icon: <Clock className="w-4 h-4 text-gold" />, text: "20+ Years Experience" },
            { icon: <TrendingUp className="w-4 h-4 text-gold" />, text: "$2.4M/yr Revenue" },
            { icon: <Shield className="w-4 h-4 text-gold" />, text: "3-Month Waitlist" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-300">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ========== 2. THE PROBLEM ========== */
function Problem() {
  return (
    <section id="problem" className="py-24 md:py-32 bg-navy-900 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,168,76,0.05)_0%,_transparent_60%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            You Made $600K Last Year.{" "}
            <span className="text-gradient-gold">The IRS Took $180K.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-body">
            What If There Was a Better Way?
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-8 h-full">
              <div className="text-red-400 text-sm font-body font-semibold tracking-widest uppercase mb-4">Without Us</div>
              <h3 className="font-display text-2xl font-bold text-red-300 mb-6">Paying the IRS</h3>
              <ul className="space-y-4 text-gray-400 font-body">
                <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" /> $150K–$200K+ in annual taxes</li>
                <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" /> No asset appreciation</li>
                <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" /> Zero passive income generated</li>
                <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" /> Money gone forever — no ROI</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-8 h-full">
              <div className="text-gold text-sm font-body font-semibold tracking-widest uppercase mb-4">With Us</div>
              <h3 className="font-display text-2xl font-bold text-gold mb-6">Investing in Airbnb</h3>
              <ul className="space-y-4 text-gray-300 font-body">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gold mt-0.5 shrink-0" /> Eliminate $100K+ in taxes legally</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gold mt-0.5 shrink-0" /> Own a real, appreciating asset</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gold mt-0.5 shrink-0" /> $15K–$24K/month passive income</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gold mt-0.5 shrink-0" /> 100% bonus depreciation + cost seg</li>
              </ul>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.3} className="mt-12 max-w-3xl mx-auto">
          {/* PHOTO NEEDED: Split image — left: tax forms/stress, right: beautiful Airbnb property */}
          <PhotoPlaceholder
            description="Split image — left side: tax forms/stress imagery, right side: beautiful luxury Airbnb property interior"
            aspectRatio="21/9"
          />
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ========== 3. THE SOLUTION ========== */
function Solution() {
  const services = [
    { icon: <Search className="w-7 h-7" />, title: "Find", desc: "Source off-market & undervalued properties" },
    { icon: <BarChart3 className="w-7 h-7" />, title: "Analyze", desc: "Data-driven revenue & ROI projections" },
    { icon: <Home className="w-7 h-7" />, title: "Acquire", desc: "Negotiate & close the best deals" },
    { icon: <Paintbrush className="w-7 h-7" />, title: "Design", desc: "Create 1-of-1 guest experiences" },
    { icon: <Hammer className="w-7 h-7" />, title: "Remodel", desc: "Full renovation management" },
    { icon: <Settings className="w-7 h-7" />, title: "Manage", desc: "Ongoing operations & optimization" },
  ];

  return (
    <section className="py-24 md:py-32 bg-navy-800 relative">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>The Solution</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            We Handle Everything.{" "}
            <span className="text-gradient-gold">You Build Wealth.</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {services.map((s, i) => (
            <StaggerItem key={i}>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors">
                  {s.icon}
                </div>
                <h3 className="font-display text-lg font-bold mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500 font-body">{s.desc}</p>
                {i < services.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2">
                    <ArrowRight className="w-4 h-4 text-gold/30" />
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection className="max-w-4xl mx-auto">
          {/* PHOTO NEEDED: Stunning interior of one of Chi Ta's Airbnb properties — glow-in-the-dark game room or resort-style amenity */}
          <PhotoPlaceholder
            description="Stunning interior of Chi Ta's Airbnb property — glow-in-the-dark game room or resort-style amenity with wow factor"
            aspectRatio="16/9"
          />
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ========== 4. BY THE NUMBERS ========== */
function ByTheNumbers() {
  const stats = [
    { value: "$2.4M/yr", label: "Revenue in 9 Months", detail: "From a standing start to multi-million dollar portfolio" },
    { value: "$24K", label: "One Month from a $650K Home", detail: "During peak event season at $3-4K/night" },
    { value: "$15K", label: "In 10 Days — Poconos Cabin", detail: "A $310K property that pays for itself" },
    { value: "4/500", label: "Homes Qualify", detail: "Our standards are extremely high — only the best deals" },
  ];

  return (
    <section id="numbers" className="py-24 md:py-32 bg-navy-900 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_70%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>By The Numbers</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Real Results. <span className="text-gradient-gold">Real Properties.</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((s, i) => (
            <StaggerItem key={i}>
              <div className="text-center p-6 rounded-xl bg-navy-800/50 border border-gold/10 hover:border-gold/30 transition-colors">
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold mb-3">{s.value}</div>
                <div className="font-body font-semibold text-white mb-2">{s.label}</div>
                <p className="text-sm text-gray-500 font-body">{s.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection className="max-w-4xl mx-auto">
          {/* PHOTO NEEDED: Exterior of a luxury Airbnb property — Chi Ta's best-looking one */}
          <PhotoPlaceholder
            description="Exterior shot of Chi Ta's best luxury Airbnb property — impressive curb appeal, well-lit, twilight/golden hour"
            aspectRatio="16/9"
          />
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ========== 4b. WEALTH FORECAST ========== */
function WealthForecast() {
  const purchasePrice = 650000;
  const downPayment = 65000;
  const setupCosts = 16000; // game room + contractors
  const totalCashIn = downPayment + setupCosts; // $81K
  const annualCashFlow = 40900;
  const appreciationRate = 0.08;

  // Cost Segregation
  const costSegBasis = purchasePrice * 0.30; // 30% of purchase price
  const costSegWriteOff = costSegBasis * 0.37; // 37% tax write-off
  
  // Build year-by-year data
  const years = [];
  let cumulativeWealth = 0;
  let propertyValue = purchasePrice;

  for (let y = 1; y <= 5; y++) {
    const appreciation = propertyValue * appreciationRate;
    propertyValue += appreciation;
    const taxSavings = y === 1 ? costSegWriteOff : 0;
    const yearTotal = annualCashFlow + taxSavings + appreciation;
    cumulativeWealth += yearTotal;
    years.push({
      year: y,
      cashFlow: annualCashFlow,
      taxSavings,
      appreciation: Math.round(appreciation),
      yearTotal: Math.round(yearTotal),
      cumulative: Math.round(cumulativeWealth),
      propertyValue: Math.round(propertyValue),
    });
  }

  const year3 = years[2];
  const year5 = years[4];

  const fmt = (n: number) => "$" + n.toLocaleString();

  return (
    <section className="py-24 md:py-32 bg-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(201,168,76,0.06)_0%,_transparent_70%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>Wealth Forecast</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            See Your Money <span className="text-gradient-gold">Compound.</span>
          </h2>
          <p className="text-lg text-gray-400 font-body max-w-2xl mx-auto">
            Real numbers on a $650K property with cost segregation — the same tax strategy used by the ultra-wealthy.
          </p>
        </AnimatedSection>

        {/* Cost Seg Explainer */}
        <AnimatedSection delay={0.1}>
          <div className="bg-gold/5 border border-gold/20 rounded-xl p-6 md:p-8 mb-12 max-w-4xl mx-auto">
            <h3 className="font-display text-xl md:text-2xl font-bold text-gold mb-4 text-center">
              How Cost Segregation Works
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-sm text-gray-400 font-body mb-1">Purchase Price</div>
                <div className="font-display text-2xl font-bold text-white">{fmt(purchasePrice)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 font-body mb-1">Cost Seg Basis (30%)</div>
                <div className="font-display text-2xl font-bold text-white">{fmt(costSegBasis)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 font-body mb-1">Year 1 Tax Savings (37%)</div>
                <div className="font-display text-2xl font-bold text-gradient-gold">{fmt(Math.round(costSegWriteOff))}</div>
              </div>
            </div>
            <p className="text-sm text-gray-500 font-body text-center mt-4">
              Cost segregation accelerates depreciation on qualifying property components — legally reducing your tax bill by tens of thousands in Year 1.
            </p>
          </div>
        </AnimatedSection>

        {/* 3 & 5 Year Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <AnimatedSection delay={0.2}>
            <div className="bg-navy-900/60 border border-gold/20 rounded-xl p-6 md:p-8 h-full">
              <div className="text-gold text-xs font-body font-semibold tracking-widest uppercase mb-4">3-Year Forecast</div>
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold mb-2">{fmt(year3.cumulative)}</div>
              <div className="text-sm text-gray-400 font-body mb-6">Total wealth generated on {fmt(totalCashIn)} invested</div>
              
              <div className="space-y-3">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-gray-400">Cumulative Cash Flow</span>
                  <span className="text-white font-semibold">{fmt(annualCashFlow * 3)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-gray-400">Year 1 Tax Savings (Cost Seg)</span>
                  <span className="text-white font-semibold">{fmt(Math.round(costSegWriteOff))}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-gray-400">Property Appreciation</span>
                  <span className="text-white font-semibold">{fmt(years[2].propertyValue - purchasePrice)}</span>
                </div>
                <div className="w-full h-px bg-gold/20 my-2" />
                <div className="flex justify-between font-body text-sm">
                  <span className="text-gray-400">Property Value</span>
                  <span className="text-gold font-bold">{fmt(years[2].propertyValue)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-gray-400">ROI on Cash Invested</span>
                  <span className="text-gold font-bold">{Math.round((year3.cumulative / totalCashIn) * 100)}%</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="bg-navy-900/60 border-2 border-gold/40 rounded-xl p-6 md:p-8 h-full relative">
              <div className="absolute -top-3 right-6 bg-gold text-navy-900 text-xs font-body font-bold px-3 py-1 rounded-full">RECOMMENDED</div>
              <div className="text-gold text-xs font-body font-semibold tracking-widest uppercase mb-4">5-Year Forecast</div>
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold mb-2">{fmt(year5.cumulative)}</div>
              <div className="text-sm text-gray-400 font-body mb-6">Total wealth generated on {fmt(totalCashIn)} invested</div>
              
              <div className="space-y-3">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-gray-400">Cumulative Cash Flow</span>
                  <span className="text-white font-semibold">{fmt(annualCashFlow * 5)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-gray-400">Year 1 Tax Savings (Cost Seg)</span>
                  <span className="text-white font-semibold">{fmt(Math.round(costSegWriteOff))}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-gray-400">Property Appreciation</span>
                  <span className="text-white font-semibold">{fmt(years[4].propertyValue - purchasePrice)}</span>
                </div>
                <div className="w-full h-px bg-gold/20 my-2" />
                <div className="flex justify-between font-body text-sm">
                  <span className="text-gray-400">Property Value</span>
                  <span className="text-gold font-bold">{fmt(years[4].propertyValue)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-gray-400">ROI on Cash Invested</span>
                  <span className="text-gold font-bold">{Math.round((year5.cumulative / totalCashIn) * 100)}%</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Year-by-Year Breakdown Table */}
        <AnimatedSection delay={0.4}>
          <div className="bg-navy-900/40 border border-gold/10 rounded-xl overflow-hidden max-w-4xl mx-auto">
            <div className="p-4 md:p-6 border-b border-gold/10">
              <h3 className="font-display text-lg font-bold text-center">Year-by-Year Breakdown</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="text-gray-500 border-b border-gold/10">
                    <th className="px-4 py-3 text-left">Year</th>
                    <th className="px-4 py-3 text-right">Cash Flow</th>
                    <th className="px-4 py-3 text-right">Tax Savings</th>
                    <th className="px-4 py-3 text-right">Appreciation</th>
                    <th className="px-4 py-3 text-right font-bold text-gold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {years.map((y) => (
                    <tr key={y.year} className="border-b border-gold/5 hover:bg-gold/5 transition-colors">
                      <td className="px-4 py-3 text-white font-semibold">Year {y.year}</td>
                      <td className="px-4 py-3 text-right text-gray-300">{fmt(y.cashFlow)}</td>
                      <td className="px-4 py-3 text-right text-gray-300">{y.taxSavings > 0 ? fmt(y.taxSavings) : "—"}</td>
                      <td className="px-4 py-3 text-right text-gray-300">{fmt(y.appreciation)}</td>
                      <td className="px-4 py-3 text-right text-gold font-bold">{fmt(y.yearTotal)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gold/5">
                    <td className="px-4 py-3 text-gold font-bold">5-Year Total</td>
                    <td className="px-4 py-3 text-right text-white font-bold">{fmt(annualCashFlow * 5)}</td>
                    <td className="px-4 py-3 text-right text-white font-bold">{fmt(Math.round(costSegWriteOff))}</td>
                    <td className="px-4 py-3 text-right text-white font-bold">{fmt(years[4].propertyValue - purchasePrice)}</td>
                    <td className="px-4 py-3 text-right text-gold font-bold text-lg">{fmt(year5.cumulative)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.5} className="text-center mt-10">
          <p className="text-gray-500 font-body text-sm mb-6">
            Based on $650K property, 10% down, 8% annual appreciation, $130K/yr gross revenue. Cost segregation: 30% of purchase price eligible, 37% write-off rate. Individual results may vary.
          </p>
          <CTAButton size="md" />
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ========== 5. PROPRIETARY APP ========== */
function ProprietaryApp() {
  return (
    <section className="py-24 md:py-32 bg-navy-800 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <SectionLabel>Our Edge</SectionLabel>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-8">
              Our Technology Scans{" "}
              <span className="text-gradient-gold">300–500 Homes Per Day.</span>{" "}
              Only 4 Qualify.
            </h2>
            <div className="space-y-6 font-body text-gray-400">
              <p className="text-lg leading-relaxed">
                While others rely on gut feeling, we built a proprietary analysis engine that evaluates hundreds of properties daily across revenue potential, location data, comparable performance, and regulatory factors.
              </p>
              <p className="text-lg leading-relaxed">
                Our algorithm filters for the top 0.8% of properties — the ones that will generate outsized returns and maximize your tax benefits through cost segregation.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: <Zap className="w-5 h-5" />, text: "Real-time market data" },
                  { icon: <Target className="w-5 h-5" />, text: "Revenue projections" },
                  { icon: <BarChart3 className="w-5 h-5" />, text: "Comp analysis" },
                  { icon: <Shield className="w-5 h-5" />, text: "Regulatory screening" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gold/80">
                    {item.icon}
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            {/* PHOTO NEEDED: Screenshot of Chi Ta's property analysis app/dashboard */}
            <PhotoPlaceholder
              description="Screenshot of Chi Ta's proprietary property analysis app/dashboard — showing data, charts, property scores, map view"
              aspectRatio="4/3"
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ========== 6. CASE STUDIES ========== */
function CaseStudies() {
  const cases = [
    {
      title: "The Event Powerhouse",
      location: "Metro Area, $650K Purchase",
      revenue: "$24K/month",
      highlight: "$3–4K/night during events",
      description: "A strategically located property near major event venues. During peak events, this home commands $3,000–$4,000 per night. In its first full month, it generated $24,000 in revenue.",
      photoDesc: "Luxury property exterior — the $650K home that generates $24K/month, event-area location",
    },
    {
      title: "The Poconos Cash Machine",
      location: "Poconos, PA — $310K Purchase",
      revenue: "$15K in 10 days",
      highlight: "Paid for itself in months",
      description: "A mountain cabin in the Poconos that we found, renovated, and listed. Within its first 10 days on Airbnb, it generated $15,000 in bookings — proving the power of the right property in the right market.",
      photoDesc: "Poconos mountain cabin exterior — cozy, upscale, surrounded by nature, the $310K property",
    },
    {
      title: "The Portfolio Client",
      location: "Multi-State — $30M Budget",
      revenue: "60-Home Portfolio",
      highlight: "Full-service at scale",
      description: "A high-net-worth client who started with one property, saw the returns, and committed to building a 60-home portfolio with a $30 million budget. We manage the entire operation end-to-end.",
      photoDesc: "Aerial or collage view showing multiple luxury properties — representing the 60-home, $30M portfolio",
    },
  ];

  return (
    <section id="case-studies" className="py-24 md:py-32 bg-navy-900 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>Case Studies</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Deals That <span className="text-gradient-gold">Speak for Themselves</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="bg-navy-800/50 border border-gold/10 rounded-xl overflow-hidden hover:border-gold/30 transition-all duration-300 h-full flex flex-col">
                {/* PHOTO NEEDED for each case study */}
                <PhotoPlaceholder description={c.photoDesc} aspectRatio="16/10" className="rounded-none" />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-gold text-xs font-body font-semibold tracking-widest uppercase mb-2">{c.location}</div>
                  <h3 className="font-display text-xl font-bold mb-2">{c.title}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-display font-bold text-gradient-gold">{c.revenue}</span>
                    <span className="text-xs text-gray-500 font-body">· {c.highlight}</span>
                  </div>
                  <p className="text-sm text-gray-400 font-body leading-relaxed flex-1">{c.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========== 7. THE EXPERIENCE ========== */
function Experience() {
  const photos = [
    "Glow-in-the-dark game room with neon lighting, arcade machines, immersive entertainment",
    "Resort-style pool area with lounge chairs, tropical landscaping, twilight lighting",
    "Luxury master bedroom with premium bedding, designer furniture, ambient lighting",
    "Unique themed amenity — hot tub, outdoor fire pit, or cinema room",
    "Outdoor entertaining space — deck, BBQ area, mountain or city view",
    "Themed room — kids' room, sports theme, or unique Instagram-worthy design element",
  ];

  return (
    <section className="py-24 md:py-32 bg-navy-800 relative">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>The Experience</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Not Just Rentals.{" "}
            <span className="text-gradient-gold">1-of-1 Experiences.</span>
          </h2>
          <p className="text-lg text-gray-400 font-body max-w-2xl mx-auto">
            Every property is designed to create unforgettable stays that command premium nightly rates and 5-star reviews.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((desc, i) => (
            <StaggerItem key={i}>
              {/* PHOTOS NEEDED: Property amenity showcase */}
              <PhotoPlaceholder
                description={desc}
                aspectRatio={i === 0 || i === 5 ? "4/5" : "4/3"}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ========== 8. HOW IT WORKS ========== */
function HowItWorks() {
  const steps = [
    { num: "01", icon: <Calendar className="w-6 h-6" />, title: "Book a Call", desc: "Schedule a free 60-minute strategy session. We'll review your financial situation and goals." },
    { num: "02", icon: <BarChart3 className="w-6 h-6" />, title: "We Analyze Your Tax Situation", desc: "Our team works with your CPA to structure the optimal tax elimination strategy." },
    { num: "03", icon: <Search className="w-6 h-6" />, title: "We Find Your Property", desc: "Our app scans hundreds of properties daily. We present only the top 0.8% that meet our criteria." },
    { num: "04", icon: <Settings className="w-6 h-6" />, title: "We Handle Everything", desc: "Acquisition, renovation, design, furnishing, listing, and ongoing management. You collect checks." },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-navy-900 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Four Steps to <span className="text-gradient-gold">Tax-Free Wealth</span>
          </h2>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="flex gap-6 md:gap-10 mb-12 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gold/10 border-2 border-gold/40 flex items-center justify-center text-gold shrink-0">
                    {step.icon}
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-gold/30 to-transparent mt-2" />}
                </div>
                <div className="pb-8">
                  <div className="text-gold text-xs font-body font-bold tracking-widest mb-1">STEP {step.num}</div>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 font-body leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <CTAButton size="md" />
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ========== 9. WHO THIS IS FOR ========== */
function WhoThisIsFor() {
  const forYou = [
    "Earning $500K+ and tired of writing massive tax checks",
    "Paying $100K+ in annual taxes with no strategy to reduce it",
    "Want passive income without becoming a landlord",
    "Interested in real estate but don't have time to manage it",
    "Want 100% bonus depreciation before the window closes",
  ];
  const notForYou = [
    "Looking for a DIY Airbnb course or YouTube tips",
    "Not ready to invest $40K+ in a proven system",
    "Want overnight results with zero patience",
    "Comfortable paying the IRS 30-40% of your income forever",
    "Looking for the cheapest option, not the best ROI",
  ];

  return (
    <section className="py-24 md:py-32 bg-navy-800 relative">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>Is This Right For You?</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Built for <span className="text-gradient-gold">High Earners</span> Who Want More
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection delay={0.1}>
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-8">
              <h3 className="font-display text-2xl font-bold text-gold mb-6">This Is For You If…</h3>
              <ul className="space-y-4">
                {forYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-navy-900/50 border border-gray-700/30 rounded-xl p-8">
              <h3 className="font-display text-2xl font-bold text-gray-500 mb-6">This Is NOT For You If…</h3>
              <ul className="space-y-4">
                {notForYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-gray-500">
                    <XCircle className="w-5 h-5 text-gray-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ========== 10. THE INVESTMENT ========== */
function Investment() {
  return (
    <section className="py-24 md:py-32 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>The Investment</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            Stop Losing Money to Taxes.{" "}
            <span className="text-gradient-gold">Start Investing It.</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-navy-800/80 border border-gold/20 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center mb-10">
              <div>
                <div className="text-red-400 text-sm font-body font-semibold tracking-widest uppercase mb-2">Your Tax Bill</div>
                <div className="font-display text-4xl md:text-5xl font-bold text-red-400">$150K+</div>
                <p className="text-sm text-gray-500 font-body mt-2">Gone. Every single year.</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-gold">
                  <ArrowRight className="w-10 h-10 hidden md:block" />
                  <ChevronDown className="w-10 h-10 md:hidden" />
                </div>
              </div>
              <div>
                <div className="text-gold text-sm font-body font-semibold tracking-widest uppercase mb-2">Your Investment</div>
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">$40K</div>
                <p className="text-sm text-gray-500 font-body mt-2">One time. Builds forever.</p>
              </div>
            </div>

            <Divider />

            <div className="text-center mt-8">
              <h3 className="font-display text-xl md:text-2xl font-bold mb-3">What You Get</h3>
              <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-400 font-body mb-8">
                <div className="p-4 bg-navy-900/50 rounded-lg border border-gold/10">
                  <TrendingUp className="w-6 h-6 text-gold mx-auto mb-2" />
                  Cash-flowing Airbnb property
                </div>
                <div className="p-4 bg-navy-900/50 rounded-lg border border-gold/10">
                  <Home className="w-6 h-6 text-gold mx-auto mb-2" />
                  Real equity & appreciation
                </div>
                <div className="p-4 bg-navy-900/50 rounded-lg border border-gold/10">
                  <Shield className="w-6 h-6 text-gold mx-auto mb-2" />
                  100% tax elimination
                </div>
              </div>

              <p className="text-lg text-gray-300 font-body italic mb-8">
                "Most clients don't ask <em>if</em> it works. They ask{" "}
                <span className="text-gold font-semibold">'When can we get another property?'</span>"
              </p>

              <CTAButton size="md" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ========== 11. FAQ ========== */
function FAQ() {
  const faqs = [
    { q: "Is this legal?", a: "Absolutely. 100% bonus depreciation and cost segregation are established provisions of the U.S. tax code, specifically designed to incentivize real estate investment. We work with CPAs and tax attorneys to ensure everything is fully compliant." },
    { q: "What kind of ROI can I expect?", a: "Our properties typically generate $15,000–$24,000+ per month in gross revenue. Combined with the tax savings from bonus depreciation (often $100K+ in year one), many clients see a full return on their investment within the first year." },
    { q: "What if the short-term rental market crashes?", a: "We mitigate this through rigorous property selection — only 4 out of every 500 properties we analyze qualify. We focus on properties with strong fundamentals: great locations, unique amenities, and the ability to perform in multiple market conditions." },
    { q: "How long until I see returns?", a: "Most properties are acquired, renovated, and listed within 90-120 days. Many clients see their first significant booking revenue within the first 30 days of listing. Tax benefits are realized in the same tax year as acquisition." },
    { q: "Do I need to be involved in managing the property?", a: "No. We handle everything end-to-end: acquisition, renovation, furnishing, listing optimization, guest communication, cleaning, maintenance, and ongoing revenue optimization. You're truly passive." },
    { q: "What's the minimum investment required?", a: "Beyond our service fee, you'll need capital for the property acquisition itself (typically $300K–$700K range depending on the market). Many clients leverage financing. We help structure the optimal approach for your situation." },
    { q: "Why is there a 3-month waitlist?", a: "We intentionally limit our client intake to 5-10 new clients per month to maintain our quality standards. Every property gets our full attention — from analysis through ongoing management. We don't scale at the expense of results." },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 bg-navy-800 relative scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Questions? <span className="text-gradient-gold">Answers.</span>
          </h2>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div className="border border-gold/10 rounded-lg overflow-hidden hover:border-gold/20 transition-colors">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-body font-semibold text-white pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-5 h-5 text-gold shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-5 pb-5 text-gray-400 font-body leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========== 12. SOCIAL PROOF ========== */
function SocialProof() {
  const testimonials = [
    { quote: "Chi Ta found us a property that generated $18K in its first month. The tax savings alone paid for the entire service fee.", name: "Dr. Sarah M.", role: "Orthopedic Surgeon", },
    { quote: "I was skeptical at first, but after seeing the numbers on our first property, we immediately started on a second. Now we have four.", name: "James & Linda K.", role: "Tech Executives", },
    { quote: "The level of service is unmatched. From acquisition to management, I haven't had to lift a finger. This is truly passive income.", name: "Michael R.", role: "Attorney, Partner", },
    { quote: "We eliminated over $120K in taxes in year one. My CPA couldn't believe it until he saw the cost segregation study.", name: "Dr. David L.", role: "Dentist, Practice Owner", },
  ];

  return (
    <section className="py-24 md:py-32 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>Social Proof</SectionLabel>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-gold fill-gold" />
            ))}
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-2">
            <span className="text-gradient-gold">4.95</span> Star Rating
          </h2>
          <p className="text-gray-400 font-body">From clients who've transformed their financial future</p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <div className="bg-navy-800/50 border border-gold/10 rounded-xl p-8 h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-gray-300 font-body leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  {/* PHOTO NEEDED: Client testimonial headshot */}
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-gold/50" />
                  </div>
                  <div>
                    <div className="font-body font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-gold/60 font-body">{t.role}</div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection className="mt-12">
          {/* PHOTO NEEDED: Client testimonial headshots or property photos with quotes overlay */}
          <PhotoPlaceholder
            description="Collage of client testimonial headshots or property photos with review quotes — social proof banner"
            aspectRatio="21/6"
          />
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ========== 13. FINAL CTA ========== */
function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.1)_0%,_transparent_60%)]" />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <SectionLabel>Take Action</SectionLabel>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-6">
              Your Next Tax Bill Is Coming.{" "}
              <span className="text-gradient-gold">Let's Make Sure You Never Overpay Again.</span>
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 font-body text-gray-400">
                <div className="w-2 h-2 rounded-full bg-gold" />
                Only 5–10 new clients accepted per month
              </div>
              <div className="flex items-center gap-3 font-body text-gray-400">
                <div className="w-2 h-2 rounded-full bg-gold" />
                Currently a 3-month waitlist
              </div>
              <div className="flex items-center gap-3 font-body text-gray-400">
                <div className="w-2 h-2 rounded-full bg-gold" />
                Free 60-minute strategy call — no obligation
              </div>
            </div>
            <CTAButton />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            {/* PHOTO NEEDED: Chi Ta standing in front of a luxury property — aspirational, confident */}
            <PhotoPlaceholder
              description="Chi Ta standing in front of a luxury Airbnb property — aspirational pose, confident, property visible behind, golden hour lighting"
              aspectRatio="4/5"
              className="max-w-md mx-auto"
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ========== FOOTER ========== */
function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-gold/10 py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="font-display text-xl font-bold text-gold tracking-wide mb-4">DOUBLE MY RENTAL</div>
        <p className="text-sm text-gray-500 font-body mb-6">
          Premium Airbnb investment advisory for high-income professionals.
        </p>
        <p className="text-xs text-gray-600 font-body">
          © {new Date().getFullYear()} Double My Rental. All rights reserved. This is not financial or tax advice. Consult your CPA and attorney.
        </p>
      </div>
    </footer>
  );
}

/* ========== MAIN APP ========== */
export default function App() {
  return (
    <div className="min-h-screen bg-navy-900">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <ByTheNumbers />
      <WealthForecast />
      <ProprietaryApp />
      <CaseStudies />
      <Experience />
      <HowItWorks />
      <WhoThisIsFor />
      <Investment />
      <FAQ />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </div>
  );
}
