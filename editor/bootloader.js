window.app = {};
app.STATE = {};
var MAINAPP = null;
app.VERSION = '1.0.0';
app.IS_MINIFIED_RELEASE = false;
app.CURRENT_SESSION = null;
app.EDITOR_VERSION = '11';
app.REQUEST_CLIENT='1mmdeje93oa8745t4jtg4jj4o4045utj0945h49432j3';
app.EDITOR = null;
app.APP_NAME='Python Interpreter';
app.BOOTLOADER = '82jdm43j3499';
app.APP_RESOURCES = {
    jschardetLoaded = false,
    aceEditorLoaded = false,
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
app.loadResource = function(t,src,loaded,errored){
    if (t=='SCRIPT'){
        var v = document.createElement('script');
        v.onload = function() {
            loaded && loaded()
        };
        v.onerror = function(a){
            errored && errored(a)
        };
        v.setAttribute('src',src);
        v.setAttribute('data-client',app.REQUEST_CLIENT);
        document.head.appendChild(v);
    };
    if (t=='STYLESHEET'){
        var v = document.createElement('link');
        v.setAttribute('rel', 'stylesheet');
        v.onload = function() {
            loaded && loaded()
        };
        v.onerror = function(a){
            errored && errored(a)
        };
        v.setAttribute('href',src);
        v.setAttribute('data-client',app.REQUEST_CLIENT);
        document.head.appendChild(v);
    };
};
app.loadScript=function(src, loaded, errored) {
    var d = document.createElement("script");
    d.type = "text/javascript", d.onload = function() {
        loaded && loaded();
    }, d.onerror = function(a) {
        errored && errored(a);
    }, d.src = src, console.log("LOAD SCRIPT: " + a);
    try {
        document.head.appendChild(d);
    } catch (a) {
        errored(a);
    };
};
window.onerror = function(a, b, c, d, e) {
    try {
        var f = e && e.stack ? e.stack : "",
            g = "(" + app.VERSION + ") - " + b + " @ (" + c + ", " + d + "): " + f;
        window.console.log("Unhandled Editor App Error -" + a + ": " + f), logImpression(a, "unhandled_js_error", g, void 0, void 0, !0)
    } catch (b) {
        window.console.log("*** Unhandled App Error: " + a + " - " + b)
    }
};

function handleDomLoaded() {
    try {
        if (domLoaded) return;
        if (domLoaded = !0, console.log("In handle Dom Loaded(). domLoaded: " + domLoaded + "; isSupportedBrowser: " + isSupportedBrowser), !adsenseScriptLoadError && adLoadedDuringInit && isSupportedBrowser || (showEl(document.getElementById("topBanner"), !1), showEl(document.getElementById("adHeading"), !1), document.getElementById("mainEditorContainer").classList.add("adjustedHeightForNoAdShown"), document.getElementById("mainScrollableContent").classList.add("adjustedHeightForNoAdShown"), document.getElementById("unsupportedBrowserContent").classList.add("adjustedHeightForNoAdShown"), document.getElementById("appLoadErrorContent").classList.add("adjustedHeightForNoAdShown"), document.getElementById("mainBackgroundSpinner").classList.add("adjustedHeightForNoAdShownBackgroundSpinner")), !isSupportedBrowser) return void updateUiAfterDomLoadedForUnsupportedBrowser();
        if (isAppLoadFailure) return void maybeUpdateUiAForAppLoadFailure(appLoadFailureMessage);
        document.getElementById("copyright").textContent += " v" + app.VERSION, updateUiForDevice();
        var a = null != getFileId(),
            b = a ? getReferringSource() : "general";
        a && "gmail" != b && (b = "drive");
        var c = "drive" == b,
            d = "gmail" == b,
            e = !(c || d || isForDirectNew);
        document.getElementById("startPageIconImgDrive").removeAttribute("visibilityHidden"), showEl(document.getElementById("startPageIconImgGeneral"), e || isForDirectNew), showEl(document.getElementById("startPageIconImgGmail"), d), showEl(document.getElementById("startPageIconImgDrive"), c), showEl(document.getElementById("startPageGeneralDetails"), e), showEl(document.getElementById("startPageGmailDetails"), d), showEl(document.getElementById("startPageDriveDetails"), c), showEl(document.getElementById("startPageNewDetails"), isForDirectNew), document.getElementById("startPageDriveDetails").style.visibility = "", showEl(document.getElementById("startPagePrompt"), !0), document.getElementById("startPagePrompt").style.visibility = "", MAINAPP && (MAINAPP.initAfterDomLoaded(getFileId()), EDITOR && MAINAPP.initializeEditorAfterDomLoaded());
    } catch (a) {
        throw logImpression("handle_dom_loaded_err", "app_load", a), a;
    };
};

function onMainAppScriptLoaded() {
    console.log("main_app_script_loaded");
    try {
        MAINAPP = app, domLoaded && MAINAPP.initAfterDomLoaded(getFileId());
    } catch (a) {
        throw logImpression("main_app_bootstrap_error", "app_load", a), a;
    };
};
function onAceEditorScriptLoaded() {
    console.log("ace_editor_script_loaded"), app.APP_RESOURCES.aceEditorLoaded = true, MAINAPP && domLoaded && MAINAPP.initializeEditorAfterDomLoaded()
};
function onJsChardetScriptLoaded() {
    console.log("jschardet_script_loaded"), app.APP_RESOURCES.jschardetLoaded = true;
};
function loadMainAppScript() {
    app.loadScript("core-2-" + app.MINOR_VERSION + app.REVISION + (app.IS_MINIFIED_RELEASE ? "-min" : "") + ".js", bindFn(onMainAppScriptLoaded), bindFn(onMainAppScriptLoadError));
};
function loadAceEditorScript() {
    app.loadScript("../lib/ace-src-min-noconflict/ace.js", bindFn(onAceEditorScriptLoaded), bindFn(onAceEditorScriptLoadError));
};
function loadJsChardetScript() {
    app.loadScript("../lib/jschardet3-0-0.min.js", bindFn(onJsChardetScriptLoaded), bindFn(onJsChardetScriptLoadError));
};
//app.loadResource('STYLESHEET','editor.css');
//app.loadResource('SCRIPT','core.js');
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
