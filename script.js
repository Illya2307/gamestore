let isRegistered = false;
let balance = 0;
let username = "";
let selectedGame = null;
let purchasedGames = JSON.parse(localStorage.getItem("purchasedGames")) || [];

const gameData = {
    "Cyberpunk 2077": {
        description: "Cyberpunk 2077:Антиутопія майбутнього, де технології, кримінал та свобода переплелися у Найт-Сіті.",
        minRequirements: ["OS: Windows 7", "Processor: Intel Core i5-3570K", "RAM: 8 GB", "Graphics: GTX 780"],
        recRequirements: ["OS: Windows 10", "Processor: Intel Core i7-4790", "RAM: 16 GB", "Graphics: GTX 1060"],
        price: 899
    },
    "GTA V": {
        description: "GTA V:Грайте за трьох різних персонажів, досліджуючи величезний відкритий світ Лос-Сантоса.",
        minRequirements: ["OS: Windows 7", "Processor: Intel Core 2 Quad CPU Q6600", "RAM: 4 GB", "Graphics: NVIDIA 9800 GT"],
        recRequirements: ["OS: Windows 10", "Processor: Intel Core i5 3470", "RAM: 8 GB", "Graphics: NVIDIA GTX 660"],
        price: 499
    },
    "Red Dead Redemption 2": {
        description: "Red Dead Redemption 2:Подорож у світ Дикого Заходу з приголомшливою деталізацією та захоплюючим сюжетом.",
        minRequirements: ["OS: Windows 7", "Processor: Intel Core i5-2500K", "RAM: 8 GB", "Graphics: GTX 770"],
        recRequirements: ["OS: Windows 10", "Processor: Intel Core i7-4770K", "RAM: 12 GB", "Graphics: GTX 1060"],
        price: 1199
    },
    "FIFA 25": {
        description: "FIFA 25:Відчуйте емоції стадіону з реалістичними гравцями, командами та легендами футболу у FIFA 25.",
        minRequirements: ["OS: Windows 10", "Processor: Intel Core i3-6100", "RAM: 8 GB", "Graphics: GTX 660"],
        recRequirements: ["OS: Windows 10", "Processor: Intel Core i5-3550", "RAM: 16 GB", "Graphics: GTX 1050 Ti"],
        price: 699
    },
    "The Last of Us": {
        description: "The Last of Us:Захоплива історія про виживання в постапокаліптичному світі, де кожен крок може бути останнім.",
        minRequirements: ["OS: Windows 10", "Processor: Intel Core i5-3470", "RAM: 8 GB", "Graphics: GTX 780"],
        recRequirements: ["OS: Windows 10", "Processor: Intel Core i7-4770", "RAM: 16 GB", "Graphics: GTX 1060"],
        price: 799
    },
    "Dead Island 2": {
        description: "Dead Island 2:Хоррор-пригода в світі зомбі-апокаліпсису, де виживання стає головною метою.",
        minRequirements: ["OS: Windows 10", "Processor: Intel Core i5-7500", "RAM: 8 GB", "Graphics: GTX 960"],
        recRequirements: ["OS: Windows 10", "Processor: Intel Core i7-8700", "RAM: 16 GB", "Graphics: GTX 1070"],
        price: 599
    },
    "Among Us": {
        description: "Among Us:Спробуйте знайти зрадників у команді або самі станьте майстерним зрадником.",
        minRequirements: ["OS: Windows 7", "Processor: Intel Core 2 Duo", "RAM: 1 GB", "Graphics: Integrated"],
        recRequirements: ["OS: Windows 10", "Processor: Intel Core i3", "RAM: 2 GB", "Graphics: Integrated"],
        price: 129
    }
};


function showGameDetails(gameName) {
    const game = gameData[gameName];
    if (game) {
        selectedGame = game;
        document.getElementById("gameTitle").textContent = gameName;
        document.getElementById("gameDescription").textContent = game.description;
        document.getElementById("gamePrice").textContent = game.price;

        const minReqList = document.getElementById("minRequirements");
        minReqList.innerHTML = "";
        game.minRequirements.forEach(req => {
            const li = document.createElement("li");
            li.textContent = req;
            minReqList.appendChild(li);
        });

        const recReqList = document.getElementById("recRequirements");
        recReqList.innerHTML = "";
        game.recRequirements.forEach(req => {
            const li = document.createElement("li");
            li.textContent = req;
            recReqList.appendChild(li);
        });

        document.getElementById("gameModal").style.display = "block";
    }
}

function closeModal() {
    document.querySelectorAll(".modal").forEach(modal => modal.style.display = "none");
}

function showRegistrationModal() {
    if (isRegistered) {
        showProfileModal();
    } else {
        document.getElementById("registrationModal").style.display = "block";
    }
}

function register(event) {
    event.preventDefault();
    username = document.getElementById("username").value;
    if (username) {
        isRegistered = true;
        document.getElementById("profileName").textContent = username;
        document.getElementById("displayName").textContent = username;
        updateBalanceDisplay();
        closeModal();
        showProfileModal();
    } else {
        alert("Заповніть усі поля!");
    }
}

function showProfileModal() {
    document.getElementById("profileModal").style.display = "block";
    document.getElementById("balance").textContent = balance;
}

function showAddFundsModal() {
    document.getElementById("addFundsModal").style.display = "block";
}

function addFunds(event) {
    event.preventDefault();
    const cardNumber = document.getElementById("cardNumber").value;
    const cardHolder = document.getElementById("cardHolder").value;
    const amount = parseInt(document.getElementById("amount").value);

    if (cardNumber.length === 16 && cardHolder && amount > 0) {
        balance += amount;
        updateBalanceDisplay();
        closeModal();
        alert(`Ваш баланс поповнено на ${amount} грн!`);
    } else {
        alert("Будь ласка, введіть коректні дані про карту та суму поповнення.");
    }
}

function updateBalanceDisplay() {
    document.getElementById("displayBalance").textContent = `Баланс: ${balance} грн`;
}

function buyGame() {
    if (!selectedGame) return;
    
    if (balance >= selectedGame.price) {
        balance -= selectedGame.price;
        updateBalanceDisplay();
        closeModal();
        alert(`Ви успішно придбали ${selectedGame.description}!`);
    } else {
        alert("Недостатньо коштів. Будь ласка, поповніть баланс.");
    }
}

function showGameDetails(gameName) {
    const game = gameData[gameName];
    if (game) {
        selectedGame = game;
        document.getElementById("gameTitle").textContent = gameName;
        document.getElementById("gameDescription").textContent = game.description;
        document.getElementById("gamePrice").textContent = game.price;

        const minReqList = document.getElementById("minRequirements");
        minReqList.innerHTML = "";
        game.minRequirements.forEach(req => {
            const li = document.createElement("li");
            li.textContent = req;
            minReqList.appendChild(li);
        });

        const recReqList = document.getElementById("recRequirements");
        recReqList.innerHTML = "";
        game.recRequirements.forEach(req => {
            const li = document.createElement("li");
            li.textContent = req;
            recReqList.appendChild(li);
        });

        document.getElementById("gameModal").style.display = "block";
    }
}

function buyGame() {
    if (!selectedGame) return;

    if (balance >= selectedGame.price) {
        balance -= selectedGame.price;
        updateBalanceDisplay();

        purchasedGames.push(selectedGame);
        localStorage.setItem("purchasedGames", JSON.stringify(purchasedGames));
        closeModal();
        alert(`Ви успішно придбали ${selectedGame.description}!`);
    } else {
        alert("Недостатньо коштів. Будь ласка, поповніть баланс.");
    }
}
