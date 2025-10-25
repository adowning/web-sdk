
<script lang="ts" setup>
import { computed } from 'vue';
import { stateUi } from 'state-shared';
import { BLACK } from 'constants-shared/colors';
import { MainContainer } from 'components-layout';
import { Container, Rectangle } from 'pixi-vue';
import type { Anchor } from 'pixi-svelte';

import { getContext } from '../context';
import LabelFreeSpinCounter from './LabelFreeSpinCounter.vue';
import { DESKTOP_BASE_SIZE, DESKTOP_BACKGROUND_WIDTH_LIST } from '../constants';

const context = getContext();

const anchorToPivot = (options: {
  anchor: Anchor | number;
  sizes: { width: number; height: number };
}) => {
  const { anchor, sizes } = options;
  const anchorX = typeof anchor === 'number' ? anchor : anchor.x ?? 0;
  const anchorY = typeof anchor === 'number' ? anchor : anchor.y ?? 0;
  return {
    x: sizes.width * anchorX,
    y: sizes.height * anchorY,
  };
};

const pivot = computed(() =>
  anchorToPivot({
    anchor: { x: 0.5, y: 0 },
    sizes: {
      height: DESKTOP_BASE_SIZE,
      width: DESKTOP_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0),
    },
  }),
);
</script>

<template>
  <Container :x="20">
    <slot name="gameName" />
  </Container>

  <Container :x="context.stateLayoutDerived.canvasSizes().width - 20">
    <slot name="logo" />
  </Container>

  <MainContainer
    standard
    :align-vertical="'bottom'"
  >
    <Container
      :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5"
      :y="context.stateLayoutDerived.mainLayoutStandard().height - DESKTOP_BASE_SIZE - 30"
      :pivot="pivot"
    >
      <Container
        :y="DESKTOP_BASE_SIZE * 0.5 - 220"
        :x="880 - 640"
      >
        <slot
          name="amountBalance"
          :stacked="true"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5 - 220"
        :x="880"
      >
        <slot
          name="amountWin"
          :stacked="true"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5 - 220"
        :x="880 + 640"
      >
        <slot
          name="amountBet"
          :stacked="true"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5"
        :x="20"
      >
        <slot
          name="buttonMenu"
          :anchor="0.5"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5"
        :x="20 + 180"
      >
        <slot
          name="buttonBuyBonus"
          :anchor="0.5"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5"
        :x="-10 + 180 * 4"
      >
        <slot
          name="buttonAutoSpin"
          :anchor="0.5"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5"
        :x="-10 + 180 * 5"
      >
        <slot
          name="buttonBet"
          :anchor="0.5"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5"
        :x="-10 + 180 * 6"
      >
        <slot
          name="buttonTurbo"
          :anchor="0.5"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5"
        :x="1560"
      >
        <slot
          name="buttonDecrease"
          :anchor="0.5"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5"
        :x="1560 + 180"
      >
        <slot
          name="buttonIncrease"
          :anchor="0.5"
        />
      </Container>

      <template v-if="stateUi.freeSpinCounterShow">
        <Container
          :y="DESKTOP_BASE_SIZE * 0.5 - 320"
          :x="668"
        >
          <LabelFreeSpinCounter />
        </Container>
      </template>
    </Container>
  </MainContainer>

  <template v-if="stateUi.menuOpen">
    <Rectangle
      :event-mode="'static'"
      cursor="pointer"
      :alpha="0.5"
      :anchor="0.5"
      :background-color="BLACK"
      :width="context.stateLayoutDerived.canvasSizes().width"
      :height="context.stateLayoutDerived.canvasSizes().height"
      :x="context.stateLayoutDerived.canvasSizes().width * 0.5"
      :y="context.stateLayoutDerived.canvasSizes().height * 0.5"
      @pointerup="() => (stateUi.menuOpen = false)"
    />

    <MainContainer
      standard
      :align-vertical="'bottom'"
    >
      <Container
        :x="100"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - DESKTOP_BASE_SIZE - 30"
      >
        <Container :y="DESKTOP_BASE_SIZE * 0.5 - 185 - 210 * 3">
          <slot
            name="buttonPayTable"
            :anchor="0.5"
          />
        </Container>

        <Container :y="DESKTOP_BASE_SIZE * 0.5 - 185 - 210 * 2">
          <slot
            name="buttonGameRules"
            :anchor="0.5"
          />
        </Container>

        <Container :y="DESKTOP_BASE_SIZE * 0.5 - 185 - 210 * 1">
          <slot
            name="buttonSettings"
            :anchor="0.5"
          />
        </Container>

        <Container :y="DESKTOP_BASE_SIZE * 0.5 - 185">
          <slot
            name="buttonSoundSwitch"
            :anchor="0.5"
          />
        </Container>

        <Container :y="DESKTOP_BASE_SIZE * 0.5">
          <slot
            name="buttonMenuClose"
            :anchor="0.5"
          />
        </Container>
      </Container>
    </MainContainer>
  </template>
</template>
