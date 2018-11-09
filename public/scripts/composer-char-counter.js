$(function() {
  $('.textbox.input').on('keyup', function() {
    var value = 140 - ($(this).val().length)
    var counter = $(this).parent().children('span.counter');
    counter.html(value)
    console.log(value)
    if (value <= -1) {
      counter.css({color: 'red'})
    } else if (value > 0) {
      counter.css({color: '#244751'})
    }
  });
});

