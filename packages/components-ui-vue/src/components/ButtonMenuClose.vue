
<script lang="ts" setup>
import { stateUi } from 'state-shared';

import UiButton from './UiButton.vue';
import { getContext } from '../context';
import { UI_BASE_SIZE } from '../constants';

const context = getContext();
const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };

const onpress = () => {
  context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
  stateUi.menuOpen = false;
};
</script>

<template>
  <UiButton
    :sizes="sizes"
    :onpress="onpress"
    icon="menuExit"
  />
</template>
