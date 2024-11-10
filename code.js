// Sélection des éléments du DOM
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Charger les tâches sauvegardées depuis le localStorage au chargement de la page
document.addEventListener("DOMContentLoaded", loadTasks);

// Fonction pour ajouter une tâche
function addTask() {
    const taskText = taskInput.value.trim();

    // Vérifier si le champ est vide
    if (taskText === "") {
        alert("Veuillez entrer une tâche !");
        return;
    }

    // Ajouter la tâche au tableau et sauvegarder
    createTaskRow(taskText);
    saveTask(taskText);

    // Effacer le champ de saisie
    taskInput.value = "";
}

// Créer une ligne de tableau pour la tâche et l'ajouter à la table
function createTaskRow(taskText) {
    const row = document.createElement("tr");

    // Colonne pour le numéro de la tâche
    const indexCell = document.createElement("td");
    indexCell.textContent = taskList.children.length + 1; // Affiche l'index en fonction du nombre actuel de tâches

    // Colonne pour le texte de la tâche
    const taskCell = document.createElement("td");
    taskCell.textContent = taskText;

    // Colonne pour le bouton de suppression
    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.onclick = function () {
        row.remove();
        removeTask(taskText);
        updateTaskIndices();
    };

    actionCell.appendChild(deleteButton);
    row.appendChild(indexCell);
    row.appendChild(taskCell);
    row.appendChild(actionCell);
    taskList.appendChild(row);
}

// Sauvegarder une tâche dans le localStorage
function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Charger les tâches depuis le localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskRow(task));
}

// Supprimer une tâche du localStorage
function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Mettre à jour les indices des tâches après la suppression d'une tâche
function updateTaskIndices() {
    Array.from(taskList.children).forEach((row, index) => {
        row.children[0].textContent = index + 1; // Met à jour l'index dans la première colonne
    });
}

// Ajouter un écouteur d'événement au bouton
addTaskButton.addEventListener("click", addTask);

// Ajouter une tâche en appuyant sur Entrée
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
