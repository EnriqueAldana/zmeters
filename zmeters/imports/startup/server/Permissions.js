import { Roles } from 'meteor/alanning:roles';


const Permissions={
    USERS:{
        LIST:{VALUE:'users-view',TEXT:'Listar usuarios'},
        CREATE:{VALUE:'users-create',TEXT:'Crear Usuario'},
        UPDATE:{VALUE:'users-edit',TEXT:'Editar Usuario'},
        DELETE:{VALUE:'users-delete',TEXT:'Borrar Usuario'},
        ADMIN:{VALUE:'users-admin',TEXT:'Administrar  Usuarios'},
        SUPERADMIN:{VALUE:'users-super-admin',TEXT:'Super usuario'}

    }
};

export const permissionsArray= Object.keys(Permissions).reduce((accumulator, systemModuleName)=>{
    const systemModuleObject= Permissions[systemModuleName];
    const modulePermissions= Object.keys(systemModuleObject).map(permission=> systemModuleObject[permission]);
    return accumulator.concat(modulePermissions);
},[]);
/*
Devuelve esto:

[
  { VALUE: 'users-view', TEXT: 'Listar usuarios' },
  { VALUE: 'users-create', TEXT: 'Crear Usuario' },
  { VALUE: 'users-edit', TEXT: 'Editar Usuario' },
  { VALUE: 'users-delete', TEXT: 'Borrar Usuario' },
  { VALUE: 'users-admin', TEXT: 'Administrar  Usuarios' },
  { VALUE: 'users-super-admin', TEXT: 'Super usuario' }
]

 */
if(Meteor.settings.private && Meteor.settings.private.REFRESH_PERMISSIONS){
    console.log('Updating permissions...');
    const currentRoles= Roles.getAllRoles().fetch();
    for(let permission of permissionsArray){
        if(!currentRoles.find(_role=> _role==permission.VALUE)){
            Roles.createRole(permission.VALUE);
        }
        Meteor.roles.update(permission.VALUE, {
            $set:{
                publicName:permission.TEXT

            }
        });
    }
}else{
    console.log('Not Updating permissions...');
}

export default Permissions;

// https://github.com/Meteor-Community-Packages/meteor-roles