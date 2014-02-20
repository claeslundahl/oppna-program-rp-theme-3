AUI().add('ovanligadiagnoser-loader-overlay',function(A) {
    var Lang = A.Lang,
    	isNull = Lang.isNull,
    	isUndefined = Lang.isUndefined,
    	getClassName = A.ClassNameManager.getClassName,
    	
        NAME = 'ovanligadiagnoser-loader-overlay',
        NS = 'ovanligadiagnoser-loader-overlay',

        OVERLAY = 'overlay',

        CSS_CLASS_OVERLAY_OFF = 'loader-overlay-off'
    ;
    
    var OvanligaDiagnoserLoaderOverlay = A.Component.create(
            {
                ATTRS: {
                	
                    overlay: {
                        value: '.loader-overlay',
                        setter: A.one
                    }

                },
                EXTENDS: A.Component,
                NAME: NAME,
                NS: NS,
                prototype: {
                	
                    initializer: function(config) {
                        var instance = this;
                    },
                    
                    renderUI: function() {
                        var instance = this;

                        // When renderUI is run, site should be ready
                        instance.hideOverlay();
                    },
    
                    bindUI: function() {
                        var instance = this;

						var links = new A.NodeList();

                        var navigationLinks = A.all('#navigation a');
                        var diagnosisLinks = A.all('.diagnosis-list > li > a');
                        var assetPublisherBack = A.all('.portlet-asset-publisher .header-back-to a');

                        links = links.concat(navigationLinks);
                        links = links.concat(diagnosisLinks);
                        links = links.concat(assetPublisherBack);

						links.on('click', instance._onLinkClick, instance);
                    },

                    _onLinkClick: function(e) {
                    	var instance = this;

                    	instance.showOverlay();
                    },

                    _someFunction: function(e) {
                        var instance = this;
                    },

                    hideOverlay: function() {
                    	var instance = this;

                    	var overlay  = instance.get(OVERLAY);

                    	overlay.addClass(CSS_CLASS_OVERLAY_OFF);
                    },

                    showOverlay: function() {
                    	var instance = this;

                    	var overlay  = instance.get(OVERLAY);

                    	overlay.removeClass(CSS_CLASS_OVERLAY_OFF);
                    } 

                }
            }
    );

    A.OvanligaDiagnoserLoaderOverlay = OvanligaDiagnoserLoaderOverlay;
        
    },1, {
        requires: [
            'aui-base',
	    	'event'
      ]
    }
);
