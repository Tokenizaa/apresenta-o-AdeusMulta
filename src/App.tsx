import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SLIDES_DATA } from './data/slidesData';
import { Header } from './components/Header';
import { NavigationControls } from './components/NavigationControls';
import { SlideRenderer } from './components/SlideRenderer';
import { PresenterNotesModal } from './components/PresenterNotesModal';
import { ShortcutsHelpModal } from './components/ShortcutsHelpModal';

export default function App() {
  const totalSlides = SLIDES_DATA.length;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  // Store revealed count for each slide
  const [revealedSteps, setRevealedSteps] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Calculate total steps for a given slide
  const getSlideTotalSteps = useCallback((slideIdx: number) => {
    const slide = SLIDES_DATA[slideIdx];
    if (!slide) return 0;
    if (slide.id === 0) return 4; // Cover: 4 key highlights
    if (slide.id === 1) return 3; // Problem: 3 topics
    if (slide.id === 2) return 5; // Solution: 5 steps
    if (slide.id === 3) return 5; // Differential: 5 steps
    if (slide.id === 4) return 1; // Live demo: 1 action
    if (slide.id === 5) return 5; // Sebrae: 5 points
    return slide.topics.length;
  }, []);

  const currentSlide = useMemo(() => SLIDES_DATA[currentSlideIndex], [currentSlideIndex]);
  const currentRevealedCount = revealedSteps[currentSlideIndex] ?? 0;
  const totalStepsInCurrentSlide = useMemo(
    () => getSlideTotalSteps(currentSlideIndex),
    [currentSlideIndex, getSlideTotalSteps]
  );

  // Next step logic (PowerPoint-style sequential reveal)
  const handleNext = useCallback(() => {
    if (currentRevealedCount < totalStepsInCurrentSlide) {
      // Reveal next item on current slide
      setRevealedSteps((prev) => ({
        ...prev,
        [currentSlideIndex]: (prev[currentSlideIndex] ?? 0) + 1,
      }));
    } else if (currentSlideIndex < totalSlides - 1) {
      // Slide is fully revealed, transition to next slide
      setSlideDirection(1);
      setCurrentSlideIndex((prev) => prev + 1);
    }
  }, [currentRevealedCount, totalStepsInCurrentSlide, currentSlideIndex, totalSlides]);

  // Previous step logic
  const handlePrev = useCallback(() => {
    if (currentRevealedCount > 0) {
      // Step back one item on current slide
      setRevealedSteps((prev) => ({
        ...prev,
        [currentSlideIndex]: Math.max(0, (prev[currentSlideIndex] ?? 0) - 1),
      }));
    } else if (currentSlideIndex > 0) {
      // Go back to previous slide
      setSlideDirection(-1);
      const prevSlideIdx = currentSlideIndex - 1;
      setCurrentSlideIndex(prevSlideIdx);
    }
  }, [currentRevealedCount, currentSlideIndex]);

  // Direct slide selection
  const handleSelectSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides && index !== currentSlideIndex) {
      setSlideDirection(index > currentSlideIndex ? 1 : -1);
      setCurrentSlideIndex(index);
    }
  }, [currentSlideIndex, totalSlides]);

  // Reset current slide
  const handleResetSlide = useCallback(() => {
    setRevealedSteps((prev) => ({
      ...prev,
      [currentSlideIndex]: 0,
    }));
  }, [currentSlideIndex]);

  // Specific item click on slide (reveal up to that item)
  const handleItemClick = useCallback((itemNumber: number) => {
    setRevealedSteps((prev) => ({
      ...prev,
      [currentSlideIndex]: itemNumber,
    }));
  }, [currentSlideIndex]);

  // Fullscreen toggle handler
  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  }, []);

  // Listen for fullscreen change events
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Space
        case 'Enter':
        case 'PageDown':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
        case 'Backspace':
        case 'PageUp':
          e.preventDefault();
          handlePrev();
          break;
        case '0':
          e.preventDefault();
          handleSelectSlide(0);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          e.preventDefault();
          handleSelectSlide(parseInt(e.key, 10));
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          handleToggleFullscreen();
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          setShowNotes((prev) => !prev);
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          handleResetSlide();
          break;
        case '?':
        case 'h':
        case 'H':
          e.preventDefault();
          setShowShortcuts((prev) => !prev);
          break;
        case 'Escape':
          if (showNotes) setShowNotes(false);
          if (showShortcuts) setShowShortcuts(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleSelectSlide, handleToggleFullscreen, handleResetSlide, showNotes, showShortcuts]);

  const isFirstStepOverall = currentSlideIndex === 0 && currentRevealedCount === 0;
  const isLastStepOverall =
    currentSlideIndex === totalSlides - 1 && currentRevealedCount >= totalStepsInCurrentSlide;

  return (
    <div
      id="deck-container"
      className="relative flex flex-col h-screen w-screen overflow-hidden bg-[#030d1d] bg-gov-pattern text-slate-100 font-sans select-none"
    >
      {/* Background GovTech subtle grid pattern */}
      <div className="absolute inset-0 bg-gov-grid pointer-events-none opacity-40 z-0" />

      {/* Top Presentation Header */}
      <Header
        currentSlide={currentSlide}
        slideIndex={currentSlideIndex}
        totalSlides={totalSlides}
        revealedCount={currentRevealedCount}
        totalStepsInCurrentSlide={totalStepsInCurrentSlide}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        onToggleNotes={() => setShowNotes((prev) => !prev)}
        onToggleShortcuts={() => setShowShortcuts((prev) => !prev)}
        onResetSlide={handleResetSlide}
        onSelectSlide={handleSelectSlide}
      />

      {/* Main Slide Presentation Stage */}
      <main
        id="slide-stage"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (
            !target.closest('button') &&
            !target.closest('input') &&
            !target.closest('textarea') &&
            !target.closest('a') &&
            !target.closest('#header-btn-notes') &&
            !target.closest('.modal-content')
          ) {
            handleNext();
          }
        }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center overflow-hidden cursor-default"
      >
        <SlideRenderer
          slide={currentSlide}
          slideIndex={currentSlideIndex}
          revealedCount={currentRevealedCount}
          onItemClick={handleItemClick}
          direction={slideDirection}
        />
      </main>

      {/* Bottom PPTX Navigation Controls */}
      <NavigationControls
        slideIndex={currentSlideIndex}
        totalSlides={totalSlides}
        revealedCount={currentRevealedCount}
        totalStepsInCurrentSlide={totalStepsInCurrentSlide}
        onPrev={handlePrev}
        onNext={handleNext}
        isFirstStepOverall={isFirstStepOverall}
        isLastStepOverall={isLastStepOverall}
        onSelectSlide={handleSelectSlide}
      />

      {/* Presenter Notes Drawer / Modal */}
      <PresenterNotesModal
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        slide={currentSlide}
        slideIndex={currentSlideIndex}
        totalSlides={totalSlides}
      />

      {/* Keyboard Shortcuts Help Modal */}
      <ShortcutsHelpModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </div>
  );
}
