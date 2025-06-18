<template>
    <div class="corner-button-group">
        <slot></slot>
    </div>
</template>

<style scoped>
    .corner-button-group {
    position: fixed;      
    bottom: 30px;         
    right: 20px;         
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 999; 
    }
</style>