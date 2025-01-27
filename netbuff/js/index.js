
//on dock ready
$(document).ready(function() {
    $('.important-button').click(function() {
        window.open($(this).attr('href'));
        return false;
    });

    $('.menu-item').click(function() {
        var target = $(this).attr('target');
        console.log(target);
        $('html, body').animate({
            scrollTop: $('#' + target).offset().top - 140
        }, 500);
        return false;
    });
});
