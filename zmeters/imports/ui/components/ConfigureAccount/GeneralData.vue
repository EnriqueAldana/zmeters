<template>
  <v-form @submit.prevent="saveUser">
    <v-card>
      <v-card-title>
        <div class="subtitle-2">
          DATOS GENERALES
        </div>
      </v-card-title>
      <v-col>
        <v-card-text>
          <v-text-field v-model="user.profile.name" id="inputName" name="name"  label="Nombre completo">
          </v-text-field>
          <v-text-field v-model="user.username" id="inputUsername" name="username"  label="Usuario">
          </v-text-field>
          <v-text-field v-model="user.emails[0].address" id="inputEmail" name="email"  label="Correo electrónico">
          </v-text-field>
          <div class="d-flex justify-center">
            <v-btn type="submit" color="primary" rounded depressed>
              Guardar
            </v-btn>
          </div>
        </v-card-text>
      </v-col>
    </v-card>
  </v-form>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  name: "GeneralData",
  data() {
    return {
      user: {
        _id: null,
        username: null,
        emails: [{address: null, verified: false}],
        profile: {
          profile: null,
          name: null,
          path: null
        }
      }
    }
  },
  created() {
  const user= this.$store.state.auth.user;
      this.user= {
        _id: user._id,
        username: user.username,
        emails: user.emails,
        profile: user.profile
      }
  },
  methods:{
    ...mapMutations('auth',['setUser']),
    saveUser(){
      this.$loader.activate("Actualizando datos...");
    Meteor.call('user.updatePersonalData',this.user,(error,response)=>{
        this.$loader.deactivate();
        if(error){
            this.$alert.showAlertSimple('error',error.reason);
        }else{
          // Aqui actualizar usuario logeado en el Header
          // Subirlo a la sesion trayendolo desde la BD con Meteor.user()
          this.setUser(Meteor.user());
          // invocar el escuchador de cambio de datos en user.updatePersonalData
          this.$root.$emit('setUserLogged');
            this.$alert.showAlertSimple('success',response.data);
        }

    });
    }
  }
}
</script>

<style scoped>

</style>e>