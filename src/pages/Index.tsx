import { Hero } from "@/components/Hero";
import { Playbooks } from "@/components/Playbooks";
import { ProductCards } from "@/components/ProductCards";
import { CommissionForm } from "@/components/CommissionForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Spline 3D Background */}
      <div className="fixed inset-0 w-full h-full" style={{ zIndex: -10 }}>
        <iframe 
          src="https://my.spline.design/embers-K7yxfCijbn9LnkZWtWtKVH65/" 
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="w-full h-full"
          style={{ pointerEvents: 'none', border: 'none' }}
          aria-hidden="true"
          title="3D Background Animation"
          allow="accelerometer; gyroscope; magnetometer; xr-spatial-tracking;"
        />
      </div>
      
      {/* Subtle overlay for text contrast */}
      <div className="fixed inset-0 bg-black/10" style={{ zIndex: -5 }}></div>
      
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <Playbooks />
        <ProductCards />
        <CommissionForm />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
