<div class="footer-inner">
	<div class="footer-content clearfix">

		<span class="logo">
			<span>${region_portal_name}</span>
		</span>

		<#if is_server_local>
			<div class="server-info">
				Server: Local
			</div>
		<#elseif is_server_test>
				<div class="server-info">
					Server: Test
				</div>
		<#elseif is_server_stage>
				<div class="server-info">
					Server: Stage
				</div>
		</#if>

	</div>
</div>
