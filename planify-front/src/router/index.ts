import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useStore } from 'vuex';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Accueil',
    component: () => import('../views/Accueil.vue')
  },
  {
    path: '/voyage',
    name: 'Voyage',
    component: () => import('../views/MyTravel.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/createTravel',
    name: 'createTravel',
    component: () => import('../views/createTravel.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/createActivity',
    name: 'createActivity',
    component: () => import('../views/createActivity.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/modifierTravel/:id_travel',
    name: 'modifierTravel',
    component: () => import('../views/modifierTravel.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/modifierActivity/:id_travel',
    name: 'modifierActivity',
    component: () => import('../views/modifierActivity.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/votrePlanify/:id_travel',
    name: 'votrePlanify',
    component: () => import('../views/recap.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/myProfil/:id',
    name: 'myProfil',
    component: () => import('../views/myProfil.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // Always scroll to top
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  const isLoggedIn = store.getters.isLoggedIn;
  const isAdmin = store.getters.isAdmin;

  if (['/', '/register', '/'].includes(to.path)) {
    next(); 
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next('/');
    } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
      next('/'); 
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
