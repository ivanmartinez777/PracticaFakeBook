Template.modal.events({
    'click .new-post':function(e){
        e.preventDefault();
        var profileUser = Meteor.user();
        var currentUser = Meteor.user();
       var story = $('textarea[name="newest-post"]').val();
        if(story.length) {
            Stories.insert({
                createdBy: currentUser._id,
                createdFor: profileUser._id,
                userImage: currentUser.profile.picture.thumbnail,
                storyImage: null,
                storyText: story,
                creatorName: currentUser.profile.firstname + " " + currentUser.profile.lastname,
                creatorUsername: currentUser.username,
                creatorThumbnail: currentUser.profile.picture.thumbnail,
                createdForName: profileUser.profile.firstname + " " + profileUser.profile.lastname,
                createdForUsername: profileUser.username,
                createdForThumbnail: profileUser.profile.picture.thumbnail,
                likes: [],
                createdAt: new Date(),
                comments: []
            });
            console.log(story);
            $('textarea[name="new-post"]').val("");
        }

    }

})