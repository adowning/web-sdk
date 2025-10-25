
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { stateUi } from 'state-shared';
import { Text } from 'pixi-vue';
import { Button, type ButtonProps } from 'components-pixi';

import UiSprite from './UiSprite.vue';
import { UI_BASE_FONT_SIZE, UI_BASE_SIZE } from '../constants';
import { getContext } from '../context';

interface Props extends Partial<Omit<ButtonProps, 'children'>> {
  disabled?: boolean;
}
const props = defineProps<Props>();

const context = getContext();
const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };

const degreesToRads = (degrees: number) => (degrees * Math.PI) / 180.0;

const DRAWER_ROTATION = {
  up: degreesToRads(-180),
  down: degreesToRads(0),
};

const moving = ref(false);
const rotation = ref(stateUi.drawerFold ? DRAWER_ROTATION.up : DRAWER_ROTATION.down);
const disabled = computed(() => props.disabled || moving.value);

const cubicInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const setRotation = (newValue: number) => {
  return new Promise<void>((resolve) => {
    const duration = 300;
    const startValue = rotation.value;
    const change = newValue - startValue;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = cubicInOut(progress);

      rotation.value = startValue + change * easedProgress;

      if (timeElapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    };
    requestAnimationFrame(animate);
  });
};

const onpress = async () => {
  if (stateUi.drawerFold) {
    await context.eventEmitter.broadcastAsync({ type: 'drawerUnfold' });
  } else {
    await context.eventEmitter.broadcastAsync({ type: 'drawerFold' });
  }
};

const onDrawerUnfold = async () => {
  if (stateUi.drawerFold) {
    moving.value = true;
    await setRotation(DRAWER_ROTATION.down);
    stateUi.drawerFold = false;
    moving.value = false;
  }
};

const onDrawerFold = async () => {
  if (!stateUi.drawerFold) {
    moving.value = true;
    await setRotation(DRAWER_ROTATION.up);
    stateUi.drawerFold = true;
    moving.value = false;
  }
};

onMounted(() => {
  context.eventEmitter.subscribe('drawerUnfold', onDrawerUnfold);
  context.eventEmitter.subscribe('drawerFold', onDrawerFold);
});

onUnmounted(() => {
  context.eventEmitter.unsubscribe('drawerUnfold', onDrawerUnfold);
  context.eventEmitter.unsubscribe('drawerFold', onDrawerFold);
});
</script>

<template>
  <Button
    :sizes="sizes"
    :onpress="onpress"
    :disabled="disabled"
    :alpha="disabled ? 0.5 : 1"
  >
    <template #children="{ center }">
      <UiSprite
        key="base_mobile_drawer"
        :x="center.x"
        :y="center.y"
        :anchor="0.5"
        :width="sizes.width"
        :height="sizes.height"
      />
      <Text
        :x="center.x"
        :y="center.y"
        :anchor="0.5"
        text="↓"
        :style="{
          align: 'center',
          wordWrap: true,
          wordWrapWidth: 200,
          fontFamily: 'proxima-nova',
          fontWeight: '600',
          fontSize: UI_BASE_FONT_SIZE * 0.9,
          fill: 0xffffff,
        }"
        :rotation="rotation"
      />
    </template>
  </Button>
</template>
