import { Card, CardContent } from "@/components/ui/card";
export const GlowCC = () => {
  return <section className="content-layer py-20 px-6 lg:px-12 bg-gradient-to-br from-red-900 to-red-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-6xl font-black text-white mb-4">
            GLOW <span className="text-[#FF6B61]">CC</span>
          </h2>
          <p className="text-white/80 font-heading text-lg">
            Colorgrading & crystal-clear upscaling. Perfect for editors who want pro results
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* With CC */}
          

          {/* Without CC */}
          <Card className="bg-black/20 border-white/20 overflow-hidden">
            <div className="relative">
              <img src="/lovable-uploads/a4ec4653-95da-4ed9-b61e-0653ca6466d9.png" alt="Same portrait without CC showing basic lighting and color" className="w-full h-80 object-cover object-center filter brightness-75 contrast-75 saturate-50" />
              <div className="absolute top-4 left-4">
                <span className="bg-white/80 text-black px-3 py-1 rounded font-heading font-bold text-sm">
                  WITHOUT CC
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>;
};