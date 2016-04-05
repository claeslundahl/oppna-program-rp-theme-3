<#if theme_js_inline >
  <script>
    <#list theme_js_scripts as theme_js_script>
      <#include "${javascript_folder}/${theme_js_script}" />
    </#list>
  </script>
<#else>
  <script>
    console.log('JS should NOT be inline');
  </script>
  <#list theme_js_scripts as theme_js_script>
    <script src="${javascript_folder}/${theme_js_script}" />
  </#list>
</#if>
