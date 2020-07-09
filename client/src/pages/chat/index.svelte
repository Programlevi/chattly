<script>
  let message = '';
</script>

<main>
  <header>
    <div class="profile-img" />
    <p class="chat-name">Chattly</p>
  </header>
  <div class="chat-list">
    <div class="chat-box-container">
      <div class="chat-box">
        <p class="name">Levi</p>
        <p class="message">
          How do you do?
        </p>
      </div>
    </div>
  </div>
  <footer>
    <div contenteditable="true" class="text-area" bind:innerHTML={message} />
  </footer>
</main>

<style>
  main {
    width: 75%;
    height: 100vh;
    margin-left: 25%;
    position: relative;
  }
  .profile-img {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background-color: gray;
    align-self: center;
  }
  header {
    padding: 0 1.2rem;
    border-left: 1px solid rgb(93, 93, 93);
    display: flex;
    align-items: center;
  }
  .chat-name {
    margin-left: 1rem;
  }
  .chat-list {
    padding-top: 6.3rem;
    height: 100%;
  }
  .chat-box-container {
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
  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: var(--bg-color-3);
    display: flex;
    justify-content: center;
    padding: 1rem;
    align-items: center;
  }
  .text-area {
    color: inherit;
    padding: 1rem 2rem;
    background-color: var(--bg-color-2);
    border: none;
    width: 100%;
    /* overflow: auto; */
    border-radius: 20px;
  }
</style>
