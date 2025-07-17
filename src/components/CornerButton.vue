<template>
    <div class="corner-button" :onclick="external_method">
        <a :href="link"> <img :src="img_src"></a>
        <span class="tooltiptext">{{tooltip}}</span>
    </div>
  </template>

<script>
  export default {
    name: "CornerButton",
    props: {
      link: {
        type: String,
        required: false
      },
      tooltip:{
        type: String,
        required: true
      },
      img_src: {
        type: String,
        required: true
      },
      external_method: {
        type: String,
        required: false
      }
      
    },
  }
</script>
  
  <style scoped>
  .corner-button {
    height: 25px;
    width: 25px;
    margin: 5px;
    display: inline-block;
    text-decoration: none;   
    background-color: transparent;
    color: inherit;
    
    cursor: pointer;
  }


.corner-button a:hover {
  background-color: transparent; 
}

.corner-button:hover .tooltiptext {
    visibility: visible;
}

.corner-button img{
  width: 100%;
  height: auto;
}

 .tooltiptext {
    visibility: hidden;
    width: auto;
    background-color: #000;
    color: var(--lm-text  );
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    bottom: 100%;
    left: 50%;
    margin-left: -60px;
  
    position: absolute;
    z-index: 1;
  }

  
</style>