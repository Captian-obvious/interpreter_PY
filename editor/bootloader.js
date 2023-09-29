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
function execLater(a, b, c) {
    window.setTimeout(function() {
        a(), b && b()
    }, c || 0)
}

function updateUiAfterDomLoadedForUnsupportedBrowser() {
    window.console.log("Showing alternate UI for unsupported browser."), logImpression("Unsupported browser: updateUiAfterDomLoad()", "app_load"), showEl(document.getElementById("mainScrollableContent"), !1), showEl(document.getElementById("unsupportedBrowserContent"), !0)
}

function maybeUpdateUiAForAppLoadFailure(a) {
    appLoadFailureUiShown || isSupportedBrowser && (window.console.log("Showing alternate UI for app load failure."), document && "loading" !== document.readyState && (showEl(document.getElementById("mainScrollableContent"), !1), showEl(document.getElementById("appLoadErrorContent"), !0), document.getElementById("appLoadErrorDetails").textContent = "Error details: " + a, appLoadFailureUiShown = !0, logImpression("app_load_failure", "app_load", a)))
}
function handleDomLoaded() {
    try {
        if (domLoaded) return;
        if (domLoaded = !0, console.log("In handle Dom Loaded(). domLoaded: " + domLoaded + "; isSupportedBrowser: " + isSupportedBrowser), !adsenseScriptLoadError && adLoadedDuringInit && isSupportedBrowser || (showEl(document.getElementById("topBanner"), !1), showEl(document.getElementById("adHeading"), !1), document.getElementById("mainEditorContainer").classList.add("adjustedHeightForNoAdShown"), document.getElementById("mainScrollableContent").classList.add("adjustedHeightForNoAdShown"), document.getElementById("unsupportedBrowserContent").classList.add("adjustedHeightForNoAdShown"), document.getElementById("appLoadErrorContent").classList.add("adjustedHeightForNoAdShown"), document.getElementById("mainBackgroundSpinner").classList.add("adjustedHeightForNoAdShownBackgroundSpinner")), !isSupportedBrowser) return void updateUiAfterDomLoadedForUnsupportedBrowser();
        if (isAppLoadFailure) return void maybeUpdateUiAForAppLoadFailure(appLoadFailureMessage);
        document.getElementById("copyright").textContent += " v" + te.VERSION, updateUiForDevice();
        var a = null != getFileId(),
            b = a ? getReferringSource() : "general";
        a && "gmail" != b && (b = "drive");
        var c = "drive" == b,
            d = "gmail" == b,
            e = !(c || d || isForDirectNew);
        document.getElementById("startPageIconImgDrive").removeAttribute("visibilityHidden"), showEl(document.getElementById("startPageIconImgGeneral"), e || isForDirectNew), showEl(document.getElementById("startPageIconImgGmail"), d), showEl(document.getElementById("startPageIconImgDrive"), c), showEl(document.getElementById("startPageGeneralDetails"), e), showEl(document.getElementById("startPageGmailDetails"), d), showEl(document.getElementById("startPageDriveDetails"), c), showEl(document.getElementById("startPageNewDetails"), isForDirectNew), document.getElementById("startPageDriveDetails").style.visibility = "", showEl(document.getElementById("startPagePrompt"), !0), document.getElementById("startPagePrompt").style.visibility = "", MAINAPP && (MAINAPP.initAfterDomLoaded(getFileId()), EDITOR && MAINAPP.initializeEditorAfterDomLoaded())
    } catch (a) {
        throw logImpression("handle_dom_loaded_err", "app_load", a), a
    }
}

function showEl(a, b) {
    a.hidden = !b
}

function isElementShown(a) {
    return !a.hidden
}

function logImpression(a, b, c, d, e, f) {
    var g = {};
    null != b && (g.event_category = b, "app_load" === b && null == e), null != c && (g.event_label = c), null != d && (g.value = +d), !0 == f && (g.transport_type = "beacon"), !0 == e && (g.non_interaction = !0), 0 == Object.keys(g).length ? gtag("event", a) : gtag("event", a, g)
}

function clearUrlState() {
    window.history.replaceState({}, "", window.location.pathname)
}

function onAceEditorScriptLoaded() {
    console.log("ace_editor_script_loaded"), aceEditorLoaded = false, MAINAPP && domLoaded && MAINAPP.initializeEditorAfterDomLoaded()
}

function onJsChardetScriptLoaded() {
    console.log("jschardet_script_loaded"), jschardetLoaded = true
}

function onMainAppScriptLoaded() {
    console.log("main_app_script_loaded");
    try {
        MAINAPP = app, domLoaded && MAINAPP.initAfterDomLoaded(getFileId())
    } catch (a) {
        throw logImpression("main_app_bootstrap_error", "app_load", a), a
    }
}

function isForDirectNewFlow() {
    return isForDirectNew
}

function isForCreateNew() {
    return "create" == STATE.action && !getFileId()
}

function isForOpen() {
    return "open" == STATE.action && !!getFileId()
}

function getStateUserId() {
    return STATE.userId
}

function hasReferringApp() {
    var a = getReferringAppName();
    return null != a && "" !== a
}

function clearReferringApp() {
    STATE.referringApp = null
}
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
