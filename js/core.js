$(document).ready(function(){
    $("button").click(function(){
        window.location = $(this).attr("href");
        return false;
    });

    $(window).scroll(function(){
        updateScroll();
    });

    $(window).resize(function(){
        createFrogs($('#background-splatters'));
        updateScroll();
    });

    //on click on (#tabs b), anim scroll to the element that is the target of the tabs b
    $('#tabs b').click(function(){
        console.log($(this).attr('target'));
        $('html, body').animate({
            scrollTop: $('#' + $(this).attr('target')).offset().top - 50
        }, 500);
    });

    updateScroll();

    createFrogs($('#background-splatters'));
});

function updateScroll()
{
    const y = $(window).scrollTop();
    const y_center = y + $(window).height() / 2;
    const window_width = $(window).width();
    //Header
    {
        const header = $('#section-header');
        const header_bottom = header.offset().top + header.height()/1.5;
        var progress = clamp(y / header_bottom, 0, 1);

        if(window_width <= 1024)
            progress = 1;
 
        const target = $('#absolute-logo');
        const logo_from = $('#header-logo');
        const logo_to = $('#section-logo');

        target.css({
            width: logo_from.width() + (logo_to.width() - logo_from.width()) * progress,
            height: logo_from.height() + (logo_to.height() - logo_from.height()) * progress,
            top: logo_from.offset().top + (logo_to.offset().top - logo_from.offset().top) * progress,
            left: logo_from.offset().left + (logo_to.offset().left - logo_from.offset().left) * progress
        });

        target.css('opacity', Math.abs(progress - 0.5) + 0.5);
        $('#header-title').css('opacity', 1 - progress * 1.5);
    }

    $('#tabs b').each(function(){
        const target = $('#' + $(this).attr('target'));
        const target_top = target.offset().top;
        const target_bottom = target_top + target.height();
        
        if(y_center >= target_top && y_center <= target_bottom)
            $(this).addClass('selected');
        else
            $(this).removeClass('selected');
    });

    $('.background-stripe').each(function(){
        const target = $('#' + $(this).attr('target'));
        $(this).css({
            top: target.offset().top - 30,
            height: target.height() + 40
        });
    });

    //background-splatters top = y * 0.9
    $('#background-splatters').css('top', y * 0.7);
}

function clamp(value, min, max){
    return Math.min(Math.max(value, min), max);
}

function createFrogs(parent, x, y, size)
{
    parent.html('');

    const min_x = 0;
    const max_x = $(window).width();
    const min_y = 50;
    const max_y = $(window).height() * 1.25; 
    const min_size = 50;
    const max_size = 250;  

    for(var i = 0; i < 40; i ++)
    {
        const x = min_x + Math.random() * (max_x - min_x);
        const y = min_y + Math.random() * (max_y - min_y);
        const size = min_size + Math.random() * (max_size - min_size);
        const rotation = Math.random() * 360;
        
        const splatter = $('<img src="images/frog_mask.png" class="splatter"/>');
        
        splatter.css({
            left: x,
            top: y,
            width: size,
            height: size,
            opacity: 0.1 + Math.random() * 0.5,
            transform: 'rotate(' + rotation + 'deg)'
        });
        parent.append(splatter);
    }  
}