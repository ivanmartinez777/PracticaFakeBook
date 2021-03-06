// ----------------------------------------------------------------------------
// @Date: May 25, 2015
// @author: kris@sunsama.com
// @description: This is where the user will register for the site
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Template Event Map
// ----------------------------------------------------------------------------
Template.register.events({
    'submit #signupform':function(e){
        e.preventDefault();
        var email = $("input[name='email']").val();
        var firstname = $("input[name='firstname']").val();
        var lastname = $("input[name='lastname']").val();
        var password = $("input[name='passwd']").val();
        var username = firstname + lastname;
        try {
            if(!email.length) throw new Meteor.Error("need email", "You must have an email");
            if(!firstname.length) throw new Meteor.Error("need name", "You must input your first name");
            if(!lastname.length) throw new Meteor.Error("need lastname", "You must input your last name");
            if(password.length < 6) throw new Meteor.Error("password length", "Your password must be at least 6 characters in length");
            Accounts.createUser({username: username,
                                 email: email,
                                  password: password,
                                    profile: 
                                        {firstname: firstname,
                                         lastname: lastname,
                                         username: firstname + lastname,
                                         location : {
                                             street : "",
                                            city : "",
                                             state : "",
                                             zip : ""
                                                },
                                            picture : {
                                             "large" : "http://mundogeek.net/wp-content/avatar-mario.jpg",
                                              "medium" : "http://mundogeek.net/wp-content/avatar-mario.jpg",
                                            "thumbnail" : "http://mundogeek.net/wp-content/avatar-mario.jpg"
                                        },
                                            pendingFriends:[],
                                            confirmedFriends:[]}},

                                         function(err, id){
                if(!err) {
                    Router.go("/")
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
})
