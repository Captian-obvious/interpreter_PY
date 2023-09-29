'use strict';
var APP_MAJOR_VERSION = 2,
    APP_MINOR_VERSION = 11,
    APP_REVISION = "",
    APP_IS_MINIFIED_RELEASE = !0,
    APP_GOOGLE_ANALYTICS_ID = "G-4SML323S4Y",
    hasMainAppScriptBeenAutoRetried = !1,
    hasGapiScriptBeenAutoRetried = !1,
    hasAnalyticsScriptBeenAutoRetried = !1,
    hasAdSenseScriptBeenAutoRetried = !1,
    hasJsChardetScriptBeenAutoRetried = !1,
    hasAceEditorScriptBeenAutoRetried = !1,
    isAppLoadFailure = !1,
    appLoadFailureUiShown = !1,
    appLoadFailureMessage = "",
    adsenseScriptLoadError = !1,
    adsenseScriptLoadErrorHasBeenLogged = !1,
    analyticsLoaded = !1,
    aceEditorLoaded = !1,
    jschardetLoaded = !1;

function isBrowserIE11OrOlder() {
    try {
        var a = window.navigator.userAgent,
            b = a.indexOf("MSIE ");
        if (0 < b) return !0;
        var c = a.indexOf("Trident/");
        return !!(0 < c)
    } catch (a) {
        return console.log("error during detection of browser: " + a), !0
    }
}
var isSupportedBrowser = !isBrowserIE11OrOlder(),
    adsbygoogle = null,
    dataLayer = null;
window.dataLayer = window.dataLayer || [], dataLayer = window.dataLayer;

function gtag() {
    dataLayer.push(arguments)
}
gtag("js", new Date), gtag("config", APP_GOOGLE_ANALYTICS_ID);
window.te = {};
te.VERSION = "2." + APP_MINOR_VERSION + "", window.console.log("===== LOADING TEXT EDITOR " + te.VERSION + " ====="), window.console.log("isSupportedBrowser: ", isSupportedBrowser);
var MAINAPP, EDITOR, APP_CONFIG = {
        clientId: "591525900269-94ok9krafau8qa24666btvccmsfnq5fp.apps.googleusercontent.com",
        appId: "591525900269",
        scopes: "openid email profile https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.install",
        apiKey: "AIzaSyAHcWeACQ2g-3dCbm46uITUOHGIRQN304s"
    },
    firstAuthIsPending = !0,
    firstAuthSuccessful = !1,
    domLoaded = !1,
    CURRENT_AUTH_USER = 0,
    CURRENT_USER_INFO = null,
    CLAIM = null,
    ID_TOKEN = null,
    ACCESS_TOKEN = null,
    isForDirectNew = isUrlParamKeyPresent("new");

function detectDevice() {
    return window.matchMedia("only screen and (max-width: 639px)").matches ? "phone" : window.matchMedia("only screen and (max-width: 765px)").matches ? "device" : "computer"
}
var STATE = {};
isForDirectNew || (STATE = parseUrlState(), clearUrlState());

function getReferringSource() {
    var a = document && document.referrer ? document.referrer.toLowerCase() : "";
    return -1 == a.indexOf("drive.google.com") ? -1 == a.indexOf("mail.google.com") ? "general" : "gmail" : "drive"
}

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

function onAnalyticsScriptLoaded() {
    console.log("analytics_script_loaded"), analyticsLoaded = !0, adLoadedDuringInit || logImpression("AD NOT LOADED; adLoadedDuringInit=false.", "app_load", "reason: " + adNotLoadedReason), adsenseScriptLoadError && !adsenseScriptLoadErrorHasBeenLogged && (logImpression("ADSENSE SCRIPT LOAD ERROR", "app_load", "source: onAnalyticsScriptLoaded"), adsenseScriptLoadErrorHasBeenLogged = !0)
}

function onAdSenseScriptLoaded() {
    console.log("adsense_script_loaded")
}

function onGapiScriptLoaded() {
    console.log("gapi_script_loaded")
}

function onAceEditorScriptLoaded() {
    console.log("ace_editor_script_loaded"), aceEditorLoaded = !0, MAINAPP && domLoaded && MAINAPP.initializeEditorAfterDomLoaded()
}

function onJsChardetScriptLoaded() {
    console.log("jschardet_script_loaded"), jschardetLoaded = !0
}

function onMainAppScriptLoaded() {
    console.log("main_app_script_loaded");
    try {
        MAINAPP = new te.App, domLoaded && MAINAPP.initAfterDomLoaded(getFileId())
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

function getReferringAppName() {
    return STATE.referringApp
}

function getParentFolderId() {
    return STATE.folderId
}

function getFileId() {
    var a = STATE.ids;
    return a ? a.length && 0 < a.length ? a[0] : null : null
}

function clearState() {
    STATE = {}
}

function parseUrlState() {
    var a = null;
    try {
        var b = getUrlParam("state");
        if (!b) return {};
        a = JSON.parse(b)
    } catch (a) {
        return logImpression("json_state_parse_error", "app_load", a), {}
    }
    return a || {}
}

function isUrlParamKeyPresent(a) {
    a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var b = new RegExp("[\\?&]" + a),
        c = b.exec(location.search);
    return null !== c
}

function getUrlParam(a) {
    a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var b = new RegExp("[\\?&]" + a + "=([^&#]*)"),
        c = b.exec(location.search);
    return null === c ? "" : decodeURIComponent(c[1].replace(/\+/g, " "))
}

function onGapiScriptLoadError(a) {
    handleScriptLoadError("gapi_load_error", a, "hasBeenAutoRetried: " + hasGapiScriptBeenAutoRetried), hasGapiScriptBeenAutoRetried ? isForOpen() && (isAppLoadFailure = !0, appLoadFailureMessage = "gapi_load_error: " + getErrorStringFromErrorOrEvent(a), maybeUpdateUiAForAppLoadFailure(appLoadFailureMessage)) : (hasGapiScriptBeenAutoRetried = !0, loadGapiScript())
}

function onMainAppScriptLoadError(a) {
    handleScriptLoadError("main_app_script_load_error", "hasBeenAutoRetried: " + hasMainAppScriptBeenAutoRetried), hasMainAppScriptBeenAutoRetried ? (isAppLoadFailure = !0, appLoadFailureMessage = "main_app_script_load_error: " + getErrorStringFromErrorOrEvent(a), maybeUpdateUiAForAppLoadFailure(appLoadFailureMessage)) : (hasMainAppScriptBeenAutoRetried = !0, loadMainAppScript())
}

function onAnalyticsScriptLoadError() {
    handleScriptLoadError("analytics_script_load_error", "hasBeenAutoRetried: " + hasAnalyticsScriptBeenAutoRetried)
}

function onAdSenseScriptLoadError() {
    adsenseScriptLoadError = !0, handleScriptLoadError("adsense_script_load_error", "hasBeenAutoRetried: " + hasAdSenseScriptBeenAutoRetried), adsenseScriptLoadErrorHasBeenLogged || (logImpression("ADSENSE SCRIPT LOAD ERROR", "app_load", "source: onAdSenseScriptLoadError"), adsenseScriptLoadErrorHasBeenLogged = !0)
}

function onJsChardetScriptLoadError() {
    handleScriptLoadError("jschardet_script_load_error", "hasBeenAutoRetried: " + hasJsChardetScriptBeenAutoRetried), hasJsChardetScriptBeenAutoRetried || (hasJsChardetScriptBeenAutoRetried = !0, loadJsChardetScript())
}

function onAceEditorScriptLoadError(a) {
    handleScriptLoadError("ace_editor_script_load_error", "hasBeenAutoRetried: " + hasAceEditorScriptBeenAutoRetried), hasAceEditorScriptBeenAutoRetried ? (isAppLoadFailure = !0, appLoadFailureMessage = "ace_editor_script_load_error: " + getErrorStringFromErrorOrEvent(a), maybeUpdateUiAForAppLoadFailure(appLoadFailureMessage)) : (hasAceEditorScriptBeenAutoRetried = !0, loadAceEditorScript())
}

function getErrorStringFromErrorOrEvent(a) {
    var b = "(" + te.VERSION + ")",
        c = a && a.originalEvent ? a.originalEvent instanceof Event : a instanceof Event;
    if (c) {
        var d = a.message || "",
            e = a.filename || "",
            f = a.lineno || "",
            g = a.colno || "",
            h = a.error || "",
            i = a.target || "",
            j = a.type || "",
            k = i && i.src ? i.src : "";
        d && (d = " - " + d), e && (e = " - " + e), h && (h = ": " + h), i && (i = " - " + i), d && (d = " - " + d), j && (j = " - " + j), k && (k = " - " + k);
        var l = d + j + i + k + e + " @ (" + f + ", " + g + ")" + h;
        return b + l
    }
    return b + " - " + a
}

function handleScriptLoadError(a, b) {
    var c = getErrorStringFromErrorOrEvent(b);
    console.log("Script Load Error: " + a + " - " + c), logImpression(a, "script_load_error", c, void 0, void 0, !0)
}

function onGapiInit() {
    console.log("*** onGapiInit() CALLBACK"), execLater(function() {
        gapi.load("auth2", initiateFirstAuth)
    }, void 0, 1)
}

function initiateFirstAuth() {
    logImpression("gapi_loaded", "app_load"), authorize(!0, bindFn(handleFirstAuthSuccess, window), bindFn(handleFirstAuthError, window), getStateUserId(), void 0, !1, "initiateFirstAuth")
}

function handleFirstAuthSuccess() {
    logImpression("first_auth_success", "auth"), firstAuthIsPending = !1, firstAuthSuccessful = !0, domLoaded && MAINAPP && (EDITOR && MAINAPP.initializeEditorAfterDomLoaded(), MAINAPP.handleFirstAuthSuccess())
}

function handleFirstAuthError(a, b) {
    var c = a || "";
    b && (c += " (" + b + ")"), firstAuthIsPending = !1, firstAuthSuccessful = !1, domLoaded && MAINAPP && MAINAPP.handleFirstAuthError()
}

function authorize(a, b, c, d, e, f, g, h) {
    h || logImpression("authorize", "auth", "immediate=" + a + "; callingSource: " + g);
    var i = "gapi" in window && !!gapi.auth2 && !!gapi.auth2.authorize;
    if (!i) return logImpression("gapi_auth_not_ready", "auth", "immediate=" + a + "; callingSource: " + g), void c("Error: GAPI Auth not initialized. callingSource: " + g);
    var j = {
        client_id: APP_CONFIG.clientId,
        scope: APP_CONFIG.scopes,
        response_type: "token id_token"
    };
    if (a ? j.prompt = "none" : f && (j.prompt = "select_account"), null != d) j.login_hint = d, j.authuser = -1;
    else if (!f) {
        var k = null == e ? CURRENT_AUTH_USER || 0 : e;
        j.authuser = k
    }
    try {
        gapi.auth2.authorize(j, bindFn(handleGapiAuthResult, window, b, c))
    } catch (a) {
        var l = {};
        l.error = a, handleGapiAuthResult(b, c, l)
    }
}

function handleGapiAuthResult(a, b, c) {
    if (!c) logImpression("auth_result", "auth", "(empty authResult)"), b ? b(void 0) : alert("Auth Required. Please reload the page.");
    else if (c.error) {
        var d = c.error + (c.error_subtype ? " (" + c.error_subtype + ")" : "");
        c.details && (d += " [" + c.details + "]"), logImpression("auth_result", "auth", "error: " + d), b && b(c.error, d)
    } else updateAuthDetailsFromAuthResponse(c), logImpression("auth_result", "auth", "success. authUser: " + CURRENT_AUTH_USER), a && a()
}

function bindFn(a) {
    return a.call.apply(a.bind, arguments)
}

function getLoggedInUserId() {
    return CLAIM ? CLAIM.sub : null
}

function updateAuthDetailsFromAuthResponse(a) {
    ID_TOKEN = a.id_token, ACCESS_TOKEN = a.access_token, ID_TOKEN && (CLAIM = parseJwtIdToken(ID_TOKEN));
    var b = 0;
    if (a.session_state && a.session_state.extraQueryParams) {
        var c = a.session_state.extraQueryParams;
        null != c.authuser && (b = c.authuser)
    }
    CURRENT_AUTH_USER = b
}

function getUserEmail() {
    return CLAIM ? CLAIM.email : null
}

function getUserFullName() {
    return CLAIM ? CLAIM.name : null
}

function getUserGivenName() {
    return CLAIM ? CLAIM.given_name : null
}

function getUserPicture() {
    return CLAIM ? CLAIM.picture : null
}

function getUserDomain() {
    return CLAIM ? CLAIM.hd : null
}

function getAccessToken() {
    return ACCESS_TOKEN
}

function isTokenExpired() {
    return !!(CLAIM && null != CLAIM.exp) && Math.round(new Date().getTime() / 1e3) > CLAIM.exp
}

function parseJwtIdToken(a) {
    if (!a) return {};
    var b = null;
    try {
        var c = a.split(".")[1],
            d = c.replace(/-/g, "+").replace(/_/g, "/"),
            e = decodeURIComponent(window.atob(d));
        b = JSON.parse(e)
    } catch (a) {
        return logImpression("id_token_parse_error", "app_load", a), {}
    }
    return b || {}
}

function isAuthorized() {
    return !!CLAIM
}

function isFirstAuthPending() {
    return firstAuthIsPending
}

function updateButtonTextHelper(a, b, c) {
    var d = document.getElementById(a);
    d && (d.childNodes[2] && (d.childNodes[2].textContent = b), c && (d.children[0].textContent = c))
}

function updateUiForDevice() {
    try {
        var a = detectDevice();
        ("phone" == a || "device" == a) && (updateButtonTextHelper("openFileFromDriveButton", "Open From Drive"), updateButtonTextHelper("createNewTextFileButton", "New File"), updateButtonTextHelper("openFileFromComputerButton", "Open From Phone", "smartphone"), "device" == a || "phone" == a)
    } catch (a) {
        logImpression("update_ui_for_device_err", "app_load", a)
    }
}

function maybeHandleDomLoadedOrRegister() {
    if (!document) throw new Error("Document not available in maybeHandleDomLoadedOrRegister()");
    "loading" === document.readyState ? (console.log("maybeHandleDomLoadedOrRegister(): DOM not yet ready, registering."), document.addEventListener("DOMContentLoaded", function() {
        handleDomLoaded()
    })) : (console.log("maybeHandleDomLoadedOrRegister(): DOM already loaded."), handleDomLoaded())
}
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

function loadGapiScript() {
    loadScript("https://apis.google.com/js/api.js?onload=onGapiInit", bindFn(onGapiScriptLoaded), bindFn(onGapiScriptLoadError))
}

function loadMainAppScript() {
    loadScript("core-2-" + APP_MINOR_VERSION + APP_REVISION + (APP_IS_MINIFIED_RELEASE ? "-min" : "") + ".js", bindFn(onMainAppScriptLoaded), bindFn(onMainAppScriptLoadError))
}

function loadAnalyticsScript() {
    loadScript("https://www.googletagmanager.com/gtag/js?id=" + APP_GOOGLE_ANALYTICS_ID, bindFn(onAnalyticsScriptLoaded), bindFn(onAnalyticsScriptLoadError))
}

function loadAdSenseScript() {
    loadScript("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", bindFn(onAdSenseScriptLoaded), bindFn(onAdSenseScriptLoadError))
}

function loadAceEditorScript() {
    loadScript("lib/ace-src-min-noconflict/ace.js", bindFn(onAceEditorScriptLoaded), bindFn(onAceEditorScriptLoadError))
}

function loadJsChardetScript() {
    loadScript("lib/jschardet3-0-0.min.js", bindFn(onJsChardetScriptLoaded), bindFn(onJsChardetScriptLoadError))
}
isSupportedBrowser ? (loadGapiScript(), loadMainAppScript(), loadAnalyticsScript(), loadAceEditorScript(), loadJsChardetScript(), true ? loadAdSenseScript() : console.log("Skipping AdSense load.")) : (logImpression("Unsupported browser: Skipping Script Load.", "app_load"), window.console.log("Skipping loading additional scripts for unsupported browser."));
