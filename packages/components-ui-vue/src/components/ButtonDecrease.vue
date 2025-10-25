
<script lang="ts" setup>
import { stateBet, stateBetDerived, stateConfig } from 'state-shared';
import { computed } from 'vue';

import UiButton from './UiButton.vue';
import { getContext } from '../context';
import { UI_BASE_SIZE } from '../constants';

const context = getContext();
const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };
const smallest = computed(() => stateConfig.betAmountOptions[0]);
const disabled = computed(
  () => !context.stateXstateDerived.isIdle() || stateBet.betAmount === smallest.value,
);

const onpress = () => {
  context.eventEmitter.broadcast({ type: 'soundPressGeneral' });

  const nextSmaller = [...stateConfig.betAmountOptions]
    .sort((a, b) => b - a)
    .find((option) => option < stateBet.betAmount);

  stateBetDerived.setBetAmount(nextSmaller || smallest.value);
};
</script>

<template>
  <UiButton
    :sizes="sizes"
    :onpress="onpress"
    :disabled="disabled"
    icon="decrease"
  />
</template>
