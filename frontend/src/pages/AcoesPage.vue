<template>
    <q-page class="column q-pa-md bg-grey-3">
        <div>
        <h1 class="text-h3">Ações</h1>
        </div>
        <q-checkbox label="Compartilhar Localização 🗺️" v-model="permitirLoc" @update:model-value="getLatitudeLongitude()" color="green" class="text-bold q-mb-md"></q-checkbox>
        <q-btn
            color="primary"
            label="Criar Ação"
            icon-right="add" glossy
            @click="dialogCriarAcao = true"
            class="q-mb-md"
            />
        <q-list bordered class="rounded-borders shadow-1">
            <q-item v-for="acao in acoes" :key="acao._id" class="q-py-xl">
                <q-item-section>
                    <q-item-label class="text-bold q-pb-sm text-h6">
                        <q-btn @click="removerAcao(acao._id)" icon="delete" size="sm" color="red-14" class="q-mb-md"></q-btn><br>
                        {{ acao.tipo_acao }}</q-item-label>
                    <q-item-label v-if="acao.mensagem" >✉️ {{ acao.mensagem }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-btn
                        color="green-14"
                        label="Executar"
                        icon-right="play_arrow"
                        glossy
                        class="q-pa-md"
                        />
            </q-item-section>
        </q-item>
        </q-list>
        <q-dialog v-model="dialogCriarAcao">
            <q-card>
                <q-card-section>
                    <q-card-title class="text-h6">Nova Ação</q-card-title>
                    <q-select class="q-mt-md" filled :options="tipoAcaoOptions" v-model="novaAcao.tipo_acao" label="Tipo de Ação*">
                        <template v-slot:prepend>
                            <q-icon color="blue-14" name="email" />
                        </template>
                    </q-select>
                    <q-select filled class="q-mt-md" :options="contatosOptions" v-model="novaAcao.contatoEmergencia" label="Contato Emergência*">
                        <template v-slot:prepend>
                            <q-icon color="blue-14" name="person" />
                        </template>
                    </q-select>
                    <q-input filled v-model="novaAcao.mensagem" class="q-mt-md" type="textarea" label="Mensagem*">
                        <template v-slot:prepend>
                            <q-icon color="blue-14" name="phone" />
                        </template>
                    </q-input>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn
                        flat
                        color="grey-7"
                        label="Cancelar"
                        @click="dialogCriarAcao = false"
                        />
                    <q-btn
                        color="primary"
                        label="Salvar"
                        icon-right="save"
                        glossy
                        :disabled="isFormCreateAcaoInvalid()"
                        @click="salvarAcao()"
                        />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup>
import Utils from 'app/utils';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import TipoAcaoEnum from 'src/enums/TipoAcaoEnum';
import { onBeforeMount, ref } from 'vue';

const $q = useQuasar();

const acoes = ref([]);
const permitirLoc = ref(false);
const dialogCriarAcao = ref(false);
const novaAcao = ref({
    contatoEmergencia: "",
    tipo_acao: '',
    mensagem: ''
})


const tipoAcaoOptions = TipoAcaoEnum
const contatosOptions = ref([]);

const coordenadas = ref({
    latitude: 0,
    longitude: 0
});

function getLatitudeLongitude() {
    if (permitirLoc.value) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                coordenadas.value.latitude = position.coords.latitude;
                coordenadas.value.longitude = position.coords.longitude;
            });
        } else {
            $q.notify({
                color: 'negative',
                position: 'top',
                message: 'Geolocalização não suportada',
                icon: 'report_problem'
            });
        }
    }
}
async function getContatos() {
    const userLogado = Utils.getInfoUsuarioREQ();
    const url = '?' + 'usuario_id=' + userLogado.id + '&token=' + userLogado.token;
    await api.get('/buscar-contatos' + url)
        .then(response => {
            contatosOptions.value = response.data.map(contato => {
                return {
                    label: contato.nome,
                    value: contato._id,
                    id: contato._id
                }
            });
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

async function removerAcao(acaoId) {
    const confirm = window.confirm('Deseja realmente remover esta ação?');
    if (!confirm) return;
    const url = '?' + 'usuario_id=' + Utils.getInfoUsuarioREQ().id + '&token=' + Utils.getInfoUsuarioREQ().token + '&acao_id=' + acaoId;
    await api.delete('/remover-acao' + url)
        .then(response => {
            $q.notify({
                color: 'positive',
                position: 'top',
                message: response.data,
                icon: 'check'
            });
            getAcoes();
        })
        .catch(error => {
            console.log(error);
            $q.notify({
                color: 'negative',
                position: 'top',
                message: error.response.data.error,
                icon: 'report_problem'
            });
        });
}

async function salvarAcao() {
    const reqData = {
        usuario: {
            id: Utils.getInfoUsuarioREQ().id,
            token: Utils.getInfoUsuarioREQ().token
        },
        tipo_acao: novaAcao.value.tipo_acao.label,
        contatoEmergencia: novaAcao.value.contatoEmergencia.id,
        mensagem: novaAcao.value.mensagem,
    }
    await api.post('/nova-acao', reqData)
        .then(response => {
            $q.notify({
                color: 'positive',
                position: 'top',
                message: response.data,
                icon: 'check'
            });
            dialogCriarAcao.value = false;
            getAcoes();
            novaAcao.value = {
                contatoEmergencia: "",
                tipo_acao: '',
                mensagem: ''
            };
        })
        .catch(error => {
            console.log(error);
            $q.notify({
                color: 'negative',
                position: 'top',
                message: error.response.data.error,
                icon: 'report_problem'
            });
        });
}

async function getAcoes() {
    const userLogado = Utils.getInfoUsuarioREQ();
    const url = '?' + 'usuario_id=' + userLogado.id + '&token=' + userLogado.token;
    await api.get('/acoes-usuario' + url)
        .then(response => {
            acoes.value = response.data;
        })
        .catch(error => {
            console.log(error);
            $q.notify({
                color: 'negative',
                position: 'top',
                message: 'Erro ao buscar ações',
                icon: 'report_problem'
            });
        });
}

function isFormCreateAcaoInvalid() {
    return !novaAcao.value.tipo_acao || !novaAcao.value.contatoEmergencia || !novaAcao.value.mensagem;
}

onBeforeMount(async () => {
    await getAcoes();
    await getContatos();
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