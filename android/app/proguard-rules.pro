# App-specific ProGuard/R8 rules (no extra rules needed for the WebView wrapper).
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}