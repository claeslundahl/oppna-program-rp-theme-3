<#if use_rp_breadcrumbs_portlet>
	<@includePortlet portlet_id=rp_breadcrumbs_portlet_id />
<#else>
	<nav class="site-breadcrumbs helper-hidden_ clearfix" id="breadcrumbs">
		<div class="breadcrumbs-list-wrap clearfix">
			<div class="breadcrumbs-label">
				${breadcrumbs_label}:
			</div>
			<@liferay_ui.breadcrumb showGuestGroup=false showCurrentGroup=false showLayout=true showCurrentPortlet=true showPortletBreadcrumb=true />
		</div>
	</nav>
</#if>
