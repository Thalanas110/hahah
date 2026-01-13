import { useRoute, Link } from "wouter";
import { usePoem } from "@/hooks/use-poems";
import { Background } from "@/components/Background";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { ArrowLeft, Share2, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function PoemDetail() {
  const [match, params] = useRoute("/poem/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: poem, isLoading, error } = usePoem(id);

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-3xl glass-panel rounded-2xl p-8 md:p-16 relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

            <header className="text-center mb-12">
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

            <div className="poem-content text-white/90 mb-12 text-center max-w-2xl mx-auto">
              {poem.content}
            </div>

            <footer className="pt-8 border-t border-white/10 flex justify-center gap-6">
              <button 
                className="flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors"
                title="Favorite (Demo)"
              >
                <Heart className="w-5 h-5" />
                <span className="text-xs uppercase tracking-wider">Save</span>
              </button>
              <button 
                className="flex items-center gap-2 text-white/50 hover:text-blue-400 transition-colors"
                title="Share (Demo)"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-xs uppercase tracking-wider">Share</span>
              </button>
            </footer>
          </motion.article>
        )}
      </main>
    </div>
  );
}
