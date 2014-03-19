AUI().add('rp-theme-2',function(A) {
    var Lang = A.Lang,
        
        NAME = 'rp-theme-2',
        NS = 'rp-theme-2'
    ;
    
    var RpTheme2 = A.Component.create(
            {
                ATTRS: {
                    
                    someAttribute: {
                        value: ''
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

                        //console.log('rp-theme-2 - renderUI');
                        
                        instance._initBreadcrumbs();
                        
                        instance._initActionConfirmation();
                        instance._initNavigationButton();
                        instance._initMainNavigation();
                        //instance._initOverlayLinks();
                        instance._initDockbarToggle();
                        instance._initPlaceholders();
                        instance._initRpNewsCarousel();
                        instance._initRpAssetPublisher();
                        instance._initQuickAccessNav();
                        //instance._initTyckTill();
                        instance._initSystemPageHelp();
                    },
    
                    bindUI: function() {
                        var instance = this;
                    },
                    
                    _initActionConfirmation: function() {
                    	var instance = this;
                    	
            			var requiresConfirmationLinks = A.all('a.requires-confirmation');
            			requiresConfirmationLinks.plug(A.Plugin.RpActionConfirmation);
                    },
                    
                    _initBreadcrumbs: function() {
                    	var instance = this;
                    	
                    	var breadcrumbItems = A.all('#breadcrumbs ul.breadcrumbs li');
                    	if(breadcrumbItems.size() > 0) {
                    		var firstItem = breadcrumbItems.item(0);
                    		var lastItem = breadcrumbItems.item(breadcrumbItems.size() - 1);
                    		
                    		firstItem.addClass('first');
                    		lastItem.addClass('last');
                    	}
                    	
                    },

            		//Toggle dockbar when settings is clicked in topnav
            		_initDockbarToggle: function() {
            			var instance = this;
            			
            			var dockbarWrapNode = A.one('#dockbarWrap');
            			var topNavigationNode = A.one('#topNavigation');
            			
            			// Do nothing if there is no dockbar
            			if(!dockbarWrapNode) { return; }
            		
            			topNavigationNode.all('.top-nav-settings a').on('click', function(e) {
            				//alert('on click .top-nav-settings a');
            				
            				e.halt();
            				var currentTarget = e.currentTarget;
            				var listNode = currentTarget.ancestor('li');
            				
            				if(listNode.hasClass('top-nav-settings-show')) {
            					listNode.hide();
            					dockbarWrapNode.show();
            					listNode.siblings('.top-nav-settings-hide').show();
            				}
            				else if(listNode.hasClass('top-nav-settings-hide')) {
            					listNode.hide();
            					dockbarWrapNode.hide();
            					listNode.siblings('.top-nav-settings-show').show();
            				}
            			});
            		},
            		
            		_initOverlayLinks: function() {
            			var instance = this;
            			
            			var overlayLinks = A.all('a.rp-overlay-link');
            			overlayLinks.plug(A.Plugin.RpIframeLink);
            		},
            		
            		_initRpAssetPublisher: function() {
            			var instance = this;
            			
            			var rpAssetPublisher = new A.RpAssetPublisher();
                        rpAssetPublisher.render();
            		},
            		
            		_initRpNewsCarousel: function() {
            			var instance = this;
            			
            			var rpNewsCarousel = new A.RpNewsCarousel();
            			rpNewsCarousel.render();
            		},
            		

            		_initMainNavigation: function() {
            			var instance = this;
            			
            			var mainNavList = A.one('#navigation ul.nav-list');
            			
            			if(mainNavList) {
            				var mainNavListItems = mainNavList.all('> li');
            				
                			mainNavListItems.on('mouseenter', instance._onMainNavItemEnter, instance);
                			mainNavListItems.on('mouseleave', instance._onMainNavItemLeave, instance);
                			
                			// Extra callback method that ensures that no hover classes are left behind in ie
                			
                			mainNavList.on('mouseenter', instance._onMainNavEnter, instance);
                			mainNavList.on('mouseleave', instance._onMainNavLeave, instance);
            			}
            		},
                    
            		_initNavigationButton: function() {
            			var instance = this;
            			
            			var rpNavigationButton = new A.RpNavigationButton();
            			
            			rpNavigationButton.render();
            		},
            		
            		_initPlaceholders: function() {
            			var instance = this;
            			
            			var placeholderInputs = A.all('input[placeholder]');
            			
            			if(placeholderInputs) {
            				placeholderInputs.plug(A.Plugin.RpPlaceholder);	
            			}
            		},
            		
            		_initSystemPageHelp: function() {
            			var instance = this;
            			
            			
            			var systemsHelpAggregator = A.one('.rp-sidebar-hidden .knowledge-base-portlet-aggregator');
            			
            			// If there is no systems help aggregator - do nothing
            			if(!systemsHelpAggregator) { return; }
            			
            			var sidebarTools = A.one('#toolsSidebar');
            			
            			// If there is no sidebar tools - do nothing
            			if(!sidebarTools) { return; }
            			
            			var systemHelp = new A.SystemHelp({
            				sidebarTools: sidebarTools,
            				systemsHelpAggregator: systemsHelpAggregator
            			});
            			
            			systemHelp.render();
            		},

            		_initTyckTill: function() {
            			var instance = this;
            			
            			var trigger = A.one('#tycktillWrap a');
            			
            			// Do nothing if there is no tycktill trigger
            			if(!trigger) { return; }
            			
            			var tyckTill = new A.TyckTill({
            				trigger: trigger
            			});
            			
            			tyckTill.render();
            		},
            		
            		_initQuickAccessNav: function() {
            			var instance = this;
            			
            			var trigger = A.one('#topNavigation .top-nav-quick-access a');
            			
            			// Do nothing if there is no quicknav trigger
            			if(!trigger) { return; }
            			
            			var quickAccessNav = new A.QuickAccessNav({
            				filterInputId: '#quickAccessFilterInput',
            				mainNavList: '#navigation > ul',
            				trigger: trigger,
            				quickAccessNavListWrap: '.quick-access-nav-list-wrap'
            			});
            			
            			quickAccessNav.render();
            		},

            		_onMainNavEnter: function(e) {
            			var instance = this;
            		},
            		
            		_onMainNavLeave: function(e) {
            			var instance = this;
            			
            			var mainNavList = e.currentTarget;
            			
            			var mainNavListItems = mainNavList.all('li');
            			mainNavListItems.removeClass('hover');
            		},
            		
            		_onMainNavItemEnter: function(e) {
            			var instance = this;
            			
            			var navListItem = e.currentTarget;
            			
            			var allNavListItems = A.all('#navigation li');
            			allNavListItems.removeClass('hover');
            			
            			navListItem.addClass('hover');
            		},
            		
            		_onMainNavItemLeave: function(e) {
            			var instance = this;
            			
            			var navListItem = e.currentTarget;
            			navListItem.removeClass('hover');
            		},
                    
                    _someFunction: function(e) {
                        var instance = this;
                    }

                }
            }
    );

    A.RpTheme2 = RpTheme2;
        
    },1, {
        requires: [
        // Original list
        /*
	       	'aui-base',
	    	'event',
	    	'rp-action-confirmation-plugin',
	    	'rp-iframe-link-plugin',
	    	'rp-knowledgebase',
	    	'rp-navigation-button',
	    	'rp-news-carousel',
	    	'rp-placeholder-plugin',
	    	'rp-tyck-till',
	    	'rp-system-help',
	    	'rp-quick-access-nav'
        */
            'aui-base',
            'event',
            'rp-action-confirmation-plugin',
            'rp-asset-publisher',
            'rp-navigation-button',
            'rp-news-carousel',
            'rp-placeholder-plugin',
            'rp-system-help',
            'rp-quick-access-nav'

      ]
    }
);
