<script>

</script>

<main>
  <div class="auth-form">
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
    font-weight: 500;
    font-size: 2.25rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 3.5rem;
  }

  div {
    background-color: var(--bg-color-1);
    width: 55rem;
    padding: 5rem 7rem;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2.5rem 8rem 2rem;
  }

  p {
    margin-top: 2.5rem;
    font-size: 1.2rem;
  }
</style>
