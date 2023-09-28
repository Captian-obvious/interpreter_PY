window.app = {};
app.VERSION = '1.0.0';
app.SESSION = '';
app.REQUEST_CLIENT='1mmdeje93oa8745t4jtg4jj4o4045utj0945h49432j3';
app.EDITOR = null;
app.APP_NAME='Text Edit';
app.BOOTLOADER = '82jdm43j3499';
app.require = function(pathname){
    var v = document.createElement('script');
    v.setAttribute('src',pathname);
    v.setAttribute('data-client',app.REQUEST_CLIENT)
    document.head.appendChild(v);
}
