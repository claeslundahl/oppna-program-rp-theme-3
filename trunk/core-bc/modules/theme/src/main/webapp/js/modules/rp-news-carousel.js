AUI().add('rp-news-carousel',function(A) {
    var Lang = A.Lang,
        isNull = Lang.isNull,
        isUndefined = Lang.isUndefined,
        
        NEWS_BOX = 'newsBox',
        
        NAME = 'rp-news-carousel',
        NS = 'rp-news-carousel'
    ;
    
    var RpNewsCarousel = A.Component.create(
            {
                ATTRS: {
                    
                    newsBox: {
                        setter: A.one,
                        value: '.news-box'
                    }
                    
                },
                EXTENDS: A.Component,
                NAME: NAME,
                NS: NS,
                prototype: {
                    newsBoxCarousel: null,
                    newsBoxWrap: null,
                    
                    initializer: function(config) {
                        var instance = this;
                        
                        instance.messages = {};
                    },
                    
                    renderUI: function() {
                        var instance = this;

                        //console.log('rp-news-carousel - renderUI');
                        
                        instance._initNewsBoxCarousel();
                    },
    
                    bindUI: function() {
                        var instance = this;
                    },
                    
                    // Carousel requires the vgr-customjsp-hook plugin to be installed to work properly
                    _initNewsBoxCarousel: function() {
                        var instance = this;
                        
                        var newsBox = instance.get(NEWS_BOX);
                        
                        if(isNull(newsBox) || isUndefined(newsBox)) {return;}
                        
                        var newsBoxWrap = newsBox.ancestor('.news-box-wrap');
                        instance.newsBoxWrap = newsBoxWrap;
                        
                        var computedNewsBoxWidthStr = newsBox.getComputedStyle('width').replace('px', '');
                        var computedNewsBoxWidth = parseInt(computedNewsBoxWidthStr);

                        var height = 220;
                        if(computedNewsBoxWidth < 540) {
                            height= 250;
                        }
                        
                        var newsBoxMenu = newsBox.ancestor().one('.news-box-menu');
                        
                        newsBoxMenu.show();
                        
                        instance.newsBoxCarousel = new A.Carousel({
                            intervalTime: 20,
                            contentBox: newsBox,
                            //activeIndex: 'rand',
                            activeIndex: 0,
                            height: height,
                            width: computedNewsBoxWidth,
                            nodeMenu: newsBoxMenu,
                            nodeMenuItemSelector: 'li'
                        }).render();

                        newsBox.all('a.news-box-link').removeClass('aui-helper-hidden');
                        newsBox.addClass('news-box-js');
                        
                        // Bind window size change event
                        A.on('windowresize', function(e) {
                            var newsBoxWrap = instance.newsBoxWrap;
                            
                            if(isNull(newsBoxWrap)) {return;}
                            
                            var computedNewsBoxWrapWidthStr = newsBoxWrap.getComputedStyle('width').replace('px', '');
                            var computedNewsBoxWrapWidth = parseInt(computedNewsBoxWrapWidthStr);
                            
                            instance.newsBoxCarousel.set('width', computedNewsBoxWrapWidth);

                            if(computedNewsBoxWrapWidth < 540) {
                                instance.newsBoxCarousel.set('height', 250);
                            }
                        });
                    }

                }
            }
    );

    A.RpNewsCarousel = RpNewsCarousel;
        
    },1, {
        requires: [
            'aui-base',
            'aui-carousel',
            'event-resize'
      ]
    }
);
