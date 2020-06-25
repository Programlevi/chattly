<script>
  import { tick } from 'svelte';
  import { url, goto } from '@sveltech/routify';
  import { mutate, getClient } from 'svelte-apollo';
  import { LOGIN_USER, AUTH_USER } from '../queries.js';

  let loginDetails = {
    email: '',
    password: ''
  };

  let client = getClient();

  async function handleSubmit() {
    await mutate(client, {
      mutation: LOGIN_USER,
      variables: {
        input: loginDetails
      },
      update(cache, { data: { login } }) {
        cache.writeQuery({
          query: AUTH_USER,
          data: {
            me: login.user
          }
        });
      }
    });
    $goto('../chat');
  }
</script>

<main class="auth-page">
  <form class="auth-form" on:submit|preventDefault={handleSubmit}>
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
