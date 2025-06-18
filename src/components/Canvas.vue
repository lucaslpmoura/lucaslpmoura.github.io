<template>
  <div id="p5-container"></div>

</template>

<script>
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.body.appendChild(s);
  });
}

export default {
  async mounted() {
    try {
      await loadScript('/game-of-life/libraries/p5.min.js');
      await loadScript('/game-of-life/libraries/p5.sound.min.js');
      await loadScript('/game-of-life/sketch.js');
    } catch (err) {
      console.error('Erro ao carregar script:', err);
    }
  }
}
</script>