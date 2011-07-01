/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		ExpressionEngine Dev Team
 * @copyright	Copyright (c) 2003 - 2011, EllisLab, Inc.
 * @license		http://expressionengine.com/user_guide/license.html
 * @link		http://expressionengine.com
 * @since		Version 2.0
 * @filesource
 */

function _access_edit_ajax(a,b,d,c){var h="";switch(c){case "no_auth_bounce":h=jQuery.param({template_id:b,no_auth_bounce:a.val()});break;case "enable_http_auth":h=jQuery.param({template_id:b,enable_http_auth:a.val()});break;case "access":c=!$(a).closest(".accessTable").length?$(".no_auth_bounce").val():$(a).closest(".accessTable").find(".no_auth_bounce").val(),h=jQuery.param({template_id:b,member_group_id:d,new_status:a.val(),no_auth_bounce:c})}$.ajax({type:"POST",url:EE.access_edit_url,data:"is_ajax=TRUE&XID="+
EE.XID+"&"+h,success:function(a){a!==""&&$.ee_notice(a,{duration:3E3,type:"success"})},error:function(a){a.responseText!==""&&$.ee_notice(a.responseText,{duration:3E3,type:"error"})}})}
function access_edit_ajax(a){var b,d;a.attr("name").substr(0,14)==="no_auth_bounce"?(d=a.attr("name").substr(15)?a.attr("name").substr(15):$("input:hidden[name=template_id]").val(),_access_edit_ajax(a,d,"","no_auth_bounce")):a.attr("name").substr(0,16)==="enable_http_auth"?(d=a.attr("name").substr(17)?a.attr("name").substr(17):$("input:hidden[name=template_id]").val(),_access_edit_ajax(a,d,"","enable_http_auth")):(b=a.attr("name").replace("access_","").split("_"),d=b.length<2?$("input:hidden[name=template_id]").val():
b[1],_access_edit_ajax(a,d,b[0],"access"))}
function template_edit_ajax(){var a=$(this).closest(".accessRowHeader"),b,d,c,h,j,e,k,l,i,f;a.length<1&&(a=$(this).closest(".templateEditorTable"));b=a.data("ajax_ids");if(!b){if($(this).hasClass("ignore_radio"))return!1;return access_edit_ajax($(this))}d=b.id;b=b.group_id;c=a.find(".template_name").val();h=a.find(".template_type").val();j=a.find("select[name^=cache]").val();e=a.find(".refresh").val();k=a.find("select[name^=allow_php]").val();l=a.find("select[name^=php_parse_location]").val();i=a.find(".hits").val();
f=a.find(".template_size").val();a=jQuery.param({template_id:d,group_id:b,template_name:c,template_type:h,cache:j,refresh:e,hits:i,allow_php:k,php_parse_location:l,template_size:f});$.ajax({type:"POST",url:EE.template_edit_url,data:"is_ajax=TRUE&XID="+EE.XID+"&"+a,success:function(a){var g=$("#templateId_"+d);g.text(c);if(g.closest(".templateName").length){if(g=g.closest(".templateName").next().find("a"),g.length)g=g.get(0),g.href=g.href.replace(/\/[^\/]*$/,"/"+c)}else if($("#templateViewLink a.submit").length&&
(g=$("#templateViewLink a.submit"),g.length))g=g.get(0),g.href=g.href.replace(/\/[^\/]*$/,"/"+c);$("#template_data").attr("rows",f);$("#hitsId_"+d).text(i);a!==""&&$.ee_notice(a,{duration:3E3,type:"success"})},error:function(a){a.responseText!==""&&$.ee_notice(a.responseText,{duration:3E3,type:"error"})}})}function hideSubRows(a,b){b?$(a).data(b)&&$(a).data(b).hide():(hideSubRows(a,"prefsRow"),hideSubRows(a,"accessRow"))}
function hideRow(a,b){a.hasClass("highlightRow")&&a.removeClass("highlightRow");if(a.data(b)){var d=a.data(b).is(":visible");hideSubRows(a);d||(a.addClass("highlightRow"),a.data(b).show());return!0}hideSubRows(a);return!1}function set_radio_buttons(a,b){a.find("input:radio").each(function(){var a,c;a=$(this).attr("id").split("_");c=a.slice(0,-1).join("_");a=a.slice(-1)[0];$(this).attr({id:c+"_"+b+"_"+a,name:c+"_"+b})})}
function bind_prefs_events(){$(".templateTable .accessTable").find("input:text").unbind("blur.manager_updated").bind("blur.manager_updated",template_edit_ajax);$(".templateTable .accessTable").find("input:radio").unbind("click.manager_updated").bind("click.manager_updated",template_edit_ajax);$(".templateTable .accessTable").find("select").unbind("change.manager_updated").bind("change.manager_updated",template_edit_ajax)}
(function(a){var b,d;a(document).ready(function(){function c(i,f){var b="input:radio[id$=_";f&&(b="input:radio[id$=_"+f+"_");i.find(".ignore_radio").click(function(){this.value==="y"&&i.find(b+"y]").filter(":not(.ignore_radio)").trigger("click");this.value==="n"&&i.find(b+"n]").filter(":not(.ignore_radio)").trigger("click");a(this).attr("checked","");return!1})}function h(b,f,e){var g=a('<tr class="accessRowHeader"><td colspan="6">'+d+"</td></tr>");g.find(".no_auth_bounce").val(e.no_auth_bounce);
g.find(".no_auth_bounce").attr({id:"no_auth_bounce_"+b,name:"no_auth_bounce_"+b});g.find(".enable_http_auth").val(e.enable_http_auth);g.find(".enable_http_auth").attr({id:"enable_http_auth_"+b,name:"enable_http_auth_"+b});set_radio_buttons(g,b);a.each(e.access,function(a,e){var f=g.find("#access_"+a+"_"+b+"_y"),c=g.find("#access_"+a+"_"+b+"_n");e.access===!0?(f.attr("checked","checked"),c.attr("checked","")):(c.attr("checked","checked"),f.attr("checked",""))});c(g,b);a(f).addClass("highlightRow");
a(f).after(g);g.find(".accessTable").tablesorter({widgets:["zebra"]});f.data("accessRow",g)}function j(e,f){var c=a('<tr class="accessRowHeader"><td colspan="6">'+b+"</td></tr>");c.find("select").each(function(){var b=a(this);switch(this.name){case "template_type":b.val(f.type);break;case "cache":b.val(f.cache);break;case "allow_php":b.val(f.allow_php);break;case "php_parse_location":b.val(f.php_parsing)}b.attr("name",this.name+"_"+f.id)});c.find(".template_name").val(f.name);f.name==="index"&&c.find(".template_name").attr({readonly:"readonly"});
c.find(".refresh").val(f.refresh);c.find(".hits").val(f.hits);c.data("ajax_ids",{id:f.id,group_id:f.group_id});e.data("prefsRow",c);a(e).addClass("highlightRow");a(e).after(c)}var e,k,l;b=a("#prefRowTemplate").html();d=a("#accessRowTemplate").html();!b||!d?(e=a("#templateAccess, #templatePreferences"),k=a("input:hidden[name=template_id]").val(),l=a("input:hidden[name=group_id]").val(),a("#templatePreferences").data("ajax_ids",{id:k,group_id:l}),c(a("#templateAccess")),e.find("input:text").unbind("blur.manager_updated").bind("blur.manager_updated",
template_edit_ajax),e.find("input:radio").unbind("click.manager_updated").bind("click.manager_updated",template_edit_ajax),e.find("select").unbind("change.manager_updated").bind("change.manager_updated",template_edit_ajax)):(a("#prefRowTemplate, #accessRowTemplate").remove(),EE.manager={showPrefsRow:function(b,e){var c=a(e).parent().parent();hideRow(c,"prefsRow")||(j(c,b),bind_prefs_events());return!1},showAccessRow:function(b,e,c){c=a(c).parent().parent();hideRow(c,"accessRow")||(h(b,c,e),bind_prefs_events(),
c.trigger("applyWidgets"));return!1}})});a(".last_edit").css("opacity",0).show();a("#template_details").hover(function(){a(".last_edit").animate({opacity:1},50)},function(){a(".last_edit").animate({opacity:0},50)});a(document).ready(function(){if(EE.manager&&EE.manager.warnings){a(".warning_details").hide();a(".toggle_warning_details").click(function(){a(".warning_details").hide();a("#wd_"+this.id.substr(3)).show();return!1});var b=a("#template_data"),d,j;j=function(b,c,d){var i,f="";d&&d.length>
1&&(f='<select name="fr_options" id="fr_options"></select>');i='<div style="padding: 5px;"><label>Find:</label> <input name="fr_find" id="fr_find" type="text" value="" /> <label>Replace:</label> <input type="text" name="fr_replace" id="fr_replace" value=""/> '+f+"</div>";i+='<div style="padding: 5px;"><button class="submit" id="fr_find_btn">Find Next</button> <button class="submit" id="fr_replace_btn">Replace</button> <button class="submit" id="fr_replace_all_btn">Replace All</button> <label><input name="fr_replace_closing_tags" id="fr_replace_closing_tags" type="checkbox" /> Include Closing Tags</label></div>';
a.ee_notice(i,{type:"custom",open:!0,close_on_click:!1});a("#fr_find").val(b);a("#fr_replace").val(c);a("#fr_replace_closing_tags").attr("checked","");f!==""&&(a("#fr_options").append(a(d)),a("#fr_options").click(function(){a("#fr_find").val(a(this).val());a("#fr_find_btn").click()}));b&&a("#fr_find_btn").click()};a("#fr_find_btn").live("click",function(){var e=a("#fr_find").val();d=b.selectNext(e).scrollToCursor()});a("#fr_replace_btn").live("click",function(){var b=a("#fr_find").val(),c=a("#fr_replace").val();
d.getSelectedText()===b&&d.replaceWith(c)});a("#fr_replace_all_btn").live("click",function(){var e=a("#fr_find").val(),d=a("#fr_replace").val();jQuery.trim(e)!==""&&(b.val(b.val().split(e).join(d)),a("#fr_replace_closing_tags").attr("checked")&&(e[0]==="{"&&e.substr(0,2)!=="{/"&&(e="{/"+e.substr(1)),d[0]==="{"&&d.substr(0,2)!=="{/"&&(d="{/"+d.substr(1)),jQuery.trim(e)!==""&&b.val(b.val().split(e).join(d))))});a(".find_and_replace").click(function(){var a=this.id.substr(8),b="{exp:"+a,c="{exp:"+EE.manager.warnings[a].suggestion,
d=EE.manager.warnings[a].full_tags,f=Array(new Option(b,b)),h;if(d&&d.length>1)for(h=0;h<d.length;h++)a="{"+d[h]+"}",f.push(new Option(a,a));c==="{exp:"&&(c="");j(b,c,f);return!1})}});a("#template_keywords_reset").click(function(){a("#template_keywords").val("");a(".search form").submit()})})(jQuery);
