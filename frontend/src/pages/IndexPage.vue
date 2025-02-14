<template>
  <q-page class="q-py-md bg-grey-3">
    <div class="q-mx-md bg-white q-pa-md rounded-borders shadow-2">
      <strong class="text-h5">🌱 Projeto 01<br>INTRODUÇÃO A PROGRAMAÇÃO</strong><br><br>
      <a href="https://github.com/Residencia-em-Tecnologia-TJGO/Introducao-Programacao/tree/projeto-01" target="_blank">Repositório no GitHub</a><br><br>
      <strong>Visão Geral</strong><br>
        O WebApp de Contatos de Emergência é uma plataforma desenvolvida com Quasar + Vue3 no frontend e Express.js + MongoDB no backend.
        Seu objetivo é permitir que os usuários cadastrem contatos de emergência e acionem alertas em situações críticas, enviando notificações via WhatsApp e, opcionalmente, compartilhando sua localização atual.
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
