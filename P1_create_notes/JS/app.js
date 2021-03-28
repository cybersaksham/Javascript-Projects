showNotes();

// Clicking addBtn
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTxtTitle = document.getElementById('addTxtTitle');
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");
    if (addTxt.value == "") {
        alert("Your note cannot be empty.")
    } else {
        if (notes == null) {
            notesObj = [];
            titlesObj = [];
        } else {
            notesObj = JSON.parse(notes);
            titlesObj = JSON.parse(titles);
        }
        notesObj.push(addTxt.value);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        if (addTxtTitle.value == "") {
            titlesObj.push(null);
            localStorage.setItem('titles', JSON.stringify(titlesObj));
        } else {
            titlesObj.push(addTxtTitle.value);
            localStorage.setItem('titles', JSON.stringify(titlesObj));
        }
        addTxt.value = "";
        addTxtTitle.value = "";
        showNotes();
    }
})

// Function to show notes
function showNotes() {
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");
    if (notes == null) {
        notesObj = [];
        titlesObj = [];
    } else {
        notesObj = JSON.parse(notes);
        titlesObj = JSON.parse(titles);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        if (titlesObj[index] == null) {
            html += `<div class="noteCard card my-2 mx-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text">${element}</p>
                        <button id="${index}" onclick="dltNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
        } else {
            html += `<div class="noteCard card my-2 mx-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${titlesObj[index]}</h5>
                        <p class="card-text">${element}</p>
                        <button id="${index}" onclick="dltNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
        }
    });
    let notesElem = document.getElementById('notes');
    let nothing = document.getElementById('nothing');
    if (notesObj.length != 0) {
        nothing.style.display = 'none';
        notesElem.innerHTML = html;
    }
}

// Function to delete a note
function dltNote(index) {
    let confirmDlt = confirm("Do you really want to delete this note.");
    if (confirmDlt == true) {
        let notes = localStorage.getItem("notes");
        let titles = localStorage.getItem("titles");
        if (notes == null) {
            notesObj = [];
            titlesObj = [];
        } else {
            notesObj = JSON.parse(notes);
            titlesObj = JSON.parse(titles);
        }
        notesObj.splice(index, 1);
        titlesObj.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        localStorage.setItem('titles', JSON.stringify(titlesObj));
        location.reload();
    }
}

// Function to delete all notes
function dltAll(index) {
    let confirmDlt = confirm("Do you really want to delete all notes.");
    if (confirmDlt == true) {
        let notes = localStorage.getItem("notes");
        let titles = localStorage.getItem("titles");
        if (notes == null) {
            notesObj = [];
            titlesObj = [];
        } else {
            notesObj = JSON.parse(notes);
            titlesObj = JSON.parse(titles);
        }
        notesObj.splice(0, notesObj.length);
        titlesObj.splice(0, titlesObj.length);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        localStorage.setItem('titles', JSON.stringify(titlesObj));
        location.reload();
    }
}

// Search Button
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    let count = 0;
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        let cardTxt2 = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal) || cardTxt2.includes(inputVal)) {
            count += 1;
            nothing.style.display = 'none';
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    })
    if (count == 0) {
        let nothing = document.getElementById('nothing');
        nothing.style.display = 'block';
    }
})