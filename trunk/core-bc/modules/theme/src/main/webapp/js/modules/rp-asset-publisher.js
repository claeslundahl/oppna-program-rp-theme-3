AUI().add('rp-asset-publisher',function(A) {
    var Lang = A.Lang,
        
        CSS_DIALOG = 'rp-dialog',
    
        NAME = 'rp-asset-publisher',
        NS = 'rp-asset-publisher',
        
        CUSTOM_LINK_CLICK_EVENT = 'event-ap-link-click'
    ;

        var TPL_IFRAME = '<div class="iframe-wrap"><iframe src="{iframeSrc}" width="100%" height="100%"></iframe></div>'
        ;
        
    var RpAssetPublisher = A.Component.create(
            {
                ATTRS: {
                	someAttribute: {
                		value: 'someValue'
                	}
                },
                EXTENDS: A.Component,
                NAME: NAME,
                NS: NS,
                
                prototype: {

                    modal: null,
                    
                    initializer: function(config) {
                        var instance = this;
                        
                        
                        A.publish( CUSTOM_LINK_CLICK_EVENT, {
                        	defaultFn: function(e) {},
                        	broadcast: 1
                        });                        
                    },
                    
                    renderUI: function() {
                        var instance = this;

                    },
    
                    bindUI: function() {
                        var instance = this;
                        
                        instance._bindSidebarAssetPublisher();
                    },

                    _bindSidebarAssetPublisher: function() {
                        var instance = this;

                        var sidebarHelpLinks = A.all('.sidebar-help-list li a');

                        if(!sidebarHelpLinks) { return; }

                        sidebarHelpLinks.on('click', instance._onSidebarHelpLinkClick, instance);

                    },
                    
                    _onSidebarHelpLinkClick: function(event) {
                        var instance = this;

                        event.halt();

                        var currentTarget = event.currentTarget;

                        var url = currentTarget.getAttribute('data-dialog-url');

                        if(!url || url == '') {
                            return;
                        }

                        var modalConfig = {
                            uri: url,
                            title: currentTarget.html(),
                            iframeCssClass: 'foo-iframe',
                            dialog: {
                                cssClass: 'rp-dialog',
                                height: 500,
                                width: 640
                            }
                        };

                        Liferay.Util.openWindow(modalConfig);

                        A.fire(CUSTOM_LINK_CLICK_EVENT, {currentTarget: currentTarget});
                    },
                    
                    _someFunction: function() {
                        var instance = this;
                    }

                }
            }
    );

    A.RpAssetPublisher = RpAssetPublisher;
        
    },1, {
        requires: [
	       'aui-base',
	       'aui-modal',
	       'event-custom',
            'liferay-util-window',
	       'substitute'
      ]
    }
);
