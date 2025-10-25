
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { waitForResolve } from 'utils-shared/wait';
import { FadeContainer } from 'components-pixi';

import { getContext } from '../context';

const context = getContext();

const show = ref(true);
const oncomplete = ref(() => {});

const onUiShow = async () => {
  if (show.value === false) {
    show.value = true;
    await waitForResolve((resolve) => (oncomplete.value = resolve));
  }
};

const onUiHide = async () => {
  if (show.value === true) {
    show.value = false;
    await waitForResolve((resolve) => (oncomplete.value = resolve));
  }
};

onMounted(() => {
  context.eventEmitter.subscribe('uiShow', onUiShow);
  context.eventEmitter.subscribe('uiHide', onUiHide);
});

onUnmounted(() => {
  context.eventEmitter.unsubscribe('uiShow', onUiShow);
  context.eventEmitter.unsubscribe('uiHide', onUiHide);
});
</script>

<template>
  <FadeContainer
    persistent
    :show="show"
    :oncomplete="oncomplete"
  >
    <slot />
  </FadeContainer>
</template>
