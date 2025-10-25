
<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import Graphics from './Graphics.vue';
import { anchorToPivot } from '../utils';
import type { PixiPoint } from '../types';

type Props = Omit<PIXI.GraphicsOptions, 'pivot' | 'children'> & {
  anchor?: PixiPoint;
  // draw
  width: Parameters<PIXI.Graphics['roundRect']>[2];
  height: Parameters<PIXI.Graphics['roundRect']>[3];
  borderRadius?: Parameters<PIXI.Graphics['roundRect']>[4];
  backgroundColor?: PIXI.FillStyle['color'];
  backgroundAlpha?: PIXI.FillStyle['alpha'];
  borderColor?: PIXI.StrokeStyle['color'];
  borderWidth?: PIXI.StrokeStyle['width'];
  borderAlpha?: PIXI.StrokeStyle['alpha'];
};

const props = defineProps<Props>();

const draw = (graphics: PIXI.Graphics) => {
  graphics.roundRect(0, 0, props.width, props.height, props.borderRadius ?? 0);
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
    :pivot="anchorToPivot({ anchor: props.anchor, sizes: { width: props.width, height: props.height } })"
    :draw="draw"
  />
</template>
