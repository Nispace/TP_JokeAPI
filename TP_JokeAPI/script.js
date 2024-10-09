// Sélection des éléments
const jokeTable = document.getElementById("joke-table");
const getJokeBtn = document.getElementById("get-joke");
const clearTableBtn = document.getElementById("clear-table");
const jokeForm = document.getElementById("joke-form");
const manualJokeInput = document.getElementById("manual-joke");

// Fetch JokeAPI
getJokeBtn.addEventListener("click", async () => {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist,explicit');

        const data = await response.json();
        
        let jokeText = data.joke || `${data.setup} - ${data.delivery}`;
        let category = data.category; // Récupérer la catégorie

        addJokeToTable(jokeText, category); // Passer la catégorie à la fonction

        saveJoke(jokeText);
    } catch (error) {
        console.error("Erreur lors de la récupération de la blague", error);
    }
});

// Ajouter une blague manuellement via le formulaire
jokeForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const manualJoke = manualJokeInput.value.trim();
    
    if (manualJoke) {
        addJokeToTable(manualJoke);
        saveJoke(manualJoke);
        manualJokeInput.value = ""; // Réinitialise le champ du formulaire
    }
});

// Ajouter une blague au tableau
function addJokeToTable(jokeText, category) {
    const row = document.createElement('tr');
    row.classList.add('joke-card');
    row.innerHTML = `
        <td>${jokeText}</td>
        <td>${category}</td> <!-- Afficher la catégorie -->
        <td><button class="btn btn-danger btn-sm" onclick="removeJoke(this)">Supprimer</button></td>
    `;
    jokeTable.appendChild(row);
}

// Supprimer une blague du tableau
function removeJoke(button) {
    const row = button.parentNode.parentNode;
    row.remove();
    updateLocalStorage();
}

// Vider le tableau
clearTableBtn.addEventListener("click", () => {
    jokeTable.innerHTML = '';
    localStorage.removeItem('jokes');
});
