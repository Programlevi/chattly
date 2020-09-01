<script>
  import { url, goto } from '@sveltech/routify';
  import AuthPage from './_components/AuthPage.svelte';
  import { mutate } from '../utils/apolloUtils.js';
  import { LOGIN_USER, AUTH_USER } from '../queries.js';

  let loginDetails = {
    userName: '',
    password: ''
  };
  let err;

  async function handleSubmit() {
    try {
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
    } catch (error) {
      err = error;
    }
  }
</script>

<svelte:head>
  <title>Log In | Chattly</title>
</svelte:head>

<AuthPage>
  <span slot="heading">Log in to your account</span>

  <form on:submit|preventDefault={handleSubmit} slot="form">
    {#if err}
      <p class="error">Username or password incorrect</p>
    {/if}
    <div class="form-field">
      <label for="userName">Username</label>
      <input
        type="text"
        id="userName"
        name="userName"
        placeholder="Ex: bond007"
        autocomplete="off"
        bind:value={loginDetails.userName}
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
    Don't have an account? <a href={$url('../signup')}>Sign up here</a>
  </span>
</AuthPage>
