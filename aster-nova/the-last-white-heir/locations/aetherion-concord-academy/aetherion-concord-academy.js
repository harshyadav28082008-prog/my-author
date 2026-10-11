
document.addEventListener("DOMContentLoaded", () => {
    const messageOverlay = document.getElementById(
        "academy-message-overlay"
    );

    const messageTitle = document.getElementById(
        "academy-message-title"
    );

    const messageText = document.getElementById(
        "academy-message-text"
    );

    const messageClose = document.getElementById(
        "academy-message-close"
    );

    const securityAlarm = document.getElementById(
        "academy-security-alarm"
    );

    const councilAccess = document.getElementById(
        "academy-council-access"
    );

    let previousFocus = null;
    let alarmTriggered = false;

    // SEALED ACADEMY RECORDS
    const sealedMessages = {
        syllabus: {
            title: "Academy Syllabus",
            message:
                "The complete Academy syllabus is currently sealed."
        },

        magic: {
            title: "Magic Studies",
            message:
                "The records concerning the Academy's magic studies " +
                "are currently sealed."
        }
    };

    // OPEN A SEALED RECORD
    document.querySelectorAll("[data-sealed-record]").forEach((button) => {
        button.addEventListener("click", () => {
            const recordType = button.dataset.sealedRecord;
            const record = sealedMessages[recordType];

            if (!record || !messageOverlay) {
                return;
            }

            previousFocus = button;

            messageTitle.textContent = "Record Sealed";
            messageText.textContent =
                record.title + ": " + record.message;

            messageOverlay.hidden = false;
            messageClose.focus();
        });
    });

    // CLOSE A SEALED RECORD
    function closeSealedRecord() {
        if (!messageOverlay || messageOverlay.hidden) {
            return;
        }

        messageOverlay.hidden = true;

        if (previousFocus) {
            previousFocus.focus();
            previousFocus = null;
        }
    }

    messageClose.addEventListener("click", closeSealedRecord);

    // CLOSE WHEN CLICKING OUTSIDE THE MESSAGE
    messageOverlay.addEventListener("click", (event) => {
        if (event.target === messageOverlay) {
            closeSealedRecord();
        }
    });

    // ESCAPE CLOSES THE RECORD MESSAGE
    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            messageOverlay &&
            !messageOverlay.hidden
        ) {
            closeSealedRecord();
        }
    });

    // RESTRICTED COUNCIL AUTHORITY ACCESS
    if (councilAccess && securityAlarm) {
        councilAccess.addEventListener("click", () => {
            if (alarmTriggered) {
                return;
            }

            alarmTriggered = true;

            // Hide the normal Academy interface from view.
            securityAlarm.hidden = false;

            // Prevent scrolling during the alarm.
            document.body.style.overflow = "hidden";

            // No manual return button.
            // Return automatically after the alarm.
            window.setTimeout(() => {
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    window.location.replace("../index.html");
                }
            }, 3000);
        });
    }
});
