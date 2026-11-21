import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { Marquee } from '../components/landing/Marquee';
import { ProblemSolution } from '../components/landing/ProblemSolution';
import { BentoFeatures } from '../components/landing/BentoFeatures';
import { HowItWorks } from '../components/landing/HowItWorks';
import { InteractiveLiveDemo } from '../components/landing/InteractiveLiveDemo';
import { Testimonials } from '../components/landing/Testimonials';
import { Pricing } from '../components/landing/Pricing';
import { CTASection } from '../components/landing/CTASection';
import { Footer } from '../components/landing/Footer';
import { DemoVideoModal } from '../components/landing/DemoVideoModal';
import { BackgroundOrbs } from '../components/common/BackgroundOrbs';

export const LandingPage = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Initialize Lenis smooth scroll if available
  useEffect(() => {
    let lenisInstance;
    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        function raf(time) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch (err) {
        // Fallback to standard smooth scrolling if Lenis fails
        console.warn('Lenis smooth scroll fallback:', err);
      }
    };

    initLenis();

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05070A] text-slate-100 overflow-x-hidden bg-grain selection:bg-[#00E5A0]/20 selection:text-[#00E5A0]">
      {/* Background Floating Orbs */}
      <BackgroundOrbs />

      {/* Floating Glass Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main>
        <Hero onOpenDemoModal={() => setIsDemoModalOpen(true)} />

        {/* Marquee Categories */}
        <Marquee />

        {/* Problem vs. Solution */}
        <ProblemSolution />

        {/* Bento Features Grid */}
        <BentoFeatures />

        {/* How It Works (Vertical Timeline) */}
        <HowItWorks />

        {/* Live Interactive Weight Sliders Demo */}
        <InteractiveLiveDemo />

        {/* Testimonials */}
        <Testimonials />

        {/* Pricing */}
        <Pricing />

        {/* Final CTA */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Demo Video Modal */}
      <DemoVideoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
};
