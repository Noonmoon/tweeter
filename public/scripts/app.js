/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// used to prevent xss
var escape = function(unsafe) {
  return unsafe
   .replace(/&/g, "&amp;")
   .replace(/</g, "&lt;")
   .replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;")
   .replace(/'/g, "&#039;");
 }

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
        <p class="posted">${tweetD.created_at}<p>
      </footer>
      </article>`;
  return $tweet;
}

$(function() {
  // creates input into tweet
  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      var $tweet = creatTweetElement(tweet, escape);
      $('#tweets_container').prepend($tweet)
      //add js to call function to add hover
    });
  }

  // grabs and renders all current tweets
  function grabTweets() {
    $.get('/tweets', function(data) {
      renderTweets(data)
    });
  };
  grabTweets()

  // loads tweets with new tweet
  function loadTweets() {
    $('.tweetSubmit').on('submit', function (e) {
      e.preventDefault();
      var input = $('.tweetSubmit').serialize();

      if (input.length > 145) {
        $('.error').html("Too many characters");
        $('.error').slideDown();
      } else if (input.length === 5) {
        $('.error').html("Please enter input");
        $('.error').slideDown();
      } else {
        $.post('/tweets', input, function(data) {
          grabTweets()
          $('.textbox.input').val('')
          $('.counter').html(140)
          $('.error').hide()
        })
        }
    });
  }
  loadTweets()
});


