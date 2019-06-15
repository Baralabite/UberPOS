<template>
  <q-layout view="hHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          UberPOS
        </q-toolbar-title>
        <q-btn flat round dense icon="exit_to_app" @click="logout()"/>
      </q-toolbar>
    </q-layout-header>


    <q-page-container style="background-color: #eee; height: 100vh!important">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'Layout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      customer: '',
      barcode: '',
    };
  },
  methods: {
    logout() {
      this.$firebase.auth().signOut();
      this.$router.push('/login');
    },
    openURL(url) {
      window.open(url, '_blank');
    },
  },
};
</script>

<style>
</style>
