<script>
  import ThemeToggler from './ThemeToggler.svelte';
  import ChatList from './ChatList.svelte';
  import ChatBar from './ChatBar.svelte';

  export let messages;
  export let chatName;
</script>

<main>
  <header>
    <p class="recipient-name">{chatName}</p>
    <ThemeToggler />
  </header>
  <ChatList {messages} />
  <footer>
    <ChatBar on:send />
  </footer>
</main>

<style>
  main {
    width: 75%;
    height: 100vh;
    margin-left: 25%;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  header {
    position: absolute;
    height: 9vh;
    width: 100%;
    background-color: var(--bg-color-4);
    color: var(--font-color-1);
    padding: 0 1.2rem;
    display: flex;
    align-items: center;
  }
  .recipient-name {
    margin-left: 1rem;
    margin-right: auto;
    font-weight: 300;
    font-size: 2.25rem;
  }
</style>
