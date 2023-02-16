var notes = [];
const initializeFirebase = require("./push-notifications.js");
// import { initializeFirebase } from "./push-notification";
initializeFirebase();

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("notes")) {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  renderNotes();

  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const note = document.querySelector("textarea").value;
    if (note.length == 0) {
      alert("Vous n'avez pas saisi de texte");
    } else {
      notes.push(note);
      renderNotes();
      save();
      document.querySelector("textarea").value = "";
    }
  });

  let bipEvent = null;
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    bipEvent = event;
  });

  document.querySelector("#btnInstall").addEventListener("click", () => {
    if (bipEvent) {
      bipEvent.prompt();
    } else {
      alert(
        "Pour installer l'application, cherchez Ajouter à l'écran d'accueil ou Installer dans le menu de votre navigateur"
      );
    }
  });

  document.querySelector("#btnShare").addEventListener("click", () => {
    let notesString = "";
    for (let note of notes) {
      notesString += note + " | ";
    }
    navigator.share({
      title: "YNotes",
      text: notesString,
    });
  });
});

function renderNotes() {
  const ul = document.querySelector("#notes");
  ul.innerHTML = "";
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.innerHTML = note;
    const deleteButton = document.createElement("div");
    deleteButton.innerHTML = '<span class="icon">supprimer</span>';
    deleteButton.addEventListener("click", () => {
      if (confirm("Voulez-vous vraiment supprimer cette note ?")) {
        notes.splice(index, 1);
        renderNotes();
        save();
      }
    });
    li.appendChild(deleteButton);
    ul.appendChild(li);
  });
}

function save() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function randomNotification() {
  // const randomItem = Math.floor(Math.random() * games.length);
  // const notifTitle = games[randomItem].name;
  // const notifBody = `Created by ${games[randomItem].author}.`;
  // const notifImg = `data/img/${games[randomItem].slug}.jpg`;
  // const options = {
  //   body: notifBody,
  //   icon: notifImg,
  // };
  // new Notification(notifTitle, options);
  // setTimeout(randomNotification, 30000);
}

const button = document.getElementById("btnInstall");
button.addEventListener("click", () => {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      randomNotification();
    }
  });
});
