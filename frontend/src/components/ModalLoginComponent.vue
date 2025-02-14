<template>
    <q-card class="q-pa-md bg-grey-2">
        <q-card-section>
            <q-card class="q-pa-md">
                <div class="w100 q-mb-md text-h6">
                    <q-card-title>
                        <q-icon :name="formOptions.isEditMode ? 'person_add' : 'login'" color="blue-14" size="md" class="q-mr-md"></q-icon>{{ formOptions.isEditMode ? 'Novo' : 'Login' }} Usuário
                    </q-card-title>
                </div>
                <q-card-section v-if="formOptions.isEditMode" >
                    <q-input class="" outlined v-model="user.nome" maxlength="100" label="Nome Completo">
                        <template v-slot:prepend>
                            <q-icon name="person" color="blue-14" />
                        </template>
                    </q-input>
                </q-card-section>
                <q-card-section v-if="formOptions.isEditMode" >
                    <q-input class="" outlined v-model="user.telefone" mask="(##) #####-####" maxlength="15"  label="Telefone">
                        <template v-slot:prepend>
                            <q-icon name="phone" color="blue-14" />
                        </template>
                    </q-input>
                </q-card-section>
                <q-card-section v-if="formOptions.isEditMode" >
                    <q-input class="" outlined v-model="user.email" maxlength="100" label="E-mail">
                        <template v-slot:prepend>
                            <q-icon name="email" color="blue-14" />
                        </template>
                    </q-input>
                </q-card-section>
                <q-card-section>
                    <q-input v-model="user.cpf" mask="###.###.###-##" maxlength="14" reverse-fill-mask outlined label="CPF">
                        <template v-slot:prepend>
                            <q-icon name="fingerprint" color="blue-14" />
                        </template>
                    </q-input>
                </q-card-section>
                <q-card-section>
                    <q-input class="" outlined v-model="user.senha" maxlength="20" label="Senha" :type="formOptions.showSenha ? 'text' : 'password'">
                        <template v-slot:prepend>
                            <q-icon name="lock" color="blue-14" />
                        </template>
                        <template v-slot:append>
                            <q-icon :name="formOptions.showSenha ? 'visibility' : 'visibility_off'" @click="formOptions.showSenha = !formOptions.showSenha" />
                        </template>
                    </q-input>
                </q-card-section>
                <q-card-actions v-if="!loading">
                    <q-btn v-if="formOptions.isEditMode" @click="registrarUsuario()" class="w100 q-mx-sm" glossy label="Registrar-se" icon-right="person_add"  color="green"/>
                    <q-btn v-else class="w100 q-mx-sm" glossy label="Fazer Login" icon-right="login"  color="blue-14" @click="formOptions.isEditMode = false" />
                    <q-btn class="w100 q-mx-sm q-mt-md"  :label="formOptions.isEditMode ? 'Cancelar' : 'Criar Nova Conta'" flat  color="blue-14" @click="formOptions.isEditMode = !formOptions.isEditMode" />
                </q-card-actions>
                <q-card-actions v-else class="q-py-sm row items-center justify-center q-gutter-md">
                    <q-spinner-dots color="blue-14" />
                    <q-spinner-dots color="blue-14" />
                    <q-spinner-dots color="blue-14" />
                </q-card-actions>
            </q-card>
        </q-card-section>
    </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';

const $q = useQuasar()
const user = ref(
    {
        nome: '',
        email: '',
        telefone: '',
        senha: '',
        cpf: ''
    }
)

const formOptions = ref(
    {
        isEditMode: false,
        showSenha: false
    }
)

async function registrarUsuario() {
    const userReq = {
        nome: user.value.nome.trim().toLowerCase(),
        email: user.value.email.trim().toLowerCase(),
        senha: user.value.senha.trim().toLowerCase(),
        cpf: user.value.cpf.trim(),
        telefone: user.value.telefone.trim()
    }
    await api.post('/novo-usuario', userReq)
        .then(response => {
            $q.notify({
                color: 'blue-14',
                textColor: 'white',
                icon: 'person_add',
                message: 'Usuário registrado com sucesso!',
                position: 'top'
            })
            localStorage.setItem('userLogado', JSON.stringify(response.data))
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        })
        .catch(err => {
            $q.notify({
                color: 'blue    ',
                textColor: 'white',
                icon: 'error',
                message: err.response.data.error,
                position: 'top'
            })
            user.senha = ''
        })
}

</script>

<style scoped>

</style>