<template>
  <v-container>
    <v-row
    justify="center">
      <v-col
      class="wrapperCol"
      lg="8"
      sm="12">
        <v-card
        class="py-3 d-flex align-content-space-between flex-wrap"
        color="grey lighten-2"
        height="930px">
          <v-container
          class="mx-5 pb-0">
            <v-form
            v-model="validForm"
            @submit="getCharactersByName()">
              <v-text-field
              v-model="searchData"
              :rules="searchDataRules"
              class="pt-3"
              label="Nome do personagem"
              solo
              append-icon="mdi-magnify"
              ></v-text-field>
            </v-form>
            <v-card-title
            class="pt-0">
            Personagens do Star Wars
            </v-card-title>
            <v-divider class="mx-4 mb-5"></v-divider>
            <v-row
            v-show="loading">
              <v-col
              class="d-flex justify-center">
                <v-progress-circular
                color="primary"
                size="50"
                indeterminate>
                </v-progress-circular>
              </v-col>
            </v-row>
            <CharacterRow
            v-show="!loading"
            class="my-4"
            v-for="char in characters"
            :key="char.name"
            v-bind:character="char"
            ></CharacterRow>
          </v-container>
          <v-row
          dense>
            <v-col>
              <v-pagination
              v-model="page"
              :length="lengthPages"
              @input="getCharactersPagination"
              :total-visible="totalVisiblePagination"
              ></v-pagination>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbarPresets.trigger" color="red darken-3" right top>
    {{snackbarPresets.message}}
    </v-snackbar>
  </v-container>
</template>
<script>
import CharacterRow from '@/components/character/CharacterRow.vue';

export default {
  name: 'ListCharacters',
  components: {
    CharacterRow,
  },
  data: () => ({
    page: 1,
    lengthPages: 0,
    loading: true,
    characters: [],
    validForm: false,
    requestCharacterTime: false,
    snackbarPresets: {
      trigger: false,
      message: '',
    },
    totalVisiblePagination: 0,
    searchData: '',
    searchDataRules: [
      (v) => !!v || 'Nome do personagem requisitado',
      (v) => (v && v.length <= 64) || 'Nome deve ter menos de 64 caracteres',
      (v) => /^[A-Za-z0-9- ]*$/.test(v) || 'Caracteres Invalidos',
    ],
  }),
  mounted() {
    this.getCharactersPagination();

    //  Define o tamanho do componente de paginação com base no tamanho da tela inicial
    this.setSizePagination(window.innerWidth);

    //  Caso tenha sido redirecionado do CharacterInfo no caso de não existir os dados lá
    if (this.$route.params.errorInfoCharacter) {
      Object.assign(this.snackbarPresets, {
        trigger: true,
        message: 'Dados do personagem inexistente',
      });
    }
  },
  watch: {
    //  Verifica se foi digitado no input de pesquisa e determina um intervalo pra consultar
    searchData() {
      if (this.validForm && !this.requestCharacterTime) {
        this.requestCharacterTime = true;
        setTimeout(() => {
          this.getCharactersByName();
          this.requestCharacterTime = false;
        }, 1500);
      }
    },
  },
  methods: {
    //  Pega os 10 personagens da api com base na paginação e define nas variaveis
    async getCharactersPagination() {
      this.loading = true;

      try {
        const request = await this.$axios.get(`http://swapi.dev/api/people/?page=${this.page}`);

        Object.assign(this, {
          characters: request.data.results,
          lengthPages: Math.ceil(request.data.count / 10),
        });
      } catch (error) {
        Object.assign(this.snackbarPresets, {
          trigger: true,
          message: 'Houve um erro eu requisitar os dados dos personagens',
        });
      }

      this.loading = false;
    },
    //  Pega os dados do personagem com base no que foi digitado no input
    async getCharactersByName() {
      this.loading = true;

      try {
        const request = await this.$axios.get(`https://swapi.dev/api/people/?search=${this.searchData}`);

        Object.assign(this, {
          characters: request.data.results,
          lengthPages: Math.ceil(request.data.count / 10),
        });
      } catch (error) {
        Object.assign(this.snackbarPresets, {
          trigger: true,
          message: 'Houve um erro eu requisitar os dados dos personagens',
        });
      }

      this.loading = false;
    },
    //  Define a quantidade de itens da paginação com base no tamanho do da tela
    setSizePagination(width) {
      if (width < 375) {
        this.totalVisiblePagination = 2;
        return;
      }

      if (width < 570) {
        this.totalVisiblePagination = 4;
        return;
      }

      this.totalVisiblePagination = 9;
    },
  },
};
</script>
<style lang="scss" scoped>
  @media (max-width: 600px) {
    .wrapperCol {
      flex: 0 0 100%;
      max-width: 100%
    }
  }
</style>
