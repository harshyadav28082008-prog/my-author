
document.addEventListener("DOMContentLoaded", () => {
    const islandTrigger = document.getElementById("islandTrigger");
    const lockdownScreen = document.getElementById("lockdownScreen");
    const progressBar = document.getElementById("lockdownProgress");

    let lockdownActive = false;
    let audioContext = null;

    function playWarning() {
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

            const start = audioContext.currentTime;

            // A short, low electronic warning.
            [390, 290, 390].forEach((frequency, index) => {
                const oscillator = audioContext.createOscillator();
                const gain = audioContext.createGain();
                const toneStart = start + index * 0.28;

                oscillator.type = "sawtooth";
                oscillator.frequency.setValueAtTime(
                    frequency,
                    toneStart
                );

                gain.gain.setValueAtTime(0.0001, toneStart);
                gain.gain.exponentialRampToValueAtTime(
                    0.055,
                    toneStart + 0.025
                );
                gain.gain.exponentialRampToValueAtTime(
                    0.0001,
                    toneStart + 0.2
                );

                oscillator.connect(gain);
                gain.connect(audioContext.destination);

                oscillator.start(toneStart);
                oscillator.stop(toneStart + 0.22);
            });
        } catch (error) {
            // Lockdown visuals still work when audio is unavailable.
        }
    }

    function returnFromForbiddenIsland() {
        const previousPage = document.referrer;
        const sameOriginPreviousPage = (() => {
            try {
                return previousPage &&
                    new URL(previousPage).origin === window.location.origin;
            } catch (error) {
                return false;
            }
        })();

        if (window.history.length > 1) {
            window.history.back();

            // Fallback if the browser cannot return to the previous page.
            window.setTimeout(() => {
                if (document.visibilityState === "visible") {
                    window.location.replace(
                        sameOriginPreviousPage
                            ? previousPage
                            : "../index.html"
                    );
                }
            }, 1000);

            return;
        }

        window.location.replace(
            sameOriginPreviousPage
                ? previousPage
                : "../index.html"
        );
    }

    function activateLockdown() {
        if (lockdownActive) return;

        lockdownActive = true;

        document.body.classList.add("lockdown-active");
        lockdownScreen.setAttribute("aria-hidden", "false");

        playWarning();

        if (progressBar) {
            progressBar.style.animation = "none";
            void progressBar.offsetWidth;
            progressBar.style.animation = "";
        }

        window.setTimeout(returnFromForbiddenIsland, 3200);
    }

    islandTrigger.addEventListener("click", activateLockdown);
});
