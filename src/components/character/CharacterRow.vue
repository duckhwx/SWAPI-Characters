<template>
  <v-card
  id="cardCharacter"
  class="px-5"
  color="grey darken-2"
  max-height="100px"
  min-height="50px"
  hover
  dark
  @click="selectCharacter()"
  >
    <v-row>
      <v-col>
        {{character.name}}
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: 'CharacterRow',
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  methods: {
    selectCharacter() {
      const characterFormated = this.formatCharacterObj(this.character);

      this.$router.push({
        name: 'CharacterInfo',
        params: {
          character: characterFormated,
        },
      });
    },
    formatCharacterObj(character) {
      const formatedCharacter = character;

      if (character.mass !== 'unknown') {
        formatedCharacter.mass = `${character.mass} Kg`;
      }

      if (character.height !== 'unknown' && character.height.length > 2) {
        formatedCharacter.height = `${character.height.slice(0, 1)}.${character.height.slice(1)}`;
      }

      return character;
    },
  },
};
</script>
<style lang="scss" scoped>
  #cardCharacter:hover {
    background-color: #424242!important;
  }
</style>
