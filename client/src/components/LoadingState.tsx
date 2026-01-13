import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-white/50">
      <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
      <p className="font-serif italic tracking-wide">Retrieving verses...</p>
    </div>
  );
}
