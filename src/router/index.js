import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ListCharacters from '../components/ListCharacters.vue';
import CharacterInfo from '../components/CharacterInfo.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: '/listCharacters', name: 'ListCharacters', component: ListCharacters },
      { path: '/characterInfo', name: 'CharacterInfo', component: CharacterInfo },
      { path: '*', redirect: '/listCharacters' },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
