 window.fbAsyncInit = function() {
    FB.init({
      appId      : '299447580655569',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.1'
  });

    FB.AppEvents.logPageView();   

};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

FB.getLoginStatus(function(response) {
 statusChangeCallback(response);
});

// function login() {
//     FB.login(function(response) {
//         console.log(response);
//         if (response.status === 'connected') {
//             console.log(response.authResponse);
//             document.getElementById('status').innerHTML = 'We are connected.';
//         } else if (response.status === 'not_authorized') {
//             document.getElementById('status').innerHTML = 'We are not logged in.'
//         } else {
//             document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
//         } }
//         , {scope: 'pages_manage_cta,manage_pages,publish_pages,user_posts', enable_profile_selector: true, return_scopes: true});

//         startWithName();
// }

function getPosts() {
    FB.api('/me/posts', function(response) {
        console.log(response);
        generateBoxes(response);
    })
}

function startWithName() {
// Will handle the HTTP response for the name of the person and their id
FB.api('/me', function(response) {
    var welcome = document.createElement("p");
    welcome.id = "welcome";
    welcome.class = "welcome";
    welcome.innerHTML = "Hi, " + response.name + "!"
    document.appendChild(welcome);
});

// Will handle the second request for number of friends
FB.api('/me/friends', {fields: 'summary'}, function(response) {
    var welcome1 = document.createElement("p");
    welcome1.id = "welcome1";
    welcome1.innerHTML = "What do you think about removing your Facebook posts that can be, humm, controversial? Your " + response.summary.total_count + " friends and future connections/employers would really like that!";
    document.appendChild(welcome1);
});

getPosts();
}

function viewPost(post){

    postId = post.id;
    removeElement(post);
    window.open("https://facebook.com/me/" + postId);

}

function generateBox(id, time, contents){

    var div = document.createElement("div");
    div.id = id;
    div.classList = "main";
    var date = document.createElement("div");
    date.classList = "date";
    date.innerHTML = time;
    var content = document.createElement("div");
    content.classList = "content";
    content.innerHTML = contents;
    var deleteBttn= document.createElement("button");
    deleteBttn.classList = "delete";
    deleteBttn.innerHTML = "Delete";
    deleteBttn.onclick = "deletePost(this)";

    div.appendChild(date);
    div.appendChild(content);
    div.appendChild(deleteBttn);

    document.getElementById("posts").appendChild(div);
}

function generateBoxes(response) {
    // Iterate through the words and see which have the kwy words. If it does have any, create the element in HTML
    found = 0;
    analyzed = 0;
    score = 0;
    for (i=0; i<100; i++){
        console.log("estou aqui no for loop");
        console.log(response.)
        time = response.data[i].created_time;
        console.log(time);
        message = response.data[i].message;
        id = response.data[i].id;
        list = ['the', 'oi'];

        for (word in list){
            if (message.search(word) != -1){
                generateBox(id, time, message);
                found = found + 1;
            }
            else{
            }
            analyzed = analyzed + 1;
        }

        // Create the counter with the number of sketchy posts found, one with the number of posts analyzed and one with the score
        postsFound = document.createElement("h3");
        postsFound.id = "postsFound";
        postsFound.innerHTML = "Sketchy Posts Found: " + str(found);
        document.getElementById("counters").appendChild(postsFound);

        postsAnalyzed = document.createElement("h3");
        postsAnalyzed.id = "postsAnalyzed";
        postsAnalyzed.innerHTML = "Posts Analyzed: " + str(analyzed);
        document.getElementById("counters").appendChild(postsAnalyzed);

        score = (1 - (found/analyzed))*100;
        myScore = document.createElement("h3");
        myScore.id = "score";
        myScore.innerHTML = "Posts Analyzed: " + str(score);
        document.getElementById("counters").appendChild(myScore);
    }


}