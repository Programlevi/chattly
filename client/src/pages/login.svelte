<script>
  import { url } from '@sveltech/routify';
  let loginDetails = {
    email: '',
    password: ''
  };
</script>

<main class="login-page">
  <form class="form" on:submit|preventDefault>
    <h1 class="form-heading">Log in to your account</h1>

    <div class="form-group">
      <label for="email">Email Address</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="doe@gmail.com"
        autocomplete="off"
        bind:value={loginDetails.email}
      />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        bind:value={loginDetails.password}
      />
    </div>

    <div class="form-group">
      <button>Log in</button>
    </div>

    <div class="form-group">
      <p>
        Don't have an account?
        <a href={$url('../signup')}>Sign up here</a>
      </p>
    </div>
  </form>
</main>

<style>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .form {
    background-color: #fff;
    width: 55rem;
    padding: 5rem 7rem;
    box-shadow: rgba(0, 0, 0, 0.059) 0px 2.5rem 8rem 2rem;
  }

  .form-heading {
    color: var(--main-color);
    font-weight: 500;
    font-size: 2.25rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 3.5rem;
  }

  .form-group:not(:last-child) {
    margin-bottom: 2.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.75rem;
  }

  .form-group input {
    display: block;
    color: inherit;
    padding: 1.25rem 1.75rem;
    width: 100%;
    background-color: var(--main-bg-color);
    border: none;
    border-bottom: 3px solid transparent;
    border-radius: 2px;
    transition: all 0.3s;
  }

  .form-group input:focus {
    outline: none;
    border-bottom-color: var(--main-color);
  }

  .form-group button {
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

  .form-group button:hover,
  .form-group button:active {
    box-shadow: rgba(0, 0, 0, 0.149) 0px 0.5rem 1rem;
  }

  .form-group button:focus {
    outline: none;
  }

  .form-group p {
    font-size: 1.2rem;
  }
</style>
