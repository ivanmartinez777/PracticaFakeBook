UserEdges = new Mongo.Collection("userEdges");
Stories = new Mongo.Collection("stories");
Comments = new Mongo.Collection("comments");

UserEdges.allow({
    insert:function(userId, doc) {
        return !!userId;
    },
    update:function(userId, doc) {
        if(doc.status === "pending" && doc.requestee === userId){
            return true;
        } else if(doc.status === "pending" && doc.requestee !== userId) {
            return false;
        }
    }
})

Stories.allow({
    insert:function(userId, doc) {
        return !!userId;
    },
    update:function(userId, doc) {
        return !!userId;
    }
})

Comments.allow({
    insert:function(idStory,comment,cretor) {
        return !!userId;
    },
    update:function(userId, doc) {
        return !!userId;
    }
})

