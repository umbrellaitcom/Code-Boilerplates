<template>
    <modal name="signIn" :width="400" :height="450">
        <div class="modal-content">
            <div class="row center-align">
                <h4>Sign In</h4>
            </div>
            <div class="row">
                <form @submit.prevent="signIn" class="col s8 offset-s2 center-align">
                    <div class="row">
                        <div class="input-field">
                            <label for="email" class="active">E-mail</label>
                            <input placeholder="E-mail" id="email" type="text" v-model="email">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field">
                            <label for="password" class="active">Password</label>
                            <input placeholder="Password" id="password" type="password" v-model="password">
                        </div>
                    </div>
                    <div class="row">
                        <button class="btn col s12">Sign in</button>
                        <span>Don't have account? <a href="#" @click="openSignUp">Sign up</a></span>
                    </div>
                </form>
            </div>

        </div>
    </modal>
</template>

<script>
	import {createNamespacedHelpers} from 'vuex';
	import * as ACTIONS from '../constants/actions';

	const { mapActions: mapUserActions, mapState: mapUserState } = createNamespacedHelpers('user');

	export default {
		name: "SignInComponent",
		data() {
			return {
				email: null,
				password: null
			}
		},
        computed: {
            ...mapUserState({
              loginFailed: state => state.error
            })
        },
		methods: {
            ...mapUserActions({
              login: ACTIONS.USER.LOGIN
            }),
			signIn () {
				this.login({username: this.email, password: this.password})
					.then(() => {
						if (!this.loginFailed)
							this.$toasted.success('Logged In', {
                                theme: "bubble",
                                position: "top-right",
                                duration : 1000
                            });
						else
							this.$toasted.error('Error',{
								theme: "bubble",
                                position: "top-right",
                                duration : 1000
							});
						this.$modal.hide('signIn');
                    })
			},
			openSignUp () {
				this.$modal.show('signUp');
				this.$modal.hide('signIn');
			}
		}
	}
</script>

<style scoped>
    .modal-content {
        padding: 24px;
    }
</style>