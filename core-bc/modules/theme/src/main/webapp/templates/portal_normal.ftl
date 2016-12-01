<!DOCTYPE html>

<#include init />

<html class="${root_css_class}" dir="<@liferay.language key="lang.dir" />" lang="${w3c_language_id}">

<head>
	<title>${the_title} - ${company_name}</title>

	<meta content="initial-scale=1.0, width=device-width" name="viewport" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	${theme.include(top_head_include)}

</head>

<body class="${css_class} ${css_rp_admin}">


<#if themeDisplay.getThemeSetting("global-info-header") != "">
	<div class="global-info-header">
		${themeDisplay.getThemeSetting("global-info-header")}
	</div>
</#if>

<a href="#main-content" id="skip-to-content"><@liferay.language key="skip-to-content" /></a>

${theme.include(body_top_include)}

<div class="container-fluid" id="wrapper">

	<header id="banner" role="banner">

		<div id="heading" class="clearfix">
			<h1 class="site-title">
				<a class="${logo_css_class} ${themeDisplay.getThemeSetting('additional-logo-class')}" href="${site_default_url}" title="${site_name}">
					<img alt="${logo_description}" height="${site_logo_height}" src="${site_logo}" width="${site_logo_width}" />
				</a>
			</h1>

			<h2 class="page-title">
				<span>${the_title}</span>
			</h2>

      <div class="top-wrap">
      	<div class="dockbar-wrap">
        	<@liferay.dockbar />
        </div>
				<#if themeDisplay.getThemeSetting("show-top-navigation-wrap") == "true">
					<div class="top-navigation-wrap">
						<#if is_signed_in>
							<#include "${full_templates_path}/top_navigation.ftl" />
						</#if>
					</div>
				</#if>
      </div>
		</div>

		<#if has_navigation || is_signed_in>
			<#include "${full_templates_path}/navigation.ftl" />
		</#if>

	</header>

	<#if selectable>
		<div id="toolsSidebar" class="tools-sidebar">
			<#if show_notifications_portlet>
				<#include "${full_templates_path}/notifications.ftl" />
			</#if>
			<#if is_signed_in && show_tyck_till>
				<#include "${full_templates_path}/tyck_till_content.ftl" />
			</#if>
		</div>
	</#if>

	<div id="content">

		<#if show_breadcrumbs>
			<#include "${full_templates_path}/breadcrumbs.ftl" />
		</#if>

		<#if selectable>
			${theme.include(content_include)}
		<#else>
			${portletDisplay.recycle()}

			${portletDisplay.setTitle(the_title)}

			${theme.wrapPortlet("portlet.ftl", content_include)}
		</#if>

	</div>

</div>

<footer id="footer" role="contentinfo">
	<#include "${full_templates_path}/footer.ftl" />
</footer>

${theme.include(body_bottom_include)}

<#include "${full_templates_path}/theme_js_bottom.ftl" />

${theme.include(bottom_include)}

<#include "${full_templates_path}/piwik.ftl" />

</body>

</html>
