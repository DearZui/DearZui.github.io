/**
 * Created by PC on 2016/3/27.
 */
(function($) {
    $(function () {

        var $body = $('body');

        var $wrapper = $('#wrapper');

        $wrapper.poptrox({
            baseZIndex: 20000,
            fadeSpeed: 300,
            onPopupClose: function() { $body.removeClass('modal-active'); },
            onPopupOpen: function() { $body.addClass('modal-active'); },
            overlayOpacity: 0.6,
            popupCloserText: '',
            popupHeight: 150,
            popupLoaderText: '',
            popupSpeed: 10,
            popupWidth: 150,
            selector: '.fa-wechat',
            usePopupCaption: false,
            usePopupCloser: true,
            usePopupDefaultStyling: false,
            usePopupForceClose: true,
            usePopupLoader: true,
            usePopupNav: true,
            windowMargin: 50
        });
    })
})(jQuery);