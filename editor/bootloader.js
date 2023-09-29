window.app = {};
app.STATE = {};
app.VERSION = '1.0.0';
app.CURRENT_SESSION = null;
app.EDITOR_VERSION = '1';
app.REQUEST_CLIENT='1mmdeje93oa8745t4jtg4jj4o4045utj0945h49432j3';
app.EDITOR = null;
app.APP_NAME='Python Interpreter';
app.BOOTLOADER = '82jdm43j3499';
app.APP_RESOURCES = {
    jschardetLoaded = false;
    aceEditorLoaded = false;
};
app.CORE = null;
app.CURRENT_USER = null;
app.IS_LOADED = false;
app.CURRENT_MODE = 'ace/mode/python';
app.CURRENT_DOCUMENT = null;
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
        returned = error.replace('resource',arg);
    };
    return returned
};
app.loadResource = function(t,src){
    if (t=='SCRIPT'){
        var v = document.createElement('script');
        v.setAttribute('src',src);
        v.setAttribute('data-client',app.REQUEST_CLIENT);
        document.head.appendChild(v);
    };
    if (t=='STYLESHEET'){
        var v = document.createElement('link');
        v.setAttribute('rel', 'stylesheet')
        v.setAttribute('href',src);
        v.setAttribute('data-client',app.REQUEST_CLIENT);
        document.head.appendChild(v);
    };
};
window.onerror = function(a, b, c, d, e) {
    try {
        var f = e && e.stack ? e.stack : "",
            g = "(" + te.VERSION + ") - " + b + " @ (" + c + ", " + d + "): " + f;
        window.console.log("Unhandled Text Editor App Error -" + a + ": " + f), logImpression(a, "unhandled_js_error", g, void 0, void 0, !0)
    } catch (b) {
        window.console.log("*** Unhandled App Error: " + a + " - " + b)
    }
};

function loadScript(a, b, c) {
    var d = document.createElement("script");
    d.type = "text/javascript", d.onload = function() {
        b && b()
    }, d.onerror = function(a) {
        c && c(a)
    }, d.src = a, console.log("LOAD SCRIPT: " + a);
    try {
        document.head.appendChild(d)
    } catch (a) {
        c(a)
    }
}
maybeHandleDomLoadedOrRegister();
function onAceEditorScriptLoaded() {
    console.log("ace_editor_script_loaded"), app.APP_RESOURCES.aceEditorLoaded = true, MAINAPP && domLoaded && MAINAPP.initializeEditorAfterDomLoaded()
};
function onJsChardetScriptLoaded() {
    console.log("jschardet_script_loaded"), app.APP_RESOURCES.jschardetLoaded = true;
};
function loadMainAppScript() {
    loadScript("core-2-" + app.MINOR_VERSION + app.REVISION + (app.IS_MINIFIED_RELEASE ? "-min" : "") + ".js", bindFn(onMainAppScriptLoaded), bindFn(onMainAppScriptLoadError));
};
function loadAceEditorScript() {
    loadScript("../lib/ace-src-min-noconflict/ace.js", bindFn(onAceEditorScriptLoaded), bindFn(onAceEditorScriptLoadError));
};
function loadJsChardetScript() {
    loadScript("../lib/jschardet3-0-0.min.js", bindFn(onJsChardetScriptLoaded), bindFn(onJsChardetScriptLoadError));
};
app.loadResource('STYLESHEET','editor.css');
app.loadResource('SCRIPT','core.js');
var contain = document.getElementById('app_container');
contain.innerHTML = `
<div id='app'>\n
    <div id='toolbar'>\n
        <div id='home'></div>\n
        <div id='keybinds'>\n
            <p id='keybind_text' class='red2' hidden>\n
                Find: CTRL + F<br>
                Find & Replace: CTRL + H<br>
            </p>\n
        </div>\n
    </div>\n
    <div id='text_area'></div>\n
</div>
`;
