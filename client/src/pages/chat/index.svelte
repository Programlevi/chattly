<script>
  import ChatInterface from '../_components/ChatInterface.svelte';
  import { query, mutate } from '../../utils/apolloUtils.js';
  import { GET_MSGS, SEND_MSG } from '../../queries.js';
  import { NEW_MSG } from '../../queries.js';

  const chatPromise = query(GET_MSGS);
  let messages;

  $: $chatPromise.then((res) => (messages = res.data.messages));

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
            message,
            type: 'GROUP'
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

<ChatInterface on:send={handleSend} {messages} chatName="Chattly" />
