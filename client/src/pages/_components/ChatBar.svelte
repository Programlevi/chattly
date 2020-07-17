<script>
  import { tick } from 'svelte';
  import Emoticon from '../../assets/emoticon.svg';
  import Send from '../../assets/send.svg';
  import setCaretAtEnd from '../../utils/setCaretAtEnd.js';
  import br2nl from '../../utils/br2nl.js';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let value = '';
  let chatInput;
  const click = node => {
    const handleEmojiclick = async event => {
      if (chatInput.lastChild.nodeName === 'BR') {
        const sub = value.substr(0, value.length - 4);
        value = `${sub}${event.detail.unicode}<br>`;
      } else {
        value += event.detail.unicode;
      }
      await tick();
      setCaretAtEnd(chatInput);
    };
    node.addEventListener('emoji-click', handleEmojiclick);
    return {
      destroy() {
        node.removeEventListener('emoji-click', handleEmojiclick);
      }
    };
  };

  let showPicker = false;
  const handleToggleclick = () => {
    showPicker = !showPicker;
  };
  const handleBodyClick = () => {
    if (showPicker) {
      showPicker = false;
    }
  };

  const handleSubmit = () => {
    dispatch('send', { message: br2nl(value) });
    value = '';
    showPicker = false;
  };

  const handlekeyDown = async event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };
</script>

<svelte:body on:click={handleBodyClick} />
<form on:submit|preventDefault={handleSubmit} on:click|stopPropagation>
  {#if showPicker}
    <emoji-picker use:click class="dark" />
  {/if}
  <div class="input-container">
    <div class="toggle" on:click={handleToggleclick}>
      <Emoticon />
    </div>
    <span
      contenteditable="true"
      class="chat-input"
      bind:this={chatInput}
      bind:innerHTML={value}
      on:keydown={handlekeyDown}
    />
    <button>
      <Send />
    </button>
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
  }
  emoji-picker {
    width: 100%;
    height: 30rem;
    --emoji-size: 2rem;
  }
  .input-container {
    min-height: 9vh;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: var(--bg-color-4);
    padding: 1rem 0;
  }
  .toggle {
    cursor: pointer;
  }
  .toggle :global(svg) {
    fill: var(--main-color);
    height: 2.5rem;
    width: 2.5rem;
  }
  .toggle:hover :global(svg) {
    fill: var(--main-color-dark);
  }
  .chat-input {
    color: inherit;
    padding: 1rem 2rem;
    background-color: var(--bg-color-2);
    border: none;
    border-radius: 20px;
    min-height: 100%;
    width: 92rem;
    word-wrap: break-word;
  }
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button :global(svg) {
    fill: var(--main-color);
    width: 3rem;
    height: 3rem;
  }
  button:hover :global(svg) {
    fill: var(--main-color-dark);
  }
</style>
