
<script lang="ts" setup>
import { Container } from 'pixi-vue';
import { stateBet, stateBetDerived, stateModal } from 'state-shared';
import { computed } from 'vue';

import UiButton from './UiButton.vue';
import { getContext } from '../context';
import { UI_BASE_SIZE } from '../constants';
import ButtonBetAutoSpinsCounter from './ButtonBetAutoSpinsCounter.vue';

const context = getContext();
const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };

const active = computed(() => stateBetDerived.hasAutoBetCounter());
const disabled = computed(() => {
  if (stateBet.isSpaceHold) return true;
  if (!context.stateXstateDerived.isIdle() && !stateBetDerived.hasAutoBetCounter()) return true;
  if (!stateBetDerived.isBetCostAvailable()) return true;
  return false;
});

const stopAutoSpin = () => (stateBet.autoSpinsCounter = 0);
const openModal = () => (stateModal.modal = { name: 'autoSpin' });
const onpress = () => {
  context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
  if (stateBetDerived.hasAutoBetCounter()) {
    stopAutoSpin();
  } else {
    openModal();
  }
};
</script>

<template>
  <UiButton
    :sizes="sizes"
    :active="active"
    :onpress="onpress"
    :disabled="disabled"
    icon="autoSpin"
  >
    <Container
      :x="sizes.width * 0.5"
      :y="sizes.height * 0.5"
    >
      <ButtonBetAutoSpinsCounter />
    </Container>
  </UiButton>
</template>
