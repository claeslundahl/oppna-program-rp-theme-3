<#assign css_class = css_class + " dockbar-split" >

<#assign show_breadcrumbs = getterUtil.getBoolean(theme_settings["show-breadcrumbs"]!"", true) />

<#assign body_cover = getterUtil.getBoolean(theme_settings["body-cover"]!"", true) />

<#assign add_this_id = getterUtil.getString(theme_settings["add-this-id"]!"", "") />

<#if body_cover>
	<#assign css_class = css_class + " cover" >
</#if>

<#assign show_site_name = true >

<#if site_name = "">
	<#assign site_name = "Found no name" >
</#if>