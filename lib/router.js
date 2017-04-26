Router.route('/',{
    onBeforeAction:function(){
        if(!Meteor.userId()){
            this.redirect("login");
        } else {
            this.next();
        }
    },
    template:"facebook",
    subscriptions: function(){
        return Meteor.subscribe('todos');
    }
});

Router.route('/profile/:username',{
    template:"profileFeed"
});

Router.route('/profileEdit/:username',{
    template:"profileEdit"
});

Router.route('/register',{
    template:"register"
});

Router.route('/login',{
    template:"login"
})

Router.route('/notifications',{
    template:"notifications"
})
