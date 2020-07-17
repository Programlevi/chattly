<script>
  import ProfileImage from './ProfileImage.svelte';
  let array = new Array(5);
</script>

<ul class="list">
  {#each array as arr}
    <li class="user-item">
      <ProfileImage />
      <div class="details">
        <p class="user-name">rainlife</p>
      </div>
    </li>
  {/each}
</ul>

<style>
  .list {
    margin-top: 9vh;
    padding: 0rem 1rem;
    max-height: 91vh;
  }
  .user-item {
    display: flex;
    height: 7rem;
  }
  .details {
    flex: 1;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--bg-color-2);
  }

  .user-item :global(.profile-img) {
    align-self: center;
  }

  .user-name {
    margin-left: 5px;
  }
</style>
