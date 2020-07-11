<script>
  import 'emoji-picker-element';
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
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap"
    rel="stylesheet"
  />
  <title>Chattly</title>
</svelte:head>

<Router {routes} />
