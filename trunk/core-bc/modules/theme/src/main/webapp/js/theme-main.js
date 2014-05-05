// Plain javascript that runs before AUI is ready (to prevent content flashing

// Body
addCssClassName(document.body, 'js');

//Dockbar
var plainOldJsDockbarNode = document.getElementById('dockbarWrap');
addCssClassName(plainOldJsDockbarNode, 'aui-helper-hidden');

//Hide footer before positionFooter has been run
var plainOldJsfooterNode = document.getElementById('footer');
addCssClassName(plainOldJsfooterNode, 'aui-helper-hidden');

function addCssClassName(node, cssClassName) {
	if(node) {
		var newClassName = node.className + ' ' + cssClassName;
		node.className = newClassName;
	}
}

AUI().ready('rp-theme-2', function(A) {
	
	var rpTheme2 = new A.RpTheme2().render();

    A.one('win').on('load', function (e) {
        AUI().use('aui-base', 'rp-footer-plugin', function(A) {
            var footerNode = A.one('#footer');
            if(footerNode) {
                footerNode.plug(A.Plugin.RpFooter);
            }
        });
    });
});

Liferay.on('allPortletsReady',function() {

});