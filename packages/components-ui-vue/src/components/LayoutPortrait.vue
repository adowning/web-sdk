
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { stateUi } from 'state-shared';
import { BLACK } from 'constants-shared/colors';
import { FadeContainer } from 'components-pixi';
import { MainContainer } from 'components-layout';
import { Container, Rectangle } from 'pixi-vue';
import { waitForResolve } from 'utils-shared/wait';

import LabelFreeSpinCounter from './LabelFreeSpinCounter.vue';
import ButtonDrawer from './ButtonDrawer.vue';
import { getContext } from '../context';

const context = getContext();

const DRAWER_Y = {
  unfold: 0,
  fold: 550,
};
const drawerY = ref(stateUi.drawerFold ? DRAWER_Y.fold : DRAWER_Y.unfold);

const DRAWER_BUTTON_Y = {
  unfold: 0,
  fold: 50,
};
const drawerButtonY = ref(stateUi.drawerFold ? DRAWER_BUTTON_Y.fold : DRAWER_BUTTON_Y.unfold);

let drawerButtonFadeComplete = () => {};

const cubicInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const animateValue = (refToUpdate: typeof drawerY, newValue: number) => {
  return new Promise<void>((resolve) => {
    const duration = 300;
    const startValue = refToUpdate.value;
    const change = newValue - startValue;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = cubicInOut(progress);

      refToUpdate.value = startValue + change * easedProgress;

      if (timeElapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    };
    requestAnimationFrame(animate);
  });
};

const onDrawerButtonShow = async () => {
  if (!stateUi.drawerButtonShow) {
    stateUi.drawerButtonShow = true;
    await waitForResolve((resolve) => (drawerButtonFadeComplete = resolve));
  }
};

const onDrawerButtonHide = async () => {
  if (stateUi.drawerButtonShow) {
    stateUi.drawerButtonShow = false;
    await waitForResolve((resolve) => (drawerButtonFadeComplete = resolve));
  }
};

const onDrawerUnfold = async () => {
  if (stateUi.drawerFold) {
    animateValue(drawerButtonY, DRAWER_BUTTON_Y.unfold);
    await animateValue(drawerY, DRAWER_Y.unfold);
  }
};

const onDrawerFold = async () => {
  if (!stateUi.drawerFold) {
    animateValue(drawerButtonY, DRAWER_BUTTON_Y.fold);
    await animateValue(drawerY, DRAWER_Y.fold);
  }
};

onMounted(() => {
  context.eventEmitter.subscribe('drawerButtonShow', onDrawerButtonShow);
  context.eventEmitter.subscribe('drawerButtonHide', onDrawerButtonHide);
  context.eventEmitter.subscribe('drawerUnfold', onDrawerUnfold);
  context.eventEmitter.subscribe('drawerFold', onDrawerFold);
});

onUnmounted(() => {
  context.eventEmitter.unsubscribe('drawerButtonShow', onDrawerButtonShow);
  context.eventEmitter.unsubscribe('drawerButtonHide', onDrawerButtonHide);
  context.eventEmitter.unsubscribe('drawerUnfold', onDrawerUnfold);
  context.eventEmitter.unsubscribe('drawerFold', onDrawerFold);
});
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
    <!-- drawer container -->
    <Container :y="drawerY">
      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 440"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 400"
      >
        <slot
          name="buttonMenu"
          :anchor="0.5"
        />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 440"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 400"
      >
        <slot
          name="buttonBuyBonus"
          :anchor="0.5"
        />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 400"
      >
        <slot
          name="buttonBet"
          :anchor="0.5"
        />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 180"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 400"
      >
        <slot
          name="buttonAutoSpin"
          :anchor="0.5"
        />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 180"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 400"
      >
        <slot
          name="buttonTurbo"
          :anchor="0.5"
        />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 270"
      >
        <slot
          name="amountBalance"
          :stacked="true"
        />
      </Container>
    </Container>

    <Container :y="Math.min(drawerY, 350)">
      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 670"
      >
        <slot
          name="amountWin"
          :stacked="true"
        />
      </Container>
    </Container>
  </MainContainer>

  <MainContainer
    standard
    :align-vertical="'bottom'"
  >
    <template v-if="stateUi.freeSpinCounterShow">
      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 130"
      >
        <LabelFreeSpinCounter stacked />
      </Container>
    </template>
    <template v-else>
      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 130"
      >
        <slot
          name="amountBet"
          :stacked="true"
        />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 390"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 85"
      >
        <slot
          name="buttonDecrease"
          :anchor="0.5"
        />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 390"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 85"
      >
        <slot
          name="buttonIncrease"
          :anchor="0.5"
        />
      </Container>
    </template>

    <!-- drawer button -->
    <FadeContainer
      persistent
      :show="stateUi.drawerButtonShow"
      :oncomplete="drawerButtonFadeComplete"
      :y="drawerButtonY"
    >
      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 440"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 105"
      >
        <ButtonDrawer
          :disabled="!stateUi.drawerButtonShow"
          :anchor="0.5"
        />
      </Container>
    </FadeContainer>
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
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 440"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 400"
      >
        <Container :y="-190 - 210 * 3">
          <slot
            name="buttonPayTable"
            :anchor="0.5"
          />
        </Container>

        <Container :y="-190 - 210 * 2">
          <slot
            name="buttonGameRules"
            :anchor="0.5"
          />
        </Container>

        <Container :y="-190 - 210 * 1">
          <slot
            name="buttonSettings"
            :anchor="0.5"
          />
        </Container>

        <Container :y="-190">
          <slot
            name="buttonSoundSwitch"
            :anchor="0.5"
          />
        </Container>

        <Container>
          <slot
            name="buttonMenuClose"
            :anchor="0.5"
          />
        </Container>
      </Container>
    </MainContainer>
  </template>
</template>
