<script setup>
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true;
      return 'Nome precisa ter no mínimo 2 caracteres.';
    },
    phone(value) {
      if (value?.length > 9 && /[0-9-]+/.test(value)) return true;
      return 'Digite o número com o DDD.';
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
      return 'Digite um e-mail válido.';
    },
    select(value) {
      if (value) return true;
      return 'Selecione a opção.';
    },
    checkbox(value) {
      if (value === '1') return true;
      return 'Must be checked.';
    },
  },
});

const name = useField('name');
const phone = useField('phone');
const email = useField('email');
const select = useField('select');
const checkbox = useField('checkbox');

const items = ref([
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' },
]);

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
});
</script>


<template>

  <v-app>

    <v-toolbar color="#4b4b4b" density="compact" :elevation="8">
      <v-spacer></v-spacer>
      <div class="d-flex justify-center align-center">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="currentColor"  v-bind="props"><strong>
                Activator slot
              </strong>

            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" :value="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn color="currentColor">
          <strong>
            Parent activator

          </strong>

          <v-menu activator="parent">
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index" :value="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>

        <v-btn id="menu-activator" color="currentColor">
          <strong>
            Sibling activator

          </strong>
        </v-btn>

        <v-menu activator="#menu-activator">
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" :value="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container>


      <v-col cols="12" sm="4" class="d-flex justify-center align-center mt-10">
        <v-icon icon="$vuetify" color="#2196f3" style="font-size: 70px;"></v-icon>
      </v-col>

      <form @submit.prevent="submit" class="mt-5">
        <v-row class="mt-10">
          <v-col cols="12" sm="4">
            <div class="d-flex flex-column align-items-start">
              <v-row class="mb-2 align-center">
                <v-col cols="auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                    class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                  </svg>
                </v-col>
                <v-text-field v-model="name.value.value" color="primary" :counter="80"
                  :error-messages="name.errorMessage.value" label="Nome"></v-text-field>
              </v-row>

              <v-row class="mb-2 align-center">
                <v-col cols="auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                    class="bi bi-phone-vibrate-fill mb-2" viewBox="0 0 16 16">
                    <path
                      d="M4 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm5 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0M1.807 4.734a.5.5 0 1 0-.884-.468A8 8 0 0 0 0 8c0 1.347.334 2.618.923 3.734a.5.5 0 1 0 .884-.468A7 7 0 0 1 1 8c0-1.18.292-2.292.807-3.266m13.27-.468a.5.5 0 0 0-.884.468C14.708 5.708 15 6.819 15 8c0 1.18-.292 2.292-.807 3.266a.5.5 0 0 0 .884.468A8 8 0 0 0 16 8a8 8 0 0 0-.923-3.734M3.34 6.182a.5.5 0 1 0-.93-.364A6 6 0 0 0 2 8c0 .769.145 1.505.41 2.182a.5.5 0 1 0 .93-.364A5 5 0 0 1 3 8c0-.642.12-1.255.34-1.818m10.25-.364a.5.5 0 0 0-.93.364c.22.563.34 1.176.34 1.818s-.12 1.255-.34 1.818a.5.5 0 0 0 .93.364C13.856 9.505 14 8.769 14 8s-.145-1.505-.41-2.182" />
                  </svg>
                </v-col>
                <v-text-field v-model="phone.value.value" color="primary" v-mask="'(##) #####-####'" :counter="15"
                  :error-messages="phone.errorMessage.value" label="Telefone"></v-text-field>

              </v-row>
              <v-row class="mb-2 align-center">
                <v-col cols="auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                    class="bi bi-envelope-fill mb-2" viewBox="0 0 16 16">
                    <path
                      d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                  </svg>
                </v-col>
                <v-text-field v-model="email.value.value" color="primary" class="mb-2"
                  :error-messages="email.errorMessage.value" label="E-mail"></v-text-field>
              </v-row>

              <v-row class="mb-2 align-center">
                <v-col cols="auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                    class="bi bi-arrow-down-right-circle-fill mb-2" viewBox="0 0 16 16">
                    <path
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m5.904-2.803a.5.5 0 1 0-.707.707L9.293 10H6.525a.5.5 0 0 0 0 1H10.5a.5.5 0 0 0 .5-.5V6.525a.5.5 0 0 0-1 0v2.768z" />
                  </svg>
                </v-col>

                <v-select v-model="select.value.value" color="primary" class="mb-2"
                  :error-messages="select.errorMessage.value" :items="items" label="Selecione"></v-select>
              </v-row>

              <v-row justify="right" class="d-flex justify-center align-center mt-10">
                <v-btn class="me-4" color="primary" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="12"
                    height="12" fill="currentColor" class="bi bi-floppy2-fill me-2" viewBox="0 0 16 16">
                    <path d="M12 2h-2v3h2z" />
                    <path
                      d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1" />
                  </svg>
                  Salvar
                </v-btn>
                <v-btn @click="handleReset" color="red-darken-2"><svg xmlns="http://www.w3.org/2000/svg" width="12"
                    height="12" fill="currentColor" class="bi bi-x-circle-fill me-2" viewBox="0 0 16 16">
                    <path
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                  </svg>
                  Cancelar
                </v-btn>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </form>

    </v-container>

  </v-app>
  <v-footer class=" d-flex flex-column" color="#4b4b4b">
    <div class=" d-flex w-100 align-center px-6">
      <strong style="-webkit-text-fill-color: blanchedalmond;">Get connected with us on social networks!</strong>

      <v-spacer></v-spacer>

      <v-btn v-for="icon in icons" :key="icon" :icon="icon" class="mx-4" size="small" variant="plain"></v-btn>
    </div>

    <div class="px-4 py-2 text-center w-100">
      {{ new Date().getFullYear() }}<strong></strong>
    </div>
  </v-footer>

</template>

<style scoped></style>
