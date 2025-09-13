import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X, Copy, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ProductCards = () => {
  const { toast } = useToast();
  const [showQR, setShowQR] = useState<{ [key: string]: boolean }>({
    glow: false,
    quality: false,
    topaz: false
  });

  const copyUPI = () => {
    navigator.clipboard.writeText("7416348210-2@ybl");
    toast({
      title: "UPI ID Copied!",
      description: "You can now paste it in your payment app"
    });
  };

  const handlePayment = (productId: string) => {
    const product = products.find(p => p.id === productId);
    const amount = product?.price || 499;
    const upiLink = `upi://pay?pa=7416348210-2@ybl&pn=SXI.AEP&am=${amount}&cu=INR`;

    // Try to open UPI app
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
    
    if (isMobile) {
      window.location.href = upiLink;
    } else {
      // Show QR for desktop
      setShowQR(prev => ({
        ...prev,
        [productId]: true
      }));
    }
  };

  const products = [
    {
      id: "glow",
      title: "GLOW CC",
      caption: "One-click CC — instantly upgrade your footage to cinematic 4K quality.",
      image: "/lovable-uploads/86478832-d6d4-4253-b587-ae75db8515e1.png",
      requirements: ["After Effects", "Magic Bullet Looks", "BCC", "Sapphire"],
      price: 499
    },
    {
      id: "quality", 
      title: "QUALITY CC",
      caption: "One-click CC — instantly upgrade your footage to cinematic 4K quality.",
      image: "/lovable-uploads/c174a61f-bdbc-40b1-8209-a64d518b43e0.png",
      requirements: ["After Effects", "Magic Bullet Looks", "BCC", "Sapphire"],
      price: 499
    },
    {
      id: "topaz",
      title: "TOPAZ SETTINGS", 
      caption: "One-click Topaz settings upscale low-quality footage to sharp, professional 4K—reliably every time.",
      image: "/lovable-uploads/a1d9fc8a-3863-47d2-a235-4c049aceab65.png",
      requirements: ["After Effects", "Topaz Software"],
      price: 599
    }
  ];

  return (
    <section className="content-layer py-20 px-6 lg:px-12 relative overflow-hidden">
      {/* Firestorm background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-firestorm-red/10 rounded-full blur-3xl animate-fire-flicker"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-firestorm-orange/8 rounded-full blur-2xl animate-fire-flicker" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-6xl font-black text-foreground mb-4">
            GLOW & QUALITY & <span className="text-firestorm-red">TOPAZ SETTINGS</span>
          </h2>
          <p className="text-muted-foreground font-heading text-lg">
            Professional-grade presets and settings for instant cinematic results
          </p>
        </div>

        {/* Black ice-blur panel containing all cards */}
        <div className="bg-black/60 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8">
            {products.map(product => (
              <Card key={product.id} className="bg-card/80 border-border hover:border-firestorm-red/50 transition-all duration-500 hover:shadow-xl hover:shadow-firestorm-red/20 group cursor-pointer overflow-hidden relative">
                <div className="relative">
                  {/* 1:1 aspect ratio container */}
                  <div className="img-wrap aspect-square w-full max-w-[420px] bg-black/10 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={`${product.title} demonstration showing before and after color correction effects`} 
                      className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105" 
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-4">
                  {/* Title with GET IT pill at right end */}
                  <div className="mb-2">
                    <h3 className="product-title flex items-center justify-between">
                      <span className="font-heading font-bold text-foreground text-lg">{product.title}</span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button 
                            className="getit-pill relative bg-firestorm-red text-black hover:bg-firestorm-red/90 font-heading font-bold text-xs px-3 py-1.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
                            aria-label={`Get ${product.title}`}
                          >
                            <div className="absolute -inset-1 bg-gradient-to-r from-firestorm-red via-firestorm-orange to-firestorm-red rounded-full blur opacity-30 animate-[rotate_3s_linear_infinite]"></div>
                            <span className="relative">GET IT</span>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="bg-card border-border max-w-2xl max-h-[calc(100vh-96px)] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="font-display text-2xl text-foreground">{product.title}</DialogTitle>
                          </DialogHeader>
                          
                            <div className="space-y-6">
                            <div className="aspect-square w-full bg-black/10 overflow-hidden rounded-lg">
                              <img 
                                src={product.image} 
                                alt={`${product.title} preview`} 
                                className="w-full h-full object-contain object-center" 
                              />
                            </div>
                            
                            <p className="text-muted-foreground">{product.caption}</p>
                            
                            <div className="space-y-2">
                              <p className="font-heading font-bold text-firestorm-red text-xl">PRICE — ₹{product.price}</p>
                              <div>
                                <p className="font-heading font-bold text-foreground mb-2">Requirements:</p>
                                <ul className="text-muted-foreground space-y-1">
                                  {product.requirements.map((req, index) => (
                                    <li key={index}>• {req}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <Button 
                              onClick={() => handlePayment(product.id)} 
                              className="w-full bg-firestorm-red hover:bg-firestorm-red/90 text-white font-heading font-bold py-3 text-lg shadow-ember"
                            >
                              PAY ₹{product.price}
                            </Button>

                            {/* Payment Instructions */}
                            <div className="bg-background/50 border border-border rounded-lg p-4 space-y-3">
                              <div className="flex items-start gap-3">
                                <Info className="w-5 h-5 text-firestorm-red mt-0.5 flex-shrink-0" />
                                <div className="space-y-3">
                                  <h4 className="font-heading font-bold text-foreground">Payment Instructions</h4>
                                  <ul className="text-muted-foreground text-sm space-y-2">
                                    <li>• Take a screenshot of your payment confirmation.</li>
                                    <li>• To pay: click <strong>"Pay"</strong> to reveal the QR — scan it with any UPI app to complete payment.</li>
                                    <li>• <strong>
                                      <a 
                                        href={`https://wa.me/917416348210?text=Hi%2C%20I%20have%20completed%20the%20payment%20for%20${encodeURIComponent(product.title)}%20and%20will%20attach%20the%20screenshot.%20Please%20confirm.`}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-firestorm-red hover:underline"
                                        aria-label="Send payment screenshot via WhatsApp"
                                      >
                                        SEND THE PAYMENT SCREENSHOTS, BY CLICKING HERE
                                      </a>
                                    </strong></li>
                                    <li>• I'll verify it and send you the file for your purchase.</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* QR Code and UPI ID - Always visible on mobile/desktop */}
                            <div className="border border-border rounded-lg p-4 space-y-4 bg-background/30">
                              <div className="qr-block flex flex-col sm:flex-row items-center gap-4">
                                {/* TODO: Replace with actual uploaded QR image */}
                                <div className="bg-white p-4 rounded-lg">
                                  <img 
                                    src="/lovable-uploads/5a34f9dd-dbc1-4176-9605-9958df9b6390.png" 
                                    alt="UPI QR code for payment" 
                                    className="w-40 h-40 object-contain" 
                                  />
                                </div>
                                <div className="text-center sm:text-left space-y-2">
                                  <div className="font-heading font-bold text-foreground">UPI ID</div>
                                  <div 
                                    id={`upi-id-${product.id}`} 
                                    className="select-all bg-background/50 px-3 py-1 rounded text-sm font-mono"
                                  >
                                    7416348210-2@ybl
                                  </div>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={copyUPI} 
                                    className="w-full sm:w-auto border-border hover:bg-accent"
                                    aria-label="Copy UPI ID to clipboard"
                                  >
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy UPI ID
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{product.caption}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};