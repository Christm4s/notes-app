showNotes();
let addButton = document.getElementById('addButton');
addButton.addEventListener("click", function(e){

    let addText = document.getElementById('addText');
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addText.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    console.log(notesObj);
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button href="#" class="btn btn-primary">Delete</button>
                    </div>
                </div>`;
    });
    let notesElement = document.getElementById('notes');
    if(notes.length != 0){
        notesElement.innerHTML = html;
    }
}
