window.app = {};
app.VERSION = '1.0.0';
app.CURRENT_SESSION = null;
app.EDITOR_VERSION = '1.0.0';
app.REQUEST_CLIENT='1mmdeje93oa8745t4jtg4jj4o4045utj0945h49432j3';
app.EDITOR = null;
app.APP_NAME='Python Interpreter';
app.BOOTLOADER = '82jdm43j3499';
app.APP_RESOURCES = {};
app.CORE = null;
app.CURRENT_USER = null;
app.IS_LOADED = false;
app.CURRENT_MODE = 'ace/mode/python';
app.CURRENT_DOCUMENT = null;
app.NEW_DOCUMENT = null;
app.ERROR = null;
app.ERROR_MESSAGES = {
    ERR_NO_CLIENT: 'ERROR: Client Not Specified',
    ERR_NO_CORE: 'ERROR: Core unable to load (404).',
    ERR_CORE_ERROR: 'ERROR: Core unable to load due to unknown error.',
    ERR_RESOURCES_FAILED_LOAD: 'ERROR: Resources failed to load. (resource)',
    ERR_UNKNOWN: 'ERROR: An unknown error has occured.',
};
app.HANDLE_ERROR = function(error,arg) {
    var returned = error
    app.ERROR = true;
    if (error === 'ERROR: Resources failed to load. (resource)') {
        returned = error.replace('resource',location.protocol+location.pathname+arg);
    };
    return returned
};
app.checkResource = function(src) {
    var video = document.createElement('video');
    video.onload = function() {
    };
    video.onerror = function() {
        alert(app.HANDLE_ERROR(app.ERROR_MESSAGES.ERR_RESOURCES_FAILED_LOAD,src));
    };
    video.src = src;
};
app.loadResource = function(t,src){
    if (t=='SCRIPT'){
        app.checkResource(src);
        var v = document.createElement('script');
        v.setAttribute('src',src);
        v.setAttribute('data-client',app.REQUEST_CLIENT);
        document.head.appendChild(v);
    };
    if (t=='STYLESHEET'){
        app.checkResource(src);
        var v = document.createElement('link');
        v.setAttribute('rel', 'stylesheet')
        v.setAttribute('href',src);
        v.setAttribute('data-client',app.REQUEST_CLIENT);
        document.head.appendChild(v);
    };
};
app.loadResource('STYLESHEET','editor.css');
if (app.ERROR!=true) {
    app.loadResource('STYLESHEET','fonts.css');
};
if (app.ERROR!=true) {
    app.loadResource('SCRIPT','core.js');
};
if (app.ERROR!=true) {
    app.loadResource('SCRIPT','buttons.js');
};
if (app.ERROR!=true) {
    var contain = document.getElementById('app-container');
    contain.innerHTML = `
    <div id='app'>\n
        <div id='toolbar'>\n
            <div id='home'></div>\n
            <div id='keybinds'>n\
                <p id='keybind_text' class='red2' hidden>\n
                    Find: CTRL + F<br>
                    Find & Replace: CTRL + H<br>
                </p>\n
            </div>\n
        </div>\n
        <div id='text_area'></div>\n
    </div>
    `;
};
