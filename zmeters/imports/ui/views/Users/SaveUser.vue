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
                  <img src="/img/vuetify.png" alt="Subir imagen" width="150px">
                </v-col>
                <v-col xs="12" sm="12" md="8">
                  <v-text-field v-model="user.profile.name" id="inputName" name="name" label="Nombre">
                  </v-text-field>
                  <v-select v-model="user.profile.profile" id="selectProfile" name="profile"
                            :items="profiles"
                            item-text="description" item-value="name"
                            label="Perfil">
                  </v-select>
                  <v-text-field v-model="user.username" id="inputUsername" name="username"
                                label="Usuario">
                  </v-text-field>
                  <v-text-field v-model="user.emails[0].address" id="inputEmail" type="email"
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
import {Profile} from "../../../api/Profiles/Profile";

export default {
  name: "SaveUser",
  data() {
    return {
      user: {
        _id: null,
        username: null,
        emails: [{address:null, verified:false}],
        profile: {
          profile: null,
          name:null,
          path: null
        },
      },
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
      this.$loader.activate('Guardando usuario...');
      Meteor.call('user.save',this.user,(error,response) => {
        this.$loader.deactivate();
        if(error){
              this.$alert.showAlertSimple('error',error.reason);
        }else{
          this.$alert.showAlertSimple('success',response.message);
        }
      });
    }
  },
  meteor:{
    $subscribe: {
        'profile.listAll': []
    },
    profiles(){
      return Profile.find().fetch();
    }
  }
}
</script>

<style scoped>

</style>