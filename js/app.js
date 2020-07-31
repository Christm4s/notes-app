showNotes();

let addButton = document.getElementById("addButton");

addButton.addEventListener("click", function (e) {

  let addText = document.getElementById("addText");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addText.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addText.value = "";
  showNotes();
});

//function to show the contents of a note
function showNotes() {

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
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
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let searchText = document.getElementById('searchText');
searchText.addEventListener("input", function(){

    let inputValue = searchText.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardText = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if(cardText.includes(inputValue)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});