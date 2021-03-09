import Vue from 'vue';
import VueRouter from "vue-router";
import routes from "./routes/routes";
import store from "./store";


Vue.use(VueRouter);

const router= new VueRouter({
    mode:'history',
    routes
})

router.beforeEach((to,from,next)=>{
    const requirestAuth= to.matched.some(record=>record.meta.requirestAuth);
    const isLogged=store.state.auth.isLogged;
    if(!requirestAuth && isLogged && to.name === 'login'){
        next('/');
    }else if(requirestAuth && !isLogged){
        next('/login');
    }else{
        next();
    }
});



export default router;
