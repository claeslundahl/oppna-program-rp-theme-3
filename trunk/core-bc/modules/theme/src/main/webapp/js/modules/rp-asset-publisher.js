AUI().add('rp-asset-publisher',function(A) {
    var Lang = A.Lang,
        
    	CSS_RP_DIALOG = 'rp-dialog',
    
        NAME = 'rp-asset-publisher',
        NS = 'rp-asset-publisher',
        
        CUSTOM_LINK_CLICK_EVENT = 'event-ap-link-click'
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

                        var sidebarNode = A.one('.rp-sidebar');

                        if(!sidebarNode) { return; }

                        var sidebarHelpLinks = sidebarNode.all('.sidebar-help-list li a');

                        sidebarHelpLinks.on('click', instance._onSidebarHelpLinkClick, instance);

                    },
                    
                    _onSidebarHelpLinkClick: function(event) {
                        var instance = this;

                        event.halt();

                        var currentTarget = event.currentTarget;

                        var dialogUrl = currentTarget.getAttribute('data-dialog-url');

                        if(!dialogUrl || dialogUrl == '') {
                            return;
                        }



                        currentTarget.setAttribute('href', dialogUrl);

                        Liferay.Util.openInDialog(event, event.currentTarget);

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
	       //'aui-dialog',
	       'event-custom',
            'liferay-util-window',
	       'substitute'
      ]
    }
);
