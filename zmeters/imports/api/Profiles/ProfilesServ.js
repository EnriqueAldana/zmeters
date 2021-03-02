import {Profile} from './Profile';
import {Meteor} from 'meteor/meteor'
export default {

    getUsersByprofile(idPrtofile){
            const profile = Profile.findOne(idPrtofile);
            return Meteor.users.find({'profile.profile':profile.name}).fetch();
        },
    setUsersRoles(user, profile){
        const permissions= profile.permissions;
         Meteor.roleAssignment.remove({'user._id':user._id});
         Roles.setUserRoles(user._id,permissions);
        },
    updateProfileUsers(users,profile){
      users.forEach(user => {
                this.setUsersRoles(user,profile);
           });
    }


}