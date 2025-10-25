
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { stateBet } from 'state-shared';
import { numberToCurrencyString } from 'utils-shared/amount';

import UiLabel from './UiLabel.vue';
import { i18nDerived } from '../i18n/i18nDerived';

const props = defineProps<{
  stacked?: boolean;
}>();
const balance = ref(stateBet.balanceAmount);
const label = computed(() => i18nDerived.balance());
const value = computed(() => numberToCurrencyString(balance.value));

const setBalance = (newValue: number) => {
  const duration = 300;
  const startValue = balance.value;
  const change = newValue - startValue;
  let startTime: number | null = null;

  const animate = (currentTime: number) => {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    balance.value = startValue + change * progress;

    if (timeElapsed < duration) {
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
};

watch(() => stateBet.balanceAmount, setBalance);
</script>

<template>
  <UiLabel
    tiled
    :label="label"
    :value="value"
    :stacked="props.stacked"
  />
</template>
