
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { stateBet } from 'state-shared';
import { bookEventAmountToCurrencyString } from 'utils-shared/amount';

import UiLabel from './UiLabel.vue';
import { i18nDerived } from '../i18n/i18nDerived';

const props = defineProps<{
  stacked?: boolean;
}>();
const winBookEventAmount = ref(stateBet.winBookEventAmount);
const label = computed(() => i18nDerived.win());
const value = computed(() => bookEventAmountToCurrencyString(winBookEventAmount.value));

const setWinBookEventAmount = (newValue: number) => {
  const duration = 300;
  const startValue = winBookEventAmount.value;
  const change = newValue - startValue;
  let startTime: number | null = null;

  const animate = (currentTime: number) => {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    winBookEventAmount.value = startValue + change * progress;

    if (timeElapsed < duration) {
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
};

watch(() => stateBet.winBookEventAmount, setWinBookEventAmount);
</script>

<template>
  <UiLabel
    tiled
    :label="label"
    :value="value"
    :stacked="props.stacked"
  />
</template>
