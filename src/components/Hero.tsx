import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Twitter } from 'lucide-react';
import heroImage from '@/assets/hero-poster.jpg';
import logo from '@/assets/logo.png';
export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const {
        clientX,
        clientY
      } = e;
      const {
        innerWidth,
        innerHeight
      } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({
        x,
        y
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return <section className="content-layer min-h-[60vh] flex items-center px-6 lg:px-12 py-6 lg:py-12 relative overflow-hidden">
      {/* Firestorm animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-firestorm-red/20 rounded-full blur-3xl animate-fire-flicker"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-firestorm-orange/15 rounded-full blur-2xl animate-fire-flicker" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-firestorm-ember/25 rounded-full blur-xl animate-pulse-fire" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="mb-6">
            <img 
              src={logo} 
              alt="SXI.AEP Logo" 
              className="h-16 lg:h-20 mx-auto filter drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 hover-fire" 
            />
          </div>
          
          {/* Centered Hero Copy */}
          <div className="space-y-4">
            <h1 className="font-display text-6xl lg:text-8xl xl:text-9xl font-black text-foreground leading-[0.85] tracking-tight" aria-label="SXI.AEP - Cinematic edits">
              SXI.<span className="text-[#FF6B61] text-shadow-glow">AEP</span>
            </h1>
            <p className="font-heading text-xl lg:text-2xl text-muted-foreground font-semibold tracking-wide">
              Cinematic edits • Social reels • Celebrity cuts
            </p>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Premium CC presets & Topaz settings for flawless, high-quality edits. Boost your videos with cinematic colorgrading & crystal-clear upscaling. Perfect for editors who want pro results.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-firestorm-red/30 text-foreground hover:bg-firestorm-red/10 hover:border-firestorm-red/50 px-8 py-6 text-lg font-heading font-semibold transition-all duration-300 hover-fire shadow-ember"
              onClick={() => {
                const orderSection = document.querySelector('#order');
                if (orderSection) {
                  orderSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              aria-label="Request edit - scroll to order form"
            >
              Request Edit
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-8">
            <a
              href="https://www.instagram.com/sxi.aep/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow SXI.AEP on Instagram"
              className="text-muted-foreground hover:text-firestorm-red transition-colors duration-300 hover:scale-110 transform"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/@sxi.aep1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Subscribe to SXI.AEP on YouTube"
              className="text-muted-foreground hover:text-firestorm-red transition-colors duration-300 hover:scale-110 transform"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/sxiaep"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow SXI.AEP on X (formerly Twitter)"
              className="text-muted-foreground hover:text-firestorm-red transition-colors duration-300 hover:scale-110 transform"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Firestorm energy lines */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-firestorm-red to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-firestorm-orange to-transparent"></div>
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-firestorm-ember to-transparent"></div>
        </div>
      </div>
    </section>;
};