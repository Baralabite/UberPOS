<template>
  <div class="card">
    <div class="q-pb-lg">
      <q-input v-model="structure.name" float-label="Mine Name"></q-input>
    </div>
    <div class="row flex" v-if="loadedStructure">
      <div
        key="pit"
        class="col selector-div"
        style="border-right-style: solid;"
      >

        <!------------[ Heading ]------------->
        <div class="text-grey-8 q-pl-sm bg-grey-3 flex items-center" style="height: 42px">
          <q-icon name="crop_landscape" />
          <span class="q-pl-sm">Pit</span>
        </div>
        <!---------------------------------->

        <!------------[ Pit List ]------------->
        <q-list class="selector-list" no-border>
          <q-item class="text-blue" @click.native="addPitDialog = true">
            <q-item-side class="text-blue" icon="add"></q-item-side>
            <q-item-main label="Add"></q-item-main>
          </q-item>
          <q-item
            v-for="(pit, index) in structure.pits"
            :key="pit.name"
            link
          >
            <q-item-main
              :label="pit.name"
              :sublabel="pit.short"
              @click.native="setSelectedPitID(index)"
            />
            <q-item-side
              right
              icon="delete"
              @click.native="deletePit(index)"
            />
          </q-item>
        </q-list>
        <!---------------------------------->
      </div>

      <!------------[ Stage ]------------->

      <div
        key="stage"
        class="col selector-div"
        style="border-right-style: solid;"
      >

        <!------------[ Heading ]------------->
        <div class="text-grey-8 q-pl-sm bg-grey-3 flex items-center" style="height: 42px">
          <q-icon name="sort" />
          <span class="q-pl-sm">Stages{{ getStageName }}</span>
        </div>
        <!---------------------------------->

        <!------------[ List ]------------->
        <q-list class="selector-list" highlight no-border v-if="selectedPitID > -1">
          <q-item
            class="text-blue"
            link
            @click.native="addStageDialog = true">
            <q-item-side class="text-blue" icon="add"></q-item-side>
            <q-item-main label="Add"></q-item-main>
          </q-item>
          <q-item
            v-for="(stage, index) in selectedStages"
            :key="stage.name"
            link
          >
            <q-item-main
              :label="stage.name"
              :sublabel="stage.short"
            />
            <q-item-side
              right
              icon="delete"
              @click.native="deleteStage(index)"></q-item-side>
          </q-item>
        </q-list>
        <!---------------------------------->
      </div>
      <!----------[ Add Pit Dialog ]---------->
      <q-dialog
        v-model="addPitDialog"
        prevent-close
        @ok="addPit"
      >
        <span slot="title">Add a Pit</span>
        <span slot="message">Type in the Pit names</span>
        <div slot="body">
          <q-input float-label="Full Name" v-model="newPit.name" />
          <q-input float-label="Short Name" v-model="newPit.short" />
        </div>
        <template slot="buttons" slot-scope="props">
          <div class="flex justify-end">
            <q-btn flat label="Cancel" @click="props.cancel" />
            <q-btn flat label="Add" @click="props.ok" />
          </div>
        </template>
      </q-dialog>

      <!----------[ Add Stage Dialog ]---------->
      <q-dialog
        v-model="addStageDialog"
        prevent-close
        @ok="addStage"
      >
        <span slot="title">Add a Stage</span>
        <span slot="message">Type in the Stage names</span>
        <div slot="body">
          <q-input float-label="Full Name" v-model="newStage.name" />
          <q-input float-label="Short Name" v-model="newStage.short" />
        </div>
        <template slot="buttons" slot-scope="props">
          <div class="flex justify-end">
            <q-btn flat label="Cancel" @click="props.cancel" />
            <q-btn flat label="Add" @click="props.ok" />
          </div>
        </template>
      </q-dialog>
    </div>
    <div v-else class="flex flex-center">
      <q-spinner class="q-ma-xl" :size="60" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MineStructureEditor',
  data() {
    return {
      selectedPitID: -1,
      newPit: {},
      newStage: {},
      addPitDialog: false,
      addStageDialog: false,
      loadedStructure: false,
      structure: {
        name: '',
      },
    };
  },
  mounted() {
    this.pullStructure();
  },
  methods: {
    async pullStructure() {
      const url = 'https://us-central1-supernova-licensing.cloudfunctions.net/readSettings';
      const settings = await axios(url, {
        params: {
          orgID: this.$firebase.auth().currentUser.uid,
          settings: {
            areaComplex: this.structure,
          },
        },
      });
      this.structure = settings.data.areaComplex;
      if (this.structure === undefined) {
        this.structure = {
          name: '',
          pits: [],
        };
      }
      this.loadedStructure = true;
    },
    addPit() {
      console.log(this.structure);
      this.structure.pits.push({
        name: this.newPit.name,
        short: this.newPit.short,
        stages: [],
      });
      this.newPit = {};
    },
    addStage() {
      this.structure.pits[this.selectedPitID].stages.push({
        name: this.newStage.name,
        short: this.newStage.short,
      });
      this.newStage = {};
    },
    deleteStage(index) {
      this.$q.dialog({
        title: 'Confirm Stage Delete',
        message: 'Are you sure you want to delete this stage?',
        ok: 'Yes',
        cancel: 'No',
      }).then(() => {
        this.$delete(this.structure.pits[this.selectedPitID].stages, index);
        this.$q.notify('Deleted Stage.');
      });
    },
    deletePit(index) {
      this.$q.dialog({
        title: 'Confirm Pit Delete',
        message: 'Are you sure you want to delete this pit?',
        ok: 'Yes',
        cancel: 'No',
      }).then(() => {
        if (index === this.selectedPitID) this.selectedPitID = -1;
        this.$delete(this.structure.pits, index);
        this.$q.notify('Deleted Pit.');
      });
    },
    setSelectedPitID(pitID) {
      this.selectedPitID = pitID;
    },
    async uploadStructureChanges() {
      const url = 'https://us-central1-supernova-licensing.cloudfunctions.net/uploadSettings';
      await axios(url, {
        params: {
          orgID: this.$firebase.auth().currentUser.uid,
          settings: {
            areaComplex: this.structure,
          },
        },
      });
    },
  },
  computed: {
    selectedStages() {
      if (this.selectedPitID > -1) {
        return this.structure.pits[this.selectedPitID].stages;
      }
      return [];
    },
    getStageName() {
      if (this.structure.pits) {
        return this.structure.pits[this.selectedPitID] ? `: ${this.structure.pits[this.selectedPitID].name}` : '';
      }
      return '';
    },
  },
  watch: {
    structure: {
      deep: true,
      handler() {
        this.uploadStructureChanges();
      },
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  background-color: #fff;
}

.row {
  width: 100%;
}

.selector-list {
  min-height: 300px;
}

.selector-div {
  border-style: solid;
  border-color: lightgrey;
  border-right-style: none;
  border-width: 1px;
  border-top-width: 1.5px;
}
</style>
