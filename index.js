const searchBox = document.getElementById("searchBox");
const notesCard = document.getElementById("notes-card");
const btnAddNode = document.getElementById("add-note");
const noteContent = document.getElementById("note-content");
const noteTitle = document.getElementById("note-title");
const modal = document.getElementById("addNoteModal");
const noteId = document.getElementById("note-id");
var notes = [];

if (localStorage.getItem("notes") !== null) {
  notes = localStorage.getItem("notes");
}

searchBox.addEventListener("input", (e) => {
  tempNotes = [];
  notes.forEach((items) => {
    title = items.title;
    content = items.content;
    if (
      title.toLowerCase().includes(e.target.value.toLowerCase()) ||
      content.toLowerCase().includes(e.target.value.toLowerCase())
    ) {
      tempNotes.push(items);
      notesCard.innerHTML = "";
      tempNotes.forEach((item) => {
        notesCard.innerHTML += `<div class="col-md-6 col-lg-3 col-sm-6">
        <div class="m-2">
          <div class="card">
            <div class="card-body">
            <input type="hidden" id="noteid" value="${item.id}"/>
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">
                ${item.content}
              </p>
              <button class="btn-edit btn btn-primary bi bi-pencil-square" onclick="fillData(${item.id})" data-bs-toggle="modal" data-bs-target="#addNoteModal" ></button>
              <button class="ms-1 btn btn-danger bi bi-trash" onclick="deleteNote(${item.id})"></button>
            </div>
          </div>
        </div>
      </div>`;
      });
    }
  });
});

function formValidation(event) {
  if (event.target.value === "") {
    event.target.nextElementSibling.setAttribute(
      "style",
      "display:block;color:red"
    );
    btnAddNode.setAttribute("disabled", "");
  } else {
    event.target.nextElementSibling.setAttribute(
      "style",
      "display:none;color:red"
    );
  }
  if (noteTitle.value !== "" && noteContent.value !== "") {
    btnAddNode.removeAttribute("disabled");
  }
}

function saveNote() {
  if (noteId.value === "") {
    notes.push({
      id: new Date().getTime().toString(),
      title: noteTitle.value,
      content: noteContent.value,
    });
  } else {
    notes.forEach((item) => {
      if (item.id === noteId.value) {
        item.id = noteId.value;
        item.title = noteTitle.value;
        item.content = noteContent.value;
      }
    });
  }
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
  clearData();
}

function deleteNote(id) {
  id = id.toString();
  notes = notes.filter((item) => item.id !== id);
  console.log(notes);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function clearData() {
  noteId.value = "";
  noteContent.value = "";
  noteTitle.value = "";
}

function fillData(id) {
  notes.forEach((item) => {
    if (item.id === id.toString()) {
      noteId.value = item.id;
      noteTitle.value = item.title;
      noteContent.value = item.content;
      btnAddNode.removeAttribute("disabled");
    }
  });
}

function showNotes() {
  if (localStorage.getItem("notes") != null) {
    data = localStorage.getItem("notes");
    notes = JSON.parse(data);
    notesCard.innerHTML = "";
    notes.forEach((item) => {
      notesCard.innerHTML += `<div class="col-md-6 col-lg-3 col-sm-6">
      <div class="m-2">
        <div class="card">
          <div class="card-body">
          <input type="hidden" id="noteid" value="${item.id}"/>
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">
              ${item.content}
            </p>
            <button class="btn-edit btn btn-primary bi bi-pencil-square" onclick="fillData(${item.id})" data-bs-toggle="modal" data-bs-target="#addNoteModal" ></button>
            <button class="ms-1 btn btn-danger bi bi-trash" onclick="deleteNote(${item.id})"></button>
          </div>
        </div>
      </div>
    </div>`;
    });
  }
}
showNotes();
