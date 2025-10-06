<template>
  <div id="mainPgContainer">
   

    <title v-if="underConstruction">{{ $t("underConstruction") }}</title>
    <title v-else> {{ $t('mainPageTitle') }}</title>

    <div id="mainPgTextElements">
      <TypedLine
        style="
          margin-bottom: 10px;
          font-family: CourierPrime;
          font-size: 40pt;
          color: var(--color-text);
        "
        text="Lucas Moura"
      >
      </TypedLine>
      <TypedLine
        style="
          margin-bottom: 150px;
          font-family: CourierPrime;
          font-size: 30pt;
          font-weight: normal;
        "
        :text="$t('computerEngineerSubtitle')"
      >
      </TypedLine>
    </div>

    <div id="mainPgSecondaryElements">
       <h2 v-if="underConstruction">
      {{ $t("underConstruction") }}
    </h2>
    <RouterLink to="/projects" v-else>
      <CustomButton>
        {{ $t("projects") }}
      </CustomButton>
    </RouterLink>


    </div>
   


   
  </div>
</template>

<script setup>
import { Comment, ref } from "vue";
import CustomButton from "./CustomButton.vue";
import ButtonGroup from "./ButtonGroup.vue";
import TypedLine from "./TypedLine.vue";
import Canvas from "./Canvas.vue";
import CornerButton from "./CornerButton.vue";
import CornerButtonGroup from "./CornerButtonGroup.vue";
import LanguageButton from "./LanguageButton.vue";

import { useRouter } from "vue-router";
import { underConstruction } from "@/main";
const router = useRouter();



const navigateToProjects = () => {
  router.push("/projects");
};
</script>


<style scoped>
#mainPgContainer {
  position: relative; /* define o contexto do z-index */
  overflow: hidden;
}



#mainPgTextElements {
  position: relative;
  z-index: 1; /* garante que fica acima do canvas */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#mainPgSecondaryElements {
  position: relative;
  z-index: 1;
  text-align: center;
  
  flex-direction: row;
  align-items: center;
}
</style>