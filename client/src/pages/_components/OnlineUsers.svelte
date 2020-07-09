<script>
  let array = new Array(5);
</script>

<ul class="list">
  {#each array as arr}
    <li class="user-item">
      <div class="profile-img" />
      <div class="details">
        <p class="user-name">Charlie Hunam</p>
      </div>
    </li>
  {/each}
</ul>

<style>
  .list {
    margin-top: 6.3rem;
    padding: 0rem 1rem;
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
  .profile-img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: gray;
    align-self: center;
  }
  .user-name {
    margin-left: 5px;
  }
</style>
