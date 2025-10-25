
<script lang="ts" setup>
import { computed } from 'vue';
import { getContextLayout } from 'utils-layout';
import { EnableSpaceHold } from 'components-shared';

import UiFadeContainer from './UiFadeContainer.vue';
import LayoutDesktop from './LayoutDesktop.vue';
import LayoutPortrait from './LayoutPortrait.vue';
import LayoutLandscape from './LayoutLandscape.vue';
import LayoutTablet from './LayoutTablet.vue';
import LabelBalance from './LabelBalance.vue';
import LabelWin from './LabelWin.vue';
import LabelBet from './LabelBet.vue';
import ButtonPayTable from './ButtonPayTable.vue';
import ButtonGameRules from './ButtonGameRules.vue';
import ButtonSettings from './ButtonSettings.vue';
import ButtonBuyBonus from './ButtonBuyBonus.vue';
import ButtonBet from './ButtonBet.vue';
import ButtonTurbo from './ButtonTurbo.vue';
import ButtonAutoSpin from './ButtonAutoSpin.vue';
import ButtonIncrease from './ButtonIncrease.vue';
import ButtonDecrease from './ButtonDecrease.vue';
import ButtonMenu from './ButtonMenu.vue';
import ButtonMenuClose from './ButtonMenuClose.vue';
import ButtonSoundSwitch from './ButtonSoundSwitch.vue';

const { stateLayoutDerived } = getContextLayout();

const LAYOUT_COMPONENT_MAP = {
  desktop: LayoutDesktop,
  portrait: LayoutPortrait,
  landscape: LayoutLandscape,
  tablet: LayoutTablet,
};

const LayoutComponent = computed(() => LAYOUT_COMPONENT_MAP[stateLayoutDerived.layoutType()]);
</script>

<template>
  <EnableSpaceHold />

  <UiFadeContainer>
    <component :is="LayoutComponent">
      <template #gameName>
        <slot name="gameName" />
      </template>
      <template #logo>
        <slot name="logo" />
      </template>
      <template #amountBalance="{ stacked }">
        <LabelBalance :stacked="stacked" />
      </template>
      <template #amountWin="{ stacked }">
        <LabelWin :stacked="stacked" />
      </template>
      <template #amountBet="{ stacked }">
        <LabelBet :stacked="stacked" />
      </template>
      <template #buttonBuyBonus="{ anchor }">
        <ButtonBuyBonus :anchor="anchor" />
      </template>
      <template #buttonBet="{ anchor }">
        <ButtonBet :anchor="anchor" />
      </template>
      <template #buttonTurbo="{ anchor }">
        <ButtonTurbo :anchor="anchor" />
      </template>
      <template #buttonAutoSpin="{ anchor }">
        <ButtonAutoSpin :anchor="anchor" />
      </template>
      <template #buttonIncrease="{ anchor }">
        <ButtonIncrease :anchor="anchor" />
      </template>
      <template #buttonDecrease="{ anchor }">
        <ButtonDecrease :anchor="anchor" />
      </template>
      <template #buttonMenu="{ anchor }">
        <ButtonMenu :anchor="anchor" />
      </template>
      <template #buttonMenuClose="{ anchor }">
        <ButtonMenuClose :anchor="anchor" />
      </template>
      <template #buttonPayTable="{ anchor }">
        <ButtonPayTable :anchor="anchor" />
      </template>
      <template #buttonGameRules="{ anchor }">
        <ButtonGameRules :anchor="anchor" />
      </template>
      <template #buttonSettings="{ anchor }">
        <ButtonSettings :anchor="anchor" />
      </template>
      <template #buttonSoundSwitch="{ anchor }">
        <ButtonSoundSwitch :anchor="anchor" />
      </template>
    </component>
  </UiFadeContainer>
</template>
