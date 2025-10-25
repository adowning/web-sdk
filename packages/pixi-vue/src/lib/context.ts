
import type * as PIXI from 'pixi.js';
import { provide, inject, onMounted, onUnmounted } from 'vue';
import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';

import type { App as ContextApp } from './createApp';

// App context
const APP_NS = Symbol('pixi-vue-app');
export function provideContextApp(value: ContextApp) {
  provide(APP_NS, value);
}
export function useContextApp() {
  return inject(APP_NS) as ContextApp;
}

// Parent context
const PARENT_NS = Symbol('pixi-vue-parent');
export function provideContextParent(value: PIXI.Container) {
  const addToParent = (node: PIXI.ContainerChild) => {
    onMounted(() => {
      context.parent.addChild(node);
      context.parent.sortChildren();

      onUnmounted(() => {
        if (node) node.destroy();
      });
    });
  };

  const context = { parent: value, addToParent };

  provide(PARENT_NS, context);

  return context;
}
export function useContextParent() {
  return inject(PARENT_NS) as ReturnType<typeof provideContextParent>;
}

// Particle context
const PARTICLE_PARENT_NS = Symbol('pixi-vue-particle-parent');
export function provideContextParticleParent(value: PIXI.ParticleContainer) {
  provide(PARTICLE_PARENT_NS, value);
}
export function useContextParticleParent() {
  return inject(PARTICLE_PARENT_NS) as PIXI.ParticleContainer;
}

// Spine context
const SPINE_NS = Symbol('pixi-vue-spine');
export function provideContextSpine(value: SPINE_PIXI.Spine) {
  provide(SPINE_NS, value);
}
export function useContextSpine() {
  return inject(SPINE_NS) as SPINE_PIXI.Spine;
}

// Spine event context
const SPINE_EVENT_EMITTER_NS = Symbol('pixi-vue-spine-event-emitter');
export function provideContextSpineEventEmitter(value: PIXI.EventEmitter) {
  provide(SPINE_EVENT_EMITTER_NS, value);
}
export function useContextSpineEventEmitter() {
  return inject(SPINE_EVENT_EMITTER_NS) as PIXI.EventEmitter;
}
