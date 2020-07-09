<div>
  <slot />
</div>

<style>
  div:not(:last-child) {
    margin-bottom: 2.5rem;
  }

  div :global(label) {
    display: block;
    margin-bottom: 0.75rem;
  }
</style>
