import { motion } from 'motion/react';

export const Splash = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <div className="text-6xl font-bold tracking-tighter text-white">
          <span className="text-blue-500">H</span>S
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute -bottom-4 left-0 h-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-xs uppercase tracking-[0.3em] text-zinc-500"
      >
        Initializing Portfolio
      </motion.p>
    </motion.div>
  );
};
