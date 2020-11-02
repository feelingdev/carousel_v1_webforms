var backgroundPanel = $('.backgroundpanel');
var btn = $('.btn');
var carousel = $('.carousel');
var centerOfCarousel;
var isCarouselMoving = false;
var totalBackground;

$(document).ready(function () {
    centerOfCarousel = getCenterOfCarousel();
    totalBackground = getTotalBackground();
    setMiddleBackgroundFirst();
    showNavButton(false);
    setTimeout(function () {
        toggleSelectedItem(true);
        showNavButton(true);
        showBackground();
    }, 1000);
});

function getCenterOfCarousel() {
    return (carousel.children().length / 2).toFixed(0) - 1;
}

function getTotalBackground() {
    return backgroundPanel.children().length;
}

function getCarouselItemWidth() {
    return parseFloat(carousel.css('width')) / carousel.children().length;
}

function setMiddleBackgroundFirst() {
    for (var i = totalBackground; i > centerOfCarousel + 1; i--) {
        backgroundPanel.children().eq(totalBackground - 1).prependTo(backgroundPanel);
    }
}

function toggleSelectedItem(isSelected) {
    if (isSelected) {
        carousel.children().eq(centerOfCarousel).addClass('selected');
    } else {
        carousel.children().eq(centerOfCarousel).removeClass('selected');
    }
}

function showBackground() {
    backgroundPanel.css('opacity', '1');
}

function transformElement(elem, transformValue) {
    $(elem).css({
        '-webkit-transform': transformValue,
        '-moz-transform': transformValue,
        '-o-transform': transformValue,
        'transform': transformValue
    });
}

function showNavButton(isVisible) {
    if (isVisible) {
        btn.css('opacity','');
        transformElement(btn, '');
    } else {
        transformElement(btn, 'translateY(-50%) scale(0) translateZ(0)');
    }
}

function move(isGoingLeft) {
    if (!isCarouselMoving) {
        isCarouselMoving = true;
        var offset = isGoingLeft ? getCarouselItemWidth() * (-1) : getCarouselItemWidth();        
        transformElement(carousel, 'translate(calc(-50% + ' + offset + 'px),-50%)');
        toggleSelectedItem(false);
        crossFadeBackground(isGoingLeft);
        setTimeout(function () {
            if (isGoingLeft) {
                carousel.children().eq(0).appendTo(carousel);
            }
            else {
                carousel.children().eq(totalBackground - 1).prependTo(carousel);
            }
            carousel.css({
                '-webkit-transition': '0s',
                '-moz-transition': '0s',
                '-o-transition': '0s',
                'transition': '0s'
            });
            transformElement(carousel, '');
            toggleSelectedItem(true);
        }, 500);
        setTimeout(function () {
            isCarouselMoving = false;
            carousel.css({
                '-webkit-transition': '',
                '-moz-transition': '',
                '-o-transition': '',
                'transition': ''
            });
        }, 550);
    }
}

function crossFadeBackground(isGoingLeft) {
    if (isGoingLeft) {
        backgroundPanel.children().eq(totalBackground - 1).css('opacity', '0');
        setTimeout(function () {
            backgroundPanel.children().eq(totalBackground - 1).prependTo(backgroundPanel);
            setTimeout(function () {
                backgroundPanel.children().eq(0).css('opacity', '');
            }, 500);
        }, 250);
    } else {
        backgroundPanel.children().eq(0).appendTo(backgroundPanel);
        backgroundPanel.children().eq(totalBackground - 1).css('opacity', '0');
        setTimeout(function () {
            backgroundPanel.children().eq(totalBackground - 1).css('opacity', '1');
            setTimeout(function () {
                backgroundPanel.children().eq(totalBackground - 1).css('opacity', '');
            }, 500);
        }, 250);
    }
}