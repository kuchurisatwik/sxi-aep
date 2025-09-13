import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const popularEdits = [
  {
    title: "FIRESTORM Edit",
    description: "Explosive action sequence with cinematic fire effects",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "/lovable-uploads/f91f810d-e703-4cfa-86dd-edb84d63f6b2.png",
    alt: "Firestorm cinematic edit showcase"
  },
  {
    title: "Reel Pack — Action",
    description: "High-energy vertical cuts with dynamic transitions",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "/lovable-uploads/099df520-19a4-49b0-9ee5-caaa3c032b60.png",
    alt: "Action reel editing showcase"
  },
  {
    title: "Celebrity Style Cut",
    description: "Premium editing with celebrity-grade color grading",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "/lovable-uploads/0585b77e-6e06-44c3-8a97-9a0cd63a6682.png",
    alt: "Celebrity style edit showcase"
  },
  {
    title: "Storm Sequence",
    description: "Dramatic weather effects with intense color grading",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnail: "/lovable-uploads/7f2d4148-269e-4737-ad5e-af91112725b3.png",
    alt: "Storm sequence edit showcase"
  }
];

export const Playbooks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
  const [lastTapTime, setLastTapTime] = useState<{ [key: number]: number }>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initialize intersection observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement;
            const dataSrcWebm = video.getAttribute('data-src-webm');
            const dataSrcMp4 = video.getAttribute('data-src-mp4');
            
            if (dataSrcWebm && !video.src) {
              // Check if browser supports webm
              if (video.canPlayType('video/webm').replace(/no/, '')) {
                video.src = dataSrcWebm;
              } else if (dataSrcMp4) {
                video.src = dataSrcMp4;
              }
              video.load();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const toggleVideoPlayback = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      const isPlaying = playingVideos.has(index);
      const newPlayingVideos = new Set(playingVideos);
      
      if (isPlaying) {
        video.pause();
        newPlayingVideos.delete(index);
      } else {
        video.play().catch(() => {
          // Handle autoplay restrictions
        });
        newPlayingVideos.add(index);
      }
      setPlayingVideos(newPlayingVideos);
    }
  };

  const handleVideoHover = (index: number, isHovering: boolean) => {
    setHoveredIndex(isHovering ? index : null);
  };

  const handleDoubleTap = (index: number) => {
    const now = Date.now();
    const lastTap = lastTapTime[index] || 0;
    
    if (now - lastTap < 300) {
      // Double tap detected
      toggleVideoPlayback(index);
    }
    
    setLastTapTime({
      ...lastTapTime,
      [index]: now
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleVideoPlayback(index);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % popularEdits.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + popularEdits.length) % popularEdits.length);
  };

  return (
    <section className="content-layer py-20 px-6 lg:px-12 relative overflow-hidden">
      {/* Firestorm background effects for section */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-firestorm-red/10 rounded-full blur-3xl animate-fire-flicker"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-firestorm-orange/8 rounded-full blur-2xl animate-fire-flicker" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-6xl font-black text-foreground mb-4">
            POPULAR<span className="text-firestorm-red">EDITS</span>
          </h2>
          <p className="text-muted-foreground font-heading text-lg">
            Master the craft with our signature firestorm techniques
          </p>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden md:block">
          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {popularEdits.map((edit, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card 
                    className="popular-card bg-card border-border hover:border-firestorm-red/50 transition-all duration-500 hover:shadow-xl hover:shadow-firestorm-red/20 group cursor-pointer overflow-hidden aspect-square relative"
                    onMouseEnter={() => handleVideoHover(index, true)}
                    onMouseLeave={() => handleVideoHover(index, false)}
                    onClick={() => toggleVideoPlayback(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Play/pause video: ${edit.title}`}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      {/* Video */}
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                          if (el && observerRef.current) {
                            observerRef.current.observe(el);
                          }
                        }}
                        data-src-webm={edit.video}
                        data-src-mp4={edit.video.replace('.webm', '.mp4')}
                        poster={edit.thumbnail}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        muted
                        loop
                        playsInline
                        preload="none"
                      />
                      
                      {/* Hover overlay with fire effects */}
                      <div className={`absolute inset-0 transition-all duration-300 ${
                        hoveredIndex === index 
                          ? 'bg-gradient-to-t from-firestorm-red/30 via-transparent to-firestorm-orange/20' 
                          : 'bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100'
                      }`} />
                      
                      {/* Fire border effect on hover */}
                      <div className={`absolute inset-0 border-2 transition-all duration-300 ${
                        hoveredIndex === index 
                          ? 'border-firestorm-red shadow-fire animate-pulse-fire' 
                          : 'border-transparent'
                      }`} />
                      
                      {/* Play/Pause Overlay Button */}
                      <button
                        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-firestorm-red/90 rounded-full p-4 transition-all duration-300 ${
                          playingVideos.has(index) 
                            ? 'opacity-0 group-hover:opacity-100' 
                            : 'opacity-80 hover:opacity-100'
                        } ${playingVideos.has(index) ? 'animate-pulse' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVideoPlayback(index);
                        }}
                        aria-pressed={playingVideos.has(index)}
                        aria-label={playingVideos.has(index) ? 'Pause video' : 'Play video'}
                      >
                        {playingVideos.has(index) ? (
                          <Pause className="w-6 h-6 text-white fill-white" />
                        ) : (
                          <Play className="w-6 h-6 text-white fill-white" />
                        )}
                      </button>
                      
                      {/* Play indicator */}
                      <div className={`absolute top-4 right-4 transition-all duration-300 ${
                        playingVideos.has(index) 
                          ? 'opacity-100 scale-110 animate-pulse' 
                          : 'opacity-0 scale-90'
                      }`}>
                        
                      </div>
                      
                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
                        <h3 className="font-heading font-bold text-white text-sm mb-1">{edit.title}</h3>
                        <p className="text-white/80 text-xs line-clamp-2">{edit.description}</p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-firestorm-red/30 hover:bg-firestorm-red/10 hover:border-firestorm-red/50" />
            <CarouselNext className="border-firestorm-red/30 hover:bg-firestorm-red/10 hover:border-firestorm-red/50" />
          </Carousel>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {popularEdits.map((edit, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <Card 
                    className="popular-card bg-card border-border hover:border-firestorm-red/50 transition-all duration-500 hover:shadow-xl hover:shadow-firestorm-red/20 group cursor-pointer overflow-hidden aspect-square relative"
                    onTouchEnd={() => handleDoubleTap(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Play/pause video: ${edit.title}`}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                          if (el && observerRef.current) {
                            observerRef.current.observe(el);
                          }
                        }}
                        data-src-webm={edit.video}
                        data-src-mp4={edit.video.replace('.webm', '.mp4')}
                        poster={edit.thumbnail}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        preload="none"
                      />
                      
                      {/* Play/Pause Overlay Button */}
                      <button
                        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-firestorm-red/90 rounded-full p-4 transition-all duration-300 ${
                          playingVideos.has(index) 
                            ? 'opacity-0 group-hover:opacity-100' 
                            : 'opacity-80 hover:opacity-100'
                        } ${playingVideos.has(index) ? 'animate-pulse' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVideoPlayback(index);
                        }}
                        aria-pressed={playingVideos.has(index)}
                        aria-label={playingVideos.has(index) ? 'Pause video' : 'Play video'}
                      >
                        {playingVideos.has(index) ? (
                          <Pause className="w-6 h-6 text-white fill-white" />
                        ) : (
                          <Play className="w-6 h-6 text-white fill-white" />
                        )}
                      </button>
                      
                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
                        <h3 className="font-heading font-bold text-white text-sm mb-1">{edit.title}</h3>
                        <p className="text-white/80 text-xs line-clamp-2">{edit.description}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="flex justify-center items-center mt-6 gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={prevSlide}
              className="border-firestorm-red/30 hover:bg-firestorm-red/10 hover:border-firestorm-red/50 shadow-ember"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex gap-2">
              {popularEdits.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-firestorm-red shadow-ember' 
                      : 'bg-firestorm-red/30 hover:bg-firestorm-red/50'
                  }`}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={nextSlide}
              className="border-firestorm-red/30 hover:bg-firestorm-red/10 hover:border-firestorm-red/50 shadow-ember"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};