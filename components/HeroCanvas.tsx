"use client";

import { useEffect, useRef } from "react";

type HeroCanvasProps = {
  className?: string;
};

type LineOpts = {
  len: number;
  count: number;
  baseTime: number;
  addedTime: number;
  dieChance: number;
  spawnChance: number;
  sparkChance: number;
  sparkDist: number;
  sparkSize: number;
  color: string;
  baseLight: number;
  addedLight: number;
  shadowToTimePropMult: number;
  baseLightInputMultiplier: number;
  addedLightInputMultiplier: number;
  cx: number;
  cy: number;
  repaintAlpha: number;
  hueChange: number;
};

const HeroCanvas = ({ className }: HeroCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size off the hero section (canvas's parent), not the canvas itself —
    // observing the canvas would just re-trigger on the width/height we set below.
    const container = canvas.parentElement;
    const getSize = () => {
      if (container) {
        const rect = container.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      }
      return { width: window.innerWidth, height: window.innerHeight };
    };

    let running = true;
    let frameId = 0;

    let { width: w, height: h } = getSize();
    canvas.width = w;
    canvas.height = h;

    const opts: LineOpts = {
      len: 20,
      count: 50,
      baseTime: 10,
      addedTime: 10,
      dieChance: 0.05,
      spawnChance: 1,
      sparkChance: 0.1,
      sparkDist: 10,
      sparkSize: 2,

      color: "hsl(hue,100%,light%)",
      baseLight: 50,
      addedLight: 10, // [50-10,50+10]
      shadowToTimePropMult: 6,
      baseLightInputMultiplier: 0.01,
      addedLightInputMultiplier: 0.02,

      cx: w / 2,
      cy: h / 2,
      repaintAlpha: 0.04,
      hueChange: 0.1,
    };

    let tick = 0;
    let dieX = w / 2 / opts.len;
    let dieY = h / 2 / opts.len;
    const baseRad = (Math.PI * 2) / 6;

    class Line {
      x = 0;
      y = 0;
      addedX = 0;
      addedY = 0;
      rad = 0;
      lightInputMultiplier = 0;
      color = "";
      cumulativeTime = 0;
      time = 0;
      targetTime = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = 0;
        this.y = 0;
        this.addedX = 0;
        this.addedY = 0;

        this.rad = 0;

        this.lightInputMultiplier =
          opts.baseLightInputMultiplier +
          opts.addedLightInputMultiplier * Math.random();

        this.color = opts.color.replace("hue", String(tick * opts.hueChange));
        this.cumulativeTime = 0;

        this.beginPhase();
      }

      beginPhase() {
        this.x += this.addedX;
        this.y += this.addedY;

        this.time = 0;
        this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;

        this.rad += baseRad * (Math.random() < 0.5 ? 1 : -1);
        this.addedX = Math.cos(this.rad);
        this.addedY = Math.sin(this.rad);

        if (
          Math.random() < opts.dieChance ||
          this.x > dieX ||
          this.x < -dieX ||
          this.y > dieY ||
          this.y < -dieY
        )
          this.reset();
      }

      step() {
        ++this.time;
        ++this.cumulativeTime;

        if (this.time >= this.targetTime) this.beginPhase();

        const prop = this.time / this.targetTime;
        const wave = Math.sin((prop * Math.PI) / 2);
        const x = this.addedX * wave;
        const y = this.addedY * wave;

        ctx.shadowBlur = prop * opts.shadowToTimePropMult;
        ctx.fillStyle = ctx.shadowColor = this.color.replace(
          "light",
          String(
            opts.baseLight +
              opts.addedLight *
                Math.sin(this.cumulativeTime * this.lightInputMultiplier)
          )
        );
        ctx.fillRect(
          opts.cx + (this.x + x) * opts.len,
          opts.cy + (this.y + y) * opts.len,
          2,
          2
        );

        if (Math.random() < opts.sparkChance)
          ctx.fillRect(
            opts.cx +
              (this.x + x) * opts.len +
              Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) -
              opts.sparkSize / 2,
            opts.cy +
              (this.y + y) * opts.len +
              Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) -
              opts.sparkSize / 2,
            opts.sparkSize,
            opts.sparkSize
          );
      }
    }

    const lines: Line[] = [];

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);

    function loop() {
      if (!running) return;
      frameId = window.requestAnimationFrame(loop);

      ++tick;

      ctx.globalCompositeOperation = "source-over";
      ctx.shadowBlur = 0;
      ctx.fillStyle = `rgba(0,0,0,${opts.repaintAlpha})`;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      if (lines.length < opts.count && Math.random() < opts.spawnChance)
        lines.push(new Line());

      lines.forEach((line) => line.step());
    }

    loop();

    const resizeObserver = new ResizeObserver(() => {
      const size = getSize();
      w = canvas.width = size.width;
      h = canvas.height = size.height;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      opts.cx = w / 2;
      opts.cy = h / 2;

      dieX = w / 2 / opts.len;
      dieY = h / 2 / opts.len;
    });
    resizeObserver.observe(container ?? canvas);

    return () => {
      running = false;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
};

export default HeroCanvas;
