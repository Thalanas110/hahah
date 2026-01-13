import { Link } from "wouter";
import { ArrowRight, Feather } from "lucide-react";
import type { Poem } from "@shared/schema";
import { motion } from "framer-motion";

interface PoemCardProps {
  poem: Poem;
  index: number;
}

export function PoemCard({ poem, index }: PoemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Link href={`/poem/${poem.id}`} className="group block h-full">
        <div className="glass-card rounded-xl p-6 h-full flex flex-col relative overflow-hidden group-hover:border-primary/30">
          
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Feather size={48} />
          </div>

          <div className="mb-4">
            <p className="text-xs uppercase tracking-widest text-primary/80 font-semibold mb-2">
              Classic Poetry
            </p>
            <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-primary transition-colors">
              {poem.title}
            </h3>
            <p className="text-sm text-white/60 italic font-serif">
              by {poem.author}
            </p>
          </div>

          <div className="flex-grow">
            <p className="text-white/80 font-serif leading-relaxed line-clamp-4 text-sm opacity-90">
              "{poem.excerpt}..."
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-white/40 font-medium tracking-wider">READ FULL POEM</span>
            <div className="bg-white/5 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
              <ArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
