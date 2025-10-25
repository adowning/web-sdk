
<script lang="ts" setup>
import { Emitter, upgradeConfig, type EmitterConfigV3, type EmitterConfigV2, type EmitterConfigV1 } from '@barvynkoa/particle-emitter';
import { computed, onUnmounted, watch } from 'vue';
import { useContextApp, useContextParent } from '../context';
import type { LoadedSpriteSheet } from '../types';

type Props = Partial<Emitter> & {
  key: string;
  emitSpeed?: number;
  config: EmitterConfigV3 | EmitterConfigV2 | EmitterConfigV1;
};

const props = defineProps<Props>();
const context = useContextApp();
const parentContext = useContextParent();
const textures = computed(() => context.stateApp.loadedAssets?.[props.key] as LoadedSpriteSheet);
const updatedConfig = computed(() => upgradeConfig(props.config, textures.value));
const emitter = new Emitter(parentContext.parent, updatedConfig.value);

watch(
  () => props,
  (newProps) => {
    Object.keys(newProps).forEach((key) => {
      if (key !== 'emit' && newProps[key as keyof Props] !== undefined) {
        // @ts-ignore
        emitter[key] = newProps[key as keyof Props];
      }
    });
  },
  { deep: true },
);

watch(
  () => props.emit,
  (newVal) => {
    if (newVal) emitter.init(updatedConfig.value);
  },
);

if (context.stateApp.pixiApplication) {
  context.stateApp.pixiApplication.ticker.add(() => {
    if (context.stateApp.pixiApplication) {
      const deltaUpdate = context.stateApp.pixiApplication.ticker.deltaMS * (props.emitSpeed || 0.00234);
      emitter.update(deltaUpdate);
    }
  });
}

onUnmounted(() => {
  emitter.emit = false;
  emitter.destroy();
});
</script>
<template></template>
