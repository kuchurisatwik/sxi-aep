import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
const popularEdits = [{
  title: "FIRESTORM Edit",
  description: "Explosive action sequence with cinematic fire effects",
  video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  thumbnail: "/lovable-uploads/f91f810d-e703-4cfa-86dd-edb84d63f6b2.png",
  alt: "Firestorm cinematic edit showcase"
}, {
  title: "Reel Pack — Action",
  description: "High-energy vertical cuts with dynamic transitions",
  video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  thumbnail: "/lovable-uploads/099df520-19a4-49b0-9ee5-caaa3c032b60.png",
  alt: "Action reel editing showcase"
}, {
  title: "Celebrity Style Cut",
  description: "Premium editing with celebrity-grade color grading",
  video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  thumbnail: "/lovable-uploads/0585b77e-6e06-44c3-8a97-9a0cd63a6682.png",
  alt: "Celebrity style edit showcase"
}, {
  title: "Storm Sequence",
  description: "Dramatic weather effects with intense color grading",
  video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  thumbnail: "/lovable-uploads/7f2d4148-269e-4737-ad5e-af91112725b3.png",
  alt: "Storm sequence edit showcase"
}];
export const Playbooks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
  const [lastTapTime, setLastTapTime] = useState<{
    [key: number]: number;
  }>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initialize intersection observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
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
    }, {
      threshold: 0.1
    });
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
    setCurrentSlide(prev => (prev + 1) % popularEdits.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + popularEdits.length) % popularEdits.length);
  };
  return;
};