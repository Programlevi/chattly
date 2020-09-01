<script>
  import 'emoji-picker-element';
  import { onMount } from 'svelte';
  import { Router } from '@sveltech/routify';
  import { routes } from '@sveltech/routify/tmp/routes';
  import ApolloClient from 'apollo-client';
  import { setClient } from 'svelte-apollo';
  import { split } from 'apollo-link';
  import { HttpLink } from 'apollo-link-http';
  import { WebSocketLink } from 'apollo-link-ws';
  import { SubscriptionClient } from 'subscriptions-transport-ws';
  import { getMainDefinition } from 'apollo-utilities';
  import { InMemoryCache } from 'apollo-cache-inmemory';

  import { AUTH_USER } from './queries.js';

  // Create an http link:
  const cache = new InMemoryCache();

  const httpLink = new HttpLink({
    uri: 'https://chattlyserver.herokuapp.com/graphql',
    credentials: 'include'
  });

  export const wsClient = new SubscriptionClient(
    'ws://chattlyserver.herokuapp.com/graphql',
    {
      lazy: true,
      reconnect: true,
      connectionParams() {
        return { token: cache.readQuery({ query: AUTH_USER }).auth.token };
      }
    }
  );

  const wsLink = new WebSocketLink(wsClient);

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link,
    cache
  });
  setClient(client);

  onMount(() => {
    const { classList } = document.querySelector('html');
    classList.remove(localStorage.theme === 'dark' ? 'light' : 'dark');
    classList.add(localStorage.theme);
  });
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap"
    rel="stylesheet"
  />
  <title>Chattly</title>
</svelte:head>

<Router {routes} />
