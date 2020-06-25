<script>
  import { url, goto } from '@sveltech/routify';
  import { mutate, getClient } from 'svelte-apollo';

  import { SIGNUP_USER } from '../queries.js';

  let signupDetails = {
    userName: '',
    email: '',
    password: ''
  };

  async function signup() {
    await mutate(getClient(), {
      mutation: SIGNUP_USER,
      variables: {
        input: signupDetails
      },
      update(cache, { data: { signup } }) {
        cache.writeQuery({
          query: AUTH_USER,
          data: {
            me: signup.user
          }
        });
      }
    });
    $goto('../chat');
  }
</script>

<main class="auth-page">
  <form class="auth-form" on:submit|preventDefault={signup}>
    <h1 class="form-heading">Create a new account</h1>

    <div class="form-group">
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

    <div class="form-group">
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

    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        bind:value={signupDetails.password}
      />
    </div>

    <!-- <div class="form-group">
      <label for="passwordConfirm">Confirm Password</label>
      <input
        type="password"
        id="passwordConfirm"
        name="passwordConfirm"
        placeholder="Retype your password"
        bind:value={signupDetails.passwordConfirm}
      />
    </div> -->

    <div class="form-group">
      <button>Sign Up</button>
    </div>

    <div class="form-group">
      <p class="alternate-auth">
        Already have an account?
        <a href={$url('../login')}>Log in here</a>
      </p>
    </div>
  </form>
</main>
