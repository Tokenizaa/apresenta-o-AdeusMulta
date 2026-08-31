import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData } from '../types/presentation';
import { SlideCover } from './slides/SlideCover';
import { SlideProblem } from './slides/SlideProblem';
import { SlideSolution } from './slides/SlideSolution';
import { SlideDifferential } from './slides/SlideDifferential';
import { SlideLiveDemo } from './slides/SlideLiveDemo';
import { SlideSebraeQuestions } from './slides/SlideSebraeQuestions';

interface SlideRendererProps {
  slide: SlideData;
  slideIndex: number;
  revealedCount: number;
  onItemClick?: (index: number) => void;
  direction: number; // 1 for next, -1 for prev
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({
  slide,
  slideIndex,
  revealedCount,
  onItemClick,
  direction,
}) => {
  const slideVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 30 : -30,
      scale: 0.99,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: 'easeOut',
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -30 : 30,
      scale: 0.99,
      transition: {
        duration: 0.25,
        ease: 'easeIn',
      },
    }),
  };

  const renderSlideContent = () => {
    switch (slide.id) {
      case 0:
        return <SlideCover slide={slide} revealedCount={revealedCount} onItemClick={onItemClick} />;
      case 1:
        return <SlideProblem slide={slide} revealedCount={revealedCount} onItemClick={onItemClick} />;
      case 2:
        return <SlideSolution slide={slide} revealedCount={revealedCount} onItemClick={onItemClick} />;
      case 3:
        return <SlideDifferential slide={slide} revealedCount={revealedCount} onItemClick={onItemClick} />;
      case 4:
        return <SlideLiveDemo slide={slide} revealedCount={revealedCount} onItemClick={onItemClick} />;
      case 5:
        return <SlideSebraeQuestions slide={slide} revealedCount={revealedCount} onItemClick={onItemClick} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slideIndex}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full flex flex-col justify-center"
        >
          {renderSlideContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
