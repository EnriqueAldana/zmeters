<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">{{dataView.title}}</div>
      </v-col>
      <v-col cols="2">
        <v-btn block type="submit" form="saveUser" color="primary" v-text="dataView.targetButton">
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="saveUser" id="saveUser" autocomplete="off">
              <v-row>
                <v-col xs="12" sm="12" md="4">
                  <img src="./img/vuetify.png" alt="Subir imagen" width="150px">
                </v-col>
                <v-col xs="12" sm="12" md="8">
                  <v-text-field v-model="user.name" id="inputName" name="name" label="Nombre">
                  </v-text-field>
                  <v-select v-model="user.profile" id="selectProfile" name="profile"
                            :items="profiles"
                            item-text="description" item-value="name"
                            label="Perfil">
                  </v-select>
                  <v-text-field v-model="user.username" id="inputUsername" name="username"
                                label="Usuario">
                  </v-text-field>
                  <v-text-field v-model="user.email" id="inputEmail" type="email"
                                name="email" label="Correo">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SaveUser",
  data() {
    return {
      user: {
        _id: null,
        name: null,
        username: null,
        email: null,
        profile: null,
      },
      profiles: [
        {name: 'admin', description: 'Administrador'},
        {name: 'chat', description: 'Usuario Chat'}
      ],
      dataView: {
        title: '',
        targetButton: ''
      }
    }
  },
  created(){
    if(this.$router.currentRoute.name.includes("create")){
      this.dataView.title="Crear usuario";
      this.dataView.targetButton="Crear";
    }else if(this.$router.currentRoute.name.includes("edit")){
      this.dataView.title="Editar usuario";
      this.dataView.targetButton="Actualizar";
    }
  },
  methods: {
    saveUser() {
      console.log("Usuario: ", this.user);
    }
  }
}
</script>

<style scoped>

</style>