
<script lang="ts" setup>
import { stateBet, stateBetDerived } from 'state-shared';
import { computed, onMounted, onUnmounted } from 'vue';

import UiButton from './UiButton.vue';
import { UI_BASE_SIZE } from '../constants';
import { getContext } from '../context';

const context = getContext();
const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };
const active = computed(() => stateBet.isTurbo);
const disabled = computed(() => stateBet.isSpaceHold);

const onpress = () => {
  context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
  stateBetDerived.updateIsTurbo(!stateBet.isTurbo, { persistent: true });
};

const onStopButtonClick = () => stateBetDerived.updateIsTurbo(true, { persistent: false });
const onStopButtonEnable = () => stateBetDerived.updateIsTurbo(false, { persistent: false });

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
  <UiButton
    :sizes="sizes"
    :active="active"
    :onpress="onpress"
    :disabled="disabled"
    icon="turbo"
  />
</template>
