import ProfilesServ from "../Profiles/ProfilesServ";

export default {

    validateEmail(newEmail,idUser){

        const existsEmail= Accounts.findUserByEmail(newEmail);
        if(idUser){  // actualizacion de usuario
            const oldUser= Meteor.users.findOne(idUser);
            if(oldUser.emails[0].address!== newEmail && existsEmail){
                throw new Meteor.Error('403', 'El nuevo correo electronico ya esta siendo usado');
            }
        }else if(existsEmail){ // es usuario nuevo pero el correo  ya existe.
                throw new Meteor.Error('403', 'El nuevo correo ya esta siendo utilizado');

        }

    },
    validateUserName(newUserName,idUser){
        const existsUserName= Accounts.findUserByUsername(newUserName);
        if (idUser){ // actualizacion de usuario//
            const oldUser= Meteor.users.findOne(idUser);
            if(oldUser.username!==newUserName && existsUserName){
                throw new Meteor.Error('403', 'El nombre de usuario  ya esta siendo utilizado');
            }

        }else if(existsUserName){ // El nombre de NUEVO usuario ya existe
            throw new Meteor.Error('403', 'El nombre de usuario  ya esta siendo utilizado');
        }
    },createUser(user){
        const idUser= Accounts.createUser({
            username: user.username,
            email: user.emails[0].address,
            profile: user.profile
            //,  AL CREAR USUARIO no se fija el password porque se implementara un envio de una URL para que el usuario lo fije
            //password: user.password
        });
        if(idUser){
            ProfilesServ.setUsersRoles(idUser,user.profile.profile);
        }
    },updateuser(user){
        const currentUser=Meteor.users.findOne(user._id);

        if(currentUser!==undefined){
            if(currentUser.emails[0].address!==user.emails[0].address ){
                Accounts.removeEmail(currentUser._id, currentUser.emails[0].address());
                Accounts.addEmail(currentUser._id,user.emails[0].address());
            }
            if(currentUser.username!==user.username ){
                Accounts.setUsername(currentUser._id,user.username);
            }

            Meteor.users.update(user._id,{
                $set:{
                    profile:{
                        profile: user.profile.profile,
                        name: user.profile.name,
                        path: currentUser.profile.path
                    }
                }
            });
            ProfilesServ.setUsersRoles(user._id,user.profile.profile);
        }else{
            throw new Meteor.Error('403', 'El usuario por actualizar no está en la BD');
        }

    }
}