
<script lang="ts" setup>
import { computed } from 'vue';
import { stateUi } from 'state-shared';
import { BLACK } from 'constants-shared/colors';
import { MainContainer } from 'components-layout';
import { Container, Rectangle } from 'pixi-vue';
import type { Anchor } from 'pixi-svelte';

import { DESKTOP_BASE_SIZE, DESKTOP_BACKGROUND_WIDTH_LIST } from '../constants';
import { getContext } from '../context';

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
      :y="context.stateLayoutDerived.mainLayoutStandard().height - DESKTOP_BASE_SIZE - 10"
      :pivot="pivot"
    >
      <Container
        :y="DESKTOP_BASE_SIZE * 0.5 - 160"
        :x="900 - 500"
        :scale="0.8"
      >
        <slot
          name="amountBalance"
          :stacked="true"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5 - 160"
        :x="900"
        :scale="0.8"
      >
        <slot
          name="amountWin"
          :stacked="true"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5 - 160"
        :x="900 + 500"
        :scale="0.8"
      >
        <slot
          name="amountBet"
          :stacked="true"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5"
        :x="220"
        :scale="0.8"
      >
        <slot
          name="buttonMenu"
          :anchor="0.5"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5"
        :x="220 + 150"
        :scale="0.8"
      >
        <slot
          name="buttonBuyBonus"
          :anchor="0.5"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5"
        :x="160 + 150 * 4"
        :scale="0.8"
      >
        <slot
          name="buttonAutoSpin"
          :anchor="0.5"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5"
        :x="160 + 150 * 5"
        :scale="0.8"
      >
        <slot
          name="buttonBet"
          :anchor="0.5"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5"
        :x="160 + 150 * 6"
        :scale="0.8"
      >
        <slot
          name="buttonTurbo"
          :anchor="0.5"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5"
        :x="1440"
        :scale="0.8"
      >
        <slot
          name="buttonDecrease"
          :anchor="0.5"
        />
      </Container>

      <Container
        :y="DESKTOP_BASE_SIZE * 0.5"
        :x="1440 + 150"
        :scale="0.8"
      >
        <slot
          name="buttonIncrease"
          :anchor="0.5"
        />
      </Container>
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
        :x="298"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - DESKTOP_BASE_SIZE - 10"
      >
        <Container
          :scale="0.8"
          :y="DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 3"
        >
          <slot
            name="buttonPayTable"
            :anchor="0.5"
          />
        </Container>

        <Container
          :scale="0.8"
          :y="DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 2"
        >
          <slot
            name="buttonGameRules"
            :anchor="0.5"
          />
        </Container>

        <Container
          :scale="0.8"
          :y="DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 1"
        >
          <slot
            name="buttonSettings"
            :anchor="0.5"
          />
        </Container>

        <Container
          :scale="0.8"
          :y="DESKTOP_BASE_SIZE * 0.5 - 150"
        >
          <slot
            name="buttonSoundSwitch"
            :anchor="0.5"
          />
        </Container>

        <Container
          :scale="0.8"
          :y="DESKTOP_BASE_SIZE * 0.5"
        >
          <slot
            name="buttonMenuClose"
            :anchor="0.5"
          />
        </Container>
      </Container>
    </MainContainer>
  </template>
</template>
