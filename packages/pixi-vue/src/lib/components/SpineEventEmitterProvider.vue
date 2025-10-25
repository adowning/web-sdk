
<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { useContextSpine, provideContextSpineEventEmitter } from '../context';

const spine = useContextSpine();
const spineEventEmitter = new PIXI.EventEmitter();

spine.beforeUpdateWorldTransforms = () => spineEventEmitter.emit('beforeUpdateWorldTransforms');
spine.afterUpdateWorldTransforms = () => spineEventEmitter.emit('afterUpdateWorldTransforms');

provideContextSpineEventEmitter(spineEventEmitter);
</script>

<template>
  <slot></slot>
</template>
