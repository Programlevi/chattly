<script>
  import { tick } from 'svelte';
  import Emoticon from '../../assets/emoticon.svg';
  import Send from '../../assets/send.svg';
  import setCaretAtEnd from '../../utils/setCaretAtEnd.js';

  let value = '';
  let chatInput;
  const click = node => {
    const handleEmojiclick = async event => {
      value += event.detail.unicode;
      await tick();
      setCaretAtEnd(chatInput);
    };
    node.addEventListener('emoji-click', handleEmojiclick);
    return () => {
      node.removeEventListener('emoji-click', handleEmojiclick);
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
</script>

<svelte:body on:click={handleBodyClick} />
<form on:submit|preventDefault on:click|stopPropagation>
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--bg-color-3);
    padding: 1rem;
  }
  .toggle {
    cursor: pointer;
  }
  .toggle :global(svg) {
    height: 2.5rem;
    width: 2.5rem;
    margin-right: 1rem;
  }
  .chat-input {
    color: inherit;
    padding: 1rem 2rem;
    background-color: var(--bg-color-2);
    border: none;
    border-radius: 20px;
    min-height: 4.1rem;
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
    margin-left: 1rem;
  }
  button :global(svg) {
    width: 3rem;
    height: 3rem;
  }
</style>
