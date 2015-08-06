  // This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
      $('#animalButton').css("visibility", "visible"); 
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
}
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '380884405455525',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.4' // use version 2.2
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }
  var bigFive = {};
  var MBTItype = '';
    function getPosts(response) {
        posts = [];
        console.log(response);
        for( i in response.data) {
            post = response.data[i].message;
            posts.push(post);
        }
        var data = {};
        data.posts = posts; 
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/analyzePosts',						
            success: function(data) {
                console.log(data);
                bigFive = data;
                var IE, FT, JP, SN;
                if (bigFive.conscientiousness > 50) {
                    JP = "J";
                } else {
                    JP = "P";
                }    

                if (bigFive.extraversion > 50) {
                    IE = "E";
                } else {
                    IE = "I";
                }    
                 
                if ((bigFive.agreeableness + bigFive.openness) > 140) {
                    FT = "F";
                } else {
                    FT = "T";
                }    
                
                if (bigFive.openness > 50) {
                    SN = "N";
                } else {
                    SN = "S";
                }
                
                var MBTItype = IE + SN + FT +JP;
                console.log(MBTItype);

                $('#openBar').css('width', bigFive.openness+'%').attr('aria-valuenow', bigFive.openness); 
                $('#agreeBar').css('width', bigFive.agreeableness+'%').attr('aria-valuenow', bigFive.agreeableness); 
                $('#neuroBar').css('width', bigFive.neuroticism+'%').attr('aria-valuenow', bigFive.neuroticism); 
                $('#extBar').css('width', bigFive.extraversion+'%').attr('aria-valuenow', bigFive.extraversion); 
                $('#conBar').css('width', bigFive.conscientiousness+'%').attr('aria-valuenow', bigFive.conscientiousness); 
                searchImage(personalities[MBTItype].animal[0]);
            }
        });
    }

    function getTopPosts() {
        FB.api('/me/feed?limit=100', getPosts); 
    }
    

    function getPersonalInfo() {
        FB.api('/me/?fields=education,hometown,interested_in,gender,relationship_status,work,age_range,bio', function(response) {
            console.log(response)
            analyzeWork(response.work);
            analyzeLocations(response.hometown);
        });
    }
    
    function analyzeWork(work) {
        if(work) {
            console.log(work);     
            var positions = [];
            for (i in work) {
              console.log(work[i].position);   
              positions.push(work[i].position);
            }
            var data = {
                positions: positions
            }
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data), 
                contentType: 'application/json',
                url: '/analyzeWork',						
                success: function(data) {
                    personalities = data;
                    console.log(personalities);
                }
            });
        } else {
            //do something based on no work
            possibleAnimals.push('sloth');
        }
    }

  function generateAnimal() {
    getTopPosts();
  }
