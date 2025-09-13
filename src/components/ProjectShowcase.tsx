import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import project1 from '@/assets/project1.jpg';
import project2 from '@/assets/project2.jpg';
import project3 from '@/assets/project3.jpg';

const projects = [
  {
    title: "Night Runner",
    category: "Cinematic trailer",
    duration: "0:40",
    image: project1,
    alt: "Dark cinematic movie trailer scene with running silhouette"
  },
  {
    title: "Gym Pump — Pack",
    category: "Instagram reel",
    duration: "0:15",
    image: project2,
    alt: "Dynamic gym workout motivation scene"
  },
  {
    title: "Red Carpet Vignette",
    category: "Celebrity edit",
    duration: "0:30",
    image: project3,
    alt: "Elegant celebrity portrait with cinematic lighting"
  },
  {
    title: "Urban Chase",
    category: "Action sequence",
    duration: "0:25",
    image: project1,
    alt: "Urban chase scene with dramatic cinematography"
  },
  {
    title: "Fashion Forward",
    category: "Brand reel",
    duration: "0:20",
    image: project3,
    alt: "Fashion brand promotional content"
  },
  {
    title: "Peak Performance",
    category: "Sports highlight",
    duration: "0:35",
    image: project2,
    alt: "Athletic performance highlight reel"
  }
];

export const ProjectShowcase = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section className="content-layer py-20 px-6 lg:px-12 -mt-8 lg:-mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-6xl font-black text-foreground mb-4">
            POPULAR <span className="text-primary">EDITS</span>
          </h2>
          <p className="text-muted-foreground font-heading text-lg">
            Recent work that pushes creative boundaries
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 group cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              tabIndex={0}
              role="button"
              aria-label={`View ${project.title} project details`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.alt}
                  className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110"
                  style={{
                    filter: hoveredProject === index ? 'brightness(1.1) saturate(1.2)' : 'brightness(1)'
                  }}
                />
                
                {/* Video play overlay - appears on hover */}
                <div className={`absolute inset-0 flex items-center justify-center bg-background/20 transition-opacity duration-300 ${
                  hoveredProject === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center shadow-lg animate-glow">
                    <div className="w-0 h-0 border-l-[12px] border-l-foreground border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-background/80 text-foreground font-heading font-semibold">
                    {project.duration}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground font-heading text-sm uppercase tracking-wider">
                  {project.category}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};