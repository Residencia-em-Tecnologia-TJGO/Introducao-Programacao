<template>
    <q-page class="column q-pa-md bg-grey-3">
        <div>
        <h1 class="text-h3">Histórico</h1>
        </div>
        <div class="w100 column items-center justify-center">
            <q-list bordered class="rounded-borders shadow-1">
                <q-item v-for="log in logs" :key="log._id" class="q-py-md">
                    <q-item-section>
                        <q-item-label class="text-bold q-pb-sm text-h6">🔔 {{ log.acao }}</q-item-label>
                        <q-item-label  caption>🕜 {{ log.dataHora }}</q-item-label>
                    </q-item-section>
            </q-item>
            </q-list>
        </div>

    </q-page>
</template>

<script setup>
import Utils from 'app/utils';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { onBeforeMount, ref } from 'vue';

const $q = useQuasar();

const logs = ref([]);

async function getLogs() {
    const userLogado = Utils.getInfoUsuarioREQ();
    const url = '?' + 'usuario_id=' + userLogado.id + '&token=' + userLogado.token;
    await api.get('/acoes-executadas' + url)
        .then(response => {
            logs.value = response.data;
        })
        .catch(error => {
            console.log(error);
            $q.notify({
                color: 'negative',
                position: 'top',
                message: 'Erro ao buscar logs',
                icon: 'report_problem'
            });
        });
}

onBeforeMount(async () => {
    await getLogs();
});

</script>

<style scoped>
.q-list {
    width: 50%;
    background: #fff;
}
.q-item:nth-child(2n) {
    background: #f5f5f5;
}
@media (max-width: 450px) {
    .q-list {
        width: 100%;
    }
    
}
</style>