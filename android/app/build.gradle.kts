import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

// Optional release signing: drop a keystore.properties file next to this Gradle
// build (path layout: android/keystore.properties) with:
//   storeFile=../release.keystore
//   storePassword=***
//   keyAlias=***
//   keyPassword=***
// When absent, release builds are produced unsigned. Never commit the keystore.
val keystoreFile = rootProject.file("keystore.properties")
val keystoreProps = Properties().apply {
    if (keystoreFile.exists()) keystoreFile.inputStream().use { load(it) }
}

// The web application lives in the repository root, one level above android/.
val webRoot = rootProject.projectDir.parentFile!!
val generatedWebAssets = layout.buildDirectory.dir("generated/webAssets")

// Copies the existing web application into the APK assets. Keep this list in
// sync with anything index.html references at the repository root.
val copyWebAssets = tasks.register<Copy>("copyWebAssets") {
    description = "Copies the web application (index.html, css, js, icons, manifest, sw) into Android assets."
    // Clear stale assets (e.g. deleted files) so the APK never ships leftovers.
    delete(generatedWebAssets)
    from(webRoot) {
        include("index.html", "css/**", "js/**", "icons/**", "manifest.json", "sw.js")
        exclude("**/.git/**", "**/.github/**", "**/node_modules/**")
        exclude("android/**")
    }
    into(generatedWebAssets)
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
}

android {
    namespace = "com.scoreboard.app"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.scoreboard.app"
        minSdk = 26
        targetSdk = 36
        versionCode = 1
        versionName = "1.0.0"
    }

    signingConfigs {
        create("release") {
            if (keystoreFile.exists()) {
                storeFile = rootProject.file(keystoreProps["storeFile"] as String)
                storePassword = keystoreProps["storePassword"] as String
                keyAlias = keystoreProps["keyAlias"] as String
                keyPassword = keystoreProps["keyPassword"] as String
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
            if (keystoreFile.exists()) {
                signingConfig = signingConfigs.getByName("release")
            }
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    // Serve the web app from the generated assets directory.
    sourceSets["main"].assets.srcDir(generatedWebAssets)
}

kotlin {
    compilerOptions {
        jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.webkit)
}

// Make sure the web assets are copied before the APK is assembled.
tasks.named("preBuild") {
    dependsOn(copyWebAssets)
}