
<script lang="ts" setup>
import { stateSound } from 'state-shared';
import { computed } from 'vue';

import UiButton from './UiButton.vue';
import { UI_BASE_SIZE } from '../constants';
import { getContext } from '../context';

const context = getContext();
const sizes = { width: UI_BASE_SIZE * 1.3, height: UI_BASE_SIZE * 1.3 };

const onpress = () => {
  context.eventEmitter.broadcast({ type: 'soundPressGeneral' });

  if (stateSound.volumeValueMaster === 0) {
    stateSound.volumeValueMaster = 50;
  } else {
    stateSound.volumeValueMaster = 0;
  }
};

const icon = computed(() => (stateSound.volumeValueMaster === 0 ? ('soundOff' as const) : ('soundOn' as const)));
</script>

<template>
  <UiButton
    :sizes="sizes"
    :onpress="onpress"
    :icon="icon"
    variant="light"
  />
</template>
