<script>
  import { url, goto } from '@sveltech/routify';
  import AuthPage from './_components/AuthPage.svelte';
  import { mutate } from '../utils/apolloUtils.js';
  import { LOGIN_USER, AUTH_USER } from '../queries.js';

  let loginDetails = {
    email: '',
    password: ''
  };

  async function handleSubmit() {
    await mutate(LOGIN_USER, {
      variables: {
        input: loginDetails
      },
      update(cache, { data: { login } }) {
        cache.writeQuery({
          query: AUTH_USER,
          data: {
            auth: login
          }
        });
      }
    });
    $goto('../chat');
  }
</script>

<svelte:head>
  <title>Log In | Chattly</title>
</svelte:head>

<AuthPage>
  <span slot="heading">Log in to your account</span>

  <form on:submit|preventDefault={handleSubmit} slot="form">

    <div class="form-field">
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

    <div class="form-field">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        bind:value={loginDetails.password}
      />
    </div>

    <button>Log in</button>

  </form>

  <span slot="altAuthLink">
    Don't have an account?
    <a href={$url('../signup')}>Sign up here</a>
  </span>
</AuthPage>
