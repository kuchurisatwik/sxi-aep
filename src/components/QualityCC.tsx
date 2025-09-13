import { Card, CardContent } from "@/components/ui/card";
export const QualityCC = () => {
  return <section className="content-layer py-20 px-6 lg:px-12 bg-gradient-to-br from-red-800 to-red-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-6xl font-black text-white mb-4">
            QUALITY <span className="text-[#FF6B61]">CC</span>
          </h2>
          <p className="text-white/80 font-heading text-lg">
            Professional-grade color correction and enhancement presets
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Without CC */}
          

          {/* With CC */}
          <Card className="bg-black/20 border-white/20 overflow-hidden">
            <div className="relative">
              <img src="/lovable-uploads/a4ec4653-95da-4ed9-b61e-0653ca6466d9.png" alt="Same portrait with quality CC showing enhanced detail and color" className="w-full h-80 object-cover object-center" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-white text-black px-3 py-1 rounded font-heading font-bold text-sm">
                  WITH CC
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>;
};