export namespace PwaUtils {
  export const checkPWARequirements = () => {
    const requirements = {
      serviceWorker: "serviceWorker" in navigator,
      manifest: document.querySelector('link[rel="manifest"]') !== null,
      beforeInstallPrompt: "onbeforeinstallprompt" in window,
      isStandalone:
        window.matchMedia &&
        window.matchMedia("(display-mode: standalone)").matches,
    };

    console.log("[PWA] Requirements check:", requirements);

    if (requirements.isStandalone) {
      console.log(
        "[PWA] App is already installed and running in standalone mode"
      );
    }

    if (!requirements.serviceWorker) {
      console.log("[PWA] ❌ Service Worker not supported");
    }

    if (!requirements.manifest) {
      console.log("[PWA] ❌ Manifest not found");
    }

    if (!requirements.beforeInstallPrompt) {
      console.log(
        "[PWA] ⚠️ beforeinstallprompt not supported (may work on mobile Chrome)"
      );
    }

    return requirements;
  };
}
