<script>
  import ApolloClient from 'apollo-boost';
  import { setClient } from 'svelte-apollo';
  import { Router } from '@sveltech/routify';
  import { routes } from '@sveltech/routify/tmp/routes';

  const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' });
  setClient(client);
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Lato:400,300,100,300italic"
  />
</svelte:head>

<Router {routes} />

<style>
  :global(:root) {
    --main-color: #108be3;
    --main-bg-color: #f7f7f7;
  }

  :global(html) {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  :global(body) {
    color: #777777;
    font-size: 1.6rem;
    font-weight: 300;
    background-color: var(--main-bg-color);
    font-family: 'Lato', 'Arial', sans-serif;
    position: relative;
    width: 100vw;
    height: 100vh;
  }

  :global(*, *::before, *::after) {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  :global(a) {
    color: var(--main-color);
  }
</style>
