
<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import Graphics from './Graphics.vue';
import { anchorToPivot } from '../utils';
import type { PixiPoint } from '../types';

type Props = Omit<PIXI.GraphicsOptions, 'pivot' | 'children'> & {
  anchor?: PixiPoint;
  // draw
  diameter: number;
  backgroundColor?: PIXI.FillStyle['color'];
  backgroundAlpha?: PIXI.FillStyle['alpha'];
  borderColor?: PIXI.StrokeStyle['color'];
  borderWidth?: PIXI.StrokeStyle['width'];
  borderAlpha?: PIXI.StrokeStyle['alpha'];
};

const props = defineProps<Props>();

const draw = (graphics: PIXI.Graphics) => {
  const radius = props.diameter * 0.5;
  graphics.circle(props.diameter * 0.5, props.diameter * 0.5, radius);
  graphics.fill({
    color: props.backgroundColor ?? 0x000000,
    alpha: props.backgroundAlpha ?? 1,
  } as PIXI.FillStyle);
  graphics.stroke({
    color: props.borderColor ?? 0x000000,
    width: props.borderWidth ?? 0,
    alpha: props.borderAlpha ?? 1,
  } as PIXI.StrokeStyle);
};
</script>

<template>
  <Graphics
    v-bind="props"
    :pivot="anchorToPivot({ anchor: props.anchor, sizes: { width: props.diameter, height: props.diameter } })"
    :draw="draw"
  />
</template>
