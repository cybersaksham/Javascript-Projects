let count = 0;
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {
        let tableBody = document.getElementById('tableBody');
        let uiStr = `<tr>
                        <th scope="row">${count}</th>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
        tableBody.innerHTML += uiStr;
    }

    clear() {
        let libForm = document.getElementById('libForm');
        libForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    }

    show(type, message) {
        let msg = document.getElementById('msg');
        msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message : </strong>${message}.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
        setTimeout(function () {
            msg.innerHTML = ``;
        }, 3000)
    }
}

// Add submit event listener to libForm
let libForm = document.getElementById('libForm');
libForm.addEventListener('submit', libFormSubmit);

function libFormSubmit(e) {
    e.preventDefault();

    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);

    let display = new Display();

    if (display.validate(book)) {
        count += 1;
        display.add(book);
        display.show('success', "Your book has been successfully added");
        display.clear();
    } else {
        // Show error
        display.show('danger', "Length of some fields is very less");
    }
}