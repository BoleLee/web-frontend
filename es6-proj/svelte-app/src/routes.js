import Home from './views/Home.svelte'
import { wrap } from 'svelte-spa-router/wrap'
import About from './views/About.svelte'

export const routes = {
  '/': Home,

  '/book/*': wrap({
    asyncComponent: () => import('./views/About.svelte')
  }),
  '/about': About
}
