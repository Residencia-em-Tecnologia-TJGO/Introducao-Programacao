<template>
    <q-page class="column q-pa-md bg-grey-3">
        <div>
        <h1 class="text-h3">Contatos</h1>
        </div>
        <q-btn
            color="primary"
            label="Criar Contato"
            icon-right="add" glossy
            @click="dialogCriarContato = true"
            class="q-mb-md"
            />
        <q-list bordered class="rounded-borders shadow-1">
            <q-item v-for="contato in contatos" :key="contato._id" class="q-py-md">
                <q-item-section>
                    <q-item-label class="text-bold q-pb-sm text-h6">🪪 {{ contato.nome }}</q-item-label>
                    <q-item-label v-if="contato.email" caption>✉️ {{ contato.email }}</q-item-label>
                    <q-item-label caption>📲 {{ contato.telefone }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-btn
                        @click="removerContato(contato._id, contato.nome)"
                        color="red-14"
                        icon-right="delete"
                        glossy
                        class="q-pa-sm"
                        />
            </q-item-section>
        </q-item>
        </q-list>
        <q-dialog v-model="dialogCriarContato">
            <q-card>
                <q-card-section>
                    <q-card-title class="text-h6">Novo Contato</q-card-title>
                    <q-input filled class="q-mt-md" v-model="novoContato.nome" label="Nome*">
                        <template v-slot:prepend>
                            <q-icon color="blue-14" name="person" />
                        </template>
                    </q-input>
                    <q-input filled v-model="novoContato.email" label="Email">
                        <template v-slot:prepend>
                            <q-icon color="blue-14" name="email" />
                        </template>
                    </q-input>
                    <q-input filled v-model="novoContato.telefone" mask="(##) #####-####" maxlength="15" label="Whatsapp*">
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
                        @click="dialogCriarContato = false"
                        />
                    <q-btn
                        color="primary"
                        label="Salvar"
                        icon-right="save"
                        glossy
                        :disabled="isFormCreateContatoInvalid()"
                        @click="salvarNovoContato()"
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
import { onBeforeMount, ref } from 'vue';

const $q = useQuasar();

const contatos = ref([]);
const dialogCriarContato = ref(false);
const novoContato = ref({
    nome: '',
    email: '',
    telefone: ''
});

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

async function salvarNovoContato(){
    const reqData = {
        usuario: {
            id: Utils.getInfoUsuarioREQ().id,
            token: Utils.getInfoUsuarioREQ().token
        },
        contato: {
            nome: novoContato.value.nome.trim(),
            email: novoContato.value.email.trim(),
            telefone: novoContato.value.telefone.trim()
        }
    }
    await api.post('/novo-contato', reqData)
        .then(response => {
            $q.notify({
                color: 'positive',
                position: 'top',
                message: response.data,
                icon: 'check'
            });
            dialogCriarContato.value = false;
            getContatos();
            novoContato.value = {
                nome: '',
                email: '',
                telefone: ''
            };
        })
        .catch(error => {
            console.log(error);
            $q.notify({
                color: 'negative',
                position: 'top',
                message: 'Erro ao criar contato',
                icon: 'report_problem'
            });
        });

}

async function removerContato(contatoId, nomeContato) {
    const confirm = window.confirm('Deseja realmente excluir este contato de emergência?\n\n' + nomeContato);
    if(!confirm) return;
    const url = '?' + 'usuario_id=' + Utils.getInfoUsuarioREQ().id + '&token=' + Utils.getInfoUsuarioREQ().token + '&contato_id=' + contatoId;
    await api.delete('/remover-contato' + url)
        .then(response => {
            $q.notify({
                color: 'positive',
                position: 'top',
                message: response.data,
                icon: 'check'
            });
            getContatos();
        })
        .catch(error => {
            console.log(error);
            $q.notify({
                color: 'negative',
                position: 'top',
                message: 'Erro ao excluir contato',
                icon: 'report_problem'
            });
        });
}

function isFormCreateContatoInvalid() {
    return !novoContato.value.nome || novoContato.value.telefone.length < 14;
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
.q-item:nth-child(2n) {
    background: #f5f5f5;
}
@media (max-width: 450px) {
    .q-list {
        width: 100%;
    }
    
}
</style>