
<script lang="ts" setup>
import { computed } from 'vue';
import { stateUi } from 'state-shared';
import { BLACK } from 'constants-shared/colors';
import { MainContainer } from 'components-layout';
import { Container, Rectangle } from 'pixi-vue';
import type { Anchor } from 'pixi-svelte';

import { LANDSCAPE_BASE_SIZE, LANDSCAPE_BACKGROUND_WIDTH_LIST } from '../constants';
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

const bottomPivot = computed(() =>
  anchorToPivot({
    anchor: { x: 0.5, y: 0 },
    sizes: {
      height: LANDSCAPE_BASE_SIZE,
      width: LANDSCAPE_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0),
    },
  }),
);

const rightPivot = computed(() =>
  anchorToPivot({
    anchor: { x: 1, y: 0.5 },
    sizes: {
      height: LANDSCAPE_BASE_SIZE,
      width: LANDSCAPE_BASE_SIZE,
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
      :y="context.stateLayoutDerived.mainLayoutStandard().height - LANDSCAPE_BASE_SIZE - 40"
      :pivot="bottomPivot"
    >
      <Container
        :y="LANDSCAPE_BASE_SIZE * 0.5 - 90"
        :x="85 + 20"
        :scale="0.8"
      >
        <slot
          name="buttonMenu"
          :anchor="0.5"
        />
      </Container>

      <Container
        :y="LANDSCAPE_BASE_SIZE * 0.5 - 90"
        :x="220 + 20"
        :scale="0.8"
      >
        <slot
          name="buttonBuyBonus"
          :anchor="0.5"
        />
      </Container>

      <Container
        :y="LANDSCAPE_BASE_SIZE * 0.5"
        :x="420"
        :scale="0.8"
      >
        <slot
          name="amountBalance"
          :stacked="true"
        />
      </Container>

      <Container
        :y="LANDSCAPE_BASE_SIZE * 0.5"
        :x="910"
        :scale="0.8"
      >
        <slot
          name="amountWin"
          :stacked="true"
        />
      </Container>

      <Container
        :y="LANDSCAPE_BASE_SIZE * 0.5"
        :x="1400"
        :scale="0.8"
      >
        <slot
          name="amountBet"
          :stacked="true"
        />
      </Container>

      <Container
        :y="LANDSCAPE_BASE_SIZE * 0.5 - 90"
        :x="1580"
        :scale="0.8"
      >
        <slot
          name="buttonDecrease"
          :anchor="0.5"
        />
      </Container>

      <Container
        :y="LANDSCAPE_BASE_SIZE * 0.5 - 90"
        :x="1715"
        :scale="0.8"
      >
        <slot
          name="buttonIncrease"
          :anchor="0.5"
        />
      </Container>
    </Container>

    <Container
      :x="context.stateLayoutDerived.mainLayoutStandard().width - 60"
      :y="context.stateLayoutDerived.mainLayoutStandard().height * 0.5"
      :pivot="rightPivot"
    >
      <Container
        :x="LANDSCAPE_BASE_SIZE * 0.5"
        :y="LANDSCAPE_BASE_SIZE * 0.5 - 140"
        :scale="0.8"
      >
        <slot
          name="buttonAutoSpin"
          :anchor="0.5"
        />
      </Container>

      <Container
        :x="LANDSCAPE_BASE_SIZE * 0.5"
        :y="LANDSCAPE_BASE_SIZE * 0.5"
        :scale="0.8"
      >
        <slot
          name="buttonBet"
          :anchor="0.5"
        />
      </Container>

      <Container
        :x="LANDSCAPE_BASE_SIZE * 0.5"
        :y="LANDSCAPE_BASE_SIZE * 0.5 + 140"
        :scale="0.8"
      >
        <slot
          name="buttonTurbo"
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
        :x="165"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - LANDSCAPE_BASE_SIZE - 130"
      >
        <Container
          :scale="0.8"
          :y="LANDSCAPE_BASE_SIZE * 0.5 - 150 - 170 * 3"
        >
          <slot
            name="buttonPayTable"
            :anchor="0.5"
          />
        </Container>

        <Container
          :scale="0.8"
          :y="LANDSCAPE_BASE_SIZE * 0.5 - 150 - 170 * 2"
        >
          <slot
            name="buttonGameRules"
            :anchor="0.5"
          />
        </Container>

        <Container
          :scale="0.8"
          :y="LANDSCAPE_BASE_SIZE * 0.5 - 150 - 170 * 1"
        >
          <slot
            name="buttonSettings"
            :anchor="0.5"
          />
        </Container>

        <Container
          :scale="0.8"
          :y="LANDSCAPE_BASE_SIZE * 0.5 - 150"
        >
          <slot
            name="buttonSoundSwitch"
            :anchor="0.5"
          />
        </Container>

        <Container
          :scale="0.8"
          :y="LANDSCAPE_BASE_SIZE * 0.5"
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
