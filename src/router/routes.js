const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    redirect: '/pos',
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: 'pos', component: () => import('pages/POS.vue') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
