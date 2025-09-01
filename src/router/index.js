import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';
import Chat from '@/pages/Chat.vue';
import QuestionList from '@/pages/QuestionList.vue';
import QuestionAnswer from '@/pages/QuestionAnswer.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/chat', component: Chat },
  { path: '/questionlist', component: QuestionList },
  { path: '/questionanswer', component: QuestionAnswer },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});