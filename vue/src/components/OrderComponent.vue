<template>
    <main class="section">
        <div class="container">
            <div class="row">
                <form class="col s4" @submit.prevent="sendOrder" >
                    <div class="row">
                        <v-select class="input-field col s12" :options=firstCourse v-model="selectedFirst" />
                        <v-select class="input-field col s12" :options=secondCourse v-model="selectedSecond" />
                        <v-select class="input-field col s12" :options=garnish v-model="selectedGarnish" />
                        <v-select class="input-field col s12" :options=salad v-model="selectedSalad" />
                    </div>
                    <button class="btn" :disabled="isFilled">
                        Some text
                    </button>
                </form>
                <div class="col s8">
                    <img class="menu-image" src="../assets/menu.png"/>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
  import vSelect from 'vue-select';
  import 'vue-select/dist/vue-select.css';
  import {createNamespacedHelpers} from 'vuex';
  import * as ACTIONS from '../constants/actions';

  const {mapGetters: mapOrderGetters, mapActions: mapOrderActions} = createNamespacedHelpers('order');

  export default {
    name: "OrderComponent",
    data () {
        return {
          selectedFirst: '',
          selectedSecond: '',
          selectedGarnish: '',
          selectedSalad: '',
        }
    },
    computed: {
      isFilled() {
        return !this.selectedFirst && !this.selectedSalad && !this.selectedSecond && !this.selectedGarnish;
      },
      ...mapOrderGetters(['firstCourse', 'secondCourse', 'garnish', 'salad'])
    },
    components:{
      vSelect
    },
    created () {
     this.getMenu();
    },
    methods: {
      ...mapOrderActions({
		getMenuAction: ACTIONS.ORDER.GET_MENU,
        sendOrderAction: ACTIONS.ORDER.ORDER,
      }),
      sendOrder (e) {
        e.preventDefault();
        let resultObject = {
          first: this.selectedFirst,
          second: this.selectedSecond,
          garnish: this.selectedGarnish,
          salad: this.selectedSalad,
        };
        this.sendOrderAction(resultObject)
      },
      getMenu () {
        this.getMenuAction()
      },
    }
  }


</script>

<style scoped>
    .menu-image {
        width: 100%;
    }

    .input-field >>> .vs__search {
        border-bottom: 0;
        height: 2rem;
        margin: 0;
        width: 0;
    }

    body {
           display: flex;
           min-height: 100vh;
           flex-direction: column;
       }

    main {
        flex: 1 0 auto;
        min-height: 86vh;
    }

</style>