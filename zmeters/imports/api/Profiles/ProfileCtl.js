import {check, Match} from "meteor/check";
import {Profile} from "./Profile";
import {ResponseMessage} from "../../startup/server/Utilities/ResponseMesssage";
import ProfileServ from "./ProfilesServ";

new ValidatedMethod({
    name: 'profile.save',
    validate(profile) {
        try {
            // Valida que la estructura del objeto user este conforme a la definicion.
            check(profile, {
                _id: Match.OneOf(String, null),
                name: String,
                description: String,
                permissions: [String]
            });
        } catch (exception) {
            console.error('profile.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es válida.');
        }
    },
    run(profile) {
        console.log('profile.save');
        const responseMessage= new ResponseMessage();
        if(profile._id !==null){
            try{
                const oldProfile= Profile.findOne(profile._id);
                const users = ProfileServ.getUsersByprofile(profile._id);
                Profile.update(profile._id,{
                    $set:{
                        name: profile.name,
                        description: profile.description,
                        permissions: profile.permissions
                    }
                });
                // Aqui debemos actualizar a los usuarios con el perfil anterior por el nuevo
                if(oldProfile.name !== profile.name){
                  Meteor.users.update({'profile.profile':oldProfile.name},{
                          $set: {
                                  'profile.profile': profile.name
                          }
                      },{multi: true})
                }
                // Actualizamos los permisos para el nuevo rol a todos los usuarios en la tabla de relacion
                // role-assignment
                //ProfileServ.updateProfileUsers(users,profile,oldProfile);
                ProfileServ.updateProfileUsers(users,profile);
                responseMessage.create('Se ha actualizo el perfil');
            }catch (exception) {
                console.error('profile.save', exception);
                throw new Meteor.Error('500', 'Ocurrió un error al actualizar el perfil');
            }
        }else{
            try{
                Profile.insert({
                    name: profile.name,
                    description: profile.description,
                    permissions: profile.permissions
                });
                console.log('Se ha guardado el perfil');
                responseMessage.create('Se ha guardado el perfil');
            }catch (exception) {
                console.error('profile.save', exception);
                throw new Meteor.Error('500', 'Ocurrió un error al guardar el perfil');
            }
        }


        return responseMessage;
    }
});