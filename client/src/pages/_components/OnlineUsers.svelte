<script>
  import { url } from '@sveltech/routify';
  import ProfileImage from './ProfileImage.svelte';
  import { query } from '../../utils/apolloUtils.js';
  import { GET_ONLINE_USERS } from '../../queries.js';

  let onlineUsers = [];

  let promise = query(GET_ONLINE_USERS, {
    pollInterval: 5000,
    fetchPolicy: 'cache-and-network'
  });

  $: $promise.then((res) => {
    if (res.networkStatus === 7) {
      onlineUsers = res.data.onlineUsers;
    }
  });
</script>

<ul class="list">
  {#each onlineUsers as user}
    <li class="user-item">
      <a href={$url('./:privateId', { privateId: user.id })} class="user-link">
        <ProfileImage />
        <div class="details">
          <p class="user-name">{user.userName}</p>
        </div>
      </a>
    </li>
  {:else}
    <p>Its a little quiet here today</p>
  {/each}
</ul>

<style>
  .list {
    margin-top: 9vh;
    list-style: none;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    overflow: auto;
  }
  .user-link {
    color: var(--font-color-2);
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--bg-color-2);
    padding-bottom: 1rem;
  }
  .user-name {
    font-size: 1.6rem;
    font-weight: 400;
    margin-left: 1rem;
  }
</style>
