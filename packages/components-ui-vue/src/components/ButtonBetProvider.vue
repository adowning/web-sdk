
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { stateBet, stateBetDerived } from 'state-shared';
import { getContext } from '../context';

type ButtonBetKey = 'spin_default' | 'spin_disabled' | 'stop_default' | 'stop_disabled';

const context = getContext();
const stopDisabled = ref(false);

const bet = () => context.eventEmitter.broadcast({ type: 'bet' });

const stop = () => {
  if (!stopDisabled.value) {
    if (stateBetDerived.hasAutoBetCounter()) stateBet.autoSpinsCounter = 0;
    context.eventEmitter.broadcast({ type: 'stopButtonClick' });
  }
};

const onpress = () => {
  context.eventEmitter.broadcast({ type: 'soundPressBet' });
  if (context.stateXstateDerived.isIdle()) {
    bet();
  } else {
    stop();
  }
};

const key = computed<ButtonBetKey>(() => {
  if (context.stateXstateDerived.isIdle()) {
    return stateBetDerived.isBetCostAvailable() ? 'spin_default' : 'spin_disabled';
  }
  if (!context.stateXstateDerived.isIdle()) {
    if (stopDisabled.value) return 'stop_disabled';
    if (stateBetDerived.hasAutoBetCounter()) return 'stop_default';
    if (stateBet.isTurbo) return 'stop_disabled';
    return 'stop_default';
  }
  return 'spin_default';
});

const onStopButtonClick = () => (stopDisabled.value = true);
const onStopButtonEnable = () => (stopDisabled.value = false);

onMounted(() => {
  context.eventEmitter.subscribe('stopButtonClick', onStopButtonClick);
  context.eventEmitter.subscribe('stopButtonEnable', onStopButtonEnable);
});

onUnmounted(() => {
  context.eventEmitter.unsubscribe('stopButtonClick', onStopButtonClick);
  context.eventEmitter.unsubscribe('stopButtonEnable', onStopButtonEnable);
});
</script>

<template>
  <slot
    :key="key"
    name="children"
    :onpress="onpress"
  />
</template>
