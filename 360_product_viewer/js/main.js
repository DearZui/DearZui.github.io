/**
 * Created by PC on 2016/4/15.
 */
jQuery(document).ready(function($){

    var productViewer = function(element) {
        this.element = element;
        this.handleContainer = this.element.find('.cd-product-viewer-handle');
        this.handleFill = this.handleContainer.children('.fill');
        this.handle = this.handleContainer.children('.handle');
        this.imageWrapper = this.element.find('.product-viewer');
        this.slideShow = this.imageWrapper.children('.product-sprite');
        this.frames = this.element.data('frame');
        this.friction = this.element.data('friction');
        this.visibleFrame = 0;
        this.loaded = false;
        this.animating = false;
        this.xPosition = 0;
        this.loadFrames();
    }

    //加载图片
    productViewer.prototype.loadFrames = function () {
        var self = this,
            imageUrl = this.slideShow.data('image');
        //图片是否加载完成
        $('<img/>').attr('src', imageUrl).load(function() {
            self.loaded = true;
        });
        this.loading('0.5');
    }

    productViewer.prototype.loading = function(percentage) {
        var self = this;
        transformElement(this.handleFill, 'scaleX('+ percentage +')');  //滑动圆圈的transform
        setTimeout(function(){
            if( self.loaded ) {  //图片加载完成
                self.element.addClass('loaded');
                transformElement(self.handleFill, 'scaleX(1)');
                self.dragImage();
                if(self.handle) self.dragHandle();
            } else {
                var newPercentage = parseFloat(percentage) + .1;
                if ( newPercentage < 1 ) {
                    self.loading(newPercentage);
                }
            }
        }, 500);
    }

    //拖拽滑块
    productViewer.prototype.dragHandle = function() {
        var self = this;
        self.handle.on('mousedown vmousedown', function(e) {
            self.handle.addClass('cd-draggable');
            var dragWidth = self.handle.outerWidth(),
                containerOffset = self.handleContainer.offset().left,
                containerWidth = self.handleContainer.outerWidth(),
                minLeft = containerOffset - dragWidth/2,
                maxLeft = containerOffset + containerWidth - dragWidth/2;

            self.xPosition = self.handle.offset().left + dragWidth - e.pageX;

            self.element.on('mousemove vmousemove', function(e) {
                if( !self.animating) {
                    self.animating =  true;
                    ( !window.requestAnimationFrame )
                        ? setTimeout(function(){self.animateDraggedHandle(e, dragWidth, containerOffset, containerWidth, minLeft, maxLeft);}, 100)
                        : requestAnimationFrame(function(){self.animateDraggedHandle(e, dragWidth, containerOffset, containerWidth, minLeft, maxLeft);});
                }
            }).one('mouseup vmouseup', function (e) {
                self.handle.removeClass('cd-draggable');
                self.element.off('mousemove vmousemove');
            });

            e.preventDefault();

        }).on('mouseup vmouseup', function (e) {
            self.handle.removeClass('cd-draggable');
        });
    }

    productViewer.prototype.animateDraggedHandle = function(e, dragWidth, containerOffset, containerWidth, minLeft, maxLeft) {
        var self = this;
        var leftValue = e.pageX + self.xPosition - dragWidth;
        // constrain the draggable element to move inside his container
        if (leftValue < minLeft) {
            leftValue = minLeft;
        } else if (leftValue > maxLeft) {
            leftValue = maxLeft;
        }

        var widthValue = Math.ceil( (leftValue + dragWidth / 2 - containerOffset) * 1000 / containerWidth)/10;
        self.visibleFrame = Math.ceil( (widthValue * (self.frames-1))/100 );

        //update image frame
        self.updateFrame();
        //update handle position
        $('.cd-draggable', self.handleContainer).css('left', widthValue + '%').one('mouseup vmouseup', function () {
            $(this).removeClass('cd-draggable');
        });

        self.animating = false;
    }

    //拖拽图片
    productViewer.prototype.dragImage = function() {
        var self = this;
        self.slideShow.on('mousedown vmousedown', function(e) {
            self.slideShow.addClass('cd-draggable');
            var containerOffset = self.imageWrapper.offset().left,
                containerWidth = self.imageWrapper.outerWidth(),
                minFrame = 0,
                maxFrame = self.frames - 1;

            self.xPosition = e.pageX;

            self.element.on('mousemove vmousemove', function(e) {
                if( !self.animating) {
                    self.animating = true;
                    ( !window.requestAnimationFrame)
                    ? setTimeout(function() {self.animateDraggedImage(e, containerOffset, containerWidth);}, 100)
                    : requestAnimationFrame(function(){self.animateDraggedImage(e, containerOffset, containerWidth);});
                }
            }).one('mouseup vmouseup', function(){
                self.slideShow.removeClass('cd-draggable');
                self.element.off('mousemove vmousemove');
                self.updateHandle();
            });

            e.preventDefault();
        }).on('mouseup vmouseup', function(e) {
            self.slideShow.removeClass('cd-draggable');
        });
    }

    productViewer.prototype.animateDraggedImage = function(e, containerOffset, containerWidth){
        var self = this;
        var leftValue = self.xPosition - e.pageX;
        var widthValue = Math.ceil( (leftValue) * 100 / ( containerWidth * self.friction ));
        var frame = (widthValue * (self.frames-1))/100;
        if(frame > 0) {
            frame = Math.floor(frame);
        } else {
            frame = Math.ceil(frame);
        }
        var newFrame = self.visibleFrame + frame;
        if(newFrame < 0) {
            newFrame = self.frames - 1;
        } else if(newFrame > self.frames - 1) {
            newFrame = 0;
        }

        if( newFrame != self.visibleFrame) {
            self.visibleFrame = newFrame;
            self.updateFrame();
            self.xPosition = e.pageX;
        }

        self.animating = false;
    }

    productViewer.prototype.updateHandle = function() {
        if(this.handle) {
            var widthValue = 100*this.visibleFrame/this.frames;
            this.handle.animate({'left': widthValue + '%'}, 200);
        }
    }

    productViewer.prototype.updateFrame = function() {
        var transformValue = - (100 * this.visibleFrame/this.frames);
        transformElement(this.slideShow, 'translateX('+ transformValue +'%)');
    }

    //为属性加上transform属性
    function transformElement(ele, val) {
        ele.css({
            '-webkit-transform': val,
            '-moz-transform': val,
            '-ms-transform': val,
            '-o-transform': val,
            'transform': val,
        });
    }

    var productToursWrapper = $('.cd-product-viewer-wrapper');
    productToursWrapper.each(function() {
        new productViewer($(this));
    });
});