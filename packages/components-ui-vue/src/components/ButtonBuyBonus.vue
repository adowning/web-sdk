
<script lang="ts" setup>
import { Text } from 'pixi-vue';
import { Button } from 'components-pixi';
import { stateModal, stateBet, stateBetDerived } from 'state-shared';
import { computed } from 'vue';

import UiSprite from './UiSprite.vue';
import { UI_BASE_FONT_SIZE, UI_BASE_SIZE } from '../constants';
import { getContext } from '../context';
import { i18nDerived } from '../i18n/i18nDerived';

const { stateXstateDerived, eventEmitter } = getContext();
const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };
const disabled = computed(() => !stateXstateDerived.isIdle());
const active = computed(() => stateBetDerived.activeBetMode()?.type === 'activate');

const openModal = () => (stateModal.modal = { name: 'buyBonus' });
const disableActiveBetMode = () => (stateBet.activeBetModeKey = 'BASE');
const onpress = () => {
  eventEmitter.broadcast({ type: 'soundPressGeneral' });
  if (active.value) {
    disableActiveBetMode();
  } else {
    openModal();
  }
};

const getState = (value: {
  active: boolean;
  disabled: boolean;
  hovered: boolean;
  pressed: boolean;
}) => {
  if (value.disabled) return 'disabled' as const;
  if (value.pressed) return 'pressed' as const;
  if (value.hovered) return 'hovered' as const;
  if (value.active) return 'active' as const;
  return 'default' as const;
};
</script>

<template>
  <Button
    :sizes="sizes"
    :disabled="disabled"
    :onpress="onpress"
  >
    <template #children="{ center, hovered, pressed }">
      <UiSprite
        key="buyBonus"
        :x="center.x"
        :y="center.y"
        :anchor="0.5"
        :width="sizes.width"
        :height="sizes.height"
        :background-color="disabled ? 0xaaaaaa : undefined"
        :border-width="active ? 10 : undefined"
        :border-color="active ? 0xffffff : undefined"
      />
      <Text
        :x="center.x"
        :y="center.y"
        :anchor="0.5"
        :text="getState({ active, disabled, hovered, pressed }) === 'active' ? i18nDerived.disable() : i18nDerived.buyBonus()"
        :style="{
          align: 'center',
          wordWrap: true,
          wordWrapWidth: 200,
          fontFamily: 'proxima-nova',
          fontWeight: '600',
          fontSize: UI_BASE_FONT_SIZE * 0.9,
          fill: 0xffffff,
        }"
      />
    </template>
  </Button>
</template>
