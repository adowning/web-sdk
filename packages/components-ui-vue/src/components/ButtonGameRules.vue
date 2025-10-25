
<script lang="ts" setup>
import { stateModal } from 'state-shared';

import UiButton from './UiButton.vue';
import { getContext } from '../context';
import { UI_BASE_SIZE } from '../constants';

const context = getContext();
const sizes = { width: UI_BASE_SIZE * 1.3, height: UI_BASE_SIZE * 1.3 };

const onpress = () => {
  context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
  stateModal.modal = { name: 'gameRules' };
};
</script>

<template>
  <UiButton
    :sizes="sizes"
    :onpress="onpress"
    icon="info"
    variant="light"
  />
</template>
