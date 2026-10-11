
document.addEventListener("DOMContentLoaded", () => {
    const exploreButton = document.querySelector(".explore-button");

    if (exploreButton) {
        exploreButton.addEventListener("click", () => {
            alert(
                "The Consciousness project is still being developed. " +
                "Its dedicated page will be available when the work is ready."
            );
        });
    }
});
