import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

/* 
  POPULAR EDITS - Fresh Implementation
  
  Test checklist:
  - Click Play on card 1 → starts playing; other cards pause
  - Click Play on card 2 while card1 playing → card1 pauses; card2 plays  
  - Tap Mute/Unmute toggles audio state
  - Rapid clicks do not cause button blinking or stuck state
  - Video loads only when near viewport (data-src behavior)
  - If URL fails, error banner appears and Retry works
  
  To change Cloudinary URLs: Update videoData array below
  To change posters: Update poster property in videoData array
*/

const videoData = [{
  id: "salaar",
  title: "FIRESTORM Edit",
  description: "Explosive action sequence with cinematic fire effects",
  src: "https://res.cloudinary.com/dsod6wvvp/video/upload/v1757733019/salaar_na6x3x.mp4",
  lowResSrc: "https://res.cloudinary.com/dsod6wvvp/video/upload/w_480,f_auto,q_auto/v1757733019/salaar_na6x3x.mp4",
  poster: "/assets/proj1-poster.jpg"
}, {
  id: "rrr",
  title: "Reel Pack — Action",
  description: "High-energy vertical cuts with dynamic transitions",
  src: "https://res.cloudinary.com/dsod6wvvp/video/upload/v1757732999/rrr_ykw8gc.mp4",
  lowResSrc: "https://res.cloudinary.com/dsod6wvvp/video/upload/w_480,f_auto,q_auto/v1757732999/rrr_ykw8gc.mp4",
  poster: "/assets/proj2-poster.jpg"
}, {
  id: "arjun",
  title: "Celebrity Style Cut",
  description: "Premium editing with celebrity-grade color grading",
  src: "https://res.cloudinary.com/dsod6wvvp/video/upload/v1757647059/ARJUN_REDDY_frie4j.mp4",
  lowResSrc: "https://res.cloudinary.com/dsod6wvvp/video/upload/w_480,f_auto,q_auto/v1757647059/ARJUN_REDDY_frie4j.mp4",
  poster: "/assets/proj3-poster.jpg"
}, {
  id: "kalki",
  title: "Storm Sequence",
  description: "Dramatic weather effects with intense color grading",
  src: "https://res.cloudinary.com/dsod6wvvp/video/upload/v1757732980/kalki_hbxnol.mp4",
  lowResSrc: "https://res.cloudinary.com/dsod6wvvp/video/upload/w_480,f_auto,q_auto/v1757732980/kalki_hbxnol.mp4",
  poster: "/assets/proj4-poster.jpg"
}];
export const Playbooks = () => {
  const [playingStates, setPlayingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [mutedStates, setMutedStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [errorStates, setErrorStates] = useState<{
    [key: string]: string;
  }>({});
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const videoRefs = useRef<{
    [key: string]: HTMLVideoElement | null;
  }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize intersection observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target as HTMLVideoElement;
          const dataSrc = video.getAttribute('data-src');
          if (dataSrc && !video.src) {
            video.src = dataSrc;
            video.load();
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '200px'
    });

    // Observe all videos
    videoData.forEach(({
      id
    }) => {
      const video = videoRefs.current[id];
      if (video && observerRef.current) {
        observerRef.current.observe(video);
      }
    });
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Initialize muted states
  useEffect(() => {
    const initialMuted: {
      [key: string]: boolean;
    } = {};
    videoData.forEach(({
      id
    }) => {
      initialMuted[id] = true; // Start muted
    });
    setMutedStates(initialMuted);
  }, []);
  const announceStatus = (message: string) => {
    if (statusRef.current) {
      statusRef.current.textContent = message;
    }
  };
  const pauseAllOthers = (exceptId: string) => {
    videoData.forEach(({
      id
    }) => {
      if (id !== exceptId) {
        const video = videoRefs.current[id];
        if (video && !video.paused) {
          video.pause();
          setPlayingStates(prev => ({
            ...prev,
            [id]: false
          }));
        }
      }
    });
  };
  const togglePlay = async (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;
    const videoInfo = videoData.find(v => v.id === id);
    const isPlaying = playingStates[id];
    if (isPlaying) {
      video.pause();
      setPlayingStates(prev => ({
        ...prev,
        [id]: false
      }));
      setCurrentlyPlaying(null);
      announceStatus(`Paused: ${videoInfo?.title}`);
    } else {
      try {
        setLoadingStates(prev => ({
          ...prev,
          [id]: true
        }));
        pauseAllOthers(id);
        await video.play();
        setPlayingStates(prev => ({
          ...prev,
          [id]: true
        }));
        setCurrentlyPlaying(id);
        setErrorStates(prev => ({
          ...prev,
          [id]: ''
        }));
        announceStatus(`Now playing: ${videoInfo?.title}`);
      } catch (error) {
        console.error(`Playback failed for ${id}:`, error);
        setErrorStates(prev => ({
          ...prev,
          [id]: 'Playback unavailable — tap to retry'
        }));
        announceStatus(`Playback failed: ${videoInfo?.title}`);
      } finally {
        setLoadingStates(prev => ({
          ...prev,
          [id]: false
        }));
      }
    }
  };
  const toggleMute = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;
    const newMuted = !mutedStates[id];
    video.muted = newMuted;
    setMutedStates(prev => ({
      ...prev,
      [id]: newMuted
    }));
    const videoInfo = videoData.find(v => v.id === id);
    announceStatus(`${newMuted ? 'Muted' : 'Unmuted'}: ${videoInfo?.title}`);
  };
  const retryVideo = (id: string) => {
    const video = videoRefs.current[id];
    const videoInfo = videoData.find(v => v.id === id);
    if (!video || !videoInfo) return;

    // Try low-res version first, then original
    const currentSrc = video.src;
    const newSrc = currentSrc === videoInfo.src ? videoInfo.lowResSrc : videoInfo.src;
    video.src = newSrc;
    video.load();
    setErrorStates(prev => ({
      ...prev,
      [id]: ''
    }));
    console.log(`Retrying video ${id} with ${newSrc}`);
  };
  const handleVideoError = (id: string, error: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error(`Video error for ${id}:`, error);
    const videoInfo = videoData.find(v => v.id === id);
    setErrorStates(prev => ({
      ...prev,
      [id]: 'Playback unavailable — tap to retry'
    }));
    setPlayingStates(prev => ({
      ...prev,
      [id]: false
    }));
    announceStatus(`Error loading: ${videoInfo?.title}`);
  };
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // Scroll functionality
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return <section className="py-20 px-6 relative bg-gradient-to-br from-black/60 to-gray-900/80 backdrop-blur-lg">
      {/* Screen reader status announcements */}
      <div ref={statusRef} className="sr-only" aria-live="polite" aria-atomic="true" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-6xl font-black text-white mb-4">
            Popular <span className="text-[#FF6B61]">Edits</span>
          </h2>
          <p className="text-white/80 font-heading text-lg">
            Showcase of our most requested editing styles
          </p>
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Video Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {videoData.map(({
              id,
              title,
              description,
              src,
              lowResSrc,
              poster
            }) => (
              <Card key={id} className="flex-none w-80 h-80 bg-black/20 border-white/20 overflow-hidden group relative">
                {/* Video Element */}
                <video 
                  ref={el => { videoRefs.current[id] = el; }} 
                  className="w-full h-full object-cover" 
                  data-src={src} 
                  poster={poster} 
                  preload="metadata" 
                  playsInline 
                  muted 
                  onError={e => handleVideoError(id, e)} 
                  onPlay={() => setPlayingStates(prev => ({ ...prev, [id]: true }))} 
                  onPause={() => setPlayingStates(prev => ({ ...prev, [id]: false }))} 
                  aria-label={`${title} video preview`} 
                />

                {/* Error Banner */}
                {errorStates[id] && (
                  <div className="absolute inset-x-4 top-4 bg-red-600/90 text-white p-3 rounded-lg flex items-center justify-between text-sm backdrop-blur-sm">
                    <span>{errorStates[id]}</span>
                    <button 
                      onClick={() => retryVideo(id)} 
                      className="ml-2 px-2 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors" 
                      aria-label={`Retry loading ${title}`}
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Control Buttons - Bottom Right */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  {/* Mute/Unmute Button */}
                  <button 
                    onClick={() => toggleMute(id)} 
                    onKeyDown={e => handleKeyDown(e, () => toggleMute(id))} 
                    className="w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50" 
                    aria-label={`${mutedStates[id] ? 'Unmute' : 'Mute'} ${title}`}
                  >
                    {mutedStates[id] ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  {/* Play/Pause Button */}
                  <button 
                    onClick={() => togglePlay(id)} 
                    onKeyDown={e => handleKeyDown(e, () => togglePlay(id))} 
                    disabled={loadingStates[id]} 
                    className="w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed" 
                    aria-label={`${playingStates[id] ? 'Pause' : 'Play'} ${title}`}
                  >
                    {loadingStates[id] ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : playingStates[id] ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Video Title Overlay - Bottom Left */}
                <div className="absolute bottom-4 left-4 max-w-[60%]">
                  <h3 className="text-white font-heading font-bold text-sm line-clamp-2 drop-shadow-lg">
                    {title}
                  </h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
      __html: `
          @media (prefers-reduced-motion: reduce) {
            .animate-spin {
              animation: none;
            }
            .transition-all, .transition-colors {
              transition: none;
            }
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .scrollbar-hide {
            -webkit-overflow-scrolling: touch;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          /* Touch scroll behavior for mobile */
          @media (max-width: 768px) {
            .scrollbar-hide {
              scroll-snap-type: x mandatory;
            }
            .scrollbar-hide > * {
              scroll-snap-align: center;
            }
          }
        `
    }} />
    </section>;
};