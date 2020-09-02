<script>
  import { getClient } from 'svelte-apollo';
  import ProfileImage from './ProfileImage.svelte';
  import { AUTH_USER } from '../../queries.js';

  export let message;

  $: ({ id, message, author } = message);

  const {
    auth: { user }
  } = getClient().readQuery({
    query: AUTH_USER
  });
</script>

<svelte:options immutable />
<li class="chat-item" class:to-right={author.id === user.id}>
  {#if author.id !== user.id}
    <ProfileImage />
  {/if}
  <div class="chat-box">
    {#if author.id !== user.id}
      <p class="name">{author.userName}</p>
    {/if}
    <p class="message">
      {@html message}
    </p>
  </div>
</li>

<style>
  .chat-item {
    padding: 1.2rem;
    display: flex;
  }
  .to-right {
    flex-direction: row-reverse;
  }
  .to-right .name {
    text-align: end;
  }
  .chat-item :global(.profile-img) {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background-color: gray;
    margin-right: 0.5rem;
  }
  .chat-box {
    background-color: var(--bg-color-1);
    padding: 5px 10px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    max-width: 30rem;
    color: var(--font-color-2);
    word-wrap: break-word;
    white-space: pre-line;
  }
  .to-right .chat-box {
    background-color: var(--main-color);
    color: var(--font-color-1);
    border-top-right-radius: 0;
    border-top-left-radius: 15px;
  }
  .chat-box .name {
    font-weight: 300;
    letter-spacing: 1px;
    font-size: 1.3rem;
  }
  .chat-box .message {
    font-weight: 400;
    margin: 0.7rem 0;
  }
</style>
