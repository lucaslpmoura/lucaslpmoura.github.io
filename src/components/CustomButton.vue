<template>
    <button class="custom-button">
      <slot>Default text</slot>
    </button>
</template>

<style scoped>

    .custom-button{
        cursor: pointer;
        background-color: transparent;
        color: var(--color-text);
        font-size: 1.5rem;
        min-width: 30px;

        border: 1px solid;
        border-radius: 25px;
    
        min-width: 250px;
        padding: 10px;   
        margin: 5px;

        transition: all 400ms;
    }

    .custom-button:hover {
        background-color: var(--color-border-hover);
  }


</style>