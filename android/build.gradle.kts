// Top-level build file: applies plugins to all projects but does not configure them here.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
}