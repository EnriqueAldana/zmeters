<template>
    <div>
        <div class="title">Restablecer contraseña</div>
        <v-form @submit.prevent="resetPassword">
            <v-text-field v-model="user.password" id="inputPassword"
                          :append-icon="showPass.new?'mdi-eye':'mdi-eye-off'"
                          :type="showPass.new ?'text':'password'"
                          name="password" label="Nueva contraseña"
                          @click:append="showPass.new=!showPass.new"
                          autocomplete="new-password">
            </v-text-field>
            <v-text-field v-model="user.confirmPassword" id="inputConfirmPassword"
                          :append-icon="showPass.confirm?'mdi-eye':'mdi-eye-off'"
                          :type="showPass.confirm ?'text':'password'"
                          name="password_confirmation" label="Confirmar contraseña"
                          @click:append="showPass.confirm=!showPass.confirm"
                          autocomplete="new-password">
            </v-text-field>
            <div class="d-flex start">
                <v-btn type="submit" color="primary" rounded>Restablecer</v-btn>
            </div>
        </v-form>
    </div>
</template>

<script>
    export default {
        name: "ResetPassword",
        data() {
            return {
                user: {
                    password: null,
                    confirmPassword: null
                },
                showPass: {
                    new: false,
                    confirm: false
                }
            }
        },
        methods: {
            resetPassword() {
              const token = this.$route.params.token;
              Accounts.resetPassword(token,this.user.password, (error,success) => {
                if(error){
                  this.$alert.showAlertSimple('error','Se produjo un error al cambiar la contraseña');
                }else {
                  this.$alert.showAlertSimple('success','Se estableció la contraseña con exito');
                  this.$router.push({'name':'login'});
                }
              });
            }
        }
    }
</script>

<style scoped>

</style>