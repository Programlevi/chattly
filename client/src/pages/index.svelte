<script>
  import { goto } from '@sveltech/routify';
  export let scoped;

  let { data } = scoped;

  if (!data) {
    $goto('../login');
  } else {
    $goto('../chat');
  }
</script>
