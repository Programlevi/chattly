<script>
  import { goto } from '@sveltech/routify';
  import { AUTH_USER } from '../queries';
  import { ScaleOut } from 'svelte-loading-spinners';
  import query from '../utils/query.js';

  let authStore = query(AUTH_USER);

  $: ({ loading, data, error } = $authStore);
</script>

{#if loading}
  <div>
    <ScaleOut color="#108be3" size="10" unit="rem" />
  </div>
{:else}
  <slot scoped={{ data }} />
{/if}

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
