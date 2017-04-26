Meteor.methods({
    addFriend:function(requester, requestee){
        var self = this;
        console.log(requester);
        var requester = !!self.userId ? self.userId : requester;
        requestee = requestee ? requestee : "YP4t95btG3Eg6XfgA";
        var edgeExists = UserEdges.findOne({
            $or: [
                {requester: requester, requestee: requestee},
                {requester: requestee, requestee: requester}
            ]
        });
        console.log(edgeExists);
        if(!edgeExists){
            UserEdges.insert({
                "status":"pending",
                "requester":requester,
                "requestee":requestee,
                "seen":false
            })
        }
    },
     'addComment': function(comentario){
            /*Me paso un objeto porque no me permite enviar más de un parametro string*/
        var currentUserId = Meteor.userId();
        if(currentUserId){
            Comments.insert({
                idStory: comentario.idStory,
                comment: comentario.comment,
                createdBy: currentUserId
            });
        }
    }

});



