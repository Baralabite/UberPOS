<template>
  <q-list>
    <q-item>
      <q-item-main class="row">
        <q-select
          v-model="location"
          :options="locationOptions"
          stack-label="Location"
          class="col-3 q-pa-sm"
        />
        <q-select
          v-model="elevation"
          :options="elevationOptions"
          stack-label="Elevation"
          class="col-3 q-pa-sm"
        />
        <q-checkbox
          v-model="checkbox"
          label="Use stage as first digit of Block Number"
          class="col-3 q-pa-sm"
        />
        <q-input
          v-model="digits"
          :decimals="0"
          stack-label="Block Number Digits"
          class="col-3 q-pa-sm"
          type="number"
        />
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'NamingConvention',
  data() {
    return {
      digits: 3,
      checkbox: false,
      location: {},
      elevation: {},
      locationOptions: [
        { value: 'pit', label: 'Pit' },
        { value: 'pitStage', label: 'Pit & Stage' },
      ],
      elevationOptions: [
        { value: 'toe', label: 'Toe' },
        { value: 'collar', label: 'Collar' },
        { value: 'both', label: 'Both' },
      ],
    };
  },
  computed: {
    namingConvention() {
      return {
        location: this.location,
        elevation: this.elevation,
        blockNumber: {
          firstDigitStage: this.checkbox,
          digits: this.digits,
        },
      };
    },
  },
  watch: {
    namingConvention() {
      this.$emit('input', this.namingConvention);
    },
  },
};
</script>

<style scoped>

</style>
