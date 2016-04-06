<nav class="top-navigation clearfix" id="topNavigation">
	<ul class="top-nav-list clearfix">

		<#if is_signed_in && show_quick_navigation>
			<li class="top-nav-quick-access last">
				<a href="#top-nav-quick-access">
					<span>${topnavQuickAccessText}</span>
				</a>
				<#include "${full_templates_path}/quick_access_navigation.ftl" />
			</li>
		</#if>

		<#if show_sign_in_link>
			<li class="top-nav-signin last">
				<@includePortlet portlet_id=loginlink_portlet_id />
			</li>
		</#if>

	</ul>
</nav>
