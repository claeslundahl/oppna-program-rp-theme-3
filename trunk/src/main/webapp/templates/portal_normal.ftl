<!DOCTYPE html>

<#include init />

<html class="${root_css_class}" dir="<@liferay.language key="lang.dir" />" lang="${w3c_language_id}">

<head>
	<title>${the_title} - ${company_name}</title>

	<meta content="initial-scale=1.0, width=device-width" name="viewport" />

	<#--
	<link href='http://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
	-->

	<#--
	<link href='http://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
	-->

	<link href='http://fonts.googleapis.com/css?family=Lato:400,300,700,900' rel='stylesheet' type='text/css'>

	${theme.include(top_head_include)}
</head>

<body class="${css_class}">

<a href="#main-content" id="skip-to-content"><@liferay.language key="skip-to-content" /></a>

${theme.include(body_top_include)}

<div class="loader-overlay"></div>
<div class="container" id="wrapper">

	<@liferay.dockbar />

	<header id="banner" role="banner">
		<div id="heading">
			<h1 class="site-title">

				<a class="${logo_css_class}" href="${site_default_url}" title="<@liferay.language_format arguments="${site_name}" key="go-to-x" />">
					${site_name}
				</a>



				<#--
				<a class="${logo_css_class}" href="${site_default_url}" title="<@liferay.language_format arguments="${site_name}" key="go-to-x" />">
					<img alt="${logo_description}" height="${site_logo_height}" src="${site_logo}" width="${site_logo_width}" />
				</a>

				<#if show_site_name>
					<span class="site-name" title="<@liferay.language_format objects="${site_name}" key="go-to-x" />">
					<span class="site-name" title="${site_name}">
						${site_name}
					</span>
					
				</#if>
				-->
			</h1>

			<h2 class="page-title">
				<span>${the_title}</span>
			</h2>
		</div>

		<#if has_navigation || is_signed_in>
			<#include "${full_templates_path}/navigation.ftl" />
		</#if>
	</header>

	<div id="content">
		<#--
		<#if show_breadcrumbs>
			<nav id="breadcrumbs"><@liferay.breadcrumbs /></nav>
		</#if>
		-->

		<#if selectable>
			${theme.include(content_include)}
		<#else>
			${portletDisplay.recycle()}

			${portletDisplay.setTitle(the_title)}

			${theme.wrapPortlet("portlet.ftl", content_include)}
		</#if>
	</div>

	<div class="push"></div>
</div>

<footer id="footer" role="contentinfo">
	<div class="container">
			<p class="powered-by">
				<@liferay.language key="powered-by" /> <a href="http://www.liferay.com" rel="external">Liferay</a>
			</p>
		</footer>
	</div>
</footer>


${theme.include(body_bottom_include)}

<script type="text/javascript" src="${javascript_folder}/modules/ovanligadiagnoser-loader-overlay.js"></script>
<script type="text/javascript" src="${javascript_folder}/modules/ovanligadiagnoser-theme.js"></script>
<script type="text/javascript" src="${javascript_folder}/theme-main.js"></script>

<#if add_this_id != "">
	<#include "${full_templates_path}/add_this.ftl" />
</#if>	

${theme.include(bottom_include)}

</body>

</html>