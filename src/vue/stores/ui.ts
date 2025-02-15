import { defineStore } from 'pinia';
import { useUiBlurStore } from '@/stores/ui-blur';
import { useUiOverlayStore } from '@/stores/ui-overlay';
import { useUiFullscreenStore } from '@/stores/ui-fullscreen';
import { useUiViewportStore } from '@/stores/ui-viewport';
import { useUiPanelsStore } from '@/stores/ui-panels';
import { useUiStarStore } from '@/stores/ui-star';

export const useUiStore = defineStore('ui', () => {
  const blur = useUiBlurStore()
  const fullscreen = useUiFullscreenStore()
  const overlay = useUiOverlayStore()
  const panels = useUiPanelsStore()
  const star = useUiStarStore()
  const viewport = useUiViewportStore()

  return {
    blur,
    fullscreen,
    overlay,
    panels,
    star,
    viewport,
  }
});
