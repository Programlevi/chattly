<script>
  import { goto } from '@sveltech/routify';
  import OnlineUsers from '../_components/OnlineUsers.svelte';

  export let scoped;

  let { user } = scoped;

  if (!user) {
    $goto('../login');
  }
</script>

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
    padding: 2rem 1rem;
  }
  h1 {
    font-weight: 300;
  }
</style>
