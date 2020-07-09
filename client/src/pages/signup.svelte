<script>
  import { url, goto } from '@sveltech/routify';
  import { FormField, Input, Button } from './_components/shared';
  import AuthPage from './_components/AuthPage.svelte';
  import { mutate } from '../utils/apolloUtils.js';
  import { SIGNUP_USER } from '../queries.js';

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
            me: signup.user
          }
        });
      }
    });
    $goto('../chat');
  }
</script>

<AuthPage>
  <span slot="heading">Create a new account</span>

  <form on:submit|preventDefault={signup} slot="form">
    <FormField>
      <label for="userName">Username</label>
      <Input
        type="text"
        id="userName"
        name="userName"
        placeholder="bond007"
        autocomplete="off"
        bind:value={signupDetails.userName}
      />
    </FormField>

    <FormField class="form-group">
      <label for="email">Email Address</label>
      <Input
        type="eamil"
        id="email"
        name="email"
        placeholder="bassey08@gmail.com"
        autocomplete="off"
        bind:value={signupDetails.email}
      />
    </FormField>

    <FormField class="form-group">
      <label for="password">Password</label>
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        bind:value={signupDetails.password}
      />
    </FormField>

    <FormField class="form-group">
      <Button>Sign Up</Button>
    </FormField>

  </form>

  <span slot="altAuthLink">
    Already have an account?
    <a href={$url('../login')}>Log in here</a>
  </span>
</AuthPage>

<style>

</style>
