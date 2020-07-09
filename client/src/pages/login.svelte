<script>
  import { url, goto } from '@sveltech/routify';
  import { FormField, Input, Button } from './_components/shared';
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
            me: login.user
          }
        });
      }
    });
    $goto('../chat');
  }
</script>

<AuthPage>

  <span slot="heading">Log in to your account</span>
  <form on:submit|preventDefault={handleSubmit} slot="form">

    <FormField>
      <label for="email">Email Address</label>
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="doe@gmail.com"
        autocomplete="off"
        bind:value={loginDetails.email}
      />
    </FormField>

    <FormField>
      <label for="password">Password</label>
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        bind:value={loginDetails.password}
      />
    </FormField>

    <FormField>
      <Button>Log in</Button>
    </FormField>
  </form>

  <span slot="altAuthLink">
    Don't have an account?
    <a href={$url('../signup')}>Sign up here</a>
  </span>
</AuthPage>
