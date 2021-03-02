<template>
  <v-menu offset-y>
    <template v-slot:activator="{on}">
      <v-btn color="default" dark text v-on="on" class="mr-5">
        Enrique
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item href="#" :to="{name:'home.account'}">Cuenta</v-list-item>
      <v-list-item href="#">Cerrar sesión</v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "UserLogged"
}
</script>

<style scoped>

</style>