<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-grad-1 q-py-md text-white">
      <q-toolbar class="">
        <q-toolbar-title>
          Projeto 1
        </q-toolbar-title>
        <q-btn
        v-if="!userLogado"
        label="entrar" 
        @click="modalLoginOpen = true" 
        glossy
        icon-right="login" 
        class="q-mr-sm" 
        color="green"
      />
        <q-btn v-else glossy color="blue-14" icon-right="menu" label="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" class="bg-grad-1">
      <div v-if="userLogado">
        <q-item v-for="option in rightDrawerOptions" :key="option.label">
          <q-item-section>
            <q-item-label>{{ option.label }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon :name="option.icon" />
          </q-item-section>
        </q-item>
      </div>
      <div v-else class="q-mt-xl q-pt-lg">
        <q-item class="">
          <q-item-section>
            <q-btn 
              label="Faça login ou registre-se!" 
              @click="modalLoginOpen = true" 
              glossy 
              icon-right="login" 
              class="q-pa-lg rounded-borders" 
              color="green"
            />
          </q-item-section>
        </q-item>
      </div>
    </q-drawer>

    <q-page-container>
      <q-dialog v-model="modalLoginOpen" persistent>
        <div class="w100 column rounded-borders bg-blue-14">
          <ModalLoginComponent />
          <q-btn label="Fechar" @click="modalLoginOpen = false" color="grey-3" flat class="bg-grad-1 q-py-sm" />
        </div>
      </q-dialog>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import ModalLoginComponent from 'src/components/ModalLoginComponent.vue'

// Variáveis reativas
const userLogado = ref(JSON.parse(localStorage.getItem('userLogado')) || null)
const rightDrawerOpen = ref(false)
const modalLoginOpen = ref(false)

const rightDrawerOptions = ref([
  { label: 'Cadastrar', icon: 'alarm' },
  { label: 'Option 2', icon: 'chat' },
  { label: 'Option 3', icon: 'settings' }
])

// Função para alternar o drawer
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>
