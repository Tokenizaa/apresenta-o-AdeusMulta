import React from 'react';
import { SlideData } from '../../types/presentation';
import { BusinessEvolutionWorkspace } from '../evolution/BusinessEvolutionWorkspace';

interface SlideSebraeQuestionsProps {
  slide: SlideData;
  revealedCount?: number;
  onItemClick?: (index: number) => void;
}

export const SlideSebraeQuestions: React.FC<SlideSebraeQuestionsProps> = ({
  slide,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col justify-start min-h-[calc(100vh-140px)] py-1">
      <BusinessEvolutionWorkspace />
    </div>
  );
};
