"use client";

import { Fragment, useEffect, useRef, useState, useCallback } from "react";
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

/* ─── Scroll reveal hook ─────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Mouse parallax hook ────────────────────────────────────── */
function useMouseParallax(strength = 12) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setPos({
        x: ((e.clientX - cx) / cx) * strength,
        y: ((e.clientY - cy) / cy) * strength,
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [strength]);
  return pos;
}

/* ─── Tilt card ──────────────────────────────────────────────── */
function TiltFrame({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) scale(1.02)`;
      // move shine overlay
      const shine = el.querySelector<HTMLElement>(".tilt-shine");
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${(x+0.5)*100}% ${(y+0.5)*100}%, rgba(245,209,126,0.18) 0%, transparent 65%)`;
        shine.style.opacity = "1";
      }
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
      const shine = el.querySelector<HTMLElement>(".tilt-shine");
      if (shine) shine.style.opacity = "0";
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)", transformStyle: "preserve-3d", willChange: "transform", position: "relative" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* shine overlay */}
      <div className="tilt-shine" style={{ position: "absolute", inset: 0, zIndex: 2, borderRadius: "inherit", opacity: 0, pointerEvents: "none", transition: "opacity 0.4s ease" }} aria-hidden />
      {children}
    </div>
  );
}

/* ─── Animated counter ───────────────────────────────────────── */
function useCounter(target: number, duration = 2000, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return value;
}

/* ─── Data ───────────────────────────────────────────────────── */
const TABS = [
  {
    id: "agenda",
    label: "Agenda",
    headline: "Clientes agendam. Você só corta.",
    desc: "Disponibilidade em tempo real, confirmação automática e lista de espera integrada. Chega de WhatsApp lotado de horário.",
    img: "/assets/agenda.png",
    alt: "Agenda semanal do BarberXP",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    headline: "Tudo o que importa, numa tela só.",
    desc: "Faturamento do dia, agendamentos, clientes ativos e alertas críticos. Visão completa da operação sem abrir planilha.",
    img: "/assets/dashboard.png",
    alt: "Dashboard do BarberXP",
  },
  {
    id: "financeiro",
    label: "Financeiro",
    headline: "Saiba onde vai cada real.",
    desc: "Receitas, despesas e comissões calculadas automaticamente. Nunca mais fechar o mês sem saber se lucrou.",
    img: "/assets/financeiro.png",
    alt: "Módulo financeiro do BarberXP",
  },
  {
    id: "produto",
    label: "Produtos",
    headline: "Estoque que não some.",
    desc: "Controle de produtos integrado ao caixa. Entrada, saída e precificação em um único lugar.",
    img: "/assets/produto.png",
    alt: "Gestão de produtos do BarberXP",
  },
  {
    id: "celular",
    label: "App do Cliente",
    headline: "O cliente carrega sua barbearia no bolso.",
    desc: "PWA instalável, sem App Store. O cliente agenda, acompanha XP e resgata recompensas direto pelo celular.",
    img: "/assets/celular.png",
    alt: "App mobile do cliente BarberXP",
    isMobile: true,
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
  {
    quote: "Meus clientes viraram fãs da barbearia depois que implantei os pontos. A frequência dobrou.",
    name: "Lucas Mendes",
    shop: "Corte & Arte",
    initial: "L",
  },
  {
    quote: "Acabou o problema de falta e reagendamento. O sistema notifica o cliente e ainda tem lista de espera.",
    name: "Rafael Souza",
    shop: "Navalha de Ouro",
    initial: "R",
  },
];

const PLAN = {
  price: "R$ 150",
  sub: "por mês · cancele quando quiser",
  features: [
    "Barbeiros ilimitados",
    "Agendamentos ilimitados",
    "Controle financeiro completo",
    "Comissões automáticas",
    "Gamificação (XP, rankings, recompensas, desafios)",
    "App para clientes (PWA)",
    "Relatórios em tempo real",
    "Suporte prioritário",
  ],
};

const BANNER_MESSAGES = [
  { icon: "🔥", text: "Oferta por tempo limitado:", highlight: "30 dias grátis", cta: "Ativar agora" },
  { icon: "✦", text: "Sem taxa de setup.", highlight: "Cancele quando quiser.", cta: "Saiba mais" },
  { icon: "⚡", text: "Mais de 2.500 agendamentos realizados", highlight: "só este mês.", cta: "Ver plano" },
];

const FAQ_ITEMS = [
  { q: "Preciso de cartão de crédito para começar?", a: "Não. Os primeiros 30 dias são grátis, sem cartão. Você só precisa se cadastrar e começar." },
  { q: "Meus clientes precisam baixar algum app?", a: "O BarberXP oferece um PWA que os clientes acessam pelo celular, sem precisar instalar nada da loja." },
  { q: "Como funciona a gamificação?", a: "Cada atendimento gera XP para o cliente. Com XP acumulado, ele sobe de nível, entra no ranking e resgata recompensas que você define — descontos, cortes grátis, brindes." },
  { q: "Posso usar em mais de uma unidade?", a: "Sim, o plano suporta múltiplas unidades com painel centralizado e relatórios separados por unidade." },
  { q: "Posso migrar do meu sistema atual?", a: "Sim. Nossa equipe de onboarding ajuda na migração. A configuração completa leva menos de 30 minutos." },
  { q: "E se eu quiser cancelar?", a: "Cancele quando quiser, sem multa, direto pelo painel. Seus dados ficam disponíveis por 30 dias após o cancelamento." },
];

/* ─── FAQ accordion ──────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(200,155,60,0.12)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", background: "transparent", border: "none", cursor: "pointer", color: "#fff", fontFamily: "var(--font-syne)", fontWeight: 600, fontSize: "0.95rem", textAlign: "left", gap: "1rem" }}
      >
        <span>{q}</span>
        <span style={{ color: "#C89B3C", fontSize: "1.3rem", lineHeight: 1, transition: "transform 0.3s ease", transform: open ? "rotate(45deg)" : "rotate(0)", display: "inline-block", flexShrink: 0 }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <p style={{ color: "#A1A1AA", fontSize: "0.88rem", lineHeight: 1.75, paddingBottom: "1.25rem" }}>{a}</p>
      </div>
    </div>
  );
}

/* ─── Reveal wrapper ─────────────────────────────────────────── */
function Reveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none" }) {
  const { ref, visible } = useReveal();
  const transforms: Record<string, string> = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsOn, setStatsOn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [bannerFading, setBannerFading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const mouse = useMouseParallax(10);

  const schedCount = useCounter(2500, 2200, statsOn);
  const shopCount  = useCounter(150,  1800, statsOn);
  const revCount   = useCounter(12,   2000, statsOn);
  const satCount   = useCounter(98,   1500, statsOn);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsOn(true); obs.disconnect(); } },
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
      setTimeout(() => { setBannerIdx(i => (i + 1) % BANNER_MESSAGES.length); setBannerFading(false); }, 350);
    }, 4000);
    return () => clearInterval(id);
  }, [bannerVisible]);

  // Auto-advance testimonials
  useEffect(() => {
    const id = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const topOffset = bannerVisible ? 116 : 72;

  return (
    <div className={`${cormorant.variable} ${syne.variable}`} style={{ fontFamily: "var(--font-syne),sans-serif", background: "#0A0A0A", color: "#FFFFFF", overflowX: "hidden" }}>
      <style>{`
        :root {
          --gold: #C89B3C; --gold-light: #F5D17E; --gold-dark: #AF8531;
          --bg: #0A0A0A; --surface: #141414; --surface2: #1C1C1C;
          --muted: #A1A1AA; --muted2: #52525B;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* Grain */
        .grain { position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.025;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:220px 220px; animation:grain 6s steps(8) infinite; }
        @keyframes grain {
          0%{transform:translate(0,0)}12%{transform:translate(-3%,-5%)}25%{transform:translate(5%,-2%)}
          37%{transform:translate(-4%,6%)}50%{transform:translate(3%,3%)}62%{transform:translate(-6%,-3%)}
          75%{transform:translate(4%,5%)}87%{transform:translate(-2%,-6%)}
        }

        /* Dot bg */
        .dot-bg { background-color:var(--bg);
          background-image:radial-gradient(circle at 1px 1px, rgba(200,155,60,0.06) 1px, transparent 0);
          background-size:36px 36px; }

        /* Gold gradient text */
        .g-text {
          background:linear-gradient(135deg,#C89B3C 0%,#F5D17E 45%,#C89B3C 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .g-shimmer {
          background:linear-gradient(100deg,#C89B3C 0%,#C89B3C 30%,#F5D17E 50%,#C89B3C 70%,#C89B3C 100%);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:shimmer 4s linear infinite; }
        @keyframes shimmer { to { background-position:200% center; } }

        /* Display */
        .d-font { font-family:var(--font-cormorant),serif; }

        /* Gold rule */
        .g-rule { border:none;height:1px;background:linear-gradient(90deg,transparent,#C89B3C 30%,#F5D17E 50%,#C89B3C 70%,transparent); }

        /* Label */
        .label {
          font-size:0.65rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;
          color:var(--gold);display:flex;align-items:center;gap:10px;
        }
        .label::before { content:'';width:20px;height:1px;background:var(--gold); }

        /* Badge */
        .badge {
          display:inline-block;
          background:linear-gradient(135deg,rgba(200,155,60,0.15),rgba(245,209,126,0.08));
          border:1px solid rgba(200,155,60,0.35);color:var(--gold-light);
          font-size:0.68rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;
          padding:5px 14px;border-radius:100px;
        }

        /* Nav */
        .nav { background:transparent;border-bottom:1px solid transparent;transition:all 0.4s ease; }
        .nav.scrolled { background:rgba(10,10,10,0.92);backdrop-filter:blur(24px);border-bottom-color:rgba(200,155,60,0.12); }

        /* Buttons */
        .btn-gold {
          display:inline-flex;align-items:center;gap:10px;
          background:linear-gradient(135deg,#C89B3C,#F5D17E 50%,#C89B3C);background-size:200% auto;
          color:#0A0A0A;font-family:var(--font-syne),sans-serif;font-weight:700;
          font-size:0.875rem;letter-spacing:0.05em;text-transform:uppercase;
          padding:0 2rem;height:52px;border-radius:12px;border:none;cursor:pointer;
          transition:background-position 0.5s,transform 0.2s,box-shadow 0.3s;
          box-shadow:0 8px 30px rgba(200,155,60,0.25);text-decoration:none;
        }
        .btn-gold:hover { background-position:right center;transform:translateY(-2px);box-shadow:0 14px 40px rgba(200,155,60,0.38); }
        .btn-outline {
          display:inline-flex;align-items:center;gap:10px;background:transparent;
          color:#C89B3C;font-family:var(--font-syne),sans-serif;font-weight:600;
          font-size:0.875rem;letter-spacing:0.05em;text-transform:uppercase;
          padding:0 2rem;height:52px;border-radius:12px;border:1.5px solid rgba(200,155,60,0.5);
          cursor:pointer;transition:background 0.25s,transform 0.2s;text-decoration:none;
        }
        .btn-outline:hover { background:rgba(200,155,60,0.08);transform:translateY(-2px); }
        .btn-wa {
          display:inline-flex;align-items:center;gap:10px;background:#25D366;color:#fff;
          font-family:var(--font-syne),sans-serif;font-weight:700;font-size:0.875rem;
          padding:0 1.75rem;height:52px;border-radius:12px;border:none;cursor:pointer;
          text-decoration:none;transition:transform 0.2s,box-shadow 0.3s,background 0.2s;
          box-shadow:0 8px 30px rgba(37,211,102,0.25);
        }
        .btn-wa:hover { background:#1ebe5d;transform:translateY(-2px);box-shadow:0 14px 40px rgba(37,211,102,0.4); }

        /* Check list */
        .check-li {
          display:flex;align-items:center;gap:10px;font-size:0.875rem;color:#D4D4D8;margin-bottom:10px;
        }
        .check-li::before {
          content:'';display:inline-block;width:18px;height:18px;min-width:18px;
          background:rgba(200,155,60,0.12);border:1px solid rgba(200,155,60,0.4);border-radius:50%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 14 14' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 7l3.5 3.5L12 3.5' stroke='%23C89B3C' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
          background-repeat:no-repeat;background-position:center;background-size:12px 12px;
        }

        /* Ticker */
        .ticker-wrap { overflow:hidden;mask-image:linear-gradient(90deg,transparent,black 12%,black 88%,transparent); }
        .ticker-track { display:flex;width:max-content;animation:ticker 35s linear infinite; }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* Tab system */
        .tab-btn {
          background:transparent;border:none;cursor:pointer;
          font-family:var(--font-syne),sans-serif;font-weight:600;font-size:0.8rem;
          letter-spacing:0.08em;text-transform:uppercase;color:#52525B;
          padding:0.6rem 1.25rem;border-radius:8px;
          transition:color 0.25s,background 0.25s;white-space:nowrap;
        }
        .tab-btn.active { color:#C89B3C;background:rgba(200,155,60,0.1); }
        .tab-btn:hover:not(.active) { color:#A1A1AA; }

        /* Screen frame */
        .screen-frame {
          border-radius:16px;overflow:hidden;
          border:1px solid rgba(200,155,60,0.18);
          box-shadow:0 40px 100px rgba(0,0,0,0.7),0 0 0 1px rgba(200,155,60,0.06);
          position:relative;
        }
        /* Beam of light sweeping across screens */
        .screen-frame::after {
          content:'';
          position:absolute;inset:0;z-index:3;pointer-events:none;
          background:linear-gradient(105deg,transparent 35%,rgba(245,209,126,0.09) 50%,transparent 65%);
          background-size:250% 100%;
          animation:screen-beam 4s ease-in-out infinite;
        }
        @keyframes screen-beam {
          0%   { background-position:200% 0; }
          50%  { background-position:-20% 0; }
          100% { background-position:200% 0; }
        }

        /* Float */
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        .float { animation:float 4s ease-in-out infinite; }

        /* Glow breathe */
        @keyframes glow-pulse {
          0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.85;transform:scale(1.1)}
        }
        .glow-pulse { animation:glow-pulse 6s ease-in-out infinite; }

        /* Gold particles */
        @keyframes particle-rise {
          0%   { transform:translateY(0) translateX(0) scale(1); opacity:0.8; }
          100% { transform:translateY(-120px) translateX(var(--dx,10px)) scale(0); opacity:0; }
        }
        .particle {
          position:absolute;width:3px;height:3px;border-radius:50%;
          background:var(--gold);pointer-events:none;
          animation:particle-rise var(--dur,3s) ease-out var(--delay,0s) infinite;
        }

        /* Spotlight sweep on hero glow */
        @keyframes spotlight-move {
          0%,100% { transform:translate(-50%,-50%) scale(1);   opacity:0.6; }
          33%      { transform:translate(-40%,-55%) scale(1.1); opacity:0.9; }
          66%      { transform:translate(-55%,-45%) scale(0.9); opacity:0.7; }
        }
        .hero-spotlight { animation:spotlight-move 8s ease-in-out infinite; }

        /* Tab image: slide in from side */
        @keyframes slide-in-right { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:none} }
        @keyframes slide-in-left  { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:none} }
        .tab-img-enter  { animation:slide-in-right 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        .tab-copy-enter { animation:slide-in-left  0.5s cubic-bezier(0.22,1,0.36,1) both; }

        /* Stagger children reveal */
        .stagger > * { opacity:0; animation:fade-in-up 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .stagger > *:nth-child(1) { animation-delay:0s; }
        .stagger > *:nth-child(2) { animation-delay:0.08s; }
        .stagger > *:nth-child(3) { animation-delay:0.16s; }
        .stagger > *:nth-child(4) { animation-delay:0.24s; }
        .stagger > *:nth-child(5) { animation-delay:0.32s; }
        .stagger.done > * { opacity:1; }

        /* Underline grow on section titles */
        .underline-grow {
          display:inline-block;position:relative;
        }
        .underline-grow::after {
          content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;
          background:linear-gradient(90deg,#C89B3C,#F5D17E);
          transition:width 0.6s cubic-bezier(0.22,1,0.36,1);border-radius:2px;
        }
        .underline-grow.visible::after { width:100%; }

        /* Progress bar on tabs */
        .tab-progress {
          position:absolute;bottom:0;left:0;height:2px;
          background:linear-gradient(90deg,#C89B3C,#F5D17E);
          animation:tab-fill 5s linear infinite;
          border-radius:2px;
        }
        @keyframes tab-fill { from{width:0%} to{width:100%} }

        /* Stat number pop */
        @keyframes stat-pop {
          0%  { transform:scale(1.3);color:#F5D17E; }
          100%{ transform:scale(1);  }
        }
        .stat-pop { animation:stat-pop 0.5s cubic-bezier(0.22,1,0.36,1) both; }

        /* Ping */
        @keyframes ping { 0%{transform:scale(1);opacity:0.7} 70%,100%{transform:scale(1.55);opacity:0} }
        .ping-wrap { position:relative;display:inline-flex; }
        .ping-wrap::before,.ping-wrap::after {
          content:'';position:absolute;inset:-3px;border-radius:14px;
          border:1.5px solid rgba(200,155,60,0.5);
          animation:ping 2.4s cubic-bezier(0,0,0.2,1) infinite;pointer-events:none;
        }
        .ping-wrap::after { animation-delay:1.2s; }

        /* Banner */
        @keyframes banner-in { from{transform:translateY(-100%);opacity:0} to{transform:translateY(0);opacity:1} }
        .banner-in { animation:banner-in 0.5s cubic-bezier(0.34,1.46,0.64,1) both; }
        .banner-msg { transition:opacity 0.35s,transform 0.35s; }
        .banner-msg.fade { opacity:0;transform:translateY(6px); }
        @keyframes sweep { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .sweep::after {
          content:'';position:absolute;inset:auto 0 0 0;height:1.5px;
          background:linear-gradient(90deg,transparent,rgba(200,155,60,0.1) 20%,rgba(245,209,126,0.9) 50%,rgba(200,155,60,0.1) 80%,transparent);
          background-size:200% 100%;animation:sweep 3s linear infinite;
        }

        /* Testimonial transition */
        .t-card { transition:opacity 0.5s ease,transform 0.5s ease; }

        /* Gamification cards */
        .gam-card {
          background:rgba(20,20,20,0.8);border:1px solid rgba(200,155,60,0.12);
          border-radius:16px;padding:1.5rem;
          transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s;
        }
        .gam-card:hover { border-color:rgba(200,155,60,0.4);transform:translateY(-5px);box-shadow:0 20px 50px rgba(200,155,60,0.07); }

        /* Scroll indicator */
        @keyframes bounce-dot { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(8px);opacity:0.4} }
        .scroll-dot { width:6px;height:6px;border-radius:50%;background:var(--gold);animation:bounce-dot 1.5s ease-in-out infinite; }

        /* Responsive */
        @media(max-width:900px) {
          .two-col { grid-template-columns:1fr !important; }
          .hide-m  { display:none !important; }
          .nav-links { display:none !important; }
          .hero-ctas { flex-direction:column !important;align-items:stretch !important; }
          .stats-grid { grid-template-columns:1fr 1fr !important; }
          .plans-grid { grid-template-columns:1fr !important; }
          .test-grid  { grid-template-columns:1fr !important; }
          .faq-cols   { grid-template-columns:1fr !important; }
          .tab-strip  { overflow-x:auto; }
        }
      `}</style>

      <div className="grain" aria-hidden />

      {/* ── FLOATING WHATSAPP BUTTON (always visible) ─────────────── */}
      <a
        href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20o%20BarberXP"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar pelo WhatsApp"
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 9998,
          width: 56, height: 56, borderRadius: "50%",
          background: "linear-gradient(135deg,#1DA851,#25D366)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 28px rgba(37,211,102,0.5)",
          transition: "transform 0.2s, box-shadow 0.3s",
          textDecoration: "none",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(37,211,102,0.65)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,211,102,0.5)"; }}
      >
        {/* Pulse ring */}
        <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(37,211,102,0.5)", animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite", pointerEvents: "none" }} aria-hidden />
        <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(37,211,102,0.3)", animation: "ping 2s cubic-bezier(0,0,0.2,1) 1s infinite", pointerEvents: "none" }} aria-hidden />
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ── NAV ───────────────────────────────────────────────────────── */}
      <header className={`nav fixed top-0 left-0 right-0 z-50 ${scrolled ? "scrolled" : ""}`} style={{ padding: "0 clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#C89B3C,#F5D17E)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.2rem", color: "#0A0A0A" }}>B</div>
            <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "0.04em" }}>BARBER<span className="g-text">XP</span></span>
          </div>
          <nav className="nav-links" style={{ display: "flex", gap: "2.5rem" }}>
            {[["funcionalidades", "Funcionalidades"], ["plano", "Plano"], ["como-funciona", "Como Funciona"], ["depoimentos", "Depoimentos"]].map(([id, label]) => (
              <a key={id} href={`#${id}`} style={{ color: "#71717A", fontFamily: "var(--font-syne)", fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#C89B3C")}
                onMouseLeave={e => (e.currentTarget.style.color = "#71717A")}
              >{label}</a>
            ))}
          </nav>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link href="https://app.barberxp.com.br/auth/login" style={{ color: "#71717A", textDecoration: "none", fontFamily: "var(--font-syne)", fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#71717A")}
            >Entrar</Link>
            <Link href="https://app.barberxp.com.br/auth/login" className="btn-gold" style={{ height: 40, padding: "0 1.25rem", fontSize: "0.75rem", borderRadius: 10 }}>Começar Grátis</Link>
          </div>
        </div>
      </header>

      {/* ── BANNER ────────────────────────────────────────────────────── */}
      {bannerVisible && (
        <div className="banner-in sweep" style={{ position: "fixed", top: 72, left: 0, right: 0, zIndex: 40, height: 44, background: "linear-gradient(90deg,#0A0A0A,#151208 50%,#0A0A0A)", borderTop: "1px solid rgba(200,155,60,0.1)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 180, background: "linear-gradient(90deg,rgba(200,155,60,0.05),transparent)", pointerEvents: "none" }} />
          <div aria-hidden style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 180, background: "linear-gradient(270deg,rgba(200,155,60,0.05),transparent)", pointerEvents: "none" }} />
          <div className={`banner-msg${bannerFading ? " fade" : ""}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: "0.85rem" }}>{BANNER_MESSAGES[bannerIdx].icon}</span>
            <span style={{ fontFamily: "var(--font-syne)", fontSize: "0.72rem", fontWeight: 500, color: "#A1A1AA" }}>{BANNER_MESSAGES[bannerIdx].text}</span>
            <span style={{ fontFamily: "var(--font-syne)", fontSize: "0.72rem", fontWeight: 700, color: "#F5D17E" }}>{BANNER_MESSAGES[bannerIdx].highlight}</span>
            <Link href="https://app.barberxp.com.br/auth/login" style={{ marginLeft: "0.5rem", fontFamily: "var(--font-syne)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", color: "#0A0A0A", background: "linear-gradient(90deg,#C89B3C,#F5D17E)", padding: "3px 12px", borderRadius: 100 }}>{BANNER_MESSAGES[bannerIdx].cta} →</Link>
          </div>
          <div style={{ position: "absolute", right: "4rem", display: "flex", gap: 4 }}>
            {BANNER_MESSAGES.map((_, i) => (
              <button key={i} onClick={() => { setBannerFading(true); setTimeout(() => { setBannerIdx(i); setBannerFading(false); }, 350); }}
                style={{ width: i === bannerIdx ? 16 : 4, height: 4, borderRadius: 100, border: "none", cursor: "pointer", padding: 0, background: i === bannerIdx ? "#C89B3C" : "rgba(200,155,60,0.2)", transition: "all 0.3s" }} />
            ))}
          </div>
          <button onClick={() => setBannerVisible(false)} style={{ position: "absolute", right: "1rem", width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(200,155,60,0.2)", background: "transparent", cursor: "pointer", color: "#71717A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,155,60,0.12)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#71717A"; }}
            aria-label="Fechar"
          >✕</button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="dot-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: `${topOffset}px clamp(1.5rem,5vw,4rem) 48px`, position: "relative", overflow: "hidden" }}>

        {/* Radial spotlight — animated */}
        <div aria-hidden className="hero-spotlight" style={{ position: "absolute", top: "50%", left: "38%", width: "60vw", height: "60vw", maxWidth: 750, maxHeight: 750, background: "radial-gradient(ellipse,rgba(200,155,60,0.08) 0%,transparent 65%)", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        {/* Secondary smaller glow */}
        <div aria-hidden style={{ position: "absolute", top: "30%", right: "10%", width: 300, height: 300, background: "radial-gradient(ellipse,rgba(200,155,60,0.04) 0%,transparent 70%)", pointerEvents: "none", animation:"glow-pulse 9s ease-in-out 2s infinite" }} />

        <div className="two-col" style={{ maxWidth: 1240, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,5rem)", alignItems: "center" }}>

          {/* Copy */}
          <div>
            <div className="badge" style={{ marginBottom: "1.25rem" }}>✦ Sistema SaaS para Barbearias</div>
            <h1 className="d-font" style={{ fontSize: "clamp(2.6rem,4.5vw,4.8rem)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.01em", marginBottom: "1rem" }}>
              Sua barbearia lotada.<br />
              Seus clientes voltando.<br />
              <span className="g-shimmer">Seu lucro no controle.</span>
            </h1>
            <p style={{ maxWidth: 440, fontSize: "clamp(0.88rem,1.3vw,1rem)", lineHeight: 1.7, color: "#A1A1AA", marginBottom: "1.75rem" }}>
              Agenda, financeiro, comissões e gamificação de clientes — tudo num lugar só. Sem planilha, sem WhatsApp de horário, sem achismo.
            </p>

            {/* Primary CTA block */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.25rem" }}>

              {/* WhatsApp — destaque principal */}
              <a
                href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20o%20BarberXP"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                  background: "linear-gradient(135deg,#1DA851,#25D366 50%,#1DA851)",
                  backgroundSize: "200% auto",
                  color: "#fff",
                  fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "1rem",
                  letterSpacing: "0.03em",
                  padding: "0 2rem", height: 58, borderRadius: 14,
                  textDecoration: "none",
                  boxShadow: "0 8px 32px rgba(37,211,102,0.35), 0 0 0 1px rgba(37,211,102,0.2)",
                  transition: "background-position 0.5s, transform 0.2s, box-shadow 0.3s",
                  position: "relative", overflow: "hidden",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundPosition = "right center";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 14px 40px rgba(37,211,102,0.5), 0 0 0 1px rgba(37,211,102,0.3)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundPosition = "left center";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,211,102,0.35), 0 0 0 1px rgba(37,211,102,0.2)";
                }}
              >
                {/* Pulse ring */}
                <span style={{ position: "absolute", inset: 0, borderRadius: 14, border: "2px solid rgba(37,211,102,0.4)", animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite", pointerEvents: "none" }} aria-hidden />
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Falar pelo WhatsApp agora
                <span style={{ marginLeft: "auto", fontSize: "0.72rem", fontWeight: 500, opacity: 0.8, background: "rgba(0,0,0,0.15)", borderRadius: 6, padding: "2px 8px" }}>Resposta rápida</span>
              </a>

              {/* Secondary row */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <div className="ping-wrap" style={{ flex: 1 }}>
                  <Link href="https://app.barberxp.com.br/auth/login" className="btn-gold" style={{ width: "100%", justifyContent: "center", height: 48 }}>
                    Testar 30 Dias Grátis
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </Link>
                </div>
                <Link href="https://app.barberxp.com.br/auth/login" className="btn-outline" style={{ height: 48, padding: "0 1.25rem", flexShrink: 0, fontSize: "0.75rem" }}>
                  Entrar
                </Link>
              </div>
            </div>

            <p style={{ color: "#3F3F46", fontSize: "0.72rem", letterSpacing: "0.04em" }}>
              Sem cartão &nbsp;·&nbsp; Pronto em 2 min &nbsp;·&nbsp; Cancele quando quiser
            </p>
          </div>

          {/* Dashboard screenshot with tilt + parallax */}
          <div className="hide-m" style={{ position: "relative" }}>
            {/* Corner accents */}
            {[{top:-16,right:-16,borderTop:"2px solid rgba(200,155,60,0.45)",borderRight:"2px solid rgba(200,155,60,0.45)",borderRadius:"0 12px 0 0"},{bottom:-16,left:-16,borderBottom:"2px solid rgba(200,155,60,0.45)",borderLeft:"2px solid rgba(200,155,60,0.45)",borderRadius:"0 0 0 12px"}].map((s,i) => (
              <div key={i} aria-hidden style={{ position:"absolute",zIndex:3,width:72,height:72,pointerEvents:"none",...s }} />
            ))}

            {/* Gold particles */}
            {[
              {left:"15%",bottom:"10%","--dur":"3.2s","--delay":"0s","--dx":"12px"},
              {left:"30%",bottom:"5%","--dur":"2.8s","--delay":"0.8s","--dx":"-8px"},
              {left:"60%",bottom:"8%","--dur":"3.5s","--delay":"0.3s","--dx":"6px"},
              {left:"75%",bottom:"12%","--dur":"2.5s","--delay":"1.2s","--dx":"-14px"},
              {left:"45%",bottom:"3%","--dur":"4s","--delay":"0.6s","--dx":"10px"},
            ].map((p,i)=>(
              <div key={i} className="particle" style={p as React.CSSProperties} aria-hidden />
            ))}

            <TiltFrame style={{ borderRadius: 16 }}>
              <div className="screen-frame" style={{
                transform: `translate(${mouse.x * 0.4}px, ${mouse.y * 0.3}px)`,
                transition: "transform 0.1s linear",
              }}>
                <Image src="/assets/dashboard.png" alt="Dashboard BarberXP" width={660} height={440} style={{ width: "100%", height: "auto", display:"block" }} priority />
                <div aria-hidden style={{ position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(10,10,10,0.4) 0%,transparent 40%)",pointerEvents:"none",zIndex:1 }} />
                <div aria-hidden style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(10,10,10,0.4) 0%,transparent 40%)",pointerEvents:"none",zIndex:1 }} />
              </div>
            </TiltFrame>

            {/* Floating cards with parallax offset */}
            <div className="float" style={{ position:"absolute",bottom:20,left:20,zIndex:4,background:"rgba(8,8,8,0.9)",backdropFilter:"blur(16px)",border:"1px solid rgba(200,155,60,0.3)",borderRadius:14,padding:"14px 20px",transform:`translate(${mouse.x*0.8}px,${mouse.y*0.8}px)`,transition:"transform 0.08s linear" }}>
              <div className="d-font g-text" style={{ fontSize:"2rem",fontWeight:700,lineHeight:1 }}>+40%</div>
              <div style={{ color:"#71717A",fontSize:"0.65rem",letterSpacing:"0.08em",textTransform:"uppercase",marginTop:4 }}>faturamento médio</div>
            </div>
            <div className="float" style={{ position:"absolute",top:20,right:20,animationDelay:"2s",zIndex:4,background:"rgba(8,8,8,0.9)",backdropFilter:"blur(16px)",border:"1px solid rgba(200,155,60,0.18)",borderRadius:14,padding:"12px 16px",display:"flex",alignItems:"center",gap:10,transform:`translate(${-mouse.x*0.6}px,${mouse.y*0.6}px)`,transition:"transform 0.08s linear" }}>
              <div style={{ display:"flex",gap:2 }}>{[...Array(5)].map((_,i)=><svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#C89B3C"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}</div>
              <div>
                <div style={{ fontFamily:"var(--font-syne)",fontSize:"0.7rem",fontWeight:700 }}>98% satisfação</div>
                <div style={{ color:"#71717A",fontSize:"0.6rem" }}>150+ barbearias</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8 }}>
          <span style={{ fontSize:"0.6rem",letterSpacing:"0.15em",color:"rgba(161,161,170,0.35)",textTransform:"uppercase" }}>scroll</span>
          <div style={{ width:1,height:36,background:"linear-gradient(to bottom,rgba(200,155,60,0.4),transparent)" }} />
          <div className="scroll-dot" />
        </div>
      </section>

      {/* ── TICKER ────────────────────────────────────────────────────── */}
      <div style={{ borderTop:"1px solid rgba(200,155,60,0.08)",borderBottom:"1px solid rgba(200,155,60,0.08)",padding:"14px 0",background:"rgba(20,20,20,0.5)" }}>
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...Array(2)].flatMap((_,i) =>
              ["Agendamento Online","Controle Financeiro","Gamificação","Gestão de Equipe","Relatórios em Tempo Real","Multi-unidade","App para Clientes","Comissões Automáticas","Ranking de Barbeiros","Fidelização de Clientes"].map(t => (
                <span key={`${i}-${t}`} style={{ display:"inline-flex",alignItems:"center",gap:20,padding:"0 20px",whiteSpace:"nowrap",fontFamily:"var(--font-syne)",fontSize:"0.68rem",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"#52525B" }}>
                  <span style={{ color:"#C89B3C",fontSize:"0.45rem" }}>✦</span>{t}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── FEATURE SHOWCASE (tabs) ───────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="funcionalidades" style={{ padding: "120px clamp(1.5rem,5vw,4rem)", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>

          <Reveal>
            <div style={{ marginBottom: "3rem" }}>
              <div className="label" style={{ marginBottom: "1rem" }}>Funcionalidades</div>
              <h2 className="d-font" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.01em", maxWidth: 620 }}>
                Tudo que sua barbearia <em style={{ fontStyle: "italic", color: "#C89B3C" }}>precisa crescer.</em>
              </h2>
            </div>
          </Reveal>

          {/* Tab strip */}
          <Reveal delay={0.1}>
            <div className="tab-strip" style={{ display: "flex", gap: "0.25rem", marginBottom: "2.5rem", borderBottom: "1px solid rgba(200,155,60,0.1)", paddingBottom: "0.5rem" }}>
              {TABS.map((t, i) => (
                <button key={t.id} className={`tab-btn${activeTab === i ? " active" : ""}`} onClick={() => setActiveTab(i)} style={{ position: "relative" }}>
                  {t.label}
                  {activeTab === i && <div className="tab-progress" />}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Tab content */}
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(2rem,5vw,5rem)", alignItems: "center" }}>
            {/* Copy side */}
            <div key={`copy-${activeTab}`} className="tab-copy-enter">
              <style>{`@keyframes fade-in-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}`}</style>
              <div className="badge" style={{ marginBottom: "1.25rem" }}>
                {["📅","📊","💰","📦","📱"][activeTab]} {TABS[activeTab].label}
              </div>
              <h3 className="d-font" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 600, lineHeight: 1.1, marginBottom: "1rem" }}>
                {TABS[activeTab].headline}
              </h3>
              <p style={{ color: "#A1A1AA", fontSize: "1rem", lineHeight: 1.8, maxWidth: 400, marginBottom: "2rem" }}>
                {TABS[activeTab].desc}
              </p>
              <Link href="https://app.barberxp.com.br/auth/login" className="btn-gold" style={{ fontSize: "0.8rem", height: 44, padding: "0 1.5rem" }}>
                Ver na prática →
              </Link>
            </div>

            {/* Screenshot side */}
            <div key={`img-${activeTab}`} className="tab-img-enter" style={{ position: "relative" }}>
              {TABS[activeTab].isMobile ? (
                <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
                  <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 280, height: 280, background: "radial-gradient(ellipse,rgba(200,155,60,0.16) 0%,transparent 70%)", pointerEvents: "none" }} />
                  <TiltFrame style={{ maxWidth: 280, width: "100%", borderRadius: 28 }}>
                    <div className="screen-frame" style={{ borderRadius: 28 }}>
                      <Image src={TABS[activeTab].img} alt={TABS[activeTab].alt} width={280} height={500} style={{ width: "100%", height: "auto", display:"block" }} />
                    </div>
                  </TiltFrame>
                </div>
              ) : (
                <TiltFrame style={{ borderRadius: 16 }}>
                  <div className="screen-frame">
                    <Image src={TABS[activeTab].img} alt={TABS[activeTab].alt} width={760} height={480} style={{ width: "100%", height: "auto", display:"block" }} />
                    <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(10,10,10,0.3) 0%,transparent 35%)", pointerEvents: "none", zIndex:1 }} />
                  </div>
                </TiltFrame>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── STATS ─────────────────────────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div ref={statsRef} style={{ background: "var(--surface)", borderTop: "1px solid rgba(200,155,60,0.08)", borderBottom: "1px solid rgba(200,155,60,0.08)" }}>
        <div className="stats-grid" style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", padding: "80px clamp(1.5rem,5vw,4rem)" }}>
          {[
            { v: schedCount, s: "+", label: "Agendamentos realizados" },
            { v: shopCount,  s: "+", label: "Barbearias ativas" },
            { v: revCount,   s: "M+", p: "R$", label: "Gerenciados na plataforma" },
            { v: satCount,   s: "%", label: "Taxa de satisfação" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0 1rem", position: "relative" }}>
              {i > 0 && <div className="hide-m" style={{ position:"absolute",left:0,top:"15%",height:"70%",width:1,background:"linear-gradient(to bottom,transparent,rgba(200,155,60,0.25),transparent)" }} />}
              <div className={`d-font g-text${statsOn ? " stat-pop" : ""}`} style={{ fontSize: "clamp(2.8rem,5vw,4.2rem)", fontWeight: 700, lineHeight: 1, marginBottom: "0.5rem", animationDelay: `${i*0.12}s` }}>
                {s.p}{s.v.toLocaleString("pt-BR")}{s.s}
              </div>
              <p style={{ color: "#71717A", fontSize: "0.8rem", letterSpacing: "0.04em" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── GAMIFICATION ──────────────────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "120px clamp(1.5rem,5vw,4rem)", background: "linear-gradient(180deg,var(--bg) 0%,#0e0b05 50%,var(--bg) 100%)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,6rem)", alignItems: "center" }}>

            {/* App screenshot */}
            <Reveal direction="left">
              <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
                <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 340, height: 340, background: "radial-gradient(ellipse,rgba(200,155,60,0.16) 0%,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "relative", maxWidth: 300, width: "100%" }}>
                  <TiltFrame style={{ borderRadius: 28 }}>
                    <div className="screen-frame" style={{ borderRadius: 28 }}>
                      <Image src="/assets/celular.png" alt="App do cliente com XP e recompensas" width={300} height={540} style={{ width: "100%", height: "auto", display:"block" }} />
                    </div>
                  </TiltFrame>
                  <div className="float" style={{ position:"absolute",top:-20,right:-28,zIndex:4,background:"rgba(8,8,8,0.92)",backdropFilter:"blur(14px)",border:"1px solid rgba(200,155,60,0.4)",borderRadius:14,padding:"12px 18px",textAlign:"center" }}>
                    <div className="d-font g-text" style={{ fontSize:"1.6rem",fontWeight:700,lineHeight:1 }}>1.500</div>
                    <div style={{ color:"#71717A",fontSize:"0.6rem",letterSpacing:"0.1em",textTransform:"uppercase" }}>XP PRATA</div>
                  </div>
                  <div className="float" style={{ position:"absolute",bottom:-20,left:-28,animationDelay:"2s",zIndex:4,background:"rgba(8,8,8,0.92)",backdropFilter:"blur(14px)",border:"1px solid rgba(200,155,60,0.28)",borderRadius:14,padding:"12px 18px" }}>
                    <div style={{ fontFamily:"var(--font-syne)",fontSize:"0.62rem",fontWeight:700,color:"#C89B3C",letterSpacing:"0.08em",textTransform:"uppercase" }}>Nível</div>
                    <div style={{ fontFamily:"var(--font-syne)",fontWeight:800,fontSize:"1.1rem",color:"#fff" }}>PRATA</div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Copy */}
            <Reveal direction="right">
              <div>
                <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,rgba(200,155,60,0.18),rgba(245,209,126,0.06))",border:"1px solid rgba(200,155,60,0.4)",borderRadius:100,padding:"5px 14px",marginBottom:"1.5rem" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#F5D17E"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span style={{ fontFamily:"var(--font-syne)",fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"#F5D17E" }}>Gamificação Exclusiva</span>
                </div>
                <h2 className="d-font" style={{ fontSize:"clamp(2.2rem,4vw,3.5rem)",fontWeight:600,lineHeight:1.1,letterSpacing:"-0.01em",marginBottom:"1.25rem" }}>
                  Transforme corte em<br /><span className="g-shimmer">vício positivo.</span>
                </h2>
                <p style={{ color:"#A1A1AA",fontSize:"0.98rem",lineHeight:1.8,maxWidth:440,marginBottom:"2.5rem" }}>
                  Nenhum outro sistema de barbearia tem isso. Seus clientes acumulam XP a cada atendimento, sobem de nível, competem no ranking e resgatam recompensas que você mesmo define. Fidelização que funciona de verdade.
                </p>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.875rem" }}>
                  {[
                    { icon:"⚡", label:"XP por Atendimento", desc:"Cada corte gera pontos automáticos" },
                    { icon:"🏆", label:"Rankings", desc:"Competição saudável entre clientes" },
                    { icon:"🎁", label:"Recompensas", desc:"Descontos e benefícios resgatáveis" },
                    { icon:"🎯", label:"Desafios", desc:"Missões que aumentam frequência" },
                  ].map(c => (
                    <div key={c.label} className="gam-card">
                      <div style={{ fontSize:"1.4rem",marginBottom:"0.5rem" }}>{c.icon}</div>
                      <div style={{ fontFamily:"var(--font-syne)",fontWeight:700,fontSize:"0.82rem",color:"#fff",marginBottom:"0.2rem" }}>{c.label}</div>
                      <div style={{ color:"#71717A",fontSize:"0.76rem",lineHeight:1.5 }}>{c.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="como-funciona" style={{ padding: "120px clamp(1.5rem,5vw,4rem)", background: "var(--surface)", borderTop: "1px solid rgba(200,155,60,0.08)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 4rem" }}>
              <div className="label" style={{ justifyContent: "center", marginBottom: "1rem" }}>Como Funciona</div>
              <h2 className="d-font" style={{ fontSize: "clamp(2.5rem,5vw,3.8rem)", fontWeight: 600, lineHeight: 1.08 }}>
                Pronto em <em style={{ color: "#C89B3C", fontStyle: "italic" }}>minutos.</em>
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
            {[
              { num: "01", title: "Crie sua conta", desc: "Cadastro em 2 minutos. Sem cartão de crédito." },
              { num: "02", title: "Configure sua barbearia", desc: "Adicione barbeiros, serviços e horários de funcionamento." },
              { num: "03", title: "Veja seu negócio crescer", desc: "Agendamentos, clientes e finanças, tudo organizado." },
            ].map((step, i) => (
              <Fragment key={step.num}>
                <Reveal delay={i * 0.15}>
                  <div style={{ flex: "0 0 auto", maxWidth: 280, textAlign: "center" }}>
                    <div style={{ width: 60, height: 60, borderRadius: 18, border: "1.5px solid rgba(200,155,60,0.35)", background: "rgba(200,155,60,0.07)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                      <span className="d-font" style={{ color: "#C89B3C", fontWeight: 700, fontSize: "1.4rem" }}>{step.num}</span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "1rem", marginBottom: "0.6rem" }}>{step.title}</h3>
                    <p style={{ color: "#71717A", fontSize: "0.85rem", lineHeight: 1.65 }}>{step.desc}</p>
                  </div>
                </Reveal>
                {i < 2 && (
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(200,155,60,0.5),rgba(200,155,60,0.1))", margin: "0 1.5rem", marginTop: 30 }} className="hide-m" />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── TESTIMONIALS (carousel) ───────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="depoimentos" style={{ padding: "120px clamp(1.5rem,5vw,4rem)", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "3rem" }}>
              <div className="label" style={{ marginBottom: "1rem" }}>Depoimentos</div>
              <h2 className="d-font" style={{ fontSize: "clamp(2.5rem,5vw,3.8rem)", fontWeight: 600, lineHeight: 1.08 }}>
                Quem usa, <em style={{ color: "#C89B3C", fontStyle: "italic" }}>não larga.</em>
              </h2>
            </div>
          </Reveal>

          {/* Featured testimonial */}
          <div style={{ marginBottom: "2rem" }}>
            <div key={testimonialIdx} style={{ background: "var(--surface)", border: "1px solid rgba(200,155,60,0.15)", borderRadius: 20, padding: "clamp(2rem,4vw,3rem)", position: "relative", overflow: "hidden", animation: "fade-in-up 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
              <div aria-hidden style={{ position: "absolute", top: -20, left: 28, fontFamily: "var(--font-cormorant),serif", fontSize: "10rem", lineHeight: 1, color: "rgba(200,155,60,0.08)", fontWeight: 700, pointerEvents: "none" }}>"</div>
              <div aria-hidden style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, background: "radial-gradient(ellipse,rgba(200,155,60,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />
              <p className="d-font" style={{ fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 400, lineHeight: 1.55, color: "#E4E4E7", maxWidth: 800, position: "relative", zIndex: 1, marginBottom: "2rem", fontStyle: "italic" }}>
                &ldquo;{TESTIMONIALS[testimonialIdx].quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,rgba(200,155,60,0.3),rgba(245,209,126,0.12))", border: "1px solid rgba(200,155,60,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-cormorant),serif", fontWeight: 700, fontSize: "1.3rem", color: "#C89B3C" }}>
                  {TESTIMONIALS[testimonialIdx].initial}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.9rem" }}>{TESTIMONIALS[testimonialIdx].name}</div>
                  <div style={{ color: "#71717A", fontSize: "0.78rem", marginTop: 2 }}>{TESTIMONIALS[testimonialIdx].shop}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)} style={{ width: i === testimonialIdx ? 28 : 8, height: 8, borderRadius: 100, border: "none", cursor: "pointer", padding: 0, background: i === testimonialIdx ? "#C89B3C" : "rgba(200,155,60,0.2)", transition: "all 0.35s ease" }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { dir: -1, label: "←" },
                { dir: 1,  label: "→" },
              ].map(({ dir, label }) => (
                <button key={dir} onClick={() => setTestimonialIdx(i => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  style={{ width: 44, height: 44, borderRadius: 12, border: "1px solid rgba(200,155,60,0.25)", background: "transparent", color: "#C89B3C", fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,155,60,0.1)"; e.currentTarget.style.borderColor = "rgba(200,155,60,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(200,155,60,0.25)"; }}
                >{label}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── PRICING ───────────────────────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="plano" style={{ padding: "120px clamp(1.5rem,5vw,4rem)", background: "var(--surface)", borderTop: "1px solid rgba(200,155,60,0.08)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div className="label" style={{ justifyContent: "center", marginBottom: "1rem" }}>Plano</div>
              <h2 className="d-font" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 600, lineHeight: 1.08 }}>
                Simples assim. <em style={{ color: "#C89B3C", fontStyle: "italic" }}>Tudo incluso.</em>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ maxWidth: 560, width: "100%", background: "var(--surface2)", border: "1.5px solid var(--gold)", borderRadius: 24, padding: "clamp(2rem,4vw,3rem)", position: "relative", boxShadow: "0 0 60px rgba(200,155,60,0.12), 0 40px 80px rgba(0,0,0,0.5)" }}>
              {/* Badge */}
              <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)" }}>
                <span className="badge">Tudo incluso</span>
              </div>
              {/* Glow */}
              <div aria-hidden style={{ position: "absolute", inset: 0, borderRadius: 24, background: "radial-gradient(ellipse at top,rgba(200,155,60,0.06) 0%,transparent 60%)", pointerEvents: "none" }} />

              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <div className="d-font g-text" style={{ fontSize: "clamp(3.5rem,7vw,5rem)", fontWeight: 700, lineHeight: 1 }}>{PLAN.price}</div>
                <div style={{ color: "#71717A", fontSize: "0.85rem", marginTop: "0.4rem" }}>{PLAN.sub}</div>
              </div>
              <hr className="g-rule" style={{ marginBottom: "2rem", opacity: 0.4 }} />
              <ul style={{ listStyle: "none", marginBottom: "2.25rem" }}>
                {PLAN.features.map(f => <li key={f} className="check-li" style={{ marginBottom: 14 }}>{f}</li>)}
              </ul>
              <Link href="https://app.barberxp.com.br/auth/login"
                style={{ display: "block", textAlign: "center", padding: "18px", borderRadius: 14, fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", background: "linear-gradient(135deg,#C89B3C,#F5D17E 50%,#C89B3C)", color: "#0A0A0A", boxShadow: "0 8px 30px rgba(200,155,60,0.3)", transition: "box-shadow 0.3s,transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 16px 45px rgba(200,155,60,0.45)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(200,155,60,0.3)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >Começar Agora — 30 Dias Grátis →</Link>
              <p style={{ textAlign: "center", color: "#3F3F46", fontSize: "0.75rem", marginTop: "1rem", fontFamily: "var(--font-syne)" }}>
                Sem cartão de crédito &nbsp;·&nbsp; Setup em 2 minutos
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "120px clamp(1.5rem,5vw,4rem)", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "3.5rem" }}>
              <div className="label" style={{ marginBottom: "1rem" }}>FAQ</div>
              <h2 className="d-font" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 600, lineHeight: 1.08 }}>
                Perguntas <em style={{ color: "#C89B3C", fontStyle: "italic" }}>frequentes.</em>
              </h2>
            </div>
          </Reveal>
          <div className="faq-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 5rem" }}>
            <div>{FAQ_ITEMS.slice(0, 3).map(item => <FaqItem key={item.q} {...item} />)}</div>
            <div>{FAQ_ITEMS.slice(3).map(item => <FaqItem key={item.q} {...item} />)}</div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(180deg,var(--bg) 0%,#100e07 50%,var(--bg) 100%)", borderTop: "1px solid rgba(200,155,60,0.1)", borderBottom: "1px solid rgba(200,155,60,0.1)", padding: "140px clamp(1.5rem,5vw,4rem)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 400, background: "radial-gradient(ellipse,rgba(200,155,60,0.1) 0%,transparent 65%)", pointerEvents: "none" }} />
        <Reveal>
          <div style={{ position: "relative" }}>
            <p style={{ fontFamily: "var(--font-syne)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C89B3C", marginBottom: "1.5rem" }}>
              ✦ &nbsp; Comece hoje, gratuitamente &nbsp; ✦
            </p>
            <h2 className="d-font" style={{ fontSize: "clamp(3.5rem,8vw,7rem)", fontWeight: 700, lineHeight: 0.98, letterSpacing: "-0.02em", marginBottom: "1.75rem" }}>
              Sua barbearia merece<br /><span className="g-shimmer">o melhor.</span>
            </h2>
            <p style={{ color: "#71717A", maxWidth: 460, margin: "0 auto 2.75rem", lineHeight: 1.75, fontSize: "1rem" }}>
              Junte-se a mais de 150 barbearias que já transformaram seus negócios com BarberXP.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="https://app.barberxp.com.br/auth/login" className="btn-gold" style={{ height: 56, fontSize: "0.9rem", padding: "0 2.5rem" }}>
                Criar Conta Grátis
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <a href="mailto:contato@barberxp.com" className="btn-outline" style={{ height: 56, fontSize: "0.9rem" }}>Falar com Especialista</a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer style={{ background: "#060606", padding: "60px clamp(1.5rem,5vw,4rem) 36px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.875rem" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#C89B3C,#F5D17E)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.1rem", color: "#0A0A0A" }}>B</div>
                <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.04em" }}>BARBER<span className="g-text">XP</span></span>
              </div>
              <p style={{ color: "#3F3F46", fontSize: "0.8rem", maxWidth: 220, lineHeight: 1.6 }}>A plataforma premium para barbearias que buscam excelência.</p>
            </div>
            <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
              {[
                { title: "Produto", items: ["Funcionalidades", "Plano", "API"] },
                { title: "Empresa", items: ["Sobre", "Blog", "Contato"] },
                { title: "Legal", items: ["Privacidade", "Termos", "Cookies"] },
              ].map(col => (
                <div key={col.title}>
                  <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#52525B", marginBottom: "0.875rem" }}>{col.title}</div>
                  {col.items.map(item => (
                    <div key={item} style={{ marginBottom: "0.5rem" }}>
                      <a href="#" style={{ color: "#3F3F46", textDecoration: "none", fontSize: "0.82rem", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#A1A1AA")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#3F3F46")}
                      >{item}</a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <hr className="g-rule" style={{ opacity: 0.12, marginBottom: "1.5rem" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ color: "#27272A", fontSize: "0.75rem" }}>© {new Date().getFullYear()} BarberXP. Todos os direitos reservados.</span>
            <span style={{ fontFamily: "var(--font-syne)", fontSize: "0.62rem", letterSpacing: "0.1em", color: "#27272A", textTransform: "uppercase" }}>Feito com ✦ para barbeiros de verdade</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
