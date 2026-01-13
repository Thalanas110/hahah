import { useRoute, Link } from "wouter";
import { usePoem } from "@/hooks/use-poems";
import { Background } from "@/components/Background";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { ArrowLeft, Share2, Download, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast"; // assuming this exists based on package.json having toast

export default function PoemDetail() {
  const [match, params] = useRoute("/poem/:id");
  const id = params?.id;
  const { data: poem, isLoading, error } = usePoem(id);
  const poemRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!match) return null;

  return (
    <div className="min-h-screen text-foreground relative flex flex-col">
      <Background />

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 md:px-12 pointer-events-none">
        <div className="max-w-4xl mx-auto w-full flex justify-between items-center pointer-events-auto">
          <Link href="/">
            <button className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors group bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium tracking-wide">Back to Collection</span>
            </button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex-grow flex items-center justify-center p-4 py-24 md:py-32">
        {isLoading ? (
          <LoadingState />
        ) : error || !poem ? (
          <ErrorState message={error?.message || "Poem not found"} />
        ) : (
          <motion.article
            ref={poemRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-3xl glass-panel rounded-2xl p-8 md:p-16 relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

            <header className="text-center mb-12">
              <div className="mb-4 flex flex-wrap justify-center gap-2">
                {poem.moods.map(mood => (
                  <span key={mood} className="text-xs uppercase tracking-widest text-primary/60 border border-primary/20 px-2 py-1 rounded-full">
                    {mood}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                {poem.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-white/60">
                <span className="h-[1px] w-8 bg-white/20"></span>
                <p className="font-serif italic text-lg md:text-xl text-primary/90">
                  {poem.author}
                </p>
                <span className="h-[1px] w-8 bg-white/20"></span>
              </div>
            </header>

            <div className="poem-content text-white/90 mb-12 text-center max-w-2xl mx-auto space-y-6">
              {poem.stanzas.map((stanza, i) => (
                <div key={i} className="mb-6">
                  {stanza.map((line, j) => (
                    <p key={j} className="leading-relaxed font-serif text-lg">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <footer className="pt-8 border-t border-white/10 flex justify-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors focus:outline-none"
                    title="Save Poem"
                  >
                    <Download className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-wider">Save</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-black/80 backdrop-blur-xl border-white/10 text-white">
                  <DropdownMenuItem
                    className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white"
                    onClick={async () => {
                      if (poemRef.current) {
                        try {
                          const dataUrl = await toPng(poemRef.current, { cacheBust: true });
                          const link = document.createElement('a');
                          link.download = `${poem.title.replace(/\s+/g, '-').toLowerCase()}.png`;
                          link.href = dataUrl;
                          link.click();
                          toast({ description: "Poem saved as image" });
                        } catch (err) {
                          console.error(err);
                          toast({ variant: "destructive", description: "Failed to save image" });
                        }
                      }
                    }}
                  >
                    Save as Image
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white"
                    onClick={async () => {
                      if (poemRef.current) {
                        try {
                          const dataUrl = await toPng(poemRef.current, { cacheBust: true });
                          const pdf = new jsPDF({
                            orientation: 'portrait',
                            unit: 'px',
                            format: [poemRef.current.offsetWidth, poemRef.current.offsetHeight]
                          });
                          pdf.addImage(dataUrl, 'PNG', 0, 0, poemRef.current.offsetWidth, poemRef.current.offsetHeight);
                          pdf.save(`${poem.title.replace(/\s+/g, '-').toLowerCase()}.pdf`);
                          toast({ description: "Poem saved as PDF" });
                        } catch (err) {
                          console.error(err);
                          toast({ variant: "destructive", description: "Failed to save PDF" });
                        }
                      }
                    }}
                  >
                    Save as PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                className="flex items-center gap-2 text-white/50 hover:text-blue-400 transition-colors"
                title="Share"
                disabled={isSharing}
                onClick={async () => {
                  try {
                    setIsSharing(true);
                    if (navigator.share) {
                      await navigator.share({
                        title: poem.title,
                        text: `Read "${poem.title}" by ${poem.author}`,
                        url: window.location.href,
                      });
                    } else {
                      await navigator.clipboard.writeText(window.location.href);
                      toast({
                        description: (
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4" /> Link copied to clipboard
                          </div>
                        )
                      });
                    }
                  } catch (err) {
                    console.error("Share failed:", err);
                  } finally {
                    setIsSharing(false);
                  }
                }}
              >
                {isSharing ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                <span className="text-xs uppercase tracking-wider">Share</span>
              </button>
            </footer>
          </motion.article>
        )}
      </main>
    </div>
  );
}
