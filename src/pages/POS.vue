<template>
  <q-layout-footer class="shadow-0">
    <q-card class="bg-white q-ma-lg q-pa-lg" style="border-radius: 20px">
      <div class="row gutter-md">
        <div class="col">
          <q-input float-label="Barcode" v-model="barcode"/>
        </div>
        <div class="col">
          <q-input float-label="Customer" v-model="barcode"/>
        </div>
        <div class="col">
          <q-input float-label="Customer" v-model="barcode"/>
        </div>
      </div>
    </q-card>
  </q-layout-footer>
</template>

<script>
export default {
  name: 'POS',
  data() {
    return {
      customer: '',
      barcode: '',
    };
  },
};
</script>

<style scoped>

</style>
