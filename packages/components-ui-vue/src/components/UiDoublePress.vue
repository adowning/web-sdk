
<script lang="ts" setup>
import { ref, watch, onUnmounted } from 'vue';

const props = defineProps<{
  onpressSingle: () => void;
  onpressDouble: () => void;
}>();
const DOUBLE_PRESS_TIMEOUT = 150;

const pressingTimes = ref(0);
let timeout: number = 0;

const increasePressTimes = () => {
  pressingTimes.value = pressingTimes.value + 1;
};

const clearPressTimes = () => {
  pressingTimes.value = 0;
};

const onpress = async () => {
  clearTimeout(timeout);
  props.onpressSingle();
  increasePressTimes();
  timeout = window.setTimeout(clearPressTimes, DOUBLE_PRESS_TIMEOUT);
};

watch(pressingTimes, (newValue) => {
  if (newValue >= 2) {
    props.onpressDouble();
    clearPressTimes();
    clearTimeout(timeout);
  }
});

onUnmounted(() => {
  clearTimeout(timeout);
});
</script>

<template>
  <slot :onpress="onpress" />
</template>
