<script setup>
import { Comment, ref } from 'vue'
import CustomButton from './components/CustomButton.vue'
import ButtonGroup from './components/ButtonGroup.vue'
import TypedLine   from './components/TypedLine.vue'
import Canvas from './components/Canvas.vue'
import CornerButton from './components/CornerButton.vue'
import CornerButtonGroup from './components/CornerButtonGroup.vue'
import LanguageButton  from './components/LanguageButton.vue'



</script>


  <template>
      <Canvas></Canvas>

      <title>      {{ $t('underConstruction') }}</title>
    <col>
        <TypedLine 
          style="margin-bottom: 10px; font-family: joystix; font-size: 40pt; color: var(--color-text);;" 
          text="Lucas Moura">
        </TypedLine>
        <TypedLine
          style="margin-bottom: 150px; font-family: seven-seg ; font-size: 30pt; font-weight: normal;"
          :text= "$t('computerEngineerSubtitle')">
        </TypedLine>
    </col>

    <h2>
      {{ $t('underConstruction') }}
    </h2>

    <CornerButtonGroup>
      <CornerButton img_src="restart.png" tooltip="Restart Background Simulation" external_method="restartAutoSimulation()"></CornerButton>
      <CornerButton img_src = "github.png" tooltip="Source Code" link="https://www.github.com/lucaslpmoura/lucaslpmoura.github.io" ></CornerButton>
    </CornerButtonGroup>
    
    <LanguageButton defaultLocale="pt-BR"></LanguageButton>
  
  </template>

