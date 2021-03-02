import {Meteor} from 'meteor/meteor';
import Vue from 'vue';
import vuetify from "../../ui/plugins/vuetify"
import '../../ui/plugins/index';


// Main App
import App from '/imports/ui/App';
import router from "../../ui/router";

Meteor.startup(()=> {
   new Vue({
       router,
       vuetify,
       render: h=>h(App)
   }).$mount("app" );

});


