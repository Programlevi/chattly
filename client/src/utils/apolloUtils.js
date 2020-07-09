import {
  query as apolloQuery,
  getClient,
  mutate as apolloMutate
} from 'svelte-apollo';

export const query = (query, options) => {
  return apolloQuery(getClient(), {
    query,
    ...options
  });
};

export const mutate = (mutation, options) => {
  return apolloMutate(getClient(), {
    mutation,
    ...options
  });
};
