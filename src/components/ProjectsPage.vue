<script setup>
import CustomButton from './CustomButton.vue';
import Canvas from './Canvas.vue';
</script>
<template>
<div id="projPageContainer">
    <div class="background-canvas">
        <Canvas></Canvas>
    </div>
    
    <div id="projPgTextElements">
         <h1> {{ $t('underConstruction') }}</h1>
    </div>
   
    <div id="projPgSecondaryElements">
        <RouterLink to="/">
        <CustomButton>Voltar</CustomButton>
    </RouterLink>
    </div>
    
    
</div>

</template>

<style scoped>
#projPgContainer {
  position: relative; /* define o contexto do z-index */
  overflow: hidden;
}

.background-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; /* fica atrás do texto */
  width: 100%;
  height: 100%;
}

#projPgTextElements {
  position: relative;
  z-index: 1; /* garante que fica acima do canvas */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#projPgSecondaryElements {
  position: relative;
  z-index: 1;
  text-align: center;
  
  flex-direction: row;
  align-items: center;
}
</style>