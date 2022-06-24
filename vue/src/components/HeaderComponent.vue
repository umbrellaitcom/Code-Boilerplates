<template>
    <nav>
        <div class="nav-wrapper container">
            <a href="#" class="brand-logo">UIT Food</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li v-if="!isLoggedIn"><a href="#" @click="show()">Login</a></li>
                <li v-else><a href="#" @click="logout()">Logout</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
	import {createNamespacedHelpers} from 'vuex';
	import * as ACTIONS from '../constants/actions';

	const {mapGetters: mapUserGetters, mapActions: mapUserActions} = createNamespacedHelpers('user');

	export default {
		name: "HeaderComponent",
        computed: {
          ...mapUserGetters(['isLoggedIn'])
        },
		methods: {
			...mapUserActions({
				logoutAction: ACTIONS.USER.LOGOUT
			}),
			show () {
				this.$modal.show('signIn');
			},
			logout () {
				this.logoutAction()
					.then(() => {
						this.$toasted.success('Logged out', {
							theme: "bubble",
							position: "top-right",
							duration: 1000
						});
					})
			}
		}
	}
</script>

<style scoped>
    nav {
        background-color: #282A32;
    }
</style>