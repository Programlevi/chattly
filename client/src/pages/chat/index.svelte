<script>
  import ChatBar from '../_components/ChatBar.svelte';
</script>

<main>
  <header>
    <div class="profile-img" />
    <p class="recipient-name">Chattly</p>
  </header>
  <ul class="chat-list">
    <li class="chat-item">
      <div class="chat-box">
        <p class="name">Levi</p>
        <p class="message">How do you do?</p>
      </div>
    </li>
    <li class="chat-item">
      <div class="chat-box">
        <p class="name">Levi</p>
        <p class="message">How do you do?</p>
      </div>
    </li>
    <li class="chat-item">
      <div class="chat-box">
        <p class="name">Levi</p>
        <p class="message">How do you do?</p>
      </div>
    </li>
    <li class="chat-item">
      <div class="chat-box">
        <p class="name">Levi</p>
        <p class="message">How do you do?</p>
      </div>
    </li>
    <li class="chat-item">
      <div class="chat-box">
        <p class="name">Levi</p>
        <p class="message">How do you do?</p>
      </div>
    </li>
    <li class="chat-item">
      <div class="chat-box">
        <p class="name">Levi</p>
        <p class="message">How do you do?</p>
      </div>
    </li>
  </ul>
  <footer>
    <ChatBar />
  </footer>
</main>

<style>
  main {
    width: 75%;
    height: 100%;
    margin-left: 25%;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .profile-img {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background-color: gray;
    align-self: center;
  }
  header {
    position: absolute;
    height: 6.3rem;
    width: 100%;
    background-color: var(--bg-color-3);
    color: var(--font-color-1);
    padding: 0 1.2rem;
    border-left: 1px solid rgb(93, 93, 93);
    display: flex;
    align-items: center;
  }
  .recipient-name {
    margin-left: 1rem;
    font-weight: 300;
  }
  .chat-list {
    flex: 1;
    padding-top: 6.3rem;
    overflow: auto;
  }
  .chat-item {
    padding: 1.2rem;
    display: flex;
  }
  .chat-box {
    background-color: var(--main-color);
    padding: 5px;
    border-radius: 3px;
    color: #fff;
  }
  .chat-box .name {
    font-size: 1.2rem;
  }
  .chat-box .message {
    margin: 5px 0;
  }
</style>
