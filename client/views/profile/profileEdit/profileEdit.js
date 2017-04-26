
Template.profileEdit.helpers({
    'completarPerfil': function(){

    var currentUser = Meteor.user();
    var profile = currentUser.profile;
   return profile;
    }
});

/*Este helper hace una copia del profile y lo
envia al template. Este, a su vez lo inserta en value
*/


Template.profileEdit.events({
	'submit [name=editorProfile]': function(event){
		event.preventDefault();
	var self = this;
    var currentUser = Meteor.user();
    var userId = currentUser._id;
    
     var firstname = $('[name="firstName"]').val();
     var lastname = $('[name="lastName"]').val();
     var gender = $('[name="gender"]').val();
     var street = $('[name="street"]').val();
     var city = $('[name="city"]').val();
     var state = $('[name="state"]').val();
     var zip = $('[name="zip"]').val();
     var pic = $('[name="pic"]').val();

    
    Meteor.users.update({"_id": userId},
    	{$set:
    		{
    			"profile.firstname": firstname,
    			"profile.lastname": lastname,
    			"profile.gender": gender,
    			"profile.location.street":street,
                "profile.location.city":city,
                "profile.location.state":state,
                "profile.location.zip":zip,
                "profile.picture.large": pic,
                "profile.picture.medium": pic,
                "profile.picture.thumbnail": pic,

    				
    		}
    	});
												}
    					

  
    
							});

/*
	Una vez insertado los valores en el template por
	el helper de la parte superior, creamos este event
	que captura en variables todos los valores de los
	input box y actualiza los datos en la base de datos

	IMPORTANTE: para poder acceder a la base de datos
	de users, hay que hacerlo de la forma en la  que lo he 
	hecho en event de arriba.

    IMPORTANTE: A la hora de hacer un update $set, es importante que 
    si vamos a actualizar un atributo que está entre llaves, o lo actualizamos
    todo o bien lo hacemos con puntos, como lo hemos hecho en la parte de arriba.
*/