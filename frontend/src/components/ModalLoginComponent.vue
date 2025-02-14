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
                    <q-input class="" outlined v-model="user.name" maxlength="100" label="Nome Completo">
                        <template v-slot:prepend>
                            <q-icon name="person" color="blue-14" />
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
                    <q-input class="" outlined v-model="user.password" maxlength="20" label="Senha" type="password">
                        <template v-slot:prepend>
                            <q-icon name="lock" color="blue-14" />
                        </template>
                        <template v-slot:append>
                            <q-icon :name="formOptions.showPassword ? 'visibility' : 'visibility_off'" @click="formOptions.showPassword = !formOptions.showPassword" />
                        </template>
                    </q-input>
                </q-card-section>
                <q-card-actions >
                    <q-btn v-if="formOptions.isEditMode" class="w100 q-mx-sm" glossy label="Registrar-se" icon-right="person_add"  color="primary" @click="formOptions.isEditMode = false" />
                    <q-btn v-else class="w100 q-mx-sm" glossy label="Fazer Login" icon-right="login"  color="primary" @click="formOptions.isEditMode = false" />
                    <q-btn class="w100 q-mx-sm q-mt-md"  :label="formOptions.isEditMode ? 'Cancelar' : 'Criar Nova Conta'" flat  color="blue-14" @click="formOptions.isEditMode = !formOptions.isEditMode" />
                </q-card-actions>
            </q-card>
        </q-card-section>
    </q-card>
</template>

<script setup>
import { ref } from 'vue';

const user = ref(
    {
        name: '',
        email: '',
        password: '',
        cpf: ''
    }
)

const formOptions = ref(
    {
        isEditMode: false,
        showPassword: false
    }
)

</script>

<style scoped>

</style>