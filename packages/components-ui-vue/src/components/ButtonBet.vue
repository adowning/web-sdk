
<script lang="ts" setup>
import { Container, Text } from 'pixi-vue';
import { Button } from 'components-pixi';
import { OnHotkey } from 'components-shared';
import { stateBetDerived } from 'state-shared';
import { computed } from 'vue';

import UiSprite from './UiSprite.vue';
import ButtonBetProvider from './ButtonBetProvider.vue';
import { UI_BASE_FONT_SIZE, UI_BASE_SIZE } from '../constants';
import { i18nDerived } from '../i18n/i18nDerived';

const disabled = computed(() => !stateBetDerived.isBetCostAvailable());
const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };
</script>

<template>
  <ButtonBetProvider>
    <template #children="{ key, onpress }">
      <OnHotkey
        hotkey="Space"
        :disabled="disabled"
        :onpress="onpress"
      />
      <Button
        :sizes="sizes"
        :onpress="onpress"
        :disabled="disabled"
      >
        <template #children="{ center }">
          <Container
            :x="center.x"
            :y="center.y"
          >
            <UiSprite
              key="bet"
              :width="sizes.width"
              :height="sizes.height"
              :anchor="0.5"
              :background-color="disabled || ['spin_disabled', 'stop_disabled'].includes(key) ? 0xaaaaaa : undefined"
            />
            <Text
              :anchor="0.5"
              :text="['spin_default', 'spin_disabled'].includes(key) ? i18nDerived.bet() : i18nDerived.stop()"
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
          </Container>
        </template>
      </Button>
    </template>
  </ButtonBetProvider>
</template>
