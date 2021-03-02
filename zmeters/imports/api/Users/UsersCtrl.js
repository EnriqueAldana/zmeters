import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {check} from 'meteor/check';
import {ResponseMessage} from "../../startup/server/Utilities/ResponseMesssage";
import UsersServ from "./UsersServ";

new ValidatedMethod({
    name: 'user.save',
    validate(user) {
        try {
            // Valida que la estructura del objeto user este conforme a la definicion.
            check(user, {
                _id: Match.OneOf(String, null),
                username: String,
                emails: [{address: String, verified: Boolean}],
                profile: {
                    profile: String,
                    name: String,
                    path: Match.OneOf(String, null)
                }
            });
        } catch (exception) {
            console.error('user.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es válida.');
        }
        // Validar que no haya usuarios con el mismo correo y nombre de usuario en la BD.
        UsersServ.validateEmail(user.emails[0].address,user._id);
        UsersServ.validateUserName(user.username,user._id);


    },
    run(user) {
        console.log('user.save');
        const responseMessage= new ResponseMessage();
        if(user._id !==null){
            console.log('Actualizando usuario a la BD');
            try {
                UsersServ.updateuser(user);
            }catch(exception){
                console.error('user.save',exception);
                throw new Meteor.Error('500','Ocurrió un error al actualizar los datos del usuario');
            }
            console.log('Se actualizaron los datos del usuario exitosamente');
            responseMessage.create('Se actualizaron los datos del usuario exitosamente');
        }else{
            console.log('Agregando usuario a la BD');
            try{
                UsersServ.createUser(user);
                console.log('Se ha guardado el usuario');
                responseMessage.create('Se ha guardado el usuario');
            }catch (exception) {
                console.error('user.save', exception);
                throw new Meteor.Error('500', 'Ocurrió un error al guardar el usuario');
            }
        }


        return responseMessage;
    }
});


new ValidatedMethod({
    name:'user.delete',
    validate({idUser}){
        try{
            check('idUser',String);
        }catch (exception) {
            console.error('user.remove', exception);
            throw new Meteor.Error('403','La informacion proporcionada no es correcta');
        }

    },
    run({idUser}){
        console.log('user.remove');
        const responseMessage = new ResponseMessage;
        try{
            console.log('Eliminando usuario a la BD');
            Meteor.users.remove(idUser);
            responseMessage.create('Usuario eliminado exitosamente');
        }catch(exception){
            console.error('user.remove','Ocurrió un error al eliminar al usaurio');
            throw new Meteor.Error('500', 'ocurrió un error al eliminar al usaurio');
        }
        return responseMessage;
    }
});
