<template>
  <q-modal
    v-model="opened"
    :content-css="{minWidth: '40vw', 'border-radius': '20px'}"
    @hide="$emit('input', false)">
    <div class="q-pa-lg">
      <h3 class="q-mt-sm q-mb-md">Invite Users</h3>
      <q-field
        icon="mail"
      >
        <q-chips-input float-label="User Emails" v-model="users" />
      </q-field>
    </div>
    <div class="row flex justify-end q-ma-lg">
      <q-btn v-close-overlay flat color="negative">Cancel</q-btn>
      <q-btn :disabled="users.length == 0" flat color="primary" @click="inviteUsers">Invite</q-btn>
    </div>
  </q-modal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InviteUserModal',
  props: ['value'],
  data() {
    return {
      users: [],
      opened: false,
    };
  },
  methods: {
    inviteUsers() {
      this.users.forEach((email) => {
        console.log(email, 'inviting');
        this.inviteUser(email);
      });
      this.users = [];
    },
    inviteUser(email) {
      const url = 'https://us-central1-supernova-licensing.cloudfunctions.net/sendUserInviteEmail';
      this.$emit('input', false);
      axios(url, {
        params: {
          userID: this.$firebase.auth().currentUser.uid,
          email,
          inviterName: '[colleague]',
          link: 'https://drive.google.com/drive/folders/16_J8vy55sPGOr8S210OzgLJ5YAhsGSx-',
          uuid: this.$firebase.auth().currentUser.uid,
        },
      }).then(() => {
        console.log('Sent email');
      });
    },
  },
  watch: {
    value() {
      if (this.value) this.opened = true;
      if (!this.value) this.opened = false;
    },
  },
};
</script>

<style scoped>
</style>
