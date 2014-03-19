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

                        sidebarHelpLinks.each(function(item, index, list) {

                            var portletNode = item.ancestor('.portlet-asset-publisher');
                            var portletNodeId = portletNode.getAttribute('id');
                            var portletNamespace = portletNodeId.replace('p_p_id', '');
                            portletNamespace = '';

                            var uri = item.getData('href') || item.attr('href');
                            uri = uri + '&' + portletNamespace + 'p_p_state=exclusive';

                            item.setAttribute('href', uri);

                            item.setAttribute('target', '_BLANK');
                        });

                        sidebarHelpLinks.on('click', function(event) {
                            //event.halt();

                            /*
                            var currentTarget = event.currentTarget;
                            var uri = currentTarget.getData('href') || currentTarget.attr('href');

                            var uri = uri + '&p_p_state=normal';

                            currentTarget.setAttribute('href', uri);
                            */

                            //url = url.replace(/knowledge_base_aggregator\/.+\/article\/([0-9]+)\/?.*/,'knowledge_base_display/'+instance_id+'/article/$1');

                            //Liferay.Util.openInDialog(event, event.currentTarget);
                        }, instance);

                    },
                    
                    _onKBAggregatorTitleLinksClick: function(e) {
                        //hijacks the click and either shows the KB article in
                        //a modal dialog (default) or if the Aggregator Portlet
                        //has the class "display_in_help" it will issue a redirect
                        //to the help page
                        var instance = this;
                        
                        e.halt();
                                                            
                        var currentTarget = e.currentTarget;
                        var url = currentTarget.getAttribute('href');
                        
                        //check for class on portlet to decide what to do
                        var portlet = currentTarget.ancestor('.knowledge-base-portlet-aggregator');

                        if (portlet && portlet.hasClass('display_in_help')) {
                            //to display it in the help page we have to do a redirect,
                            //with a proper URL, the problem is that this URL needs an instance variable
                            //
                            //ie: from /knowledge_base_aggregator/tIa6/article/<id>/maximized
                            //to: /knowledge_base_display/<instance>/article/<id>
                            
                            var display = A.one('.knowledge-base-portlet-display');
                            if (display) {
                                var instance_id = display.attr('id').split('_INSTANCE_')[1];
                                if (instance_id) {
                                    //remove trailing _ 
                                    instance_id = instance_id.split('_')[0];
                                    url = url.replace(/knowledge_base_aggregator\/.+\/article\/([0-9]+)\/?.*/,'knowledge_base_display/'+instance_id+'/article/$1');
                                    window.location.href = url;
                                    return false;
                                }
                            }
                                    
                        }
                        
                        //open in modal window instead
                        var currentTitleNode = currentTarget.one('.taglib-text');
                        var currentTitle = currentTitleNode.html();
                        
                        var isPrivateLayout = themeDisplay.isPrivateLayout() == 'true';
                        
                        if(isPrivateLayout) {
                        	url = url.replace('/group/', '/widget/group/');
                        }
                        else {
                        	url = url.replace('/web/', '/widget/web/');
                        	/*
                        	if(url.contains('/web/')) {
                        		url = url.replace('/web/', '/widget/web/');	
                        	} else if (url.contains('vap.vgregion.se/')) {
                        		url = url.replace('vap.vgregion.se/', 'vap.vgregion.se/widget/web/');
                        	}
                        	*/
                        }
                    
                        var dialogHeight = 500;
                        var dialogWidth = 700;
                    
                        var TPL_KB_IFRAME = '<div class="iframe-wrap"><iframe name="kbAggregatorDialog" id="kbAggregatorDialog" class="" title="" frameborder="0" src="{url}" width="{iframeWidth}" height="{iframeHeight}"></iframe></div>';
                    
                        var bodyContent = A.substitute(TPL_KB_IFRAME, {
                            iframeHeight: dialogHeight - 50,
                            iframeWidth: dialogWidth - 15,
                            url: url
                        });

                        /*
                        var dialog1 = new A.Dialog({
                            bodyContent: bodyContent,
                            centered: true,
                            constrain2view: true,
                            cssClass: CSS_RP_DIALOG,
                            destroyOnClose: true,
                            height: dialogHeight,
                            modal: true,
                            width: dialogWidth,
                            title: currentTitle
                        }).render();
                        */

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
