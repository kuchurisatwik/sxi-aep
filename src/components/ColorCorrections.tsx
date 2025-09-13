import { Card } from "@/components/ui/card";
export const ColorCorrections = () => {
  return <section className="content-layer py-20 px-6 lg:px-12 relative overflow-hidden">
      {/* Firestorm background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-firestorm-red/10 rounded-full blur-3xl animate-fire-flicker"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-firestorm-orange/8 rounded-full blur-2xl animate-fire-flicker" style={{
        animationDelay: '3s'
      }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-6xl font-black text-foreground mb-4">
            GLOW & QUALITY <span className="text-firestorm-red">COLOR CORRECTIONS</span>
          </h2>
          <p className="text-muted-foreground font-heading text-lg">
            Professional-grade color correction and enhancement presets
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Glow CC */}
          <Card className="bg-card border-border hover:border-firestorm-red/50 transition-all duration-500 hover:shadow-xl hover:shadow-firestorm-red/20 group cursor-pointer overflow-hidden">
            <div className="relative">
              <img src="/lovable-uploads/86478832-d6d4-4253-b587-ae75db8515e1.png" alt="Portrait with professional glow color correction showing enhanced lighting and warmth" className="w-full h-80 object-cover object-center transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-firestorm-red text-white px-3 py-1 rounded font-heading font-bold text-sm shadow-ember">
                  GLOW CC
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-heading font-bold text-foreground text-lg mb-2">Glow Color Correction</h3>
              
            </div>
          </Card>

          {/* Quality CC */}
          <Card className="bg-card border-border hover:border-firestorm-red/50 transition-all duration-500 hover:shadow-xl hover:shadow-firestorm-red/20 group cursor-pointer overflow-hidden">
            <div className="relative">
              <img src="/lovable-uploads/c174a61f-bdbc-40b1-8209-a64d518b43e0.png" alt="Portrait with quality color correction showing enhanced detail and color accuracy" className="w-full h-80 object-cover object-center transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 right-4">
                <span className="bg-firestorm-orange text-white px-3 py-1 rounded font-heading font-bold text-sm shadow-ember">
                  QUALITY CC
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-heading font-bold text-foreground text-lg mb-2">Quality Color Correction</h3>
              
            </div>
          </Card>
        </div>
      </div>
    </section>;
};