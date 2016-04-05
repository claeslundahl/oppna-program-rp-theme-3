<#if theme_js_inline >
  <script>
    <#list theme_js_scripts as theme_js_script>
      <#include "${javascript_folder}/${theme_js_script}" />
    </#list>
  </script>
<#else>
  <#list theme_js_scripts as theme_js_script>
    <script src="${javascript_folder}/${theme_js_script}"></script>
  </#list>
</#if>
