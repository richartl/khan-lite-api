require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"zone_management":[function(require,module,exports){
var $=require("base/jQuery"),force_sync=require("utils/force_sync"),api=require("utils/api"),messages=require("utils/messages"),sprintf=require("sprintf-js").sprintf;$(function(){$("#force-sync").click(function(e){e.preventDefault(),force_sync(window.ZONE_ID,window.DEVICE_ID)}),$(".facility-delete-link").click(function(e){var t=$.trim($(this).parent().prevAll().find("a.facility-name").text()),i=prompt(sprintf(gettext("Are you sure you want to delete '%s'? You will lose all associated learner, group, and coach accounts. If you are sure, type the name of the facility into the box below and press OK."),t));if(null===i)return!1;if(i===t){var r=e.target.getAttribute("value"),s={facility_id:null};api.doRequest(r,s).success(function(){window.location.reload()})}else messages.show_message("warning",gettext("The facility has not been deleted. Did you spell the facility name correctly?"))})});
},{"base/jQuery":45,"sprintf-js":667,"utils/api":115,"utils/force_sync":27,"utils/messages":119}],27:[function(require,module,exports){
var api=require("utils/api"),sprintf=require("sprintf-js").sprintf,messages=require("utils/messages");module.exports=function(e,s){api.doRequest(window.Urls.api_force_sync()).success(function(){var t=gettext("Successfully launched data syncing job.")+" ";t+=sprintf(gettext("After syncing completes, visit the <a href='%(devman_url)s'>device management page</a> to view results."),{devman_url:Urls.device_management(e,s)}),messages.show_message("success",t)})};
},{"sprintf-js":667,"utils/api":115,"utils/messages":119}]},{},["zone_management"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJrYWxpdGUvY29udHJvbF9wYW5lbC9zdGF0aWMvanMvY29udHJvbF9wYW5lbC9idW5kbGVfbW9kdWxlcy96b25lX21hbmFnZW1lbnQuanMiLCJrYWxpdGUvY29udHJvbF9wYW5lbC9zdGF0aWMvanMvY29udHJvbF9wYW5lbC91dGlscy9mb3JjZV9zeW5jLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyICQ9cmVxdWlyZShcImJhc2UvalF1ZXJ5XCIpLGZvcmNlX3N5bmM9cmVxdWlyZShcInV0aWxzL2ZvcmNlX3N5bmNcIiksYXBpPXJlcXVpcmUoXCJ1dGlscy9hcGlcIiksbWVzc2FnZXM9cmVxdWlyZShcInV0aWxzL21lc3NhZ2VzXCIpLHNwcmludGY9cmVxdWlyZShcInNwcmludGYtanNcIikuc3ByaW50ZjskKGZ1bmN0aW9uKCl7JChcIiNmb3JjZS1zeW5jXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKSxmb3JjZV9zeW5jKHdpbmRvdy5aT05FX0lELHdpbmRvdy5ERVZJQ0VfSUQpfSksJChcIi5mYWNpbGl0eS1kZWxldGUtbGlua1wiKS5jbGljayhmdW5jdGlvbihlKXt2YXIgdD0kLnRyaW0oJCh0aGlzKS5wYXJlbnQoKS5wcmV2QWxsKCkuZmluZChcImEuZmFjaWxpdHktbmFtZVwiKS50ZXh0KCkpLGk9cHJvbXB0KHNwcmludGYoZ2V0dGV4dChcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgJyVzJz8gWW91IHdpbGwgbG9zZSBhbGwgYXNzb2NpYXRlZCBsZWFybmVyLCBncm91cCwgYW5kIGNvYWNoIGFjY291bnRzLiBJZiB5b3UgYXJlIHN1cmUsIHR5cGUgdGhlIG5hbWUgb2YgdGhlIGZhY2lsaXR5IGludG8gdGhlIGJveCBiZWxvdyBhbmQgcHJlc3MgT0suXCIpLHQpKTtpZihudWxsPT09aSlyZXR1cm4hMTtpZihpPT09dCl7dmFyIHI9ZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwidmFsdWVcIikscz17ZmFjaWxpdHlfaWQ6bnVsbH07YXBpLmRvUmVxdWVzdChyLHMpLnN1Y2Nlc3MoZnVuY3Rpb24oKXt3aW5kb3cubG9jYXRpb24ucmVsb2FkKCl9KX1lbHNlIG1lc3NhZ2VzLnNob3dfbWVzc2FnZShcIndhcm5pbmdcIixnZXR0ZXh0KFwiVGhlIGZhY2lsaXR5IGhhcyBub3QgYmVlbiBkZWxldGVkLiBEaWQgeW91IHNwZWxsIHRoZSBmYWNpbGl0eSBuYW1lIGNvcnJlY3RseT9cIikpfSl9KTsiLCJ2YXIgYXBpPXJlcXVpcmUoXCJ1dGlscy9hcGlcIiksc3ByaW50Zj1yZXF1aXJlKFwic3ByaW50Zi1qc1wiKS5zcHJpbnRmLG1lc3NhZ2VzPXJlcXVpcmUoXCJ1dGlscy9tZXNzYWdlc1wiKTttb2R1bGUuZXhwb3J0cz1mdW5jdGlvbihlLHMpe2FwaS5kb1JlcXVlc3Qod2luZG93LlVybHMuYXBpX2ZvcmNlX3N5bmMoKSkuc3VjY2VzcyhmdW5jdGlvbigpe3ZhciB0PWdldHRleHQoXCJTdWNjZXNzZnVsbHkgbGF1bmNoZWQgZGF0YSBzeW5jaW5nIGpvYi5cIikrXCIgXCI7dCs9c3ByaW50ZihnZXR0ZXh0KFwiQWZ0ZXIgc3luY2luZyBjb21wbGV0ZXMsIHZpc2l0IHRoZSA8YSBocmVmPSclKGRldm1hbl91cmwpcyc+ZGV2aWNlIG1hbmFnZW1lbnQgcGFnZTwvYT4gdG8gdmlldyByZXN1bHRzLlwiKSx7ZGV2bWFuX3VybDpVcmxzLmRldmljZV9tYW5hZ2VtZW50KGUscyl9KSxtZXNzYWdlcy5zaG93X21lc3NhZ2UoXCJzdWNjZXNzXCIsdCl9KX07Il19
