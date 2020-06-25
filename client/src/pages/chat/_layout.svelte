<script>
  import { goto } from '@sveltech/routify';
  export let scoped;

  let { user } = scoped;

  if (!user) {
    $goto('../login');
  }
</script>

<slot />
