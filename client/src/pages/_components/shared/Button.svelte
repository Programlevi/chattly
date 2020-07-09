<script>

</script>

<button {...$$restProps}>
  <slot />
</button>

<style>
  button {
    color: #fff;
    padding: 1.4rem 3rem;
    font-weight: 400;
    font-size: 1.6rem;
    font-family: inherit;
    border: none;
    border-radius: 2px;
    text-transform: uppercase;
    background-color: var(--main-color);
    cursor: pointer;
    transition: all 0.3s;
  }

  button:hover,
  button:active {
    box-shadow: rgba(0, 0, 0, 0.149) 0px 0.5rem 1rem;
  }
</style>
