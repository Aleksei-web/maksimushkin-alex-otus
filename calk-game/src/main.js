import {createApp} from 'vue'
import HomePage from "@/pages/HomePage";
import GamePage from "@/pages/GamePage";
import {createRouter, createWebHashHistory } from 'vue-router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
	components,
	directives,
})

import App from "@/App";

const routes = [
	{path: '/', component: HomePage},
	{path: '/game', component: GamePage}
]
const router = createRouter({  history: createWebHashHistory(),routes})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.mount('#app')