
<script lang="ts" setup>
import { Text, Rectangle } from 'pixi-vue';
import { stateBet } from 'state-shared';
import { WHITE } from 'constants-shared/colors';
import { computed } from 'vue';

import { UI_BASE_SIZE } from '../constants';

const fontSizeMultiplier = computed(() => {
  if (stateBet.autoSpinsCounter === Infinity) return 3;
  if (stateBet.autoSpinsCounter > 99) return 1.5;
  if (stateBet.autoSpinsCounter > 9) return 2;
  return 2.5;
});
</script>

<template>
  <template v-if="stateBet.autoSpinsCounter > 0">
    <Rectangle
      :anchor="0.5"
      :width="UI_BASE_SIZE * 0.9"
      :height="UI_BASE_SIZE * 0.9"
      :border-radius="50"
    />
    <Text
      :anchor="0.5"
      :text="stateBet.autoSpinsCounter === Infinity ? '∞' : stateBet.autoSpinsCounter"
      :style="{
        fontFamily: 'proxima-nova',
        fill: WHITE,
        fontWeight: 'bold',
        fontSize: fontSizeMultiplier * UI_BASE_SIZE * 0.2,
      }"
    />
  </template>
</template>
