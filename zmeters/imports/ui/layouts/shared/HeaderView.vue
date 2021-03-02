<template>
    <v-app-bar app dark dense src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
        <v-toolbar-title>Zero Meters System</v-toolbar-title>
        <v-spacer></v-spacer>
        <user-logged></user-logged>
      <template v-slot:extension>
            <v-tabs v-model="optionSelected" align-with-title>
                <v-tab v-for="option in options" :key="option.title" @click="goToView(option)"
                       v-text="option.title">
                </v-tab>
            </v-tabs>
        </template>
    </v-app-bar>
</template>

<script>

    import UserLogged from "../../components/UserLogged/UserLogged"
    export default {
        name: "HeaderView",
        components: {
            UserLogged
        },
        data() {
            return {
                optionSelected: 0,
                options: [
                    {
                        icon: 'home',
                        title: 'Inicio',
                        nameRoute: 'home'
                    },
                    {
                        icon: 'person',
                        title: 'Usuarios',
                        nameRoute: 'home.users'
                    },
                    {
                        icon: 'user-tag',
                        title: 'Perfiles',
                        nameRoute: 'home.profiles'
                    }
                ]
            }
        },
        created() {
            this.updateSelectedOption();
        },
        watch:{
            '$route'(){
                this.updateSelectedOption();
            }
        },
        methods: {
            goToView(option) {
                this.$router.push({name: option.nameRoute})
            },
            updateSelectedOption(){
                const optionSelected = this.options.find(option => option.nameRoute === this.$route.name);
                this.optionSelected = optionSelected ? this.options.indexOf(optionSelected) : this.optionSelected;
            }
        }
    }
</script>

<style scoped>

</style>