<script>
  import { beforeUpdate, afterUpdate } from 'svelte';
  import ChatItem from './ChatItem.svelte';
  export let messages;

  let ul;
  let autoscroll;

  beforeUpdate(() => {
    autoscroll = ul && ul.offsetHeight + ul.scrollTop > ul.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) ul.scrollTo(0, ul.scrollHeight);
  });
</script>

<ul class="chat-list" bind:this={ul}>
  {#if messages}
    {#each messages as message}
      <ChatItem {message} />
    {/each}
  {/if}
</ul>

<style>
  ul {
    overflow: auto;
    flex: 1;
    margin-top: 9vh;
    max-height: 82vh;
  }
</style>
