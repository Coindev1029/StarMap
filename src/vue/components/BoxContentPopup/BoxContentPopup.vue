<template>
  <BasePopup
    class="BoxContentPopup"
    @close="$emit('close')"
  >
    <div class="BoxContentPopup__content">
      <div class="BoxContentPopup__title">Congratulations</div>
      <div class="BoxContentPopup__cards">
        <template
          v-for="(item, index) in list"
          :key="item.name + index"
        >
          <div
            class="BoxContentPopup__card"
            :data-rare="item.rare"
          >
            <div class="BoxContentPopup__cardFigure">
              <img
                class="BoxContentPopup__cardImage"
                :src="item.image"
              />
            </div>
            <div class="BoxContentPopup__cardCaption">
              {{ item.name }} +{{ item.value }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </BasePopup>
</template>

<script lang="ts">
import { BasePopup } from '@/components'
import { BattleReward } from '@/types';
import { PropType } from 'vue';

export default {
  name: 'BoxContentPopup',
  components: {
    BasePopup
  },
  props: {
    list: Array as PropType<BattleReward[]>,
  }
};
</script>

<style scoped src="./BoxContentPopup.css"></style>
