
<script lang="ts" setup>
import { stateUi } from 'state-shared';
import { computed } from 'vue';

import UiLabel from './UiLabel.vue';
import { i18nDerived } from '../i18n/i18nDerived';

const props = defineProps<{
  stacked?: boolean;
}>();
const label = computed(() => i18nDerived.freeSpins());
const value = computed(() => `${stateUi.freeSpinCounterCurrent} / ${stateUi.freeSpinCounterTotal}`);
</script>

<template>
  <UiLabel
    tiled
    :label="label"
    :value="value"
    :stacked="props.stacked"
  />
</template>
