<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'


const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true

      return 'Nome precisa ter no mínimo 2 caracteres.'
    },
    phone(value) {
      if (value?.length > 9 && /[0-9-]+/.test(value)) return true

      return 'Digite o número com o DDD.'
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Digite um e-mail válido.'
    },
    select(value) {
      if (value) return true

      return 'Selecione a opção.'
    },
    checkbox(value) {
      if (value === '1') return true

      return 'Must be checked.'
    },
  },
})
const name = useField('name')
const phone = useField('phone')
const email = useField('email')
const select = useField('select')
const checkbox = useField('checkbox')

const items = ref([
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
])

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>

  <v-app>
    <v-toolbar density="comfortable" :elevation="8" title="Cadastro de Clientes"></v-toolbar>
    <v-container>

      <v-col cols="12" sm="4" class="d-flex justify-center align-center mt-10">
        <v-icon icon="$vuetify" color="primary" style="font-size: 70px;"></v-icon>
      </v-col>

      <form @submit.prevent="submit" class="mt-5">
        <v-row class="mt-10">
          <v-col cols="12" sm="4">

            <div class="d-flex flex-column align-items-start">

              <v-text-field v-model="name.value.value" color="primary" class="mb-4" :counter="80"
                :error-messages="name.errorMessage.value" label="Nome"></v-text-field>

              <v-text-field v-model="phone.value.value" color="primary" v-mask="'(##) #####-####'" class="mb-4" :counter="15"
                :error-messages="phone.errorMessage.value" label="Telefone"></v-text-field>

              <v-text-field v-model="email.value.value" color="primary" class="mb-4"
                :error-messages="email.errorMessage.value" label="E-mail"></v-text-field>

              <v-select v-model="select.value.value" color="primary" class="mb-4"
                :error-messages="select.errorMessage.value" :items="items" label="Selecione"></v-select>

              <v-row justify="right" class="d-flex justify-center align-center mt-10">
                <v-btn class="me-4" color="primary" type="submit">
                  Salvar
                </v-btn>

                <v-btn @click="handleReset" color="red-darken-2">
                  Cancelar
                </v-btn>
              </v-row>

            </div>
          </v-col>
        </v-row>
      </form>

    </v-container>
    
  </v-app>
  <v-footer class="d-flex flex-column">
    <div class="bg-primary d-flex w-100 align-center px-6">
      <strong style="-webkit-text-fill-color: blanchedalmond;">Get connected with us on social networks!</strong>

      <v-spacer></v-spacer>

      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        size="small"
        variant="plain"
      ></v-btn>
    </div>

    <div class="px-4 py-2 text-center w-100">
      {{ new Date().getFullYear() }}<strong></strong>
    </div>
  </v-footer>

</template>
