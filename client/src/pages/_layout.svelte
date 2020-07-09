<script>
  import { AUTH_USER } from '../queries';
  import { ScaleOut } from 'svelte-loading-spinners';
  import { query } from '../utils/apolloUtils.js';

  let promise = query(AUTH_USER);
  $: console.log($promise);
</script>

{#await $promise}
  <div>
    <ScaleOut color="#108be3" size="10" unit="rem" />
  </div>
{:then {data}}
  <slot scoped={{ user: data }} />
{:catch error}
  <slot />
{/await}

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
  }
</style>
