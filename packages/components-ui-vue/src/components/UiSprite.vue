
<script lang="ts" setup>
import { Rectangle, type RectangleProps } from 'pixi-vue';

type Props = RectangleProps;

const props = defineProps<Props>();
</script>

<template>
  <Rectangle
    :border-radius="50"
    v-bind="props"
  />
</template>
