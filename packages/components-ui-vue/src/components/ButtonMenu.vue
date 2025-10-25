
<script lang="ts" setup>
import { stateUi } from 'state-shared';

import UiButton from './UiButton.vue';
import { UI_BASE_SIZE } from '../constants';
import { getContext } from '../context';

const context = getContext();
const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };

const onpress = () => {
  context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
  stateUi.menuOpen = true;
};
</script>

<template>
  <UiButton
    :sizes="sizes"
    :onpress="onpress"
    icon="menu"
  />
</template>
