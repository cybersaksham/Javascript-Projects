// Grabbing url & request types
const requestType = document.getElementById('requestType');
const urlField = document.getElementById('urlField');

// Grabbing Boxes
const parameterBox = document.getElementById('parameterBox');
const jsonBox = document.getElementById('jsonBox');
const responseBox = document.getElementById('responseBox');

// Grabbing Content type radios
const contentTypeBox = document.getElementById('contentTypeBox');
const contentType1 = document.getElementById('contentType1');
const contentType2 = document.getElementById('contentType2');

// Grabbing add parameter elements
const addBtn1 = document.getElementById('addBtn1');
const params = document.getElementById('params');
let paramsCount = 1; // No of params

// Grabbing submit button
const submit = document.getElementById('submit');

// Grabbing response area
const responseArea = document.getElementById('responseArea');

// Hiding Boxes initially
parameterBox.style.display = 'none';
jsonBox.style.display = 'none';
responseBox.style.display = 'none';
contentTypeBox.style.display = 'none';

// Showing boxes according to content type
contentType1.addEventListener('click', () => {
    parameterBox.style.display = 'none';
    params.style.display = 'none';
    jsonBox.style.display = 'block';
})
contentType2.addEventListener('click', () => {
    parameterBox.style.display = 'block';
    params.style.display = 'block';
    jsonBox.style.display = 'none';
})

// Showing content according to request type
requestType.addEventListener('click', () => {
    let request = Number(requestType.value);
    if (request == 1) {
        contentTypeBox.style.display = 'none';
        parameterBox.style.display = 'none';
        params.style.display = 'none';
        jsonBox.style.display = 'none';
    } else if (request == 2) {
        contentTypeBox.style.display = 'block';
    }
})

// Utility Functions
// 1. Function to get DOM element from a string
function strToDOM(str) {
    let div = document.createElement('div');
    div.innerHTML = str;
    return div.firstElementChild;
}

// Adding parameters on clicking add button
addBtn1.addEventListener('click', () => {
    let str = `<div class="container my-3">
                    <div class="px-4 row">
                        <div class="col-md-2">
                            <input id="parameter${paramsCount + 1}Key" type="text" class="form-control" placeholder="Enter key"
                                aria-label="First name">
                        </div>
                        <div class="col-md-2">
                            <input id="parameter${paramsCount + 1}Value" type="text" class="form-control" placeholder="Enter value"
                                aria-label="Last name">
                        </div>
                        <div class="col-md-2">
                            <button class="deleteBtn btn btn-primary">-</button>
                        </div>
                    </div>
                </div>`;
    // Storing delete buttons
    let deleteBtn = document.getElementsByClassName('deleteBtn');

    // Convert element string to DOM node
    let paramElement = strToDOM(str);
    params.appendChild(paramElement);
    paramsCount += 1;

    // Deleting parameter on clicking delete button
    for (item of deleteBtn) {
        item.addEventListener('click', (e) => {
            (((e.target.parentElement).parentElement).parentElement).remove();
            deleteBtn = document.getElementsByClassName('deleteBtn');
        })
    }
})

// On clicling submit button
submit.addEventListener('click', () => {
    responseBox.style.display = 'block';

    // Showing please wait
    responseArea.innerHTML = "Please wait... Fetching response..."

    // Fetch all values user has entered
    let url = urlField.value;
    let request = Number(requestType.value);
    let content = 0;
    if (contentType1.checked) {
        content = 1;
    } else if (contentType2.checked) {
        content = 2;
    }

    // Collecting data
    let data;
    if (content == 2) {
        // Taking key value pairs
        data = {};
        for (let i = 0; i < paramsCount; i++) {
            if (document.getElementById(`parameter${i + 1}Key`) != undefined) {
                let key = document.getElementById(`parameter${i + 1}Key`).value;
                let value = document.getElementById(`parameter${i + 1}Value`).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    } else if (content == 1) {
        // Taking json as string
        data = document.getElementById('jsonTextArea').value;
    }

    // Using Fetch API
    if (request == 1) {
        // GET request
        if (url != "") {
            fetch(url, {
                method: 'GET'
            })
                .then(response => response.text())
                .then(text => {
                    responseArea.innerHTML = text;
                    Prism.highlightAll();
                })
        } else {
            responseArea.innerHTML = "No url given";
            Prism.highlightAll();
        }
    } else if (request == 2) {
        // POST request
        if (url != "") {
            fetch(url, {
                method: 'POST',
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.text())
                .then(text => {
                    responseArea.innerHTML = text;
                    Prism.highlightAll();
                })
        } else {
            responseArea.innerHTML = "No url given";
            Prism.highlightAll();
        }
    }
})