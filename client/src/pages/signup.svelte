<script>
  import { url, goto } from '@sveltech/routify';
  import AuthPage from './_components/AuthPage.svelte';
  import { mutate } from '../utils/apolloUtils.js';
  import { SIGNUP_USER, AUTH_USER } from '../queries.js';

  let signupDetails = {
    userName: '',
    email: '',
    password: ''
  };

  async function signup() {
    await mutate(SIGNUP_USER, {
      variables: {
        input: signupDetails
      },
      update(cache, { data: { signup } }) {
        cache.writeQuery({
          query: AUTH_USER,
          data: {
            auth: signup
          }
        });
      }
    });
    $goto('../chat');
  }
</script>

<svelte:head>
  <title>Sign Up | Chattly</title>
</svelte:head>

<AuthPage>
  <span slot="heading">Create a new account</span>

  <form on:submit|preventDefault={signup} slot="form">
    <div class="form-field">
      <label for="userName">Username</label>
      <input
        type="text"
        id="userName"
        name="userName"
        placeholder="bond007"
        autocomplete="off"
        bind:value={signupDetails.userName}
      />
    </div>

    <div class="form-field">
      <label for="email">Email Address</label>
      <input
        type="eamil"
        id="email"
        name="email"
        placeholder="bassey08@gmail.com"
        autocomplete="off"
        bind:value={signupDetails.email}
      />
    </div>

    <div class="form-field">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        bind:value={signupDetails.password}
      />
    </div>

    <button>Sign Up</button>

  </form>

  <span slot="altAuthLink">
    Already have an account?
    <a href={$url('../login')}>Log in here</a>
  </span>
</AuthPage>
