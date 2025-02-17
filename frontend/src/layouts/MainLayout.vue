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
      <div v-if="userLogado" class="q-mt-lg">
        <div class="w100 q-py-md text-center text-white text-h6 q-mb-md rounded-borders">
          <q-avatar color="blue-14" text-color="white" size="100px" icon="account_circle" class="q-mb-md"/><br>
          {{ Utils.convertStringToFirstAndLast(userLogado.nome).toUpperCase() }}
        </div>
        <q-item v-for="option in rightDrawerOptions" clickable :key="option.label" @click="option.click()">
          <q-item-section class="shadow-2 text-grey-14 rounded-borders q-pa-sm text-bold text-h6 bg-grey-2">
            <div class="w100 row no-wrap justify-between items-center q-px-sm">
              {{ option.label }}
              <q-icon :name="option.icon" color="blue-14" size="md"/>
            </div>
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
import Utils from 'app/utils'
import { useRouter } from 'vue-router'

// Variáveis reativas
const userLogado = ref(JSON.parse(localStorage.getItem('userLogado')) || null)
const rightDrawerOpen = ref(false)
const modalLoginOpen = ref(false)
const router = useRouter()

const rightDrawerOptions = ref([
  { label: 'Página Inicial', icon: 'home', click: goToRoute('#') },
  { label: 'Ações', icon: 'chat', click: goToRoute('#') },
  { label: 'Contatos', icon: 'contacts', click: goToRoute('#') },
  { label: 'Logout', icon: 'logout', click:() =>{ logout()} }
])

function goToRoute(route) {
  router.push(route)
}

function logout() {
  let confirm = window.confirm('Deseja realmente sair?')
  if (!confirm) return
  localStorage.removeItem('userLogado')
  setTimeout(() => {
    window.location.reload()
  }, 500)
}

// Função para alternar o drawer
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>
