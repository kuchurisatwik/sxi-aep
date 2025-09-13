export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="content-layer border-t border-border py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground font-heading text-sm">
              © {currentYear} <span className="font-bold text-foreground">SXI.AEP</span> 
              <span className="mx-2">•</span> 
              Cinematic edits for every project
            </p>
          </div>
          
          
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-xs font-heading">
            Built with precision • Designed for impact • Optimized for performance
          </p>
        </div>
      </div>
    </footer>;
};