<template>
  <v-container>
    <v-row
    justify="center">
      <v-col
      class="wrapperCol"
      cols="8">
        <v-card
        class="px-5 py-3"
        color="grey lighten-2"
        min-height="600px">
          <v-card-title class="pt-0">
          Dados do personagem
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
              color="primary"
              to="ListCharacters"
              v-bind="attrs"
              v-on="on"
              fab
              small
              >
                <v-icon dark>
                    mdi-keyboard-return
                </v-icon>
              </v-btn>
            </template>
            <span>Retornar</span>
          </v-tooltip>
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
          <div
            v-show="!loading">
            <v-container
            class="characterInfoBlock">
              <v-row>
              <v-col
              class="charInfoCol"
              sm="12"
              md="6">
                <span class="font-weight-medium">
                Nome:
                </span>
                <span class="pl-1">
                  {{character.name}}
                </span>
              </v-col>
              <v-col
              class="charInfoCol"
              sm="12"
              md="6">
                <span class="font-weight-medium">
                Data de Nascimento:
                </span>
                <span class="pl-1">
                  {{character.birth_year}}
                </span>
              </v-col>
              </v-row>
              <v-row>
              <v-col
              class="charInfoCol"
              sm="12"
              md="6">
                <span class="font-weight-medium">
                Cor da pele:
                </span>
                <span class="pl-1">
                  {{character.skin_color}}
                </span>
              </v-col>
              <v-col
              class="charInfoCol"
              sm="12"
              md="6">
                <span class="font-weight-medium">
                Gênero:
                </span>
                <span class="pl-1">
                  {{character.gender}}
                </span>
              </v-col>
              </v-row>
              <v-row>
              <v-col
              class="charInfoCol"
              sm="12"
              md="6">
                <span class="font-weight-medium">
                Cor do cabelo:
                </span>
                <span class="pl-1">
                  {{character.hair_color}}
                </span>
              </v-col>
              <v-col
              class="charInfoCol"
              sm="12"
              md="6">
                <span class="font-weight-medium">
                Peso:
                </span>
                <span class="pl-1">
                  {{character.mass}}
                </span>
              </v-col>
              </v-row>
              <v-row>
              <v-col
              class="charInfoCol"
              sm="12"
              md="6">
                <span class="font-weight-medium">
                Cor dos olhos:
                </span>
                <span class="pl-1">
                  {{character.eye_color}}
                </span>
              </v-col>
              <v-col
              class="charInfoCol"
              sm="12"
              md="6">
                <span class="font-weight-medium">
                Altura:
                </span>
                <span class="pl-1">
                  {{character.height}}
                </span>
              </v-col>
              </v-row>
            </v-container>
            <v-card-title>
              Filmes
            </v-card-title>
            <v-divider class="mx-4 mb-5"></v-divider>
            <v-container
            class="px-5 py-0">
              <v-card
              class="px-5 my-2 d-flex align-center"
              color="grey lighten-1"
              max-height="70px"
              min-height="40px"
              flat
              v-for="film in films"
              :key="film.title"
              >
                <v-row
                class="text-body-2"
                dense
                no-glutters>
                  <v-col>
                  Star Wars {{film.title}}
                  </v-col>
                  <v-col>
                  Data de Lançamento:
                    {{film.releaseDate}}
                  </v-col>
                </v-row>
              </v-card>
            </v-container>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbarPresets.trigger" color="red darken-3" right top>
    {{snackbarPresets.message}}
    </v-snackbar>
  </v-container>
</template>
<script>
export default {
  name: 'CharacterInfo',
  data: () => ({
    loading: true,
    snackbarPresets: {
      trigger: false,
      message: '',
    },
    character: {},
    films: [],
  }),
  mounted() {
    //  Define o scroll da página para o inicio
    this.$vuetify.goTo(0);

    //  Caso nenhum dado de personagem seja enviado, retorna a página de lista
    if (typeof this.$route.params.character === 'undefined') {
      this.$router.push({
        name: 'ListCharacters',
        params: {
          errorInfoCharacter: true,
        },
      });
      return;
    }

    this.character = this.$route.params.character;
    this.getFilmsFromCharacter();
  },
  methods: {
    //  Pega os dados dos filmes que o personagem participa
    async getFilmsFromCharacter() {
      try {
        const films = this.character.films.map((film) => this.$axios.get(film));
        const requests = await Promise.all(films);

        for (let index = 0; index < requests.length; index += 1) {
          const { data } = requests[index];
          this.films.push({
            title: data.title,
            releaseDate: data.release_date,
          });
        }
      } catch (error) {
        Object.assign(this.snackbarPresets, {
          trigger: true,
          message: 'Houve um erro eu requisitar os filmes do personagem',
        });
      }

      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
  .characterInfoBlock {
    padding: 0px 30px !important;
  }

  @media (max-width: 600px) {
    .wrapperCol, .charInfoCol {
      flex: 0 0 100%;
      max-width: 100%
    }
  }
</style>
