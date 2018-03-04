// REWRITE THESE
const IMAGE_NAME_GOOD_BEFORE = 'resources/before1.jpg';
const IMAGE_NAME_GOOD_AFTER = 'resources/after1.jpeg';
const IMAGE_NAME_BAD_BEFORE = 'resources/before1.jpg';
const IMAGE_NAME_BAD_AFTER = 'resources/after1.jpeg';



var imageSelector = '';
var imageName = '';
var textSelector = '';
var inProgress = false;



function doTheProgress(speed, done) {
    inProgress = true;
    $('.progress').css('display', '');
    var width = 0;
    var id = setInterval(progress, speed);

    function progress() {
        if (width === 100) {
            clearInterval(id);
            done();
        } else {
            width += 10;
            $('.progress-bar').css('width', width + '%').attr('aria-valuenow', width);
        }
    }
}

var reloadImage = function () {
    $(imageSelector + ' img').attr('src', imageName);
    $('.progress-bar').css('width', '0%').attr('aria-valuenow', 0);
    setTimeout(function(){
        doTheProgress(100, showText);
    }, 1000);
};

var showText = function () {
    $(textSelector).css('display', '');
};

// ready
$(function () {
    $('#nothingFound img').attr('src', IMAGE_NAME_GOOD_BEFORE);
    $('#sgFound img').attr('src', IMAGE_NAME_BAD_BEFORE);

    $("#healthyConverter").click(function () {
        imageName = IMAGE_NAME_GOOD_AFTER;
        imageSelector = '#nothingFound';
        textSelector = 'h2.text-success';
        doTheProgress(300, reloadImage);
    });
    $("#unHealthyConverter").click(function () {
        imageName = IMAGE_NAME_BAD_AFTER;
        imageSelector = '#sgFound';
        textSelector = 'h2.text-danger';
        doTheProgress(300, reloadImage);
    });
});
