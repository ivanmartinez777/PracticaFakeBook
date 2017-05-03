
/**
*@isHelper true 
*/

Template.profileEdit.helpers({
    'completarPerfil': function(){

    var currentUser = Meteor.user();
    var profile = currentUser.profile;
   return profile;
    }
});



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

     if (pic === ""){
     	pic = currentUser.profile.picture.medium;
     }
    
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

