<template>
    <q-page class="column q-pa-md bg-grey-3">
        <div>
        <h1 class="text-h3">Contatos de Emergência</h1>
        </div>
        <q-list bordered class="rounded-borders shadow-1">
            <q-item v-for="contato in contatos" :key="contato.id" class="q-py-md">
                <q-item-section>
                    <q-icon name="close" class="cursor-pointer q-mb-sm" color="red-14" size="2em" />
                    <q-item-label class="text-bold q-pb-sm">🪪 {{ contato.nome }}</q-item-label>
                    <q-item-label v-if="contato.email" caption>✉️ {{ contato.email }}</q-item-label>
                    <q-item-label caption>📲 {{ contato.telefone }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-btn
                        color="green-14"
                        label="Executar"
                        icon="play_arrow"
                        glossy
                        class="q-py-md"
                        />
            </q-item-section>
        </q-item>
        </q-list>
    </q-page>
</template>

<script setup>
import Utils from 'app/utils';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { onBeforeMount, ref } from 'vue';

const $q = useQuasar();

const contatos = ref([]);

// contato: 
// id, nome, usuario, email?, telefone

async function getContatos() {
    const userLogado = Utils.getInfoUsuarioREQ();
    const url = '?' + 'usuario_id=' + userLogado.id + '&token=' + userLogado.token;
    await api.get('/buscar-contatos' + url)
        .then(response => {
            contatos.value = response.data;
        })
        .catch(error => {
            console.log(error);
            $q.notify({
                color: 'negative',
                position: 'top',
                message: 'Erro ao buscar contatos',
                icon: 'report_problem'
            });
        });
}

onBeforeMount(async () => {
    await getContatos();
});

</script>

<style scoped>
.q-list {
    width: 50%;
    background: #fff;
}
@media (max-width: 450px) {
    .q-list {
        width: 100%;
    }
    
}
</style>