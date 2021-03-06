// used to prevent xss
var escape = function(unsafe) {
  return unsafe
   .replace(/&/g, "&amp;")
   .replace(/</g, "&lt;")
   .replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;")
   .replace(/'/g, "&#039;");
 };

function creatTweetElement(tweetD, escape) {
  var $tweet =
    `<article class="tweetArticle">
      <header>
        <img class="profile" src="${tweetD.user.avatars.small}">
        <h3 class="usersname">${tweetD.user.name}</h3>
        <p class="user">${tweetD.user.handle}</p>
      </header>
      <p class="posttext">${escape(tweetD.content.text)}</p>
      <hr class="footerline">
      <footer>
        <p class="posted">${Math.round((Date.now() - tweetD.created_at) / 60000)} minutes ago</p>
        <p class="material-icons">flag</p>
        <p class="material-icons">sync</p>
        <p class="material-icons">thumb_up</p>
      </footer>
      </article>`;
  return $tweet;
}

$(function() {

  // forms new tweet
  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      var $tweet = creatTweetElement(tweet, escape);
      $('#tweets_container').prepend($tweet);
      //add js to call function to add hover
    });
  }

  // grabs and renders all current tweets
  function grabTweets() {
    $.get('/tweets', function(data) {
      renderTweets(data);
    });
  }
  grabTweets();

  // loads tweets with new tweet
  function loadTweets() {
    $('.tweetSubmit').on('submit', function (e) {
      e.preventDefault();
      var input = $('.tweetSubmit').serialize();

      // Checks if tweet input is valid and if so
      // refreshes tweets and reset appropriate values
      if (input.length > 145) {
        $('.error').html("Too many characters");
        $('.error').slideDown();
      } else if (input.length === 5) {
        $('.error').html("Please enter input");
        $('.error').slideDown();
      } else {
        $.post('/tweets', input, function(data) {
          grabTweets();
          $('.textbox.input').val('');
          $('.counter').html(140);
          $('.error').hide();
          $('#tweets_container').html('')
        })
        };
    });
  }
  loadTweets();
});


