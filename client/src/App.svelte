<script>
  import ApolloClient from 'apollo-boost';
  import { setClient } from 'svelte-apollo';
  import { Router } from '@sveltech/routify';
  import { routes } from '@sveltech/routify/tmp/routes';

  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    credentials: 'include'
  });
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
    text-decoration: none;
  }

  :global(.auth-page) {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  :global(.auth-form) {
    background-color: #fff;
    width: 55rem;
    padding: 5rem 7rem;
    box-shadow: rgba(0, 0, 0, 0.059) 0px 2.5rem 8rem 2rem;
  }

  :global(.form-heading) {
    color: var(--main-color);
    font-weight: 500;
    font-size: 2.25rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 3.5rem;
  }

  :global(.form-group:not(:last-child)) {
    margin-bottom: 2.5rem;
  }

  :global(.form-group label) {
    display: block;
    margin-bottom: 0.75rem;
  }

  :global(.form-group input) {
    display: block;
    color: inherit;
    padding: 1.25rem 1.75rem;
    width: 100%;
    background-color: var(--main-bg-color);
    border: none;
    border-bottom: 3px solid transparent;
    border-radius: 2px;
    transition: all 0.3s;
  }

  :global(.form-group input:focus) {
    outline: none;
    border-bottom-color: var(--main-color);
  }

  :global(.form-group button) {
    color: #fff;
    padding: 1.4rem 3rem;
    font-weight: 400;
    font-size: 1.6rem;
    font-family: inherit;
    border: none;
    border-radius: 2px;
    text-transform: uppercase;
    background-color: var(--main-color);
    cursor: pointer;
    transition: all 0.3s;
  }

  :global(.form-group button:hover, .form-group button:active) {
    box-shadow: rgba(0, 0, 0, 0.149) 0px 0.5rem 1rem;
  }

  :global(.form-group button:focus) {
    outline: none;
  }

  :global(.form-group .alternate-auth) {
    font-size: 1.2rem;
  }
</style>
