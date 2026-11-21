import React, { useEffect, useRef } from 'react';

export const HeroCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates for gentle interactive repulsion
    let mouse = { x: -1000, y: -1000, radius: 140 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Central Core Node (SourceFlow AI Brain)
    const getCenterNode = () => ({
      x: width * 0.5,
      y: height * 0.48,
      radius: width < 640 ? 10 : 14,
      glowRadius: width < 640 ? 28 : 40,
    });

    // Supplier Nodes (scaled down slightly on small devices for better battery & frame rates)
    const nodeCount = Math.min(32, Math.max(12, Math.floor(width / 45)));
    const nodes = [];

    const colors = [
      { r: 0, g: 229, b: 160 },   // Emerald
      { r: 34, g: 211, b: 238 },  // Cyan
      { r: 139, g: 92, b: 246 },  // Violet
    ];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 + (Math.random() * 0.4);
      const dist = (width < 640 ? 80 : 120) + Math.random() * (Math.min(width, height) * (width < 640 ? 0.38 : 0.42));
      const color = colors[i % colors.length];

      nodes.push({
        baseAngle: angle,
        baseDist: dist,
        x: width * 0.5 + Math.cos(angle) * dist,
        y: height * 0.48 + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 2,
        color: color,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        pulseOffset: Math.random() * Math.PI * 2,
        connectsToCenter: Math.random() > 0.35,
      });
    }

    // Streaming Data Packets traveling along connection lines
    const packetCount = width < 640 ? 8 : 16;
    const packets = [];
    for (let i = 0; i < packetCount; i++) {
      packets.push({
        nodeIndex: Math.floor(Math.random() * nodes.length),
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.006,
        size: Math.random() * 2 + 1.5,
        color: Math.random() > 0.5 ? '#00E5A0' : '#22D3EE',
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const center = getCenterNode();

      // Draw subtle orbital guide rings
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(center.x, center.y, width < 640 ? 100 : 160, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(center.x, center.y, width < 640 ? 180 : 280, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Update and draw peripheral nodes
      nodes.forEach((node) => {
        // Subtle floating movement
        node.x += node.vx;
        node.y += node.vy;

        // Keep within bounds
        if (node.x < 15 || node.x > width - 15) node.vx *= -1;
        if (node.y < 15 || node.y > height - 15) node.vy *= -1;

        // Mouse interaction (on desktop)
        const dxMouse = node.x - mouse.x;
        const dyMouse = node.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const force = (1 - distMouse / mouse.radius) * 3;
          node.x += (dxMouse / distMouse) * force;
          node.y += (dyMouse / distMouse) * force;
        }

        // Draw line to center if connected
        if (node.connectsToCenter) {
          const grad = ctx.createLinearGradient(node.x, node.y, center.x, center.y);
          grad.addColorStop(0, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.2)`);
          grad.addColorStop(1, 'rgba(0, 229, 160, 0.04)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(center.x, center.y);
          ctx.stroke();
        }

        // Connect with nearby sibling nodes
        nodes.forEach((otherNode) => {
          if (node === otherNode) return;
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = width < 640 ? 70 : 100;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });

        // Draw node dot
        const pulse = Math.sin(time * 2 + node.pulseOffset) * 0.5 + 0.5;
        const currentRadius = node.radius + pulse * 1.2;

        // Outer glow
        const nodeGlow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, currentRadius * 3);
        nodeGlow.addColorStop(0, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.5)`);
        nodeGlow.addColorStop(1, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0)`);
        ctx.fillStyle = nodeGlow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Solid core dot
        ctx.fillStyle = `rgb(${node.color.r}, ${node.color.g}, ${node.color.b})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update & Draw Flowing Packets (Streaming data towards center)
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.nodeIndex = Math.floor(Math.random() * nodes.length);
        }

        const sourceNode = nodes[p.nodeIndex];
        if (!sourceNode) return;

        const px = sourceNode.x + (center.x - sourceNode.x) * p.progress;
        const py = sourceNode.y + (center.y - sourceNode.y) * p.progress;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Central SourceFlow Core
      const corePulse = Math.sin(time * 2.5) * 4;
      const coreGrad = ctx.createRadialGradient(
        center.x, center.y, 0,
        center.x, center.y, center.glowRadius + corePulse
      );
      coreGrad.addColorStop(0, 'rgba(0, 229, 160, 0.4)');
      coreGrad.addColorStop(0.5, 'rgba(34, 211, 238, 0.15)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(center.x, center.y, center.glowRadius + corePulse, 0, Math.PI * 2);
      ctx.fill();

      // Center ring
      ctx.strokeStyle = '#00E5A0';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#00E5A0';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(center.x, center.y, center.radius + 2, 0, Math.PI * 2);
      ctx.stroke();

      // Solid central core
      const coreInnerGrad = ctx.createLinearGradient(
        center.x - 10, center.y - 10,
        center.x + 10, center.y + 10
      );
      coreInnerGrad.addColorStop(0, '#00E5A0');
      coreInnerGrad.addColorStop(1, '#22D3EE');

      ctx.fillStyle = coreInnerGrad;
      ctx.beginPath();
      ctx.arc(center.x, center.y, center.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none md:pointer-events-auto opacity-75"
    />
  );
};
