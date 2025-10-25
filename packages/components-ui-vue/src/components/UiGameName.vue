
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { Text, REM } from 'pixi-vue';
import { WHITE } from 'constants-shared/colors';

const props = defineProps<{
  name: string;
}>();
const clock = ref('');
const clockSizes = ref({ width: 0, height: 0 });

const textProps = {
  style: {
    fontFamily: 'proxima-nova',
    fontSize: REM * 1.5,
    fontWeight: '600',
    lineHeight: REM * 2,
    fill: WHITE,
  },
} as const;

let interval: number;

const updateTime = () => {
  clock.value = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
};

onMounted(() => {
  updateTime();
  interval = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <Text
    :text="clock"
    v-bind="textProps"
    @resize="(value) => (clockSizes = value)"
  />
  <Text
    :text="props.name"
    :x="clockSizes.width + 5"
    v-bind="textProps"
  />
</template>
