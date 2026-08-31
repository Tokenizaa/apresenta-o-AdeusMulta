export interface TopicItem {
  id: string;
  number?: string;
  title: string;
  explanation: string;
  iconName?: string;
  badge?: string;
}

export interface SlideData {
  id: number;
  stageNumber: string;
  stageTag: string;
  title: string;
  subtitle?: string;
  topics: TopicItem[];
  highlightQuote?: string;
  closingQuestion?: string;
  closingTakeaway?: string;
  presenterNotes: {
    objective: string;
    talkingPoints: string[];
    sebraeFocus: string;
  };
}

export interface PresentationState {
  currentSlideIndex: number;
  revealedSteps: Record<number, number>; // slideIndex -> count of revealed items (0 means only initial view, 1 = first item, etc.)
  isFullscreen: boolean;
  showNotes: boolean;
  showShortcuts: boolean;
}
