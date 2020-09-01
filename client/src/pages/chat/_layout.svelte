<script>
  import { onMount } from 'svelte';
  import { goto } from '@sveltech/routify';
  import OnlineUsers from '../_components/OnlineUsers.svelte';
  import Logout from '../../assets/logout.svg';
  import { mutate } from '../../utils/apolloUtils.js';
  import { UPDATE_LAST_SEEN, AUTH_USER, LOGOUT } from '../../queries.js';

  export let scoped;

  if (!scoped.auth) {
    $goto('../login');
  }

  onMount(() => {
    const interval = setInterval(() => {
      mutate(UPDATE_LAST_SEEN).then();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  });

  const logout = () => {
    mutate(LOGOUT, {
      update(cache) {
        cache.writeQuery({
          query: AUTH_USER,
          data: {
            auth: null
          }
        });
      }
    });
  };
</script>

<svelte:head>
  <title>Chattly</title>
</svelte:head>
<aside>
  <header>
    <h1>Online Users</h1>
    <button on:click={logout}><Logout /></button>
  </header>
  <OnlineUsers />
</aside>
<slot />

<style>
  aside {
    position: absolute;
    width: 25%;
    height: 100vh;
    background-color: var(--bg-color-1);
  }
  header {
    position: absolute;
    height: 9vh;
    width: 100%;
    background-color: var(--bg-color-3);
    color: var(--font-color-1);
    padding: 2rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button :global(svg) {
    fill: var(--main-color);
    width: 3rem;
    height: 3rem;
  }
  button:hover :global(svg) {
    fill: var(--main-color-dark);
  }
  h1 {
    font-weight: 300;
    font-size: 2.25rem;
  }
</style>
