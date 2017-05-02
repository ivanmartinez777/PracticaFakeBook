Template.story.events({
    'click .like':function(e) {
        e.preventDefault();
        var story = Blaze.getData(e.currentTarget);
        var liker = Meteor.user();
        var likeData = {name: liker.profile.firstname + " " + liker.profile.lastname};
        var alreadyLiked = _.findWhere(story.likes, likeData);
        if(!alreadyLiked){
            Stories.update({_id: story._id}, {$push:{likes: likeData}});
        } else {
            Stories.update({_id: story._id}, {$pull:{likes:likeData}});
        }
    },

    'click [name=comentar]': function(event){
        event.preventDefault();
    var idStory = Blaze.getData(event.currentTarget)._id;
    var comment = $('[name="'+idStory+'comment"]').val();
    var user = Meteor.user();
  /*
    Tenia el problema de que cuando comentaba en otro post, ya no podía 
    comentar en el anterior, he solucionado el problema con el helper
    ident y añadiendo la id al input comment
  */

    Stories.update({_id: idStory},{$push:{comments:{
        UserId: user._id,
        Cuerpo: comment,
        createdAt: new Date(),
        UserPicMed: user.profile.picture.medium,
        UserPicThumb: user.profile.picture.thumbnail,
        UserUsername: user.profile.username
        }
    }});
    console.log("introducido nuevo comentario");
   /*//Creo un objeto Comentario, porque no me es posible mandar más de un parámetro String
    Meteor.call('addComment', comentario);*/

   
    $('[name="'+idStory+'comment"]').val("");

    }
})


Template.story.helpers({
    status:function(){
        return this.createdFor === this.createdBy;
    },
    likeCount:function(storyId){
        var story = Stories.findOne({_id: storyId});
        var likes = story.likes;
        if(!likes.length) {
            return "Nobody has liked this post yet.";
        } else if(likes.length <= 3) {
            var string = "";
            switch (likes.length) {
                case 1:
                    return likes[0].name + " likes this";
                    break;
                case 2:
                    return likes[0].name + " and " + likes[1].name + " like this";
                    break;
                case 3:
                    return likes[0].name + ", " + likes[1].name + " and " + likes[2].name + " like this";
                break;
            }

        } else {
            var correctLength = likes.length - 3;
            var correctOther;
            if(correctLength === 1) {
                correctOther = " other person likes this";
            } else {
                correctOther = " other people like this";
            }
            return likes[0].name + ", " + likes[1].name + ", " + likes[2].name + " and " + correctLength + correctOther;
        }

    },

     ident:function(){
        var storyId = this._id;
        
    
        return storyId;
    },


    comentarios:function(){
        var storyId = this._id;
        var comentario = Stories.findOne({_id: storyId});
    
        return comentario.comments;
    }

})



