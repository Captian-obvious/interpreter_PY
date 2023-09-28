window.app = {};
app.VERSION = '1.0.0';
app.SESSION = null;
app.REQUEST_CLIENT='1mmdeje93oa8745t4jtg4jj4o4045utj0945h49432j3';
app.EDITOR = null;
app.APP_NAME='Python Interpreter';
app.BOOTLOADER = '82jdm43j3499';
app.APP_RESOURCES = null;
app.LOADED = false;
app.loadResource = function(src){
    var v = document.createElement('script');
    v.setAttribute('src',src);
    v.setAttribute('data-client',app.REQUEST_CLIENT)
    document.head.appendChild(v);
};
app.boot = function() {
    app.loadResource('core.js');
    app.SESSION = new Date();
    app.APP_RESOURCES = {};
    app.
    setTimeout(function(){
        app.CORE = window.CORE
    },30);
};
app.boot();
