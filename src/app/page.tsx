"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Cormorant_Garamond, Syne } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

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
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
    title: "Agenda no Piloto Automático",
    desc: "Clientes agendam 24h pelo app. Sem WhatsApp lotado, sem esquecimento, sem confusão de horário.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Financeiro em Tempo Real",
    desc: "Receitas, despesas e comissões na tela. Nunca mais fechar o mês sem saber se lucrou.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Clientes que Voltam por Vontade",
    desc: "XP, recompensas e rankings que criam hábito. Seu cliente vai querer voltar antes de você ligar.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Sua Equipe, Seu Controle",
    desc: "Cada barbeiro com sua agenda, seus serviços e suas comissões calculadas automaticamente.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Aumentei meu faturamento em 40% no primeiro mês. A visibilidade financeira mudou tudo na minha gestão.",
    name: "Marcus Thorne",
    shop: "The Golden Razor",
    initial: "M",
  },
  {
    quote: "A gamificação fez meus clientes voltarem muito mais rápido. Todo mundo quer ser o número 1 no ranking.",
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

const PLAN = {
  price: "R$ 150",
  sub: "por mês",
  features: [
    "Barbeiros ilimitados",
    "Agendamentos ilimitados",
    "Controle financeiro completo",
    "Comissões automáticas",
    "Gamificação de clientes (XP, rankings, recompensas)",
    "App para clientes",
    "Relatórios em tempo real",
    "Suporte prioritário",
  ],
  cta: "Começar Agora",
};

const BANNER_MESSAGES = [
  { icon: "🔥", text: "Oferta por tempo limitado:", highlight: "30 dias grátis no plano Basic", cta: "Ativar agora" },
  { icon: "✦", text: "Sem taxa de setup.", highlight: "Cancele quando quiser.", cta: "Saiba mais" },
  { icon: "⚡", text: "Mais de 2.500 agendamentos realizados", highlight: "só este mês.", cta: "Ver planos" },
];

const FAQ_ITEMS = [
  {
    q: "Preciso de cartão de crédito para começar?",
    a: "Não. O plano Free é gratuito para sempre, sem necessidade de cartão. Você só precisa se cadastrar e começar.",
  },
  {
    q: "Meus clientes precisam baixar algum app?",
    a: "O BarberXP oferece um app web progressivo (PWA) que os clientes acessam pelo celular, sem precisar instalar nada da loja.",
  },
  {
    q: "Como funciona a gamificação?",
    a: "Cada atendimento gera XP para o cliente. Com XP acumulado, ele sobe de nível, entra no ranking da barbearia e pode resgatar recompensas que você define — descontos, cortes grátis, brindes.",
  },
  {
    q: "Consigo usar em mais de uma unidade?",
    a: "Sim, no plano Pro você gerencia múltiplas unidades com painel centralizado, relatórios separados por unidade e barbeiros compartilhados.",
  },
  {
    q: "Posso migrar do meu sistema atual?",
    a: "Sim. Nossa equipe de onboarding ajuda na migração dos seus dados. A configuração completa leva menos de 30 minutos.",
  },
  {
    q: "E se eu quiser cancelar?",
    a: "Cancele quando quiser, sem multa, direto pelo painel. Seus dados ficam disponíveis por 30 dias após o cancelamento.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(200,155,60,0.12)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "#fff",
          fontFamily: "var(--font-syne)",
          fontWeight: 600,
          fontSize: "0.95rem",
          textAlign: "left",
          gap: "1rem",
        }}
      >
        <span>{q}</span>
        <span style={{
          color: "#C89B3C",
          fontSize: "1.2rem",
          lineHeight: 1,
          transition: "transform 0.3s ease",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          display: "inline-block",
          flexShrink: 0,
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 200 : 0,
        overflow: "hidden",
        transition: "max-height 0.35s ease",
      }}>
        <p style={{
          color: "#A1A1AA",
          fontSize: "0.88rem",
          lineHeight: 1.75,
          paddingBottom: "1.25rem",
        }}>{a}</p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsOn, setStatsOn] = useState(false);
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

  const topOffset = bannerVisible ? 116 : 72;

  return (
    <div
      className={`${cormorant.variable} ${syne.variable}`}
      style={{ fontFamily: "var(--font-syne), sans-serif", background: "#0F0F0F", color: "#FFFFFF", overflowX: "hidden" }}
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
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .grain-overlay {
          position: fixed; inset: 0; pointer-events: none; z-index: 9999;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 220px 220px;
          animation: grain-shift 6s steps(8) infinite;
        }
        @keyframes grain-shift {
          0%{transform:translate(0,0)}12%{transform:translate(-3%,-5%)}25%{transform:translate(5%,-2%)}
          37%{transform:translate(-4%,6%)}50%{transform:translate(3%,3%)}62%{transform:translate(-6%,-3%)}
          75%{transform:translate(4%,5%)}87%{transform:translate(-2%,-6%)}100%{transform:translate(0,0)}
        }

        .dot-pattern {
          background-color: #0F0F0F;
          background-image: radial-gradient(circle at 1px 1px, rgba(200,155,60,0.07) 1px, transparent 0);
          background-size: 32px 32px;
        }

        .gold-text {
          background: linear-gradient(135deg, #C89B3C 0%, #F5D17E 45%, #C89B3C 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .gold-shimmer {
          background: linear-gradient(100deg, #C89B3C 0%, #C89B3C 30%, #F5D17E 50%, #C89B3C 70%, #C89B3C 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer { to { background-position: 200% center; } }

        @keyframes fade-up { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fade-in  { from{opacity:0} to{opacity:1} }
        @keyframes slide-right { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }

        .anim-fade-up    { animation: fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-fade-in    { animation: fade-in 1s ease both; }
        .anim-slide-right{ animation: slide-right 0.7s cubic-bezier(0.22,1,0.36,1) both; }

        .delay-100{animation-delay:0.1s}.delay-200{animation-delay:0.2s}.delay-300{animation-delay:0.3s}
        .delay-400{animation-delay:0.4s}.delay-500{animation-delay:0.5s}.delay-600{animation-delay:0.6s}
        .delay-700{animation-delay:0.7s}.delay-800{animation-delay:0.8s}

        .gold-rule { border:none; height:1px; background:linear-gradient(90deg,transparent,#C89B3C 30%,#F5D17E 50%,#C89B3C 70%,transparent); }

        .nav-glass { background:rgba(15,15,15,0); backdrop-filter:blur(0); border-bottom:1px solid transparent; transition:all 0.4s ease; }
        .nav-glass.scrolled { background:rgba(15,15,15,0.92); backdrop-filter:blur(20px); border-bottom-color:rgba(200,155,60,0.15); }

        .display-font { font-family: var(--font-cormorant), serif; }

        .feature-card {
          background:rgba(26,26,26,0.8); border:1px solid rgba(255,255,255,0.06);
          border-radius:16px; padding:2rem;
          transition:transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.35s ease, box-shadow 0.35s ease;
          cursor:default;
        }
        .feature-card:hover { transform:translateY(-6px); border-color:rgba(200,155,60,0.4); box-shadow:0 20px 60px rgba(200,155,60,0.08); }
        .feature-card:hover .feature-icon { animation: icon-pulse 1.4s ease-in-out infinite; }
        @keyframes icon-pulse {
          0%,100%{filter:drop-shadow(0 0 0px rgba(200,155,60,0))}
          50%{filter:drop-shadow(0 0 8px rgba(200,155,60,0.6))}
        }

        .plan-card {
          border-radius:20px; padding:2.5rem 2rem; border:1px solid rgba(255,255,255,0.07);
          background:#161616; transition:transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
        }
        .plan-card:hover { transform:translateY(-4px); }
        .plan-card.highlighted {
          background:#1A1A1A; border:1.5px solid var(--gold); position:relative;
          box-shadow:0 0 40px rgba(200,155,60,0.15), 0 0 0 1px rgba(200,155,60,0.08);
        }
        .plan-card.highlighted:hover { box-shadow:0 0 60px rgba(200,155,60,0.22), 0 0 0 1px rgba(200,155,60,0.12); }

        .testimonial-card {
          background:rgba(26,26,26,0.7); border:1px solid rgba(200,155,60,0.12);
          border-radius:16px; padding:2rem; position:relative; overflow:hidden;
          transition:border-color 0.3s ease;
        }
        .testimonial-card::before {
          content:'"'; font-family:var(--font-cormorant),serif;
          position:absolute; top:-8px; left:20px; font-size:8rem; line-height:1;
          color:rgba(200,155,60,0.12); font-weight:700; pointer-events:none;
        }
        .testimonial-card:hover { border-color:rgba(200,155,60,0.3); }

        .step-line { flex:1; height:1px; background:linear-gradient(90deg,var(--gold),rgba(200,155,60,0.2)); margin:0 1rem; margin-top:28px; }

        .btn-gold {
          display:inline-flex; align-items:center; gap:10px;
          background:linear-gradient(135deg,#C89B3C,#F5D17E 50%,#C89B3C); background-size:200% auto;
          color:#0F0F0F; font-family:var(--font-syne),sans-serif; font-weight:700;
          font-size:0.875rem; letter-spacing:0.05em; text-transform:uppercase;
          padding:0 2rem; height:52px; border-radius:12px; border:none; cursor:pointer;
          transition:background-position 0.5s ease, transform 0.2s ease, box-shadow 0.3s ease;
          box-shadow:0 8px 30px rgba(200,155,60,0.25); text-decoration:none;
        }
        .btn-gold:hover { background-position:right center; transform:translateY(-2px); box-shadow:0 12px 40px rgba(200,155,60,0.35); }
        .btn-gold:active { transform:translateY(0); }

        .btn-outline {
          display:inline-flex; align-items:center; gap:10px; background:transparent;
          color:#C89B3C; font-family:var(--font-syne),sans-serif; font-weight:600;
          font-size:0.875rem; letter-spacing:0.05em; text-transform:uppercase;
          padding:0 2rem; height:52px; border-radius:12px; border:1.5px solid #C89B3C;
          cursor:pointer; transition:background 0.25s ease, color 0.25s ease, transform 0.2s ease;
          text-decoration:none;
        }
        .btn-outline:hover { background:rgba(200,155,60,0.1); transform:translateY(-2px); }

        .btn-whatsapp {
          display:inline-flex; align-items:center; gap:10px; background:#25D366; color:#fff;
          font-family:var(--font-syne),sans-serif; font-weight:700; font-size:0.875rem;
          letter-spacing:0.04em; padding:0 1.75rem; height:52px; border-radius:12px;
          border:none; cursor:pointer; text-decoration:none;
          transition:transform 0.2s ease, box-shadow 0.3s ease, background 0.2s;
          box-shadow:0 8px 30px rgba(37,211,102,0.28);
        }
        .btn-whatsapp:hover { background:#1ebe5d; transform:translateY(-2px); box-shadow:0 14px 40px rgba(37,211,102,0.4); }
        .btn-whatsapp:active { transform:translateY(0); }

        .ticker-wrap { overflow:hidden; mask-image:linear-gradient(90deg,transparent,black 15%,black 85%,transparent); }
        .ticker-track { display:flex; width:max-content; animation:ticker 30s linear infinite; }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .gold-badge {
          display:inline-block;
          background:linear-gradient(135deg,rgba(200,155,60,0.15),rgba(245,209,126,0.1));
          border:1px solid rgba(200,155,60,0.35); color:var(--gold-light);
          font-family:var(--font-syne),sans-serif; font-size:0.7rem; font-weight:700;
          letter-spacing:0.12em; text-transform:uppercase; padding:4px 14px; border-radius:100px;
        }

        .check-item {
          display:flex; align-items:center; gap:10px; font-size:0.875rem; color:#D4D4D8; margin-bottom:10px;
        }
        .check-item::before {
          content:''; display:inline-block; width:18px; height:18px; min-width:18px;
          background:rgba(200,155,60,0.15); border:1px solid rgba(200,155,60,0.4); border-radius:50%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 14 14' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 7l3.5 3.5L12 3.5' stroke='%23C89B3C' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:center; background-size:12px 12px;
        }

        .section-label {
          font-family:var(--font-syne),sans-serif; font-size:0.65rem; font-weight:700;
          letter-spacing:0.2em; text-transform:uppercase; color:var(--gold);
          margin-bottom:1rem; display:flex; align-items:center; gap:12px;
        }
        .section-label::before { content:''; display:block; width:24px; height:1px; background:var(--gold); }

        @keyframes banner-in  { from{transform:translateY(-110%);opacity:0} to{transform:translateY(0);opacity:1} }
        .banner-enter { animation: banner-in 0.55s cubic-bezier(0.34,1.46,0.64,1) both; }
        @keyframes border-sweep { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .banner-border-sweep::after {
          content:''; position:absolute; inset:auto 0 0 0; height:1.5px;
          background:linear-gradient(90deg,transparent 0%,rgba(200,155,60,0.1) 20%,rgba(245,209,126,0.9) 50%,rgba(200,155,60,0.1) 80%,transparent 100%);
          background-size:200% 100%; animation:border-sweep 3s linear infinite;
        }
        .banner-msg { transition:opacity 0.35s ease, transform 0.35s ease; }
        .banner-msg.fading { opacity:0; transform:translateY(6px); }

        @keyframes ping-ring { 0%{transform:scale(1);opacity:0.7} 70%{transform:scale(1.55);opacity:0} 100%{transform:scale(1.55);opacity:0} }
        .ping-wrapper { position:relative; display:inline-flex; }
        .ping-wrapper::before, .ping-wrapper::after {
          content:''; position:absolute; inset:-3px; border-radius:14px;
          border:1.5px solid rgba(200,155,60,0.55);
          animation:ping-ring 2.4s cubic-bezier(0,0,0.2,1) infinite; pointer-events:none;
        }
        .ping-wrapper::after { animation-delay:1.2s; }

        @keyframes glow-breathe {
          0%,100%{opacity:0.45;transform:translate(-50%,-55%) scale(1)}
          50%{opacity:0.9;transform:translate(-50%,-55%) scale(1.12)}
        }
        .hero-glow { animation: glow-breathe 5s ease-in-out infinite; }

        @keyframes float-card { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .float-card { animation: float-card 4s ease-in-out infinite; }

        @keyframes scroll-bounce { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(8px);opacity:0.5} }
        .scroll-dot { width:6px;height:6px;border-radius:50%;background:var(--gold);animation:scroll-bounce 1.5s ease-in-out infinite; }

        /* Screenshot mockup */
        .screen-frame {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(200,155,60,0.2);
          box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,155,60,0.08);
          position: relative;
        }
        .screen-frame img { display:block; width:100%; height:auto; }

        /* Gamification highlight section */
        .xp-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg, rgba(200,155,60,0.2), rgba(245,209,126,0.08));
          border: 1px solid rgba(200,155,60,0.4);
          border-radius: 100px; padding: 5px 14px;
          font-family: var(--font-syne),sans-serif; font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; color: #F5D17E;
        }

        .gam-card {
          background: rgba(26,26,26,0.6);
          border: 1px solid rgba(200,155,60,0.15);
          border-radius: 14px; padding: 1.25rem 1.5rem;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .gam-card:hover { border-color: rgba(200,155,60,0.4); transform: translateY(-4px); }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-grid       { grid-template-columns: 1fr !important; }
          .hero-img-col    { display: none !important; }
          .features-grid   { grid-template-columns: 1fr !important; }
          .plans-grid      { grid-template-columns: 1fr !important; }
          .testimonials-grid{ grid-template-columns: 1fr !important; }
          .steps-row       { flex-direction: column !important; }
          .step-line       { display: none !important; }
          .stats-grid      { grid-template-columns: 1fr 1fr !important; }
          .hero-ctas       { flex-direction: column !important; align-items: stretch !important; }
          .hide-mobile     { display: none !important; }
          .nav-links       { display: none !important; }
          .gam-grid        { grid-template-columns: 1fr !important; }
          .screens-grid    { grid-template-columns: 1fr !important; }
          .faq-cols        { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* GRAIN */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <header
        className={`nav-glass fixed top-0 left-0 right-0 z-50 ${scrolled ? "scrolled" : ""}`}
        style={{ padding: "0 clamp(1.5rem, 5vw, 4rem)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#C89B3C,#F5D17E)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.2rem", color: "#0F0F0F" }}>B</div>
            <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "0.04em" }}>BARBER<span className="gold-text">XP</span></span>
          </div>
          <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            {["Funcionalidades", "Planos", "Como Funciona", "Depoimentos"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                style={{ color: "#A1A1AA", fontFamily: "var(--font-syne)", fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#C89B3C")}
                onMouseLeave={e => (e.currentTarget.style.color = "#A1A1AA")}
              >{l}</a>
            ))}
          </nav>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link href="https://app.barberxp.com.br/auth/login"
              style={{ color: "#A1A1AA", textDecoration: "none", fontFamily: "var(--font-syne)", fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#A1A1AA")}
            >Entrar</Link>
            <Link href="https://app.barberxp.com.br/auth/login" className="btn-gold" style={{ height: 40, padding: "0 1.25rem", fontSize: "0.75rem", borderRadius: 10 }}>
              Começar Grátis
            </Link>
          </div>
        </div>
      </header>

      {/* ── BANNER ──────────────────────────────────────────────────── */}
      {bannerVisible && (
        <div className="banner-enter banner-border-sweep" style={{ position: "fixed", top: 72, left: 0, right: 0, zIndex: 40, height: 44, background: "linear-gradient(90deg,#0F0F0F 0%,#1a1408 50%,#0F0F0F 100%)", borderTop: "1px solid rgba(200,155,60,0.12)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 1rem", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 200, background: "linear-gradient(90deg,rgba(200,155,60,0.06),transparent)", pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 200, background: "linear-gradient(270deg,rgba(200,155,60,0.06),transparent)", pointerEvents: "none" }} />
          <div className={`banner-msg${bannerFading ? " fading" : ""}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: "0.85rem" }}>{BANNER_MESSAGES[bannerIdx].icon}</span>
            <span style={{ fontFamily: "var(--font-syne)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.04em", color: "#A1A1AA" }}>{BANNER_MESSAGES[bannerIdx].text}</span>
            <span style={{ fontFamily: "var(--font-syne)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.04em", color: "#F5D17E" }}>{BANNER_MESSAGES[bannerIdx].highlight}</span>
            <Link href="https://app.barberxp.com.br/auth/login" style={{ marginLeft: "0.5rem", fontFamily: "var(--font-syne)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", color: "#0F0F0F", background: "linear-gradient(90deg,#C89B3C,#F5D17E)", padding: "3px 12px", borderRadius: 100, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >{BANNER_MESSAGES[bannerIdx].cta} →</Link>
          </div>
          <div style={{ position: "absolute", right: "4rem", display: "flex", gap: 4, alignItems: "center" }}>
            {BANNER_MESSAGES.map((_, i) => (
              <button key={i} onClick={() => { setBannerFading(true); setTimeout(() => { setBannerIdx(i); setBannerFading(false); }, 350); }}
                style={{ width: i === bannerIdx ? 16 : 4, height: 4, borderRadius: 100, border: "none", cursor: "pointer", padding: 0, background: i === bannerIdx ? "#C89B3C" : "rgba(200,155,60,0.25)", transition: "all 0.3s ease" }} />
            ))}
          </div>
          <button onClick={() => setBannerVisible(false)} style={{ position: "absolute", right: "1rem", width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(200,155,60,0.2)", background: "transparent", cursor: "pointer", color: "#A1A1AA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", lineHeight: 1, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,155,60,0.15)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#A1A1AA"; }}
            aria-label="Fechar banner"
          >✕</button>
        </div>
      )}

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="dot-pattern" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: `${topOffset}px clamp(1.5rem, 5vw, 4rem) 80px`, position: "relative", transition: "padding-top 0.4s ease", overflow: "hidden" }}>
        <div aria-hidden="true" className="hero-glow" style={{ position: "absolute", top: "50%", left: "30%", width: "60vw", height: "60vw", maxWidth: 700, maxHeight: 700, background: "radial-gradient(ellipse at center,rgba(200,155,60,0.07) 0%,transparent 65%)", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div className="hero-grid" style={{ maxWidth: 1200, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,5rem)", alignItems: "center" }}>

          {/* LEFT */}
          <div>
            <div className="gold-badge anim-fade-in delay-100" style={{ marginBottom: "1.75rem" }}>✦ Sistema SaaS para Barbearias</div>
            <h1 className="display-font anim-fade-up delay-200" style={{ fontSize: "clamp(2.6rem,4.5vw,4.8rem)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>
              Sua barbearia lotada.<br />
              Seus clientes voltando.<br />
              <span className="gold-shimmer">Seu lucro no controle.</span>
            </h1>
            <p className="anim-fade-up delay-300" style={{ maxWidth: 480, fontSize: "clamp(0.9rem,1.4vw,1.05rem)", lineHeight: 1.8, color: "#A1A1AA", fontFamily: "var(--font-syne)", fontWeight: 400, marginBottom: "2rem" }}>
              Um app pra comissão. Outro pro estoque. O caderno pro financeiro. E no fim do dia, o dono ainda resolve tudo sozinho. O BarberXP nasceu pra acabar com isso — tudo num lugar só.
            </p>
            <ul className="anim-fade-up delay-400" style={{ listStyle: "none", marginBottom: "2.5rem" }}>
              {["Clientes agendam sozinhos — você só corta", "Saiba exatamente quanto cada barbeiro gera", "Pontos e recompensas que fazem clientes voltarem"].map((b) => (
                <li key={b} className="check-item" style={{ marginBottom: 12, fontSize: "0.88rem" }}>{b}</li>
              ))}
            </ul>
            <div className="hero-ctas anim-fade-up delay-500" style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/5592993129862?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20o%20BarberXP" className="btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Falar com a gente
              </a>
              <div className="ping-wrapper">
                <Link href="https://app.barberxp.com.br/auth/login" className="btn-gold">
                  Testar 30 Dias Grátis
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </Link>
              </div>
            </div>
            <p className="anim-fade-in delay-700" style={{ marginTop: "1.5rem", color: "#52525B", fontSize: "0.75rem", fontFamily: "var(--font-syne)", letterSpacing: "0.04em" }}>
              Sem cartão de crédito &nbsp;·&nbsp; Pronto em 2 minutos &nbsp;·&nbsp; Cancele quando quiser
            </p>
          </div>

          {/* RIGHT — Dashboard screenshot */}
          <div className="hero-img-col anim-fade-in delay-400" style={{ position: "relative" }}>
            <div aria-hidden="true" style={{ position: "absolute", top: -16, right: -16, zIndex: 2, width: 80, height: 80, borderTop: "2px solid rgba(200,155,60,0.5)", borderRight: "2px solid rgba(200,155,60,0.5)", borderRadius: "0 12px 0 0", pointerEvents: "none" }} />
            <div aria-hidden="true" style={{ position: "absolute", bottom: -16, left: -16, zIndex: 2, width: 80, height: 80, borderBottom: "2px solid rgba(200,155,60,0.5)", borderLeft: "2px solid rgba(200,155,60,0.5)", borderRadius: "0 0 0 12px", pointerEvents: "none" }} />
            <div className="screen-frame">
              <Image src="/assets/dashboard.png" alt="Dashboard do BarberXP" width={620} height={420} style={{ width: "100%", height: "auto" }} priority />
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(15,15,15,0.4) 0%,transparent 40%)", pointerEvents: "none" }} />
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(15,15,15,0.4) 0%,transparent 40%)", pointerEvents: "none" }} />
              {/* Floating stat */}
              <div className="float-card" style={{ position: "absolute", bottom: 20, left: 20, background: "rgba(12,12,12,0.88)", backdropFilter: "blur(14px)", border: "1px solid rgba(200,155,60,0.3)", borderRadius: 14, padding: "14px 20px", minWidth: 140 }}>
                <div className="display-font gold-text" style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>+40%</div>
                <div style={{ color: "#A1A1AA", fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>faturamento médio</div>
              </div>
              {/* Floating rating */}
              <div className="float-card" style={{ position: "absolute", top: 20, right: 20, animationDelay: "2s", background: "rgba(12,12,12,0.88)", backdropFilter: "blur(14px)", border: "1px solid rgba(200,155,60,0.2)", borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex", gap: 2 }}>
                  {[...Array(5)].map((_, i) => <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#C89B3C"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>)}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-syne)", fontSize: "0.7rem", fontWeight: 700 }}>98% satisfação</div>
                  <div style={{ color: "#A1A1AA", fontSize: "0.62rem" }}>150+ barbearias</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="anim-fade-in delay-800" style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-syne)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(161,161,170,0.4)", textTransform: "uppercase" }}>scroll</span>
          <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom,rgba(200,155,60,0.5),transparent)" }} />
          <div className="scroll-dot" />
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(200,155,60,0.1)", borderBottom: "1px solid rgba(200,155,60,0.1)", padding: "14px 0", background: "rgba(26,26,26,0.5)" }}>
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...Array(2)].flatMap((_, i) =>
              ["Agendamento Online", "Controle Financeiro", "Gamificação", "Gestão de Equipe", "Relatórios em Tempo Real", "Multi-unidade", "App para Clientes", "Comissões Automáticas", "Ranking de Barbeiros", "Fidelização de Clientes"].map((t) => (
                <span key={`${i}-${t}`} style={{ display: "inline-flex", alignItems: "center", gap: 20, padding: "0 20px", whiteSpace: "nowrap", fontFamily: "var(--font-syne)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A1A1AA" }}>
                  <span style={{ color: "#C89B3C", fontSize: "0.5rem" }}>✦</span>{t}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section id="funcionalidades" style={{ padding: "100px clamp(1.5rem,5vw,4rem)", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <div className="section-label">Funcionalidades</div>
          <h2 className="display-font" style={{ fontSize: "clamp(2.5rem,5vw,3.8rem)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.1, maxWidth: 680 }}>
            Tudo que sua barbearia <br /><em style={{ fontStyle: "italic", color: "#C89B3C" }}>precisa crescer.</em>
          </h2>
        </div>
        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.25rem" }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className="feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feature-icon" style={{ color: "#C89B3C", marginBottom: "1.25rem" }}>{f.icon}</div>
              <h3 className="display-font" style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.6rem" }}>{f.title}</h3>
              <p style={{ color: "#A1A1AA", fontSize: "0.9rem", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCT SCREENSHOTS ──────────────────────────────────────── */}
      <section style={{ padding: "0 clamp(1.5rem,5vw,4rem) 100px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>O Sistema</div>
          <h2 className="display-font" style={{ fontSize: "clamp(2.2rem,4vw,3.2rem)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            Veja o BarberXP <em style={{ color: "#C89B3C", fontStyle: "italic" }}>em ação.</em>
          </h2>
        </div>

        {/* Dashboard + Agenda side by side */}
        <div className="screens-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ position: "relative" }}>
            <div className="screen-frame">
              <Image src="/assets/dashboard.png" alt="Dashboard — visão geral da barbearia" width={700} height={450} style={{ width: "100%", height: "auto" }} />
            </div>
            <div style={{ marginTop: "0.875rem", paddingLeft: "0.5rem" }}>
              <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.85rem", color: "#fff", marginBottom: 4 }}>Dashboard</div>
              <div style={{ color: "#A1A1AA", fontSize: "0.78rem" }}>Faturamento, agendamentos e alertas críticos em um só lugar.</div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div className="screen-frame">
              <Image src="/assets/agenda.png" alt="Agenda semanal da barbearia" width={600} height={450} style={{ width: "100%", height: "auto" }} />
            </div>
            <div style={{ marginTop: "0.875rem", paddingLeft: "0.5rem" }}>
              <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.85rem", color: "#fff", marginBottom: 4 }}>Agenda</div>
              <div style={{ color: "#A1A1AA", fontSize: "0.78rem" }}>Visão diária, semanal e mensal com lista de espera integrada.</div>
            </div>
          </div>
        </div>

        {/* App mobile + login side by side */}
        <div className="screens-grid" style={{ display: "grid", gridTemplateColumns: "0.6fr 1.4fr", gap: "1.5rem" }}>
          <div>
            <div className="screen-frame" style={{ maxWidth: 280, margin: "0 auto" }}>
              <Image src="/assets/celular.png" alt="App mobile do cliente" width={280} height={500} style={{ width: "100%", height: "auto" }} />
            </div>
            <div style={{ marginTop: "0.875rem", paddingLeft: "0.5rem", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.85rem", color: "#fff", marginBottom: 4 }}>App do Cliente</div>
              <div style={{ color: "#A1A1AA", fontSize: "0.78rem" }}>XP, pontos e agendamento na palma da mão.</div>
            </div>
          </div>
          <div>
            <div className="screen-frame">
              <Image src="/assets/login.png" alt="Tela de login do BarberXP" width={600} height={400} style={{ width: "100%", height: "auto" }} />
            </div>
            <div style={{ marginTop: "0.875rem", paddingLeft: "0.5rem" }}>
              <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.85rem", color: "#fff", marginBottom: 4 }}>Acesso Seguro</div>
              <div style={{ color: "#A1A1AA", fontSize: "0.78rem" }}>Painel administrativo separado do app do cliente, com controle total de permissões.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GAMIFICATION HIGHLIGHT ───────────────────────────────────── */}
      <section style={{ background: "linear-gradient(180deg,#0F0F0F 0%,#13110A 50%,#0F0F0F 100%)", borderTop: "1px solid rgba(200,155,60,0.1)", borderBottom: "1px solid rgba(200,155,60,0.1)", padding: "100px clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,6rem)", alignItems: "center" }} className="hero-grid">

            {/* Left — copy */}
            <div>
              <div className="xp-badge" style={{ marginBottom: "1.5rem" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#F5D17E"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                Gamificação Exclusiva
              </div>
              <h2 className="display-font" style={{ fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "1.25rem" }}>
                Transforme corte em<br /><span className="gold-shimmer">vício positivo.</span>
              </h2>
              <p style={{ color: "#A1A1AA", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: 440, marginBottom: "2.5rem" }}>
                Nenhum outro sistema de barbearia tem isso. Seus clientes acumulam XP a cada atendimento, sobem de nível, competem no ranking e resgatam recompensas que você mesmo define. É fidelização que funciona de verdade.
              </p>
              <div className="gam-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                {[
                  { icon: "⚡", label: "XP por Atendimento", desc: "Cada corte gera pontos automáticos" },
                  { icon: "🏆", label: "Rankings", desc: "Competição saudável entre clientes" },
                  { icon: "🎁", label: "Recompensas", desc: "Descontos e benefícios resgatáveis" },
                  { icon: "🎯", label: "Desafios", desc: "Missões que aumentam frequência" },
                ].map((item) => (
                  <div key={item.label} className="gam-card">
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>{item.icon}</div>
                    <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.85rem", color: "#fff", marginBottom: "0.25rem" }}>{item.label}</div>
                    <div style={{ color: "#71717A", fontSize: "0.78rem", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — app screenshot */}
            <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              {/* Glow behind phone */}
              <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 300, background: "radial-gradient(ellipse,rgba(200,155,60,0.15) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
              <div style={{ position: "relative", zIndex: 1, maxWidth: 300, width: "100%" }}>
                <div className="screen-frame" style={{ borderRadius: 24 }}>
                  <Image src="/assets/celular.png" alt="App do cliente com XP e recompensas" width={300} height={540} style={{ width: "100%", height: "auto" }} />
                </div>
                {/* XP badge floating */}
                <div className="float-card" style={{ position: "absolute", top: -16, right: -24, background: "rgba(12,12,12,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(200,155,60,0.4)", borderRadius: 12, padding: "10px 16px", textAlign: "center" }}>
                  <div className="display-font gold-text" style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1 }}>1.500</div>
                  <div style={{ color: "#A1A1AA", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>XP PRATA</div>
                </div>
                {/* Level badge floating */}
                <div className="float-card" style={{ position: "absolute", bottom: -16, left: -24, animationDelay: "2s", background: "rgba(12,12,12,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(200,155,60,0.3)", borderRadius: 12, padding: "10px 16px" }}>
                  <div style={{ fontFamily: "var(--font-syne)", fontSize: "0.65rem", fontWeight: 700, color: "#C89B3C", letterSpacing: "0.08em", textTransform: "uppercase" }}>Nível</div>
                  <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "1.1rem", color: "#fff" }}>PRATA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <div ref={statsRef} style={{ background: "#141414", borderTop: "1px solid rgba(200,155,60,0.1)", borderBottom: "1px solid rgba(200,155,60,0.1)" }}>
        <div className="stats-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", padding: "70px clamp(1.5rem,5vw,4rem)" }}>
          {[
            { value: schedCount, suffix: "+", label: "Agendamentos realizados" },
            { value: shopCount, suffix: "+", label: "Barbearias ativas" },
            { value: revCount, suffix: "M+", prefix: "R$", label: "Gerenciados na plataforma" },
            { value: satCount, suffix: "%", label: "Taxa de satisfação" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0 1rem", position: "relative" }}>
              {i > 0 && <div className="hide-mobile" style={{ position: "absolute", left: 0, top: "15%", height: "70%", width: 1, background: "linear-gradient(to bottom,transparent,rgba(200,155,60,0.3),transparent)" }} />}
              <div className="display-font gold-text" style={{ fontSize: "clamp(2.8rem,5vw,4rem)", fontWeight: 700, lineHeight: 1, marginBottom: "0.5rem" }}>
                {s.prefix}{s.value.toLocaleString("pt-BR")}{s.suffix}
              </div>
              <p style={{ color: "#A1A1AA", fontSize: "0.8rem", fontFamily: "var(--font-syne)", letterSpacing: "0.04em" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section id="como-funciona" style={{ padding: "100px clamp(1.5rem,5vw,4rem)", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <div className="section-label">Como Funciona</div>
          <h2 className="display-font" style={{ fontSize: "clamp(2.5rem,5vw,3.8rem)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
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
                <div style={{ width: 56, height: 56, borderRadius: 16, border: "1.5px solid rgba(200,155,60,0.4)", background: "rgba(200,155,60,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
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

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section id="depoimentos" style={{ padding: "0 clamp(1.5rem,5vw,4rem) 100px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <div className="section-label">Depoimentos</div>
          <h2 className="display-font" style={{ fontSize: "clamp(2.5rem,5vw,3.8rem)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            Quem usa, <em style={{ color: "#C89B3C", fontStyle: "italic" }}>não larga.</em>
          </h2>
        </div>
        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-card">
              <p style={{ fontFamily: "var(--font-syne)", fontSize: "0.92rem", lineHeight: 1.75, color: "#D4D4D8", position: "relative", zIndex: 1, marginBottom: "1.75rem", marginTop: "1.5rem" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,rgba(200,155,60,0.3),rgba(245,209,126,0.15))", border: "1px solid rgba(200,155,60,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.2rem", color: "#C89B3C" }}>{t.initial}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.85rem" }}>{t.name}</div>
                  <div style={{ color: "#A1A1AA", fontSize: "0.75rem", letterSpacing: "0.03em" }}>{t.shop}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────── */}
      <section id="planos" style={{ padding: "80px clamp(1.5rem,5vw,4rem) 100px", background: "#111" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ marginBottom: "3.5rem", textAlign: "center" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Plano</div>
            <h2 className="display-font" style={{ fontSize: "clamp(2.5rem,5vw,3.8rem)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
              Simples assim. <em style={{ color: "#C89B3C", fontStyle: "italic" }}>Um plano, tudo incluso.</em>
            </h2>
          </div>
          <div className="plan-card highlighted" style={{ maxWidth: 520, width: "100%" }}>
            <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)" }}>
              <span className="gold-badge">Tudo incluso</span>
            </div>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div className="display-font gold-text" style={{ fontSize: "4.5rem", fontWeight: 700, lineHeight: 1 }}>{PLAN.price}</div>
              <div style={{ color: "#A1A1AA", fontSize: "0.9rem", marginTop: "0.4rem" }}>{PLAN.sub} · cancele quando quiser</div>
            </div>
            <hr className="gold-rule" style={{ marginBottom: "1.75rem", opacity: 0.4 }} />
            <ul style={{ listStyle: "none", marginBottom: "2.25rem" }}>
              {PLAN.features.map((f) => <li key={f} className="check-item" style={{ marginBottom: 14 }}>{f}</li>)}
            </ul>
            <Link href="https://app.barberxp.com.br/auth/login" style={{ display: "block", textAlign: "center", padding: "16px", borderRadius: 12, fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", background: "linear-gradient(135deg,#C89B3C,#F5D17E 50%,#C89B3C)", color: "#0F0F0F", boxShadow: "0 8px 30px rgba(200,155,60,0.3)", transition: "box-shadow 0.3s ease, transform 0.2s ease" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 14px 40px rgba(200,155,60,0.45)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(200,155,60,0.3)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >{PLAN.cta} →</Link>
            <p style={{ textAlign: "center", color: "#52525B", fontSize: "0.75rem", marginTop: "1rem", fontFamily: "var(--font-syne)" }}>
              Sem cartão de crédito para começar &nbsp;·&nbsp; Setup em 2 minutos
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section style={{ padding: "100px clamp(1.5rem,5vw,4rem)", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <div className="section-label">FAQ</div>
          <h2 className="display-font" style={{ fontSize: "clamp(2.5rem,5vw,3.8rem)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            Perguntas <em style={{ color: "#C89B3C", fontStyle: "italic" }}>frequentes.</em>
          </h2>
        </div>
        <div className="faq-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 4rem" }}>
          <div>
            {FAQ_ITEMS.slice(0, 3).map((item) => <FaqItem key={item.q} {...item} />)}
          </div>
          <div>
            {FAQ_ITEMS.slice(3).map((item) => <FaqItem key={item.q} {...item} />)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(180deg,#0F0F0F 0%,#161410 50%,#0F0F0F 100%)", borderTop: "1px solid rgba(200,155,60,0.12)", borderBottom: "1px solid rgba(200,155,60,0.12)", padding: "100px clamp(1.5rem,5vw,4rem)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 300, background: "radial-gradient(ellipse,rgba(200,155,60,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <p style={{ fontFamily: "var(--font-syne)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C89B3C", marginBottom: "1.5rem" }}>✦ &nbsp; Comece hoje, gratuitamente &nbsp; ✦</p>
          <h2 className="display-font" style={{ fontSize: "clamp(3rem,7vw,6rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Sua barbearia merece<br /><span className="gold-shimmer">o melhor.</span>
          </h2>
          <p style={{ color: "#A1A1AA", maxWidth: 480, margin: "0 auto 2.5rem", lineHeight: 1.7, fontSize: "1rem" }}>
            Junte-se a mais de 150 barbearias que já transformaram seus negócios com BarberXP.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="https://app.barberxp.com.br/auth/login" className="btn-gold">
              Criar Conta Grátis
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
            <a href="mailto:contato@barberxp.com" className="btn-outline">Falar com Especialista</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer style={{ background: "#0A0A0A", padding: "50px clamp(1.5rem,5vw,4rem) 30px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.875rem" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#C89B3C,#F5D17E)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.1rem", color: "#0F0F0F" }}>B</div>
                <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.04em" }}>BARBER<span className="gold-text">XP</span></span>
              </div>
              <p style={{ color: "#52525B", fontSize: "0.8rem", maxWidth: 220, lineHeight: 1.6 }}>A plataforma premium para barbearias que buscam excelência.</p>
            </div>
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
            <span style={{ color: "#3F3F46", fontSize: "0.75rem" }}>© {new Date().getFullYear()} BarberXP. Todos os direitos reservados.</span>
            <span style={{ fontFamily: "var(--font-syne)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#3F3F46", textTransform: "uppercase" }}>Feito com ✦ para barbeiros de verdade</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
