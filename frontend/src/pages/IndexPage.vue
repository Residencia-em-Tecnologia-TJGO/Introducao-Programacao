<template>
  <q-page class="q-py-md bg-grey-3 flex flex-center">
    <div id="card-home" class=" q-mx-md bg-white q-pa-md rounded-borders shadow-2">
      <strong class="text-h5">🌱 PROJETO 01<br><i>INTRODUÇÃO A PROGRAMAÇÃO</i></strong><br><br>
      <a href="https://github.com/Residencia-em-Tecnologia-TJGO/Introducao-Programacao/tree/projeto-01" target="_blank">Repositório no GitHub</a><br><br>
      <img src="https://github.com/Residencia-em-Tecnologia-TJGO/Introducao-Programacao/blob/projeto-01/modelagem-de-dados-Projeto-01.png?raw=true" width="100%" height="100%">
      <strong>Visão Geral</strong><br>
        O WebApp de Contatos de Emergência é uma plataforma desenvolvida com Quasar + Vue3 no frontend e Express.js + MongoDB no backend.
        Seu objetivo é permitir que os usuários cadastrem contatos de emergência e acionem alertas rápidos pré cadastrados em situações críticas, enviando notificações via WhatsApp e, opcionalmente, compartilhando sua localização atual.
        <br><br>
      <strong>Autor: </strong><a href="https://samuelvictorol.github.io/portfolio/" target="_blank">Samuel Victor</a>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
<style scoped>
#card-home {
  max-width: 800px;
}
</style>
