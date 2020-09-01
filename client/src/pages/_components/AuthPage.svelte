<script>

</script>

<main>
  <div>
    <h1>
      <slot name="heading" />
    </h1>

    <slot name="form" />

    <p>
      <slot name="altAuthLink" />
    </p>
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
  }

  h1 {
    color: var(--main-color);
    margin-bottom: 3.5rem;
    text-transform: uppercase;
  }

  div {
    background-color: var(--bg-color-1);
    width: 55rem;
    padding: 5rem 7rem;
  }

  p {
    margin-top: 2.5rem;
    font-size: 1.2rem;
  }

  main :global(.form-field) {
    margin-bottom: 2.5rem;
  }

  main :global(label) {
    display: block;
    margin-bottom: 0.75rem;
  }

  main :global(input) {
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

  main :global(input:focus) {
    outline: none;
    border-bottom-color: var(--main-color);
  }

  main :global(button) {
    color: var(--font-color-1);
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

  main :global(button:hover),
  main :global(button:active) {
    background-color: var(--main-color-dark);
  }

  main :global(.error) {
    color: red;
    padding: 1rem;
    border: 1px solid red;
    margin-bottom: 1rem;
  }
</style>
