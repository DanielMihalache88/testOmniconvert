$(document).ready(function() {
    tabs();
    setInterval(getNews, 180000);
});

function tabs() {
    var $tab = $('ul.tabs li');
    $tab.on('click', function() {
        var $tabId = $(this).attr('data-tab');
        $(this).siblings().removeClass('js--active');
        $(this).addClass('js--active');
        $('.tab-content').removeClass('js--reveald');
        $('#' + $tabId).addClass('js--reveald');
    });

    //set first tab active
    $('.tabs li:first-child').addClass('js--active');
    $('#tab-one').addClass('js--reveald');
};

function getNews() {
    //NEWS
    $.ajax({
        method: 'GET',
        url: 'http://www.mocky.io/v2/58fda6ce0f0000c40908b8c8',
        dataType: 'jsonp'
    }).done(function(data) {
        $('.news__content').html('');
        var news = data.news;

        //display news to UI
        news.forEach(function(newsItem) {
            var markup = '<div class="news__item"><h2>' + newsItem.title + '</h2><p>' + newsItem.details + '</p></div>';
            $('.news__content').append(markup);
        });

        //add wrapper for every 5 news items in order to build slider
        var newsAll = $('.news__content > .news__item');
        var sliderItems;

        for (var i = 0; i < newsAll.length; i += 5) {
            newsAll.slice(i, i + 5).wrapAll('<div class="slider-item"></div>');
            sliderItems = $('.slider-item');
        }

        for (var i = 0; i < sliderItems.length; i++) {
            sliderItems[i].classList.add('slide-' + [i]);
        }

        var slides = $('.slider-item');
        var dots = $('.slider-controls span');
        current = 0;

        function reset() {
            $('.slider-item').removeClass('js--show');
            $('.slider-controls span').removeClass('js--active');
        }

        function startSlide() {
            reset();
            slides[0].classList.add('js--show');
            dots[0].classList.add('js--active');
        }

        function slideRight() {
            reset();
            if (current === slides.length - 1) {
                current = -1;
            }

            dots[current + 1].classList.add('js--active');
            slides[current + 1].classList.add('js--show');

            current++;
        }

        function startHere() {
            reset();
            slides[current].classList.add('js--show');
            dots[current].classList.add('js--active');
        }

        dots.on('click', function() {
            current = parseInt($(this).attr('data-slide'));

            startHere();

            timer = setInterval(slideRight, 15000);
            clearInterval(timer);
        });

        startSlide();
        var timer = setInterval(slideRight, 15000);
    });
}
getNews();