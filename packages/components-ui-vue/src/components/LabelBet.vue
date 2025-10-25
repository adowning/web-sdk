
<script lang="ts" setup>
import { Container } from 'pixi-vue';
import { stateBetDerived, stateModal } from 'state-shared';
import { numberToCurrencyString } from 'utils-shared/amount';
import { computed } from 'vue';

import UiLabel from './UiLabel.vue';
import { getContext } from '../context';
import { i18nDerived } from '../i18n/i18nDerived';

const props = defineProps<{
  stacked?: boolean;
}>();
const context = getContext();
const label = computed(() => stateBetDerived.activeBetMode()?.text.betAmountLabel || i18nDerived.bet());
const value = computed(() => numberToCurrencyString(stateBetDerived.betCost()));
const disabled = computed(() => !context.stateXstateDerived.isIdle());

const onpress = () => {
  if (disabled.value) return;
  context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
  stateModal.modal = { name: 'betAmountMenu' };
};
</script>

<template>
  <Container
    :event-mode="'static'"
    :cursor="disabled ? 'not-allowed' : 'pointer'"
    @pointerup="onpress"
  >
    <UiLabel
      tiled
      :label="label"
      :value="value"
      :stacked="props.stacked"
    />
  </Container>
</template>
