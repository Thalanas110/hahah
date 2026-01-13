import wallpaper from "@assets/peakpx_(3)_1768312085132.jpg";

export function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Background Image with Parallax-like fixity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      
      {/* Heavy Overlay for Readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
    </div>
  );
}
