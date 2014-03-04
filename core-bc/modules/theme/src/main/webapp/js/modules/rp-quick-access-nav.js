AUI().add('rp-quick-access-nav',function(A) {
    var Lang = A.Lang,
    
    	CREATE_FROM_MAIN_NAVIGATION = 'createFromMainNavigation',
        
        FILTER_INPUT_ID = 'filterInputId',
        
        MAIN_NAV_LIST = 'mainNavList',
        
        NAME = 'rp-quick-access-nav',
        NS = 'rp-quick-access-nav',
        
        QUICK_ACCESS_NAV_LIST_WRAP = 'quickAccessNavListWrap',
        
        TRIGGER = 'trigger',
        
        CSS_ACTIVE = 'active',
        CSS_HIDDEN = 'helper-hidden',
        CSS_QUICK_ACCESS_NAV_OVERLAY = 'quick-access-overlay'
    ;
        
    var QuickAccessNav = A.Component.create(
            {
                ATTRS: {
                	
                	createFromMainNavigation: {
                		value: true
                	},
                	
                	filterInputId: {
                		value: '#quickAccessFilterInput'
                	},
                	mainNavList: {
                		value: '#navigation > ul',
                		setter: A.one
                	},
                	trigger: {
                		value: '#topNavigation .top-nav-quick-access a',
                		setter: A.one
                	},
                	quickAccessNavListWrap: {
                		value: '.quick-access-nav-list-wrap',
                		setter: A.one
                	}
                },
                EXTENDS: A.Component,
                NAME: NAME,
                NS: NS,
                
                liveSearch: null,
                overlayMask: null,
                overlayPanel: null,
                
                prototype: {
                    
                    initializer: function(config) {
                        var instance = this;
                        
                        instance.messages = {};
                        
    					instance.messages.dialog = {};
    					
    					instance.messages.dialog.title = 'Tyck till';
    					instance.messages.dialog.close = 'St&auml;ng';
                    },
                    
                    renderUI: function() {
                        var instance = this;
                        
                        var trigger = instance.get(TRIGGER);
                        
                        var triggerListNode = trigger.ancestor('li');
                        
                        if(triggerListNode) {
                        	triggerListNode.show();	
                        }
                        
                        if(instance.get(CREATE_FROM_MAIN_NAVIGATION)) {
                        	instance._createQuickAccessMenu();	
                        }
                        
                        instance._initOverlay(trigger);
                    },
    
                    bindUI: function() {
                        var instance = this;
                        
                        instance.get(TRIGGER).on('click', function(e) {
                        	e.preventDefault();
                        }, instance);
                    },
                    
                    // Creates quick access menu from main navigation
                    _createQuickAccessMenu: function() {
                    	var instance = this;
                    	
                    	var quickAccessWrap = instance.get(QUICK_ACCESS_NAV_LIST_WRAP);
                    	var mainNavList = instance.get(MAIN_NAV_LIST);
                    	
                    	var quickAccessNavNode = mainNavList.cloneNode(true);
                    	
                    	// Remove all fourth level lists (third level sublist)
                    	var fourthLevelLists = quickAccessNavNode.all('ul.nav-list-sub-3');
                    	fourthLevelLists.remove();
                    	
                    	// Reset class names
                    	quickAccessNavNode.set('className', '');
                    	quickAccessNavNode.all('li').set('className', '');
                    	quickAccessNavNode.all('ul').set('className', '');
                    	
                    	// Set correct class name for main list
                    	quickAccessNavNode.addClass('quick-access-nav-list clearfix');
                    	
                    	// Set first level nodes
                    	var firstLevelNodes = quickAccessNavNode.all('>li'); 
                    	firstLevelNodes.addClass('level-1');
                    	
                    	// Loop all first level nodes and remove the ones that don't have any child list/s
                    	firstLevelNodes.each(function(node, index, list) {
                    		var childListNodes = node.all('ul');
                    		
                    		if(childListNodes.size() <= 0) {
                    			node.remove();
                    			node.destroy();
                    		}
                    	});
                    	
                    	// Set child menu class
                    	quickAccessNavNode.all('ul').addClass('child-menu');
                    	
                    	// Set second level classes
                    	var levelTwoNodes = quickAccessNavNode.all('li.level-1 > div > ul > li'); 
                    	levelTwoNodes.addClass('level-2');
                    	
                    	// Set third level classes
                    	var thirdLevelNodes = quickAccessNavNode.all('li.level-2 > ul > li');
                    	//thirdLevelNodes.addClass('level-3');
                    	
                    	// Remove all spans inside a tags
                    	quickAccessNavNode.all('a > span').each(function(node, index, list) {
                    		var text = node.html();
                    		var link = node.ancestor('a');
                    		node.remove();
                    		node.destroy();
                    		link.html(text);
                    	});
                    	
                    	quickAccessWrap.append(quickAccessNavNode);
                    },
                    
                    _getOverlayBodyContent: function() {
                    	var instance = this;
                    	
                    	return instance.overlayPanel.getStdModNode(A.WidgetStdMod.BODY);
                    },
                    
                    _initLiveSearch: function() {
                    	var instance = this;
                    	
                    	var quickAccessWrap = instance.get(QUICK_ACCESS_NAV_LIST_WRAP);
                    	var filterInput = quickAccessWrap.one(instance.get(FILTER_INPUT_ID));
                    	filterNodes = filterInput.ancestor('.yui3-widget-bd').all('ul a');
                    	
                    	instance.liveSearch = new A.LiveSearch({
                    		input: filterInput,
                    		nodes: filterNodes,
                    		cssClass: 'rp-live-search',
                    		
                    		data: function(node) {
                    			return node.html();
                    		},

                    		show: function(node) {
                    			var listNode = node.ancestor('li');
                    			
                    			var isFirstLevel = listNode.hasClass('level-1');
                    			
                    			if(!isFirstLevel) {
                    				var firstLevelNode = node.ancestor('.level-1');
                    				if(firstLevelNode) {
                    					firstLevelNode.show().setAttribute('nodeStatus', 'show');	
                    				}
                    				
                    				var isSecondLevel = listNode.hasClass('level-2');
                    				
                    				if(!isSecondLevel) {
                        				var secondLevelNode = node.ancestor('.level-2');
                        				if(secondLevelNode) {
                        					secondLevelNode.show().setAttribute('nodeStatus', 'show');	
                        				}
                    				}
                    			}

                    			listNode.show().setAttribute('nodeStatus', 'show');
                    		},

                    		hide: function(node) {
                    			if (!node.hasClass('excluded')) {
                    				var listNode = node.ancestor('li');
                    				
                    				var hideNode = true;
                    				
                    				var isFirstLevel = listNode.hasClass('level-1');
                    				var isSecondLevel = listNode.hasClass('level-2');
                    				
                        			if(isFirstLevel || isSecondLevel) {
                        				var hasVisibleChildren = (node.all('li.:not(.' + CSS_HIDDEN + ')').size() > 0);
                        				hideNode = !hasVisibleChildren;
                        			}
                        			
                        			if(hideNode) {
                        				listNode.hide().setAttribute('nodeStatus', 'hide');
                        			}
                    			}
                    		}
                		});
                    },
                    
                    _initOverlay: function(trigger) {
                    	var instance = this;
                    	
                    	var triggerList = trigger.ancestor('ul');
                    	var headingNode = A.one('#heading');
                    	
                        var headingWidthStr = headingNode.getComputedStyle('width').replace('px', '');
                        var headingWidth = parseInt(headingWidthStr);
                    	
                    	var markupPrototypeNode = instance.get(QUICK_ACCESS_NAV_LIST_WRAP);

                    	var bodyContent = markupPrototypeNode.html();

                    	markupPrototypeNode.remove();
                    	markupPrototypeNode.destroy(true);
                    	
                    	instance.overlayPanel = new A.OverlayContextPanel({
                    		align: {
                    			node: triggerList,
                    			points: [A.WidgetPositionAlign.TR, A.WidgetPositionAlign.BR]
                    		},
                    		anim: true,
                    		bodyContent: bodyContent,
                    		boundingBox: '#quick-access-overlay-context-panel',
                    		cancellableHide: true,
                    		cssClass: CSS_QUICK_ACCESS_NAV_OVERLAY,
                    		hideDelay: 200,
                    		hideOnDocumentClick: true,
                    		showArrow: false,
                    		trigger: trigger,
                    		width: headingWidth
                		});

                    	instance.overlayPanel.render();
                    	
                    	instance.overlayMask = new A.OverlayMask().render();
                    	
                    	instance._initLiveSearch();
                    	
                    	instance.overlayPanel.on('render', instance._onQuickAccessOverlayRender, instance);
                    	instance.overlayPanel.on('hide', instance._onQuickAccessOverlayHide, instance);
                    	instance.overlayPanel.on('show', instance._onQuickAccessOverlayShow, instance);
                    	
                    	instance.overlayPanel.after('show', instance._afterQuickAccessOverlayShow, instance);
                    },
                    
                    _onQuickAccessOverlayRender: function(e) {
                    	var instance = this;
                    	
                    	var overlay = e.currentTarget;
                    	
                    	var bodyContentNode = overlay.getStdModNode(A.WidgetStdMod.BODY);
                    	
                    	var headerCloseLink = bodyContentNode.one('.quick-access-nav-hd a.close');
                    	
                    	headerCloseLink.on('click', function(e) {
                    		var instance = this;
                    		
                    		e.halt();
                    		
                    		instance.overlayPanel.hide();
                    		
                    	}, instance);
                    },
                    
                    _onQuickAccessOverlayHide: function(e) {
                    	var instance = this;
                    	
                    	var overlay = e.currentTarget;
                    	
                    	var triggers = overlay.get('trigger');

                    	triggers.each(function(item, index, list) {
                    		item.removeClass(CSS_ACTIVE);
                    	});
                    	
                    	if(instance.liveSearch) {
                    		instance.liveSearch.destroy();
                    	}
                    	
                    	instance.overlayMask.hide();
                    },
                    
                    _afterQuickAccessOverlayShow: function(e) {
                    	var instance = this;
                    	
                    	var overlay = e.currentTarget;
                    	var bodyContentNode = overlay.getStdModNode(A.WidgetStdMod.BODY);

                    	/*
                    	if(bodyContentNode) {
                        	var filterInput = bodyContentNode.one(instance.get(FILTER_INPUT_ID));
                    		if(filterInput) {
                    			filterInput.focus();
                    		}
                    	}
                    	*/
                    },
                    
                    
                    _onQuickAccessOverlayShow: function(e) {
                    	var instance = this;
                    	
                    	var overlay = e.currentTarget;
                    	
                    	var triggers = overlay.get('trigger');

                    	triggers.each(function(item, index, list) {
                    		item.addClass(CSS_ACTIVE);
                    	});
                    	
                    	instance.overlayMask.show();
                    	
                    },
                    
                    _someFunction: function() {
                        var instance = this;
                    }

                }
            }
    );

    A.QuickAccessNav = QuickAccessNav;
        
    },1, {
        requires: [
            'aui-base',
            'aui-live-search-deprecated',
            'aui-loading-mask',
            'aui-overlay-context-panel-deprecated',
            'aui-popover',
            'node-event-simulate',
            'substitute'
      ]
    }
);
