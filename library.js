document.addEventListener("DOMContentLoaded", () => {
    const libraryGames = JSON.parse(localStorage.getItem("purchasedGames")) || [];
    const libraryContainer = document.getElementById("libraryGames");

    if (libraryGames.length === 0) {
        libraryContainer.innerHTML = "<p>У вас поки що немає придбаних ігор.</p>";
    } else {
        libraryGames.forEach(game => {
            const gameElement = document.createElement("div");
            gameElement.classList.add("game");
            gameElement.innerHTML = `
                <h3>${game.description}</h3>
                <p class="price">Придбано</p>
            `;
            libraryContainer.appendChild(gameElement);
        });
    }
});
