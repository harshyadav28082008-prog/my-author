/* =========================================
   THE OBSIDIAN DOMINION
   Shadow message system
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("shadowModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDomain = document.getElementById("modalDomain");
    const modalMessage = document.getElementById("modalMessage");

    const ideologyCards = document.querySelectorAll(
        ".ideology-card"
    );

    const closeButtons = document.querySelectorAll(
        "[data-close-modal]"
    );

    let previousFocus = null;

    /*
       Each ideology has its own message.
       These are warnings, not links to unfinished pages.
    */

    const ideologyMessages = {

        carnarch: {
            title: "THE CARNARCH CREED",
            domain: "DESTRUCTION · WAR",

            message:
                "War casts a long shadow. " +
                "The Carnarch Creed waits beyond the reach of light. " +
                "You see what destruction leaves behind, " +
                "never the hand that set it in motion."
        },

        veil: {
            title: "THE VEIL OF NULL",
            domain: "ANNIHILATION · VOID",

            message:
                "Some shadows do not conceal what exists. " +
                "They conceal what may cease to exist. " +
                "The Veil of Null remains beyond this record."
        },

        chainbound: {
            title: "THE CHAINBOUND DOCTRINE",
            domain: "CONTROL · SLAVERY",

            message:
                "Behind closed doors, control takes shape. " +
                "The Chainbound Doctrine does not announce " +
                "its next move. By the time its shadow appears, " +
                "the light has already begun to fade."
        },

        blight: {
            title: "THE BLIGHT COMMUNION",
            domain: "CORRUPTION · DECAY",

            message:
                "Corruption rarely announces its arrival. " +
                "The Blight Communion moves where eyes do not look, " +
                "leaving the world to discover the damage " +
                "only after it has taken root."
        }

    };

    /*
       OPEN POP-UP
    */

    function openModal(ideologyKey, trigger) {

        const record = ideologyMessages[ideologyKey];

        if (!record || !modal) {
            return;
        }

        previousFocus = trigger || document.activeElement;

        modalTitle.textContent = record.title;
        modalDomain.textContent = record.domain;
        modalMessage.textContent = record.message;

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        const closeButton = modal.querySelector(
            ".modal-close"
        );

        if (closeButton) {
            closeButton.focus();
        }
    }

    /*
       CLOSE POP-UP
    */

    function closeModal() {

        if (!modal || !modal.classList.contains("is-open")) {
            return;
        }

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (previousFocus && typeof previousFocus.focus === "function") {
            previousFocus.focus();
        }

        previousFocus = null;
    }

    /*
       CONNECT THE FOUR CARDS
    */

    ideologyCards.forEach((card) => {

        card.addEventListener("click", () => {

            const ideologyKey = card.dataset.ideology;

            openModal(ideologyKey, card);

        });

    });

    /*
       CLOSE BUTTONS AND BACKDROP
    */

    closeButtons.forEach((button) => {

        button.addEventListener("click", closeModal);

    });

    /*
       ESCAPE KEY
    */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("is-open")
        ) {
            closeModal();
        }

    });

});