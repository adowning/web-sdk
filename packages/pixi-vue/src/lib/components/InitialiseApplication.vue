
<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { onMounted, onUnmounted, ref } from 'vue';

import { useContextApp } from '../context';
import { preloadFont } from '../utils';

const context = useContextApp();

const wrap = ref<HTMLDivElement | null>(null);
const initialised = ref(false);

const initialiseApplication = async () => {
  PIXI.Assets.reset();

  await preloadFont();
  context.stateApp.pixiApplication = new PIXI.Application();
  await context.stateApp.pixiApplication.init({
    autoDensity: true,
    backgroundAlpha: 0,
    hello: true,
    multiView: false,
    antialias: true,
    clearBeforeRender: true,
    preference: 'webgpu',
    powerPreference: 'high-performance',
    resolution: window.devicePixelRatio,
    resizeTo: window,
  });

  if (wrap.value) {
    wrap.value.appendChild(context.stateApp.pixiApplication.canvas);
  }

  // to prevent that you can't scroll the page with touch on the canvas. https://github.com/pixijs/pixijs/issues/4824
  context.stateApp.pixiApplication.renderer.events.autoPreventDefault = false;
  context.stateApp.pixiApplication.renderer.canvas.style.touchAction = 'auto';
};

onMounted(async () => {
  try {
    if (!initialised.value) await initialiseApplication();
    initialised.value = true;
  } catch (error) {
    console.error(error);
  }
});

onUnmounted(() => {
  if (context.stateApp.pixiApplication) {
    context.stateApp.pixiApplication.destroy();
  }
});
</script>

<template>
  <div ref="wrap">
    <slot v-if="initialised"></slot>
  </div>
</template>
