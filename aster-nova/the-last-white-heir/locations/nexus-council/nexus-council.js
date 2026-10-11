
(() => {
    const accessButton = document.getElementById("council-proceedings");
    const alarm = document.getElementById("security-alarm");

    if (!accessButton || !alarm) {
        console.error("Nexus Council: security elements not found.");
        return;
    }

    let alarmTriggered = false;
    let returnTimer = null;

    function returnToPreviousPage() {
        // Use browser history when a previous page exists.
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback: locations landing page.
            window.location.replace("../index.html");
        }
    }

    function triggerSecurityAlarm() {
        if (alarmTriggered) return;
        alarmTriggered = true;

        // Show the independent full-screen security interface.
        alarm.classList.add("is-active");
        alarm.setAttribute("aria-hidden", "false");

        // Prevent interaction with the page beneath the alarm.
        document.body.style.overflow = "hidden";

        // No manual controls. Automatically return after 3 seconds.
        returnTimer = window.setTimeout(() => {
            returnToPreviousPage();
        }, 3000);
    }

    accessButton.addEventListener("click", triggerSecurityAlarm);
})();
