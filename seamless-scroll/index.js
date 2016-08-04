/**
 * Created by Toshiba on 2016/5/19.
 */
(function ($) {
    var items = $(".items"),
        lastTime = 0,
        nextFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||window.mozRequestAnimationFrame || window.msRequestAnimationFrame ||
            function (callback) {
                var currTime = + new Date,
                    delay = Math.max(1000/60, 1000/60 - (currTime - lastTime));
                lastTime = currTime + delay;
                return setTimeout(callback, delay);
            }, cancelFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame || clearTimeout,
        scrollX = 0,
        itemW = 240,
        target = 0,
        timer = null;

    if (items.children().eq(0).width == 190) {
        itemW = 190;
    }
    if (items.children().eq(0).width == 160) {
        itemW = 190;
    }
    target = itemW * items.children().length;

    items.html( items.html() + items.html());

    adAni();

    function adAni() {
        timer = nextFrame(function() {
            scrollX += 1;
            if (scrollX > target) {
                scrollX = 0;
            }
            items.scrollLeft(scrollX);
            adAni();
        });
    }

    if (!isMobile()) {
        items.on('mouseover', function() {
            cancelFrame(timer);
        }).on('mouseout', function() {
            adAni();
        });
    }

    function isMobile() {
        return /(iphone|ipad|ipod|ios|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|Webos|symbian|windows phone)/i.test(navigator.userAgent);
    }
})(jQuery);