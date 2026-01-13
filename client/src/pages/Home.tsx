import { usePoems } from "@/hooks/use-poems";
import { PoemCard } from "@/components/PoemCard";
import { Background } from "@/components/Background";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { motion } from "framer-motion";

export default function Home() {
  const { data: poems, isLoading, error } = usePoems();

  return (
    <div className="min-h-screen text-foreground relative">
      <Background />

      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary font-medium tracking-[0.2em] text-sm uppercase mb-3">
              To  whoever am I sending this poems
            </p>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Welcome to my humble collection~
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6 opacity-60"></div>
            <p className="text-lg md:text-xl text-white/70 font-serif italic">
              "Random thoughts, turned to poems."
            </p>
          </motion.div>
        </header>

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error.message} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {poems?.map((poem, index) => (
              <PoemCard key={poem.id} poem={poem} index={index} />
            ))}

            {/* Empty states if fewer than 6 poems exist in seed data, keep layout robust */}
            {poems && poems.length === 0 && (
              <div className="col-span-full text-center py-20 bg-black/20 rounded-xl border border-white/5 backdrop-blur-sm">
                <p className="text-white/50 font-serif italic">No poems found in the collection.</p>
              </div>
            )}
          </div>
        )}

        <footer className="mt-24 text-center text-white/30 text-xs font-sans tracking-wider uppercase">
          <p>© Marcus Morales F. Washington.</p>
        </footer>
      </main>
    </div>
  );
}
