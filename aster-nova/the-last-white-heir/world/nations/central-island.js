
document.addEventListener("DOMContentLoaded", () => {
    const councilCards = document.querySelectorAll(".council-card");
    const breachScreen = document.getElementById("breachScreen");
    const countdownBar = document.getElementById("countdownBar");

    let breachActive = false;
    let audioContext = null;

    function playAlarm() {
        try {
            const AudioContextClass =
                window.AudioContext || window.webkitAudioContext;

            if (!AudioContextClass) return;

            if (!audioContext) {
                audioContext = new AudioContextClass();
            }

            if (audioContext.state === "suspended") {
                audioContext.resume();
            }

            const startTime = audioContext.currentTime;

            // Three short electronic warning tones.
            for (let i = 0; i < 3; i++) {
                const oscillator = audioContext.createOscillator();
                const gain = audioContext.createGain();

                const toneStart = startTime + i * 0.24;

                oscillator.type = "square";
                oscillator.frequency.setValueAtTime(
                    740,
                    toneStart
                );
                oscillator.frequency.setValueAtTime(
                    520,
                    toneStart + 0.12
                );

                gain.gain.setValueAtTime(0.0001, toneStart);
                gain.gain.exponentialRampToValueAtTime(
                    0.07,
                    toneStart + 0.015
                );
                gain.gain.exponentialRampToValueAtTime(
                    0.0001,
                    toneStart + 0.18
                );

                oscillator.connect(gain);
                gain.connect(audioContext.destination);

                oscillator.start(toneStart);
                oscillator.stop(toneStart + 0.19);
            }
        } catch (error) {
            // The visual alarm still works if audio is unavailable.
        }
    }

    function returnToPreviousPage() {
        const referrer = document.referrer;

        // If the visitor opened this page directly, use the atlas fallback.
        if (window.history.length <= 1) {
            window.location.href = "../index.html";
            return;
        }

        // Use browser history when there is a previous page.
        window.history.back();

        // If browser history cannot navigate, fall back to the referrer.
        window.setTimeout(() => {
            if (document.visibilityState === "visible") {
                if (referrer) {
                    window.location.href = referrer;
                } else {
                    window.location.href = "../index.html";
                }
            }
        }, 900);
    }

    function triggerBreach() {
        if (breachActive) return;

        breachActive = true;

        document.body.classList.add("breach-active");
        breachScreen.setAttribute("aria-hidden", "false");

        playAlarm();

        // Restart the countdown animation if needed.
        if (countdownBar) {
            countdownBar.style.animation = "none";
            void countdownBar.offsetWidth;
            countdownBar.style.animation = "";
        }

        window.setTimeout(returnToPreviousPage, 3200);
    }

    councilCards.forEach((card) => {
        card.addEventListener("click", triggerBreach);
    });
});
