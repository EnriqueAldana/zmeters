/* Forma de publicar
Meteor.publish('user.list',function(){
        return Meteor.users.find();
});

 */
// no lo reconoce quitar advertencia
new PublishEndpoint('user.list',function(param1){
        return Meteor.users.find({},{
                sort:{createdAt: -1}
        });
});