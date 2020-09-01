<script>
  import { url, goto } from '@sveltech/routify';
  import AuthPage from './_components/AuthPage.svelte';
  import { mutate } from '../utils/apolloUtils.js';
  import { SIGNUP_USER, AUTH_USER } from '../queries.js';

  let signupDetails = {
    userName: '',
    password: ''
  };

  let err;

  async function signup() {
    try {
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
    } catch (error) {
      err = error;
    }
  }
</script>

<svelte:head>
  <title>Sign Up | Chattly</title>
</svelte:head>

<AuthPage>
  <span slot="heading">Create a new account</span>

  <form on:submit|preventDefault={signup} slot="form">
    {#if err}
      <p class="error">Username already exists, please use another one.</p>
    {/if}
    <div class="form-field">
      <label for="userName">Username</label>
      <input
        type="text"
        id="userName"
        name="userName"
        placeholder="Ex: bond007"
        autocomplete="off"
        bind:value={signupDetails.userName}
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
    Already have an account? <a href={$url('../login')}>Log in here</a>
  </span>
</AuthPage>
