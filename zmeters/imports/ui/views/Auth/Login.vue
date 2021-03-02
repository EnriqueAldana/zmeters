<template>
    <div class="login-wrapper">
        <div class="title secondary--text">Bienvenido!</div>
        <div class="display-1 mb-0 secondary--text">Iniciar sesión</div>
        <v-form @submit.prevent="login" autocomplete="nope">
            <v-text-field id="inputUser" v-model="user.userOrEmail" autocomplete="off"
                          label="Usuario" name="email" prepend-icon="person" color="primary" type="text">
            </v-text-field>
            <v-text-field id="inputPassword" label="Contraseña" name="password" prepend-icon="lock"
                          v-model="user.password" type="password">
            </v-text-field>
            <div class="d-flex justify-end">
                <v-btn color="primary" text :to="{name:'forgotPassword'}" small>¿Olvidé mi contraseña?</v-btn>
            </div>
            <div class="d-flex justify-start">
                <v-btn type="submit" rounded color="primary" transition="fade">Entrar</v-btn>
            </div>
        </v-form>
    </div>
</template>

<script>
import AlertMessage from "../../components/Utilities/Alerts/AlertMessage";
import Loader from "../../components/Utilities/Loaders/Loader";
    export default {
        name: "Login",
        data() {
            return {
                user: {
                    userOrEmail: null,
                    password: null
                }
            }
        },
        methods: {
            login() {
                console.log("usuario: ", this.user);
                this.$loader.activate("Entrando al sistema...");
                setTimeout( ()=>{
                  this.$loader.deactivate();;
                  this.$alert.showAlertSimple("error", "Credenciales incorrectas");
              }, 2000)

            }
        }
    }
</script>

<style scoped>
    .login-wrapper {
        margin-top: 45px;
    }
</style>