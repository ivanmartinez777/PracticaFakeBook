
Template.profileDetails.onCreated(function(){
    var self = this;
    var username = Router.current().params.username;
 /**
 * @summary Obtiene el nombre de usuario de la URL
 * @isFunction true
 * @locus Template.profileDetails
 */
    self.autorun(function(){
        username = Router.current().params.username;
 /**
 * @summary con el parámetro obtenido de la URL, hace las suscripciones necesarias para el buen funcionamiento de los métodos del profileDetail 
 * @locus UserPublications
 * @isFunction true
 * @param {String} [username]
 */
        self.subscribe("userData", username, {
            onReady:function(){
                var user = Meteor.users.findOne({username: username});
                self.subscribe("userFriendCount", user._id);
                self.subscribe("userNewFriends", user._id);
                 Meteor.subscribe("userList");
                
            }
        });
    })
   /**
 * @summary Comprueba si, una vez puestas en marcha las suscripciones, existe el usuario del username obtenido por la URL,
 *si no es asi, vuelve a la dirección raiz
 * @locus Profile
 *@isFunction true
 */
    self.autorun(function(){
        if(Template.instance().subscriptionsReady()) {
            var user = Meteor.users.findOne({username: username});
            if(!user) {
                Router.go("/");
            }
        }
    })

}),

 

Template.profileDetails.helpers({
    /**
 * @summary Busca al usuario que corresponde al usuario obtenido por la URL y devuelve su nombre completo.
 * @locus Template.profileDetails
 * @isHelper true
 * @returns {String} El nombre y apellido del del usuario obentido por la URL
 */
    fullname:function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        return user ? user.profile.firstname + " " + user.profile.lastname : null;
    },
    /**
 * @summary Busca al usuario que corresponde al usuario obtenido por la URL y devuelve la imagen correspondiente de su perfil
 * @locus Template.profileDetails
 * @isHelper true
 * @returns {String} La dirección la imagen del perfil
 */
    profilePicture:function() {
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        return user ? user.profile.picture.large : null;
    },
    /**
 * @summary Busca al usuario que corresponde al usuario obtenido por el parámetro y devuelve el numero de amigos que tiene
 * @locus Template.profileDetails
 * @isHelper true
 * @returns {Number} El el número de amigos que tiene el usuario
 */
    friendCount:function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        if(user) {
            var count = Counts.findOne({_id: user._id});
        }
        return count ? count.count : 0;
    },
    /**
 * @summary Busca al usuario que corresponde al usuario obtenido por la URL y consigue los datos de sus amigos que son enviados al template por un cursor.
 * @locus Template.profileDetails
 * @isHelper true
 * @returns {Meteor.Cursor} Un cursor de meteor con los amigos del usuario obtenido de la URL
 */
    newFriends:function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        var userArr = [];
        if(user){
            var edges = UserEdges.find({$or: [{requester: user._id},{requestee: user._id}], status:"accepted"}).fetch();
            var friendEdges = _.filter(edges, function(edge){
                if(edge.requester === user._id || edge.requestee === user._id) {
                    if(edge.requester !== user._id) {
                        userArr.push(edge.requester)
                    } else {
                        userArr.push(edge.requestee);
                    }
                }
            })
            return user ? Meteor.users.find({_id: {$in: userArr}}) : [];
        }

    },
    /**
 * @summary Busca al usuario que corresponde al usuario obtenido por la URL obtiene un String con sus datos personales que será enviado posteriormente a la template.
 * @locus Template.profileDetails
 * @isHelper true
 * @returns {String} Datos sobre su localización
 */
    about:function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
                return user ? user.profile.location.street + " " +
                              user.profile.location.city + ", " + user.profile.location.state + " " + user.profile.location.zip : "";
    },

    storyCount:function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
    },

   
    /**
 * @summary Comprueba si el pefil que estamos viendo pertenece al del usuario que está conectado
 * @locus Template.profileDetails
 * @isHelper true
 * @returns {Boolean} Devuelve true si el usuario del perfil es el mismo usuario que esta conectado.
 */
    ItsMe: function(){
    var profileUser = Meteor.users.findOne({username:Router.current().params.username});
    var currentUser = Meteor.user();
    var yo = false;
    if (currentUser._id  === profileUser._id){
      yo = true;
    }
    return yo;
},
    /**
 * @summary Comprueba si el usuario del cual estamos viendo el perfil es amigo del usuario conectado
 * @locus Template.profileDetails
 * @isHelper true
 * @returns {Boolean} Devolverá true si ya es amigo y false si no lo es
 */
     amigo: function(){
    var profileUser = Meteor.users.findOne({username:Router.current().params.username});
    console.log(profileUser.profile.username);
    var profileUserId = profileUser._id;
    var currentUser = Meteor.user();


    var amigo = UserEdges.findOne({$or:[{$and: [{requester: profileUserId},{requestee: currentUser._id}, {status:"accepted"}]}
        ,{$and:[{requester: currentUser._id},{requestee: profileUserId},{status:"accepted"}]}]});
  
    var boton = false;
    
    if (typeof amigo !== "undefined"){
        boton = true;
    }
    return boton;

    
},
    /**
 * @summary Busca a todos los usuarios de la red y los envía mediante un cursor
 * @locus Template.profileDetails
 * @isHelper true
 * @returns {Meteor.Cursor} Devuelve un cursor con todos los usuarios de la red
 */
 personas:function(){
      var personas = Meteor.users.find();
    return personas;
}


})

Template.profileDetails.events({
    /**
 * @summary Obtiene la id de usuario del propietario del perfil y la id del usuario conectado y la pasa por parametro al método addFriend
 * @locus Methods, Notifications
 * @Hurl#add-friend
 * @Fire Methods#addfriend
 * 
 */
    'click .add-friend':function(){
        var profileUser = Router.current().params.username;
        var requester = Meteor.user();
        var requestee = Meteor.users.findOne({username:profileUser});
        if(requester._id !== requestee._id){
            Meteor.call("addFriend",requester._id, requestee._id, function(err,res){
            });
        }

    }
})
