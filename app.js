var notes = [];

document.addEventListener("DOMContentLoaded", event => {
  if (localStorage.getItem("notes")) {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  renderNotes();

  document.querySelector("form").addEventListener("submit", event => {
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
})

function renderNotes() {
  const ul = document.querySelector("#notes");
  ul.innerHTML = "";
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.innerHTML = note;
    const deleteButton = document.createElement("a");
    deleteButton.innerHTML = '<span class="icon">supprimer</span>';
    deleteButton.addEventListener("click", event => {
      if (confirm("Voulez-vous vraiment supprimer cette note ?")) {
        notes.splice(index, 1);
        renderNotes();
        save();
      }
    });
    li.appendChild(deleteButton);
    ul.appendChild(li);
  })
}

function save() {
  localStorage.setItem("notes", JSON.stringify(notes));
}
