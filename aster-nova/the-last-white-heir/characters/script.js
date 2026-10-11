const grid = document.getElementById("characterGrid");
const characters = window.characterData || [];

characters.forEach((character) => {
    const card = document.createElement("a");

    card.className =
        `character-card ${character.nationClass}` +
        (character.volume === 2 ? " volume-two" : "");

    card.href = `profile.html?character=${encodeURIComponent(character.id)}`;
    card.setAttribute("aria-label", `${character.name}, ${character.role}`);

    const stage = document.createElement("div");
    stage.className = "portrait-stage";

    const fallback = document.createElement("div");
    fallback.className = "shadow-figure";
    fallback.setAttribute("aria-hidden", "true");
    stage.appendChild(fallback);

    if (character.image) {
        const image = document.createElement("img");
        image.src = character.image;
        image.alt = character.name;
        image.loading = "lazy";

        image.addEventListener("error", () => {
            stage.classList.add("no-image");
            image.remove();
        });

        stage.appendChild(image);
    } else {
        stage.classList.add("silhouette");
    }

    const info = document.createElement("div");
    info.className = "character-info";

    const name = document.createElement("h3");
    name.className = "character-name";
    name.textContent = character.name;

    const role = document.createElement("p");
    role.className = "character-role";
    role.textContent = character.role;

    const status = document.createElement("p");
    status.className = "character-status";
    status.textContent = character.status;

    info.append(name, role, status);
    card.append(stage, info);
    grid.appendChild(card);
});