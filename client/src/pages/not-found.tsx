import { Link } from "wouter";
import { Background } from "@/components/Background";
import { ArrowLeft, CloudFog } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen text-foreground relative flex flex-col items-center justify-center p-4">
      <Background />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md glass-panel rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <div className="p-4 rounded-full bg-white/5 border border-white/10">
            <CloudFog className="w-12 h-12 text-primary/80" />
          </div>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          404
        </h1>

        <h2 className="text-xl font-serif text-primary/90 italic mb-6">
          Page Not Found
        </h2>

        <p className="text-white/70 mb-8 leading-relaxed">
          The verse you seek has drifted away,<br />
          lost in the mists of time and silence.
        </p>

        <Link href="/">
          <button className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-all border border-white/5 hover:border-white/20 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Collection</span>
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
