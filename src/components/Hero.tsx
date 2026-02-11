'use client';

import { useEffect, useRef, useState } from 'react';

import TextRotator from './TextRotator';
import ConsultationModal from './ConsultationModal';

/* ──────────────────────────────────
   Types
   ────────────────────────────────── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  life: number;
  maxLife: number;
}

/* ──────────────────────────────────
   Component
   ────────────────────────────────── */
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const realMouseActiveRef = useRef(false);
  const blendRef = useRef(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    /* ── Resize ── */
    function resize() {
      const parent = canvas!.parentElement!;
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas!.width = W * DPR;
      canvas!.height = H * DPR;
      canvas!.style.width = W + 'px';
      canvas!.style.height = H + 'px';
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    /* ── Mouse / touch tracking ── */
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      realMouseActiveRef.current = true;
    }
    function onMouseLeave() {
      realMouseActiveRef.current = false;
    }
    function onTouchMove(e: TouchEvent) {
      const rect = canvas!.getBoundingClientRect();
      const t = e.touches[0];
      mouseRef.current.x = t.clientX - rect.left;
      mouseRef.current.y = t.clientY - rect.top;
      realMouseActiveRef.current = true;
    }
    function onTouchEnd() {
      realMouseActiveRef.current = false;
    }
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    /* ── Pattern constants ── */
    const TILE = 110;
    const GLOW_R = 220;
    const BASE_ALPHA = 0.13;
    const GLOW_ALPHA = 0.72;

    /* ── Particles ── */
    const particles: Particle[] = [];
    function spawnParticle(): Particle {
      return {
        x: Math.random() * 4000 - 500,
        y: Math.random() * 3000 - 200,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.15 - Math.random() * 0.35,
        size: 0.8 + Math.random() * 1.6,
        baseOpacity: 0.15 + Math.random() * 0.3,
        life: Math.random() * 400,
        maxLife: 350 + Math.random() * 350,
      };
    }
    for (let i = 0; i < 50; i++) particles.push(spawnParticle());

    /* ── Drawing helpers ── */

    /** 8-pointed star (octagram) */
    function drawStar(cx: number, cy: number, outerR: number, innerR: number, alpha: number, lw: number) {
      if (alpha < 0.005) return;
      ctx!.strokeStyle = `rgba(198,153,62,${alpha})`;
      ctx!.lineWidth = lw;
      ctx!.beginPath();
      for (let i = 0; i < 16; i++) {
        const angle = (i * Math.PI) / 8 - Math.PI / 2;
        const r = i % 2 === 0 ? outerR : innerR;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
      }
      ctx!.closePath();
      ctx!.stroke();
    }

    /** Inner rosette (octagon) */
    function drawRosette(cx: number, cy: number, r: number, alpha: number, lw: number) {
      if (alpha < 0.005) return;
      ctx!.strokeStyle = `rgba(198,153,62,${alpha})`;
      ctx!.lineWidth = lw;
      ctx!.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4 - Math.PI / 8;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
      }
      ctx!.closePath();
      ctx!.stroke();
    }

    /** Kite bridges connecting adjacent stars */
    function drawBridges(cx: number, cy: number, outerR: number, alpha: number, lw: number, tile: number) {
      if (alpha < 0.005) return;
      ctx!.strokeStyle = `rgba(198,153,62,${alpha * 0.55})`;
      ctx!.lineWidth = lw * 0.65;
      const half = tile / 2;
      const kiteIn = outerR * 0.65;
      const dirs = [
        { dx: 0, dy: -1, a: -Math.PI / 2 },
        { dx: 1, dy: 0, a: 0 },
        { dx: 0, dy: 1, a: Math.PI / 2 },
        { dx: -1, dy: 0, a: Math.PI },
      ];
      for (const d of dirs) {
        const edgeX = cx + d.dx * half;
        const edgeY = cy + d.dy * half;
        const tipX = cx + Math.cos(d.a) * outerR;
        const tipY = cy + Math.sin(d.a) * outerR;
        const perpA = d.a + Math.PI / 2;
        const sideX1 = cx + Math.cos(d.a) * kiteIn + Math.cos(perpA) * (tile * 0.1);
        const sideY1 = cy + Math.sin(d.a) * kiteIn + Math.sin(perpA) * (tile * 0.1);
        const sideX2 = cx + Math.cos(d.a) * kiteIn - Math.cos(perpA) * (tile * 0.1);
        const sideY2 = cy + Math.sin(d.a) * kiteIn - Math.sin(perpA) * (tile * 0.1);
        ctx!.beginPath();
        ctx!.moveTo(tipX, tipY);
        ctx!.lineTo(sideX1, sideY1);
        ctx!.lineTo(edgeX, edgeY);
        ctx!.lineTo(sideX2, sideY2);
        ctx!.closePath();
        ctx!.stroke();
      }
    }

    /** Secondary cross/diamond pattern between four stars */
    function drawSecondaryPattern(cx: number, cy: number, size: number, alpha: number, lw: number) {
      if (alpha < 0.005) return;
      ctx!.strokeStyle = `rgba(198,153,62,${alpha * 0.35})`;
      ctx!.lineWidth = lw * 0.45;
      const r = size * 0.22;
      ctx!.beginPath();
      ctx!.moveTo(cx, cy - r);
      ctx!.lineTo(cx + r, cy);
      ctx!.lineTo(cx, cy + r);
      ctx!.lineTo(cx - r, cy);
      ctx!.closePath();
      ctx!.stroke();
      const cr = r * 0.45;
      ctx!.beginPath();
      ctx!.moveTo(cx - cr, cy - cr);
      ctx!.lineTo(cx + cr, cy + cr);
      ctx!.moveTo(cx + cr, cy - cr);
      ctx!.lineTo(cx - cr, cy + cr);
      ctx!.stroke();
    }

    /** Radial construction lines inside a star */
    function drawRadials(cx: number, cy: number, innerR: number, outerR: number, alpha: number, lw: number) {
      if (alpha < 0.005) return;
      ctx!.strokeStyle = `rgba(198,153,62,${alpha * 0.2})`;
      ctx!.lineWidth = lw * 0.35;
      ctx!.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        ctx!.moveTo(cx + Math.cos(angle) * innerR * 0.35, cy + Math.sin(angle) * innerR * 0.35);
        ctx!.lineTo(cx + Math.cos(angle) * outerR * 0.7, cy + Math.sin(angle) * outerR * 0.7);
      }
      ctx!.stroke();
    }

    /* ═══════════════════════════════
       Animation Loop
       ═══════════════════════════════ */
    startRef.current = performance.now();

    function animate(now: number) {
      const elapsed = (now - startRef.current) / 1000;

      // Entrance (0→1 over 3.5s, ease-out cubic)
      const rawEntrance = Math.min(1, elapsed / 3.5);
      const entrance = 1 - Math.pow(1 - rawEntrance, 3);

      /* ── Autonomous glow (Lissajous path) ── */
      const sp = 0.18;
      const autoX = W * 0.5 + Math.sin(elapsed * sp) * W * 0.32 + Math.sin(elapsed * sp * 1.7 + 1.2) * W * 0.08;
      const autoY = H * 0.5 + Math.cos(elapsed * sp * 0.7 + 0.5) * H * 0.28 + Math.cos(elapsed * sp * 2.1 + 2.0) * H * 0.06;

      // Smooth blend: 0 = autonomous, 1 = real mouse
      const target = realMouseActiveRef.current ? 1 : 0;
      blendRef.current += (target - blendRef.current) * 0.035;
      const b = blendRef.current;

      const realX = mouseRef.current.x;
      const realY = mouseRef.current.y;
      const mx = b > 0.01 ? realX * b + autoX * (1 - b) : autoX;
      const my = b > 0.01 ? realY * b + autoY * (1 - b) : autoY;

      /* ── Background ── */
      ctx!.clearRect(0, 0, W, H);
      const bg = ctx!.createLinearGradient(0, 0, W * 0.4, H);
      bg.addColorStop(0, '#18131e');
      bg.addColorStop(0.35, '#1b1218');
      bg.addColorStop(0.65, '#16121e');
      bg.addColorStop(1, '#0e0b14');
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, W, H);

      const cg = ctx!.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, Math.max(W, H) * 0.55);
      cg.addColorStop(0, 'rgba(92,61,46,0.06)');
      cg.addColorStop(0.5, 'rgba(198,153,62,0.02)');
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx!.fillStyle = cg;
      ctx!.fillRect(0, 0, W, H);

      const maxD = Math.sqrt(W * W + H * H) * 0.5;

      /* ── Layer 1: Primary star pattern ── */
      const cols = Math.ceil(W / TILE) + 3;
      const rows = Math.ceil(H / TILE) + 3;
      const startX = -TILE;
      const startY = -TILE;
      const parX1 = (mx - W / 2) * 0.012;
      const parY1 = (my - H / 2) * 0.012;

      ctx!.lineCap = 'round';
      ctx!.lineJoin = 'round';

      const outerR = TILE * 0.38;
      const innerR = TILE * 0.18;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const cx = startX + c * TILE + TILE / 2 + parX1;
          const cy = startY + r * TILE + TILE / 2 + parY1;

          const dCenter = Math.sqrt((cx - W / 2) ** 2 + (cy - H / 2) ** 2);
          const delay = dCenter / maxD;
          const prog = Math.max(0, Math.min(1, (entrance - delay * 0.55) / 0.45));
          if (prog <= 0) continue;

          const dMouse = Math.sqrt((cx - mx) ** 2 + (cy - my) ** 2);
          const glow = Math.max(0, 1 - dMouse / GLOW_R);
          const glowQ = glow * glow;
          const pulse = Math.sin(elapsed * 0.6 + cx * 0.008 + cy * 0.01) * 0.025;
          const alpha = Math.min(1, (BASE_ALPHA + glowQ * GLOW_ALPHA + pulse) * prog);
          const lw = 0.7 + glowQ * 1.4;

          drawStar(cx, cy, outerR, innerR, alpha, lw);
          drawRosette(cx, cy, innerR * 0.55, alpha * 0.45, lw * 0.5);
          drawBridges(cx, cy, outerR, alpha, lw, TILE);
          drawRadials(cx, cy, innerR, outerR, alpha, lw);

          if (c > 0 && r > 0) {
            const sx = startX + c * TILE + parX1;
            const sy = startY + r * TILE + parY1;
            const dMouse2 = Math.sqrt((sx - mx) ** 2 + (sy - my) ** 2);
            const glow2 = Math.max(0, 1 - dMouse2 / GLOW_R);
            const alpha2 = Math.min(1, (BASE_ALPHA + glow2 * glow2 * GLOW_ALPHA + pulse) * prog);
            drawSecondaryPattern(sx, sy, TILE, alpha2, lw);
          }

          if (glowQ > 0.15) {
            ctx!.strokeStyle = `rgba(198,153,62,${glowQ * 0.12 * prog})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.arc(cx, cy, outerR * 1.15, 0, Math.PI * 2);
            ctx!.stroke();
          }
        }
      }

      /* ── Layer 2: Finer overlay pattern ── */
      const TILE2 = TILE * 0.42;
      const outerR2 = TILE2 * 0.32;
      const innerR2 = TILE2 * 0.14;
      const parX2 = (mx - W / 2) * -0.006;
      const parY2 = (my - H / 2) * -0.006;
      const cols2 = Math.ceil(W / TILE2) + 4;
      const rows2 = Math.ceil(H / TILE2) + 4;

      for (let c = 0; c < cols2; c++) {
        for (let r = 0; r < rows2; r++) {
          const cx = -TILE2 + c * TILE2 + TILE2 / 2 + parX2;
          const cy = -TILE2 + r * TILE2 + TILE2 / 2 + parY2;
          const dCenter = Math.sqrt((cx - W / 2) ** 2 + (cy - H / 2) ** 2);
          const delay = dCenter / maxD;
          const prog = Math.max(0, Math.min(1, (entrance - delay * 0.6 - 0.15) / 0.4));
          if (prog <= 0) continue;
          const dMouse = Math.sqrt((cx - mx) ** 2 + (cy - my) ** 2);
          const glow = Math.max(0, 1 - dMouse / (GLOW_R * 0.7));
          const glowQ = glow * glow;
          const alpha = Math.min(1, (BASE_ALPHA * 0.35 + glowQ * GLOW_ALPHA * 0.35) * prog);
          const lw = 0.35 + glowQ * 0.5;
          drawStar(cx, cy, outerR2, innerR2, alpha, lw);
        }
      }

      /* ── Glow aura ── */
      const mg = ctx!.createRadialGradient(mx, my, 0, mx, my, GLOW_R * 0.9);
      mg.addColorStop(0, 'rgba(198,153,62,0.055)');
      mg.addColorStop(0.4, 'rgba(198,153,62,0.02)');
      mg.addColorStop(1, 'rgba(198,153,62,0)');
      ctx!.fillStyle = mg;
      ctx!.fillRect(0, 0, W, H);

      /* ── Particles ── */
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life > p.maxLife || p.x < -80 || p.x > W + 80 || p.y < -80 || p.y > H + 80) {
          Object.assign(p, spawnParticle());
          p.x = Math.random() * W;
          p.y = H + 20;
          p.life = 0;
        }
        const t = p.life / p.maxLife;
        const fade = Math.min(1, t * 6) * Math.max(0, 1 - (t - 0.75) * 4);
        const po = p.baseOpacity * fade * entrance;
        if (po < 0.005) continue;
        ctx!.fillStyle = `rgba(198,153,62,${po})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      /* ── Vignette ── */
      const vig = ctx!.createRadialGradient(W / 2, H / 2, W * 0.22, W / 2, H / 2, Math.max(W, H) * 0.85);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.45)');
      ctx!.fillStyle = vig;
      ctx!.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-content">
        <div className="hero-arabic">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
        <div className="hero-tagline">Through the Desert, to Your Home</div>
        <h1>
          Spaces that bring
          <br />
          families <TextRotator words={['closer', 'together', 'warm', 'alive']} color="var(--desert-gold)" />
        </h1>
        <p className="hero-subtitle">
          Traditional craftsmanship meets purposeful design — handcrafted furnishings that nurture
          togetherness, hospitality, and the spirit of home.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => setModalOpen(true)}>
            Start Your Journey ✦
          </button>
          <button className="btn-secondary" onClick={() => document.querySelector('.products')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Collection →
          </button>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
