<template>
  <v-app>
    <v-app-bar app color="light-blue darken-3">
      <v-toolbar-title class="titleToolbar">
        Star Wars - API Characters
      </v-toolbar-title>
    </v-app-bar>
    <router-view />
  </v-app>
</template>
<script>
export default {
  name: 'Home',
};
</script>
<style lang="scss" scoped>
.titleToolbar {
  color: white;
}
</style>
