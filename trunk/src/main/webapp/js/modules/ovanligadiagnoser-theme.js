AUI().add('ovanligadiagnoser-theme',function(A) {
    var Lang = A.Lang,
    	isNull = Lang.isNull,
    	isUndefined = Lang.isUndefined,
    	getClassName = A.ClassNameManager.getClassName,
    	
        NAME = 'ovanligadiagnoser-theme',
        NS = 'ovanligadiagnoser-theme'
    ;
    
    var OvanligaDiagnoserTheme = A.Component.create(
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

                        instance._initLiveSearch();
                        
                        instance._initLoaderOverlay();
                    },
    
                    bindUI: function() {
                        var instance = this;

                        // Diagnosis Labels (diagnosis article)
                        var diagnosisLabels = A.all('.diagnosis-article-wrap .diagnosis-item .item-label');
                        diagnosisLabels.on('click', instance._onDiagnosisItemLabelClick, instance);
                    },

                    _initLiveSearch: function() {
                        var instance = this;

                        var diagnosisWrap = A.one('.diagnosis-list-wrap');

                        if(!diagnosisWrap) {
                            return;
                        }

                        var searchInputWrap = diagnosisWrap.one('.diagnosis-filter-wrap');

                        if(!searchInputWrap) {
                            return;
                        }

                        var filterInput = searchInputWrap.one('input[type="text"]');

                        if(!filterInput) {
                            return;
                        }

                        var filterNodes = diagnosisWrap.all('ul.diagnosis-list > li > a');

                        if(filterNodes.size() == 0 ) {
                            return;
                        }
                        var liveSearch = new A.LiveSearch({
                            input: filterInput,
                            nodes: filterNodes,
                            cssClass: 'ovanligadiagnoser-live-search',
                            
                            data: function(node) {
                                return node.html();
                            },

                            show: function(node) {
                                var listNode = node.ancestor('li');

                                listNode.show().setAttribute('nodeStatus', 'show');
                            },

                            hide: function(node) {
                                var listNode = node.ancestor('li');

                                listNode.hide().setAttribute('nodeStatus', 'hide');
                            }

                        });

                        searchInputWrap.show();

                    },

                    _initLoaderOverlay: function() {
                        var instance = this;

                        var loaderOverlay = new A.OvanligaDiagnoserLoaderOverlay().render();
                    },

                    _onDiagnosisItemLabelClick: function(e) {
                        var instance = this;

                        var itemLabel = e.currentTarget;

                        var parent = itemLabel.ancestor('.diagnosis-item');

                        parent.toggleClass('diagnosis-item-expanded');
                    },
                    
                    _someFunction: function(e) {
                        var instance = this;
                    }

                }
            }
    );

    A.OvanligaDiagnoserTheme = OvanligaDiagnoserTheme;
        
    },1, {
        requires: [
            'aui-base',
            'aui-live-search-deprecated',
	    	'event',
            'ovanligadiagnoser-loader-overlay'
      ]
    }
);
