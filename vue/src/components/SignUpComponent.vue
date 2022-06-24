<template>
    <modal name="signUp" :width="400" :height="490">
        <div class="modal-content">
            <div class="row center-align">
                <h4>Sign Up</h4>
            </div>
            <div class="row">
                <form @submit.prevent="" class="col s8 offset-s2 center-align">
                    <div class="row">
                        <div class="input-field">
                            <label for="email" class="active">E-mail</label>
                            <input placeholder="E-mail" id="email" type="text" v-model="email">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field">
                            <label for="password" class="active">Password</label>
                            <input id="password" type="password" v-model="password">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field">
                            <label for="confirmPassword" class="active">Confirm password</label>
                            <input id="confirmPassword" type="password" v-model="confirmPassword">
                        </div>
                    </div>
                    <div class="row">
                        <button class="btn col s12">Sign up</button>
                        <span>Do you have account? <a href="#" @click="openSignIn">Sign In</a></span>
                    </div>
                </form>
            </div>
        </div>
    </modal>
</template>

<script>
    import {post} from "../helpers/request";

	export default {
    name: "SignUpComponent",
    data () {
      return {
        email: null,
        password: null,
        confirmPassword: null,
      }
    },
    methods: {
      signUp () {
        let resultObject = {
          email: this.email,
          password: this.password,
        };
       post('register', resultObject)
      },
      openSignIn () {
        this.$modal.hide('signUp');
        this.$modal.show('signIn');
      }
    }
  }
</script>

<style scoped>
    .modal-content {
        padding: 24px;
    }
</style>