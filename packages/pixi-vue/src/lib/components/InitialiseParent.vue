
<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { provideContextParent, useContextApp } from '../context';

const context = useContextApp();

const parent = context.stateApp.pixiApplication?.stage ?? new PIXI.Container();
const parentContext = provideContextParent(parent);

</script>

<template>
  <slot v-if="parentContext.parent"></slot>
</template>
