import { writable } from 'svelte/store';
import { query, getClient } from 'svelte-apollo';

export default (graphqlQuery, options) => {
  const store = writable({ loading: true, data: null, error: null });
  let queryStore;

  query(getClient(), {
    query: graphqlQuery,
    ...options
  }).subscribe(state => (queryStore = state));

  queryStore
    .then(data => store.set({ loading: false, data, error: null }))
    .catch(err => store.set({ loading: false, data: null, error: err }));

  return store;
};
