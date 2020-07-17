<script>
  import ThemeToggler from '../_components/ThemeToggler.svelte';
  import ChatList from '../_components/ChatList.svelte';
  import ChatBar from '../_components/ChatBar.svelte';
  import ProfileImage from '../_components/ProfileImage.svelte';
  import { query, mutate } from '../../utils/apolloUtils.js';
  import { GET_MSGS, SEND_MSG } from '../../queries.js';
  import { NEW_MSG } from '../../queries.js';

  const chatPromise = query(GET_MSGS);
  let messages;

  $: $chatPromise.then(res => (messages = res.data.messages));

  chatPromise.subscribeToMore({
    document: NEW_MSG,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newMessage = subscriptionData.data.messageAdded;
      prev.messages.push(subscriptionData.data.messageAdded);
      return {
        ...prev
      };
    }
  });

  const handleSend = async ({ detail: { message } }) => {
    if (message.length) {
      const res = await mutate(SEND_MSG, {
        variables: {
          input: {
            message
          }
        },
        update(cache, { data: { addMessage } }) {
          const { messages } = cache.readQuery({ query: GET_MSGS });
          messages.push(addMessage);
          cache.writeQuery({
            query: GET_MSGS,
            data: {
              messages
            }
          });
        }
      });
    }
  };
</script>

<main>
  <header>
    <ProfileImage />
    <p class="recipient-name">Chattly</p>
    <ThemeToggler />
  </header>
  <ChatList {messages} />
  <footer>
    <ChatBar on:send={handleSend} />
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
  }
</style>
