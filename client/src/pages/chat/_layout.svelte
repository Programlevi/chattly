<script>
  import { goto } from '@sveltech/routify';
  import OnlineUsers from '../_components/OnlineUsers.svelte';

  export let scoped;

  if (!scoped.auth) {
    $goto('../login');
  }
</script>

<svelte:head>
  <title>Chattly</title>
</svelte:head>
<aside>
  <header>
    <h1>Online Users</h1>
  </header>
  <OnlineUsers />
</aside>
<slot />

<style>
  aside {
    position: fixed;
    width: 25%;
    height: 100vh;
    background-color: var(--bg-color-1);
    box-shadow: rgba(0, 0, 0, 0.07) 0px 2.5rem 2rem;
  }
  header {
    position: absolute;
    height: 6.3rem;
    width: 100%;
    background-color: var(--bg-color-3);
    color: var(--font-color-1);
    padding: 2rem 1rem;
  }
  h1 {
    font-weight: 300;
    font-size: 2.25rem;
  }
</style>
