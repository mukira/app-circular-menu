/**
 * Init script for liwe.github.io apps
 *
 * It starts Google Analytics (sorry about that), and
 * check if the app has been launched on a mobile
 * device.
 */

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-62259688-1', 'auto');
ga('send', 'pageview');


// Mobile test
if (/(android|blackberry|iphone|ipod)/i.test(navigator.userAgent) && window.innerWidth < 500) {
  var warningDom = document.createElement('div');
  warningDom.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; padding: 1rem; font-family: \'Helvetica Neue\', Helvetica, sans-serif; font-weight: 100; background: #181F21; color: #86E0C4; box-sizing: border-box; z-index: 99999;');
  warningDom.innerHTML =  '<p style="font-size: 1.6rem;">Sorry,<br>you must visit this page on a desktop or a larger screen device.<br>But keep your smartphone, you will need it :-)</p>' +
                          '<p style="font-size: 1rem; font-style: italic;">If you think this message has been displayed by mistake, click on the top right corner cross.</p>' +
                          '<span onclick="this.parentNode.remove();ga(\'send\',\'event\',\'mobile_popup\',\'close\');" style="position:absolute; top: 0; right: 0; padding: 1rem; line-height: 0.5;">&#215;</span>';
  document.documentElement.appendChild(warningDom);
  ga('send', 'event', 'mobile_popup', 'open');
}