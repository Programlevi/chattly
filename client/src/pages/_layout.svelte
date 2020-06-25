<script>
  import { query, getClient } from 'svelte-apollo';
  import { AUTH_USER } from '../queries';
  import { ScaleOut } from 'svelte-loading-spinners';

  const client = getClient();

  const promise = query(client, {
    query: AUTH_USER
  });
</script>

{#await $promise}
  <div>
    <ScaleOut color="#108be3" size="10" unit="rem" />
  </div>
{:then res}
  <slot scoped={{ user: res.data.me }} />
{:catch}
  <slot />
{/await}

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
