<script setup>
import { Comment, ref } from 'vue'
import CustomButton from './components/CustomButton.vue'
import ButtonGroup from './components/ButtonGroup.vue'
import TypedLine   from './components/TypedLine.vue'
import Canvas from './components/Canvas.vue'
import CornerButton from './components/CornerButton.vue'
import CornerButtonGroup from './components/CornerButtonGroup.vue'

</script>


  <template>
      <Canvas></Canvas>

    <col>
        <TypedLine 
          style="margin-bottom: 10px; font-family: joystix; font-size: 40pt; color: var(--color-text);;" 
          text="Lucas Moura">
        </TypedLine>
        <TypedLine
          style="margin-bottom: 150px; font-family: seven-seg ; font-size: 30pt; font-weight: normal;"
          text="Computer Engineer">
        </TypedLine>
    </col>

    <h2>
      Under construction.
    </h2>

    <CornerButtonGroup>
      <CornerButton img_src="restart.png" tooltip="Restart Background Simulation" external_method="restartAutoSimulation()"></CornerButton>
      <CornerButton img_src = "github.png" tooltip="Source Code" link="https://www.github.com/lucaslpmoura/lucaslpmoura.github.io" ></CornerButton>
    </CornerButtonGroup>
    

  </template>

