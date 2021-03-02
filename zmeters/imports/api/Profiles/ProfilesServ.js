import {Profile} from './Profile';
import {Meteor} from 'meteor/meteor'
export default {

    getUsersByprofile(idPrtofile){
            const profile = Profile.findOne(idPrtofile);
            return Meteor.users.find({'profile.profile':profile.name}).fetch();
        },
    //setUsersRoles(users, newProfileName,oldProfileName){
    setUsersRoles(idUser, profileName){

        //const permissions= Profile.findOne({name:newProfileName}).permissions;
        const permissions= Profile.findOne({name:profileName}).permissions;
        // Meteor.roleAssignments.remove({'user._id':idUser});
        //    Roles.setUsersRoles(idUser,permissions,profileName);
            //Roles.removeUsersFromRoles(users, oldProfileName);
            //Roles.setUserRoles(users,permissions,newProfileName);

        },
    //updateProfileUsers(users,newProfile,oldProfile){
    updateProfileUsers(users,profile){

        //this.setUsersRoles(users,newProfile.name,oldProfile.name);
            users.forEach(user => {
               this.setUsersRoles(user.id,profile.name);
           });
    }


}