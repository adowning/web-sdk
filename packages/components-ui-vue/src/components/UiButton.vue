
<script lang="ts" setup>
import { Text } from 'pixi-vue';
import { Button, type ButtonProps } from 'components-pixi';

import UiSprite from './UiSprite.vue';
import type { ButtonIcon } from '../types';
import { i18nDerived } from '../i18n/i18nDerived';
import { UI_BASE_FONT_SIZE } from '../constants';

interface Props extends Omit<ButtonProps, 'children'> {
  icon: ButtonIcon;
  sizes: { width: number; height: number };
  active?: boolean;
  variant?: 'dark' | 'light';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'dark',
});
</script>

<template>
  <Button v-bind="props">
    <template #children="{ center }">
      <UiSprite
        :x="center.x"
        :y="center.y"
        :anchor="0.5"
        :width="props.sizes.width"
        :height="props.sizes.height"
        :background-color="props.disabled ? 0xaaaaaa : props.variant === 'dark' ? 0x000000 : 0xffffff"
        :border-width="props.active ? 10 : undefined"
        :border-color="props.active ? (props.variant === 'dark' ? 0xffffff : 0x000000) : undefined"
      />

      <Text
        :x="center.x"
        :y="center.y"
        :anchor="0.5"
        :text="i18nDerived[props.icon]()"
        :style="{
          align: 'center',
          wordWrap: true,
          wordWrapWidth: 200,
          fontFamily: 'proxima-nova',
          fontWeight: '600',
          fontSize: UI_BASE_FONT_SIZE * 0.9,
          fill: props.variant === 'dark' ? 0xffffff : 0x000000,
        }"
      />

      <slot />
    </template>
  </Button>
</template>
