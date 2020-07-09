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
    href="https://fonts.googleapis.com/css?family=Lato:400,300,100,500"
  />
</svelte:head>

<Router {routes} />
