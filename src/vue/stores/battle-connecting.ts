import { defineStore } from 'pinia';
import { ref } from 'vue';
import { default as anime } from 'animejs';
import { cancelAnimation, secondsToMilliseconds } from '@/utils';
import { BattleConnectedUsers } from '@/types';

export const useBattleConnectingStore = defineStore('battleConnecting', () => {
  const playerSearching = ref(false)
  const acceptTimeProgress = ref(0)
  const acceptTimeProgressAnimation = ref<anime.AnimeInstance | null>(null)
  const loadingProgress = ref(0)
  const connectedUsers = ref<BattleConnectedUsers>({
    current: 0,
    max: 0,
  })

  const setPlayerSearchingState = (state: boolean) => {
    playerSearching.value = state;
  }

  // time - seconds
  const setAcceptTime = (time: number) => {
    if (acceptTimeProgressAnimation.value) {
      cancelAnimation(acceptTimeProgressAnimation.value)
    }

    acceptTimeProgressAnimation.value = anime({
      targets: { progress: 0 },
      progress: [0, 100],
      duration: secondsToMilliseconds(time),
      easing: 'linear',
      update({ progress }) {
        acceptTimeProgress.value = progress;
      },
    })

  }

  const setLoadingProgress = (value: number) => {
    loadingProgress.value = value;
  }

  const setConnectedUsers = (value: BattleConnectedUsers) => {
    connectedUsers.value = value;
  }

  return {
    playerSearching,
    acceptTimeProgress,
    loadingProgress,
    connectedUsers,
    setAcceptTime,
    setLoadingProgress,
    setPlayerSearchingState,
    setConnectedUsers
  }
});
