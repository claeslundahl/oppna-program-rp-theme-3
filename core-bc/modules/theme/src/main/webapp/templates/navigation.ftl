<#if use_rp_navigation_portlet>
	<@includePortlet portlet_id=rp_navigation_portlet_id />
<#else>

	<nav class="${nav_css_class}" id="navigation" role="navigation">
		<ul role="menubar" class="nav-list clearfix">

			<#list nav_items as nav_item>

				<#assign nav_item_attr_has_popup = "" />
				<#assign nav_item_attr_selected = "" />
				<#assign nav_item_css_class = "" />

				<#if nav_item.isSelected()>
					<#assign nav_item_attr_selected = "aria-selected='true'" />
					<#assign nav_item_attr_selected = "selected" />
				</#if>

				<#if nav_item.hasChildren()>
					<#assign nav_item_attr_has_popup = "aria-haspopup='true'" />
				</#if>

				<li class="${nav_item_css_class}" id="layout_${nav_item.getLayoutId()}" $nav_item_attr_selected role="presentation">

					<a aria-labelledby="layout_${nav_item.getLayoutId()}" href="${nav_item.getURL()}" ${nav_item_attr_has_popup} ${nav_item.getTarget()} role="menuitem">
						<span>${nav_item.icon()} ${nav_item.getName()}</span>
					</a>

					<#if nav_item.hasChildren()>
						<div class="nav-list-sub-wrap">
							<ul class="nav-list-sub nav-list-sub-1" role="menu">
								<#list nav_item.getChildren() as nav_child>
									<#assign nav_child_attr_selected = "" />
									<#assign nav_child_css_class = "false" />

									<#if nav_child.isSelected()>
										<#assign nav_child_attr_selected = "aria-selected='true'" />
										<#assign nav_child_css_class = "selected" />
									</#if>

									<li class="${nav_child_css_class}" id="layout_${nav_child.getLayoutId()}" $nav_child_attr_selected role="presentation">
										<a aria-labelledby="layout_${nav_child.getLayoutId()}" href="${nav_child.getURL()}" ${nav_child.getTarget()} role="menuitem">
											${nav_child.getName()}
										</a>

										<#-- Third level is used for quick navigation -->
										<#if nav_child.hasChildren()>
											<ul>
												<#list nav_child.getChildren() as nav_child_child>
												<li role="presentation">
													<a href="${nav_child_child.getURL()}"role="menuitem">
														${nav_child_child.getName()}
													</a>
												</li>
												</#list>
											</ul>
										</#if>


									</li>

								</#list>
							</ul>
						</div>
					</#if>

				</li>

			</#list>

		</ul>
	</nav>

</#if>
