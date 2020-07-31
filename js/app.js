// var bootbox = require('bootbox');
showNotes();
var state = "";

let addButton = document.getElementById("addButton");

addButton.addEventListener("click", function (e) {
  let addText = document.getElementById("addText");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(notesObj.length + "-" + addText.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addText.value = "";
  showNotes();
});

let saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", function (e) {
  let editText = document.getElementById("editText");
  let notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes);
  index = state.split("-")[0];
  notesObj[index] = index + "-" + editText.value;
  notesObj.forEach(function (element, i) {
    element = i + "-" + element.split("-")[1];
    notesObj[i] = element;
  });
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
});

//function to show the contents of a note
function showNotes() {
  $("#editArea").modal("hide");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    console.log(new Date());
    html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element.split("-")[1]}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
                    <button id="${index}" onclick="editNote(this.id)" class="btn btn-primary">Edit</button>
                    </div>
                </div>`;
  });
  let notesElement = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElement.innerHTML = html;
  } else {
    notesElement.innerHTML = `No notes added`;
  }
}

// Function to delete a note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  notesObj.forEach(function (element, i) {
    element = i + "-" + element.split("-")[1];
    notesObj[i] = element;
  });
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// Function to edit a note
function editNote(index) {
  let notes = localStorage.getItem("notes");
  let editText = document.getElementById("editText");
  state = JSON.parse(notes)[index];
  editText.value = state.split("-")[1];
  $("#editArea").modal("show");
  // if (notes == null) {
  // notesObj = [];
  // } else {
  // notesObj = JSON.parse(notes);
  // }
  // let divElement = document.createElement('div');
  // divElement.setAttribute('id', 'element');
  // divElement.setAttribute('class', 'element');
  // let html = `<textarea class="form-control" id="editArea" rows="3"></textarea>`;
  // notesObj[index].innerHTML = html;
}

let searchText = document.getElementById("searchText");
searchText.addEventListener("input", function () {
  let inputValue = searchText.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardText = element
      .getElementsByTagName("p")[0]
      .innerText.split("-")[1]
      .toLowerCase();
    if (cardText.includes(inputValue)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
