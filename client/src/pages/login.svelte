<script>
  import { url } from '@sveltech/routify';
  let loginDetails = {
    email: '',
    password: ''
  };
</script>

<main class="auth-page">
  <form class="auth-form" on:submit|preventDefault>
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
      <p class="alternate-auth">
        Don't have an account?
        <a href={$url('../signup')}>Sign up here</a>
      </p>
    </div>
  </form>
</main>
