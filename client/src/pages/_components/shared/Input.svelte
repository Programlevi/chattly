<script>
  export let value;
</script>

<input bind:value {...$$restProps} />

<style>
  input {
    display: block;
    color: inherit;
    padding: 1.25rem 1.75rem;
    width: 100%;
    background-color: var(--bg-color-2);
    border: none;
    border-bottom: 3px solid transparent;
    border-radius: 2px;
    transition: all 0.3s;
  }

  input:focus {
    outline: none;
  }

  input:focus {
    outline: none;
    border-bottom-color: var(--main-color);
  }
</style>
