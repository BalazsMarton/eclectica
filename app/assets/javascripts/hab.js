 //Oldal betöltésekor történő inicializálások
    $('body').addClass('loaded');
    $('.landing-page-holder').css('height', windowHeight + 'px');
    setTimeout(function () {
        $LOADED = true;
    }, 1);
//Header és scroll down button változtatás görgetéskor
$(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll !== 0) {
        $('.main-header').addClass('scrolled' + (!$LOADED ? ' force' : ''));
    } else {
        $('.main-header').removeClass('scrolled force');
    }
    $('#scroll_down')[scroll > 20 ? 'addClass' : 'removeClass']('hide');
});

$('.zeroform:not(.ajaxdisable)').zeroAjaxBind('submit', function () {
    var ctx = $(this), obj = {params: {}, options: {}};

    if ($("#reservation").length > 0) {
        obj.options.successCallback = function (data) {
            var success = $('<div>' + data + '</div>').find('.alert-success').length > 0, target = success ? $('#reservation_holder') : $(ctx).parent().prev();

            $(target).html(data);

            if (success) {
                $.zeroFunc.scrollTo();
            } else {
                $(ctx).find('.captcha-image').click();
            }
        };
    } else {
        closePopUp();
    }

    $(ctx).zeroAjax(obj);
    return false;
});

function insertFacebookData(data) {
    if (!$.zeroFunc.isEmpty(data)) {
        var fbData = JSON.parse(data);
        $.each(fbData, function (k, v) {
            var input = $('#zfe_reservation_' + k);
            if ($(input).length > 0)
                $(input).val(v);
        });
        $('#facebook_login').fadeOut('fast');
    }
}

$('html').on('click', '#facebook_login', function () {
    var facebookData = $('#facebook_data');
    if ($(facebookData).length > 0) {
        insertFacebookData($(facebookData).html());
    } else {
        window.open($(this).data("url"), "fb", "toolbar=no, scrollbars=no, resizable=no, width=500, height=450");
    }
});

//Scroll down gomb
$('html').on('click', '#scroll_down', function () {
    $.zeroFunc.scrollTo($('.we-are').offset().top, 1000);
});

//Mobil menü előhozás mobilon
$('html').on('click', '#menu_show', function () {
    $('.mobile-menu-holder').toggleClass('showed');
    $(this).find('.glyphicon').toggleClass('glyphicon-menu-hamburger').toggleClass('glyphicon-remove');
});

//Referenciák képszűrés
$('html').on('click', '.image-filter', function () {
    var imgShow = $(this).data('show');
    $('.image-filter').removeClass('active');
    $(this).addClass('active');

    if (imgShow === 'all') {
        $('.gallery-container .item').show();
    } else {
        $('.gallery-container .item').hide();
        $('.gallery-container').find('.' + imgShow).show();
    }
});