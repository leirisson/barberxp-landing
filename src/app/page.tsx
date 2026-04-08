"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Cormorant_Garamond, Syne } from "next/font/google";
import Link from "next/link";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

function useCounter(target: number, duration = 2000, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return value;
}

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
    title: "Agendamento Inteligente",
    desc: "Seus clientes agendam pelo app 24/7. Sem ligações, sem confusão. Agenda preenchida automaticamente.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Controle Financeiro",
    desc: "Receitas, despesas e comissões em tempo real. Saiba exatamente quanto cada barbeiro gera.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Gamificação de Clientes",
    desc: "Pontos, recompensas e desafios que fazem seus clientes voltarem mais rápido e com mais frequência.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Gestão de Equipe",
    desc: "Barbeiros, serviços, produtos e comissões — tudo organizado, tudo no seu controle.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Aumentei meu faturamento em 40% no primeiro mês. A visibilidade financeira mudou tudo.",
    name: "Marcus Thorne",
    shop: "The Golden Razor",
    initial: "M",
  },
  {
    quote: "A gamificação fez meus clientes voltarem muito mais rápido. Todo mundo quer ser o número 1.",
    name: "Ana Costa",
    shop: "BarberPro São Paulo",
    initial: "A",
  },
  {
    quote: "Finalmente consigo ver em tempo real quanto cada profissional está gerando. Indispensável.",
    name: "Pedro Silva",
    shop: "Studio Barber Premium",
    initial: "P",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "R$ 0",
    sub: "para sempre",
    highlight: false,
    features: [
      "Até 2 barbeiros",
      "100 agendamentos/mês",
      "Controle financeiro básico",
      "App para clientes",
      "Suporte por e-mail",
    ],
    cta: "Começar Grátis",
  },
  {
    name: "Basic",
    price: "R$ 97",
    sub: "por mês",
    highlight: true,
    badge: "Mais popular",
    features: [
      "Até 5 barbeiros",
      "Agendamentos ilimitados",
      "Controle financeiro completo",
      "Comissões automáticas",
      "Relatórios mensais",
      "Suporte prioritário",
    ],
    cta: "Assinar Basic",
  },
  {
    name: "Pro",
    price: "R$ 197",
    sub: "por mês",
    highlight: false,
    features: [
      "Barbeiros ilimitados",
      "Agendamentos ilimitados",
      "Gamificação completa",
      "Relatórios avançados",
      "Multi-unidade",
      "API & Integrações",
      "Suporte 24/7",
    ],
    cta: "Assinar Pro",
  },
];

const BANNER_MESSAGES = [
  { icon: "🔥", text: "Oferta por tempo limitado:", highlight: "30 dias grátis no plano Basic", cta: "Ativar agora" },
  { icon: "✦", text: "Sem taxa de setup.", highlight: "Cancele quando quiser.", cta: "Saiba mais" },
  { icon: "⚡", text: "Mais de 2.500 agendamentos realizados", highlight: "só este mês.", cta: "Ver planos" },
];

export default function LandingPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsOn, setStatsOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [bannerFading, setBannerFading] = useState(false);

  const schedCount = useCounter(2500, 2200, statsOn);
  const shopCount = useCounter(150, 1800, statsOn);
  const revCount = useCounter(12, 2000, statsOn);
  const satCount = useCounter(98, 1500, statsOn);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsOn(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rotate banner messages every 4 s with a fade transition
  useEffect(() => {
    if (!bannerVisible) return;
    const id = setInterval(() => {
      setBannerFading(true);
      setTimeout(() => {
        setBannerIdx((i) => (i + 1) % BANNER_MESSAGES.length);
        setBannerFading(false);
      }, 350);
    }, 4000);
    return () => clearInterval(id);
  }, [bannerVisible]);

  return (
    <div
      className={`${cormorant.variable} ${syne.variable}`}
      style={{
        fontFamily: "var(--font-syne), sans-serif",
        background: "#0F0F0F",
        color: "#FFFFFF",
        overflowX: "hidden",
      }}
    >
      <style>{`
        :root {
          --gold: #C89B3C;
          --gold-light: #F5D17E;
          --gold-dark: #AF8531;
          --charcoal: #0F0F0F;
          --surface: #1A1A1A;
          --surface2: #222222;
          --muted: #A1A1AA;
          --blue: #3B82F6;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* Grain overlay */
        .grain-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 220px 220px;
          animation: grain-shift 6s steps(8) infinite;
        }
        @keyframes grain-shift {
          0%   { transform: translate(0,0); }
          12%  { transform: translate(-3%,-5%); }
          25%  { transform: translate(5%,-2%); }
          37%  { transform: translate(-4%,6%); }
          50%  { transform: translate(3%,3%); }
          62%  { transform: translate(-6%,-3%); }
          75%  { transform: translate(4%,5%); }
          87%  { transform: translate(-2%,-6%); }
          100% { transform: translate(0,0); }
        }

        /* Dot pattern */
        .dot-pattern {
          background-color: #0F0F0F;
          background-image: radial-gradient(circle at 1px 1px, rgba(200,155,60,0.07) 1px, transparent 0);
          background-size: 32px 32px;
        }

        /* Gold text gradient */
        .gold-text {
          background: linear-gradient(135deg, #C89B3C 0%, #F5D17E 45%, #C89B3C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Shimmer animation on hero title */
        .gold-shimmer {
          background: linear-gradient(
            100deg,
            #C89B3C 0%,
            #C89B3C 30%,
            #F5D17E 50%,
            #C89B3C 70%,
            #C89B3C 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }

        /* Page entrance animations */
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .anim-fade-up   { animation: fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-fade-in   { animation: fade-in 1s ease both; }
        .anim-slide-right { animation: slide-right 0.7s cubic-bezier(0.22,1,0.36,1) both; }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }

        /* Gold rule */
        .gold-rule {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, #C89B3C 30%, #F5D17E 50%, #C89B3C 70%, transparent);
        }

        /* Nav */
        .nav-glass {
          background: rgba(15, 15, 15, 0);
          backdrop-filter: blur(0);
          border-bottom: 1px solid transparent;
          transition: all 0.4s ease;
        }
        .nav-glass.scrolled {
          background: rgba(15, 15, 15, 0.92);
          backdrop-filter: blur(20px);
          border-bottom-color: rgba(200,155,60,0.15);
        }

        /* Hero display font */
        .display-font { font-family: var(--font-cormorant), serif; }

        /* Feature card hover */
        .feature-card {
          background: rgba(26, 26, 26, 0.8);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 2rem;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.35s ease, box-shadow 0.35s ease;
          cursor: default;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          border-color: rgba(200,155,60,0.4);
          box-shadow: 0 20px 60px rgba(200,155,60,0.08);
        }

        /* Pricing card */
        .plan-card {
          border-radius: 20px;
          padding: 2.5rem 2rem;
          border: 1px solid rgba(255,255,255,0.07);
          background: #161616;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
        }
        .plan-card:hover {
          transform: translateY(-4px);
        }
        .plan-card.highlighted {
          background: #1A1A1A;
          border: 1.5px solid var(--gold);
          box-shadow: 0 0 40px rgba(200,155,60,0.15), 0 0 0 1px rgba(200,155,60,0.08);
          position: relative;
        }
        .plan-card.highlighted:hover {
          box-shadow: 0 0 60px rgba(200,155,60,0.22), 0 0 0 1px rgba(200,155,60,0.12);
        }

        /* Testimonial card */
        .testimonial-card {
          background: rgba(26,26,26,0.7);
          border: 1px solid rgba(200,155,60,0.12);
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease;
        }
        .testimonial-card::before {
          content: '"';
          font-family: var(--font-cormorant), serif;
          position: absolute;
          top: -8px;
          left: 20px;
          font-size: 8rem;
          line-height: 1;
          color: rgba(200,155,60,0.12);
          font-weight: 700;
          pointer-events: none;
        }
        .testimonial-card:hover {
          border-color: rgba(200,155,60,0.3);
        }

        /* Step connector */
        .step-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, var(--gold), rgba(200,155,60,0.2));
          margin: 0 1rem;
          margin-top: 28px;
        }

        /* CTA button */
        .btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #C89B3C, #F5D17E 50%, #C89B3C);
          background-size: 200% auto;
          color: #0F0F0F;
          font-family: var(--font-syne), sans-serif;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 0 2rem;
          height: 52px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: background-position 0.5s ease, transform 0.2s ease, box-shadow 0.3s ease;
          box-shadow: 0 8px 30px rgba(200,155,60,0.25);
          text-decoration: none;
        }
        .btn-gold:hover {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(200,155,60,0.35);
        }
        .btn-gold:active { transform: translateY(0); }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #C89B3C;
          font-family: var(--font-syne), sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 0 2rem;
          height: 52px;
          border-radius: 12px;
          border: 1.5px solid #C89B3C;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease;
          text-decoration: none;
        }
        .btn-outline:hover {
          background: rgba(200,155,60,0.1);
          transform: translateY(-2px);
        }

        /* Diagonal divider */
        .diagonal-top {
          clip-path: polygon(0 8%, 100% 0, 100% 100%, 0 100%);
          margin-top: -80px;
          padding-top: 100px;
        }

        /* Ticker */
        .ticker-wrap {
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent);
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 30s linear infinite;
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* Gold badge */
        .gold-badge {
          display: inline-block;
          background: linear-gradient(135deg, rgba(200,155,60,0.15), rgba(245,209,126,0.1));
          border: 1px solid rgba(200,155,60,0.35);
          color: var(--gold-light);
          font-family: var(--font-syne), sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 100px;
        }

        /* Check icon */
        .check-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.875rem;
          color: #D4D4D8;
          margin-bottom: 10px;
        }
        .check-item::before {
          content: '';
          display: inline-block;
          width: 18px;
          height: 18px;
          min-width: 18px;
          background: rgba(200,155,60,0.15);
          border: 1px solid rgba(200,155,60,0.4);
          border-radius: 50%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 14 14' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 7l3.5 3.5L12 3.5' stroke='%23C89B3C' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center;
          background-size: 12px 12px;
        }

        /* Scroll indicator */
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%       { transform: translateY(8px); opacity: 0.5; }
        }
        .scroll-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gold);
          animation: scroll-bounce 1.5s ease-in-out infinite;
        }

        /* Section label */
        .section-label {
          font-family: var(--font-syne), sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .section-label::before {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: var(--gold);
        }

        /* ── Banner ───────────────────────────────────────────────────── */
        @keyframes banner-in {
          from { transform: translateY(-110%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        @keyframes banner-out {
          from { transform: translateY(0);     opacity: 1; }
          to   { transform: translateY(-110%); opacity: 0; }
        }
        .banner-enter { animation: banner-in 0.55s cubic-bezier(0.34,1.46,0.64,1) both; }
        .banner-exit  { animation: banner-out 0.3s ease forwards; }

        /* Sweep light across the banner border */
        @keyframes border-sweep {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .banner-border-sweep::after {
          content: '';
          position: absolute;
          inset: auto 0 0 0;
          height: 1.5px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(200,155,60,0.1) 20%,
            rgba(245,209,126,0.9) 50%,
            rgba(200,155,60,0.1) 80%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: border-sweep 3s linear infinite;
        }

        /* Banner message fade */
        .banner-msg {
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .banner-msg.fading {
          opacity: 0;
          transform: translateY(6px);
        }

        /* ── CTA ping ring ────────────────────────────────────────────── */
        @keyframes ping-ring {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(1.55); opacity: 0;   }
          100% { transform: scale(1.55); opacity: 0;   }
        }
        .ping-wrapper {
          position: relative;
          display: inline-flex;
        }
        .ping-wrapper::before,
        .ping-wrapper::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 14px;
          border: 1.5px solid rgba(200,155,60,0.55);
          animation: ping-ring 2.4s cubic-bezier(0,0,0.2,1) infinite;
          pointer-events: none;
        }
        .ping-wrapper::after {
          animation-delay: 1.2s;
        }

        /* ── Hero glow breathe ────────────────────────────────────────── */
        @keyframes glow-breathe {
          0%, 100% { opacity: 0.45; transform: translate(-50%,-55%) scale(1);    }
          50%       { opacity: 0.9;  transform: translate(-50%,-55%) scale(1.12); }
        }
        .hero-glow {
          animation: glow-breathe 5s ease-in-out infinite;
        }

        /* ── Feature card icon pulse ──────────────────────────────────── */
        @keyframes icon-pulse {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(200,155,60,0)); }
          50%       { filter: drop-shadow(0 0 8px rgba(200,155,60,0.6)); }
        }
        .feature-card:hover .feature-icon {
          animation: icon-pulse 1.4s ease-in-out infinite;
        }

        /* ── Stat number count-up flash ──────────────────────────────── */
        @keyframes stat-flash {
          0%   { color: #F5D17E; }
          100% { color: inherit; }
        }

        /* WhatsApp button */
        .btn-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #25D366;
          color: #fff;
          font-family: var(--font-syne), sans-serif;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.04em;
          padding: 0 1.75rem;
          height: 52px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.3s ease, background 0.2s;
          box-shadow: 0 8px 30px rgba(37,211,102,0.28);
        }
        .btn-whatsapp:hover {
          background: #1ebe5d;
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(37,211,102,0.4);
        }
        .btn-whatsapp:active { transform: translateY(0); }

        /* Hero image frame */
        .hero-img-frame {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 4/5;
          box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(200,155,60,0.15);
        }
        .hero-img-frame img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 8s ease;
        }
        .hero-img-frame:hover img {
          transform: scale(1.04);
        }

        /* Floating stat card */
        @keyframes float-card {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        .float-card { animation: float-card 4s ease-in-out infinite; }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-img-col { display: none !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .plans-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .steps-row { flex-direction: column !important; }
          .step-line { display: none !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-ctas { flex-direction: column !important; align-items: stretch !important; }
          .hide-mobile { display: none !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

      {/* GRAIN OVERLAY */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* ── NAVIGATION ───────────────────────────────────────────────── */}
      <header
        className={`nav-glass fixed top-0 left-0 right-0 z-50 ${scrolled ? "scrolled" : ""}`}
        style={{ padding: "0 clamp(1.5rem, 5vw, 4rem)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #C89B3C, #F5D17E)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.2rem", color: "#0F0F0F",
            }}>B</div>
            <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "0.04em" }}>
              BARBER<span className="gold-text">XP</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            {["Funcionalidades", "Planos", "Como Funciona", "Depoimentos"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                style={{
                  color: "#A1A1AA", fontFamily: "var(--font-syne)", fontWeight: 500,
                  fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase",
                  textDecoration: "none", transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#C89B3C")}
                onMouseLeave={e => (e.currentTarget.style.color = "#A1A1AA")}
              >{l}</a>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link href="https://app.barberxp.com.br/auth/login" style={{ color: "#A1A1AA", textDecoration: "none", fontFamily: "var(--font-syne)", fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#A1A1AA")}
            >Entrar</Link>
            <Link href="https://app.barberxp.com.br/auth/login" className="btn-gold" style={{ height: 40, padding: "0 1.25rem", fontSize: "0.75rem", borderRadius: 10 }}>
              Começar Grátis
            </Link>
          </div>
        </div>
      </header>

      {/* ── ANNOUNCEMENT BANNER ─────────────────────────────────────── */}
      {bannerVisible && (
        <div
          className="banner-enter banner-border-sweep"
          style={{
            position: "fixed",
            top: 72,
            left: 0,
            right: 0,
            zIndex: 40,
            height: 44,
            background: "linear-gradient(90deg, #0F0F0F 0%, #1a1408 50%, #0F0F0F 100%)",
            borderTop: "1px solid rgba(200,155,60,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 1rem",
            overflow: "hidden",
          }}
        >
          {/* Left ambient glow */}
          <div aria-hidden="true" style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: 200,
            background: "linear-gradient(90deg, rgba(200,155,60,0.06), transparent)",
            pointerEvents: "none",
          }} />
          {/* Right ambient glow */}
          <div aria-hidden="true" style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: 200,
            background: "linear-gradient(270deg, rgba(200,155,60,0.06), transparent)",
            pointerEvents: "none",
          }} />

          {/* Message */}
          <div
            className={`banner-msg${bannerFading ? " fading" : ""}`}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", whiteSpace: "nowrap" }}
          >
            <span style={{ fontSize: "0.85rem" }}>{BANNER_MESSAGES[bannerIdx].icon}</span>
            <span style={{
              fontFamily: "var(--font-syne)", fontSize: "0.72rem",
              fontWeight: 500, letterSpacing: "0.04em", color: "#A1A1AA",
            }}>
              {BANNER_MESSAGES[bannerIdx].text}
            </span>
            <span style={{
              fontFamily: "var(--font-syne)", fontSize: "0.72rem",
              fontWeight: 700, letterSpacing: "0.04em", color: "#F5D17E",
            }}>
              {BANNER_MESSAGES[bannerIdx].highlight}
            </span>
            <Link
              href="https://app.barberxp.com.br/auth/login"
              style={{
                marginLeft: "0.5rem",
                fontFamily: "var(--font-syne)", fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
                color: "#0F0F0F",
                background: "linear-gradient(90deg, #C89B3C, #F5D17E)",
                padding: "3px 12px",
                borderRadius: 100,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              {BANNER_MESSAGES[bannerIdx].cta} →
            </Link>
          </div>

          {/* Dot indicator */}
          <div style={{ position: "absolute", right: "4rem", display: "flex", gap: 4, alignItems: "center" }}>
            {BANNER_MESSAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => { setBannerFading(true); setTimeout(() => { setBannerIdx(i); setBannerFading(false); }, 350); }}
                style={{
                  width: i === bannerIdx ? 16 : 4, height: 4,
                  borderRadius: 100, border: "none", cursor: "pointer", padding: 0,
                  background: i === bannerIdx ? "#C89B3C" : "rgba(200,155,60,0.25)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Close */}
          <button
            onClick={() => setBannerVisible(false)}
            style={{
              position: "absolute", right: "1rem",
              width: 24, height: 24, borderRadius: "50%",
              border: "1px solid rgba(200,155,60,0.2)",
              background: "transparent", cursor: "pointer", color: "#A1A1AA",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.7rem", lineHeight: 1, transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,155,60,0.15)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#A1A1AA"; }}
            aria-label="Fechar banner"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        className="dot-pattern"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: `${bannerVisible ? 164 : 120}px clamp(1.5rem, 5vw, 4rem) 80px`,
          position: "relative",
          transition: "padding-top 0.4s ease",
          overflow: "hidden",
        }}
      >
        {/* Breathing radial glow — positioned towards left */}
        <div aria-hidden="true" className="hero-glow" style={{
          position: "absolute", top: "50%", left: "30%",
          width: "60vw", height: "60vw", maxWidth: 700, maxHeight: 700,
          background: "radial-gradient(ellipse at center, rgba(200,155,60,0.07) 0%, transparent 65%)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }} />

        <div
          className="hero-grid"
          style={{
            maxWidth: 1200, width: "100%", margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "center",
          }}
        >
          {/* ── LEFT: Copywrite ────────────────────────────────────── */}
          <div>
            {/* Badge */}
            <div className="gold-badge anim-fade-in delay-100" style={{ marginBottom: "1.75rem" }}>
              ✦ Plataforma SaaS para Barbearias
            </div>

            {/* Headline */}
            <h1
              className="display-font anim-fade-up delay-200"
              style={{
                fontSize: "clamp(2.6rem, 4.5vw, 4.8rem)",
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-0.01em",
                marginBottom: "1.5rem",
              }}
            >
              Gerencie tudo.<br />
              Fidelize clientes.<br />
              <span className="gold-shimmer">Escale seu lucro.</span>
            </h1>

            {/* Subtext */}
            <p
              className="anim-fade-up delay-300"
              style={{
                maxWidth: 480,
                fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
                lineHeight: 1.8,
                color: "#A1A1AA",
                fontFamily: "var(--font-syne)",
                fontWeight: 400,
                marginBottom: "2rem",
              }}
            >
              BarberXP é a plataforma completa para barbearias que querem sair do caos e entrar no próximo nível — agendamentos online, controle financeiro e gamificação de clientes, tudo num só lugar.
            </p>

            {/* Benefits */}
            <ul className="anim-fade-up delay-400" style={{ listStyle: "none", marginBottom: "2.5rem" }}>
              {[
                "Agenda preenchida automaticamente, 24h por dia",
                "Veja quanto cada barbeiro gera em tempo real",
                "Clientes que voltam — com pontos e recompensas",
              ].map((b) => (
                <li key={b} className="check-item" style={{ marginBottom: 12, fontSize: "0.88rem" }}>{b}</li>
              ))}
            </ul>

            {/* CTAs */}
            <div
              className="hero-ctas anim-fade-up delay-500"
              style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}
            >
              {/* WhatsApp */}
              <a
                href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20o%20BarberXP"
                className="btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Conversar no WhatsApp
              </a>

              {/* Começar Grátis */}
              <div className="ping-wrapper">
                <Link href="https://app.barberxp.com.br/auth/login" className="btn-gold">
                  Começar Grátis
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Social proof micro-text */}
            <p className="anim-fade-in delay-700" style={{ marginTop: "1.5rem", color: "#52525B", fontSize: "0.75rem", fontFamily: "var(--font-syne)", letterSpacing: "0.04em" }}>
              Sem cartão de crédito &nbsp;·&nbsp; Setup em 2 minutos &nbsp;·&nbsp; Cancele quando quiser
            </p>
          </div>

          {/* ── RIGHT: Barbershop Image ─────────────────────────────── */}
          <div className="hero-img-col anim-fade-in delay-400" style={{ position: "relative" }}>
            {/* Gold corner accent top-right */}
            <div aria-hidden="true" style={{
              position: "absolute", top: -16, right: -16, zIndex: 2,
              width: 80, height: 80,
              borderTop: "2px solid rgba(200,155,60,0.5)",
              borderRight: "2px solid rgba(200,155,60,0.5)",
              borderRadius: "0 12px 0 0",
              pointerEvents: "none",
            }} />
            {/* Gold corner accent bottom-left */}
            <div aria-hidden="true" style={{
              position: "absolute", bottom: -16, left: -16, zIndex: 2,
              width: 80, height: 80,
              borderBottom: "2px solid rgba(200,155,60,0.5)",
              borderLeft: "2px solid rgba(200,155,60,0.5)",
              borderRadius: "0 0 0 12px",
              pointerEvents: "none",
            }} />

            {/* Image */}
            <div className="hero-img-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=900&auto=format&fit=crop&q=85"
                alt="Barbearia premium gerenciada com BarberXP"
              />
              {/* Left fade for blend */}
              <div aria-hidden="true" style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(90deg, rgba(15,15,15,0.65) 0%, transparent 45%)",
                pointerEvents: "none",
              }} />
              {/* Bottom fade */}
              <div aria-hidden="true" style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(15,15,15,0.55) 0%, transparent 45%)",
                pointerEvents: "none",
              }} />

              {/* Floating stat card — bottom left */}
              <div className="float-card" style={{
                position: "absolute", bottom: 24, left: 24,
                background: "rgba(12,12,12,0.88)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(200,155,60,0.3)",
                borderRadius: 14,
                padding: "14px 20px",
                minWidth: 150,
              }}>
                <div className="display-font gold-text" style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>+40%</div>
                <div style={{ color: "#A1A1AA", fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>de faturamento médio</div>
              </div>

              {/* Floating rating card — top right */}
              <div className="float-card" style={{
                position: "absolute", top: 24, right: 24,
                animationDelay: "2s",
                background: "rgba(12,12,12,0.88)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(200,155,60,0.2)",
                borderRadius: 14,
                padding: "12px 18px",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <div style={{ display: "flex", gap: 2 }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#C89B3C">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-syne)", fontSize: "0.7rem", fontWeight: 700, color: "#fff" }}>98% satisfação</div>
                  <div style={{ color: "#A1A1AA", fontSize: "0.62rem", letterSpacing: "0.04em" }}>150+ barbearias</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="anim-fade-in delay-800" style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-syne)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(161,161,170,0.4)", textTransform: "uppercase" }}>scroll</span>
          <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, rgba(200,155,60,0.5), transparent)" }} />
          <div className="scroll-dot" />
        </div>
      </section>

      {/* ── TICKER ────────────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(200,155,60,0.1)", borderBottom: "1px solid rgba(200,155,60,0.1)", padding: "14px 0", background: "rgba(26,26,26,0.5)" }}>
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...Array(2)].flatMap((_, i) =>
              ["Agendamento Online", "Controle Financeiro", "Gamificação", "Gestão de Equipe", "Relatórios em Tempo Real", "Multi-unidade", "App para Clientes", "Comissões Automáticas", "Ranking de Barbeiros", "Fidelização de Clientes"].map((t) => (
                <span key={`${i}-${t}`} style={{ display: "inline-flex", alignItems: "center", gap: 20, padding: "0 20px", whiteSpace: "nowrap", fontFamily: "var(--font-syne)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A1A1AA" }}>
                  <span style={{ color: "#C89B3C", fontSize: "0.5rem" }}>✦</span>
                  {t}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── FEATURES ──────────────────────────────────────────────────── */}
      <section id="funcionalidades" style={{ padding: "100px clamp(1.5rem, 5vw, 4rem)", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <div className="section-label">Funcionalidades</div>
          <h2 className="display-font" style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.1, maxWidth: 680 }}>
            Tudo que sua barbearia <br />
            <em style={{ fontStyle: "italic", color: "#C89B3C" }}>precisa crescer.</em>
          </h2>
        </div>
        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className="feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feature-icon" style={{ color: "#C89B3C", marginBottom: "1.25rem" }}>{f.icon}</div>
              <h3 className="display-font" style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.6rem" }}>{f.title}</h3>
              <p style={{ color: "#A1A1AA", fontSize: "0.9rem", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <div ref={statsRef} style={{ background: "#141414", borderTop: "1px solid rgba(200,155,60,0.1)", borderBottom: "1px solid rgba(200,155,60,0.1)" }}>
        <div className="stats-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "70px clamp(1.5rem, 5vw, 4rem)" }}>
          {[
            { value: schedCount, suffix: "+", label: "Agendamentos realizados" },
            { value: shopCount, suffix: "+", label: "Barbearias ativas" },
            { value: revCount, suffix: "M+", prefix: "R$", label: "Gerenciados na plataforma" },
            { value: satCount, suffix: "%", label: "Taxa de satisfação" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0 1rem", position: "relative" }}>
              {i > 0 && (
                <div className="hide-mobile" style={{
                  position: "absolute", left: 0, top: "15%", height: "70%", width: 1,
                  background: "linear-gradient(to bottom, transparent, rgba(200,155,60,0.3), transparent)",
                }} />
              )}
              <div className="display-font gold-text" style={{ fontSize: "clamp(2.8rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1, marginBottom: "0.5rem" }}>
                {s.prefix}{s.value.toLocaleString("pt-BR")}{s.suffix}
              </div>
              <p style={{ color: "#A1A1AA", fontSize: "0.8rem", fontFamily: "var(--font-syne)", letterSpacing: "0.04em" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section id="como-funciona" style={{ padding: "100px clamp(1.5rem, 5vw, 4rem)", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <div className="section-label">Como Funciona</div>
          <h2 className="display-font" style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            Pronto em <em style={{ color: "#C89B3C", fontStyle: "italic" }}>minutos.</em>
          </h2>
        </div>
        <div className="steps-row" style={{ display: "flex", alignItems: "flex-start" }}>
          {[
            { num: "01", title: "Crie sua conta", desc: "Cadastro simples em 2 minutos. Sem cartão de crédito necessário." },
            { num: "02", title: "Configure sua barbearia", desc: "Adicione barbeiros, serviços e horários de funcionamento." },
            { num: "03", title: "Veja seu negócio crescer", desc: "Agendamentos, clientes e finanças, tudo organizado e funcionando." },
          ].map((step, i) => (
            <Fragment key={step.num}>
              <div style={{ flex: "0 0 auto", maxWidth: 260, textAlign: "center" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  border: "1.5px solid rgba(200,155,60,0.4)",
                  background: "rgba(200,155,60,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.25rem",
                }}>
                  <span className="display-font" style={{ color: "#C89B3C", fontWeight: 700, fontSize: "1.3rem" }}>{step.num}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "1rem", marginBottom: "0.6rem", letterSpacing: "0.02em" }}>{step.title}</h3>
                <p style={{ color: "#A1A1AA", fontSize: "0.85rem", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
              {i < 2 && <div className="step-line" />}
            </Fragment>
          ))}
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────── */}
      <section id="planos" style={{ padding: "80px clamp(1.5rem, 5vw, 4rem) 100px", background: "#111" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <div className="section-label">Planos</div>
            <h2 className="display-font" style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
              Escolha o plano <em style={{ color: "#C89B3C", fontStyle: "italic" }}>certo para você.</em>
            </h2>
          </div>
          <div className="plans-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", alignItems: "start" }}>
            {PLANS.map((p) => (
              <div key={p.name} className={`plan-card ${p.highlight ? "highlighted" : ""}`}>
                {p.highlight && p.badge && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)" }}>
                    <span className="gold-badge">{p.badge}</span>
                  </div>
                )}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#A1A1AA", marginBottom: "0.75rem" }}>{p.name}</div>
                  <div className="display-font" style={{ fontSize: "3rem", fontWeight: 700, lineHeight: 1, color: p.highlight ? "#C89B3C" : "#fff" }}>
                    {p.price}
                  </div>
                  <div style={{ color: "#A1A1AA", fontSize: "0.8rem", marginTop: "0.3rem" }}>{p.sub}</div>
                </div>
                <hr className="gold-rule" style={{ marginBottom: "1.5rem", opacity: 0.3 }} />
                <ul style={{ listStyle: "none", marginBottom: "2rem" }}>
                  {p.features.map((f) => (
                    <li key={f} className="check-item">{f}</li>
                  ))}
                </ul>
                <Link
                  href="https://app.barberxp.com.br/auth/login"
                  style={{
                    display: "block", textAlign: "center",
                    padding: "14px", borderRadius: 12,
                    fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.8rem",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    textDecoration: "none", transition: "all 0.25s ease",
                    ...(p.highlight
                      ? { background: "linear-gradient(135deg, #C89B3C, #F5D17E 50%, #C89B3C)", color: "#0F0F0F", boxShadow: "0 8px 30px rgba(200,155,60,0.3)" }
                      : { background: "transparent", color: "#C89B3C", border: "1.5px solid rgba(200,155,60,0.4)" }),
                  }}
                  onMouseEnter={e => !p.highlight && (e.currentTarget.style.background = "rgba(200,155,60,0.08)")}
                  onMouseLeave={e => !p.highlight && (e.currentTarget.style.background = "transparent")}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section id="depoimentos" style={{ padding: "100px clamp(1.5rem, 5vw, 4rem)", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <div className="section-label">Depoimentos</div>
          <h2 className="display-font" style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            Quem usa, <em style={{ color: "#C89B3C", fontStyle: "italic" }}>não larga.</em>
          </h2>
        </div>
        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-card">
              <p style={{ fontFamily: "var(--font-syne)", fontSize: "0.92rem", lineHeight: 1.75, color: "#D4D4D8", position: "relative", zIndex: 1, marginBottom: "1.75rem", marginTop: "1.5rem" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: "linear-gradient(135deg, rgba(200,155,60,0.3), rgba(245,209,126,0.15))",
                  border: "1px solid rgba(200,155,60,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.2rem", color: "#C89B3C",
                }}>
                  {t.initial}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.85rem" }}>{t.name}</div>
                  <div style={{ color: "#A1A1AA", fontSize: "0.75rem", letterSpacing: "0.03em" }}>{t.shop}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(180deg, #0F0F0F 0%, #161410 50%, #0F0F0F 100%)",
        borderTop: "1px solid rgba(200,155,60,0.12)",
        borderBottom: "1px solid rgba(200,155,60,0.12)",
        padding: "100px clamp(1.5rem, 5vw, 4rem)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background glow */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 600, height: 300,
          background: "radial-gradient(ellipse, rgba(200,155,60,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative" }}>
          <p style={{ fontFamily: "var(--font-syne)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C89B3C", marginBottom: "1.5rem" }}>
            ✦ &nbsp; Comece hoje, gratuitamente &nbsp; ✦
          </p>
          <h2 className="display-font" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Sua barbearia merece<br />
            <span className="gold-shimmer">o melhor.</span>
          </h2>
          <p style={{ color: "#A1A1AA", maxWidth: 480, margin: "0 auto 2.5rem", lineHeight: 1.7, fontSize: "1rem" }}>
            Junte-se a mais de 150 barbearias que já transformaram seus negócios com BarberXP.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="https://app.barberxp.com.br/auth/login" className="btn-gold">
              Criar Conta Grátis
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a href="mailto:contato@barberxp.com" className="btn-outline">
              Falar com Especialista
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer style={{ background: "#0A0A0A", padding: "50px clamp(1.5rem, 5vw, 4rem) 30px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.875rem" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: "linear-gradient(135deg, #C89B3C, #F5D17E)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.1rem", color: "#0F0F0F",
                }}>B</div>
                <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.04em" }}>
                  BARBER<span className="gold-text">XP</span>
                </span>
              </div>
              <p style={{ color: "#52525B", fontSize: "0.8rem", maxWidth: 220, lineHeight: 1.6 }}>
                A plataforma premium para barbearias que buscam excelência.
              </p>
            </div>
            {/* Links */}
            <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
              {[
                { title: "Produto", items: ["Funcionalidades", "Planos", "API"] },
                { title: "Empresa", items: ["Sobre", "Blog", "Contato"] },
                { title: "Legal", items: ["Privacidade", "Termos", "Cookies"] },
              ].map((col) => (
                <div key={col.title}>
                  <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#A1A1AA", marginBottom: "0.875rem" }}>{col.title}</div>
                  {col.items.map((item) => (
                    <div key={item} style={{ marginBottom: "0.5rem" }}>
                      <a href="#" style={{ color: "#52525B", textDecoration: "none", fontSize: "0.82rem", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#A1A1AA")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#52525B")}
                      >{item}</a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <hr className="gold-rule" style={{ opacity: 0.15, marginBottom: "1.5rem" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ color: "#3F3F46", fontSize: "0.75rem" }}>
              © {new Date().getFullYear()} BarberXP. Todos os direitos reservados.
            </span>
            <span style={{ fontFamily: "var(--font-syne)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#3F3F46", textTransform: "uppercase" }}>
              Feito com ✦ para barbeiros de verdade
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
