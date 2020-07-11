<script>
  import { AUTH_USER } from '../queries';
  import { ScaleOut } from 'svelte-loading-spinners';
  import { query } from '../utils/apolloUtils.js';

  let promise = query(AUTH_USER);
</script>

{#await $promise}
  <div>
    <ScaleOut color="#108be3" size="10" unit="rem" />
  </div>
{:then {data: {auth}}}
  <slot scoped={{auth}} />
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
