<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <q-card class="bg-grey-4 licensing-card fixed-center">
          <q-card-title class="bg-white text-center">
            Login
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <div class="bg-white shadow-3">
              <div class="q-pa-lg">
                <q-input
                  v-model="credentials.userID"
                  float-label="User ID"
                  @keyup.enter="login"/>
                <q-input
                  v-model="credentials.password"
                  class="q-mt-md"
                  float-label="Password"
                  type="password"
                  @keyup.enter="login"/>
                <q-btn
                  @click="login"
                  class="q-mt-xl"
                  style="width: 100%"
                  color="primary"
                  label="Login"></q-btn>
              </div>
            </div>
          </q-card-main>
          <q-inner-loading :visible="working"></q-inner-loading>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      working: false,
      credentials: {
        userID: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      console.log('Logging in');
      this.working = true;
      this.$firebase.auth().signInWithEmailAndPassword(
        this.credentials.userID,
        this.credentials.password,
      ).then(() => {
        this.working = false;
        this.$router.push('/');
      }).catch(() => {
        this.$q.notify('Wrong username or password');
        this.credentials.userID = '';
        this.credentials.password = '';
        this.working = false;
      });
    },
  },
};
</script>

<style scoped>
.q-layout-page {
  background-image: url("~assets/login-background.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100vw!important;
}

.licensing-card {
  width: 30vw;
  background-color: #fff;
}
</style>
