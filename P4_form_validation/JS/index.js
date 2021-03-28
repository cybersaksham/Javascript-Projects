// Name Validation
const name1 = document.getElementById('name');
const nameMsg = document.getElementById('nameMsg');

name1.addEventListener('input', () => {
    let reg = /^([a-zA-Z\s]){2,20}$/;
    let str = name1.value;
    let msg = "";
    if (str == "") {
        name1.classList.add('is-invalid');
        msg += `This is required field`;
    } else if (!reg.test(str)) {
        name1.classList.add('is-invalid');
        msg += `Your name must be 2-20 characters & should only contain alphabates`;
    } else if (str.startsWith(" ")) {
        name1.classList.add('is-invalid');
        msg += `Your name must starts with an alphabate`;
    } else if (str.endsWith(" ")) {
        name1.classList.add('is-invalid');
        msg += `Your name must ends with an alphabate`;
    } else {
        name1.classList.remove('is-invalid');
    }
    nameMsg.innerHTML = `<small id="nameValid" class="form-text text-muted">
                            ${msg}
                        </small>`;
})

// Email Validation
const email = document.getElementById('email');
const emailMsg = document.getElementById('emailMsg');

email.addEventListener('input', () => {
    let reg = /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9\.]+)\.([a-zA-Z]+)$/;
    let str = email.value;
    let msg = "";
    if (str == "") {
        email.classList.add('is-invalid');
        msg += `This is required field`;
    } else if (!reg.test(str)) {
        email.classList.add('is-invalid');
        msg += `Email format is not valid`;
    } else {
        email.classList.remove('is-invalid');
    }
    emailMsg.innerHTML = `<small id="nameValid" class="form-text text-muted">
                            ${msg}
                        </small>`;
})

// Number Validation
const number = document.getElementById('number');
const numberMsg = document.getElementById('numberMsg');

number.addEventListener('input', () => {
    let reg = /^[0-9]{10}$/;
    let str = number.value;
    let msg = "";
    if (str == "") {
        number.classList.add('is-invalid');
        msg += `This is required field`;
    } else if (!reg.test(str)) {
        number.classList.add('is-invalid');
        msg += `Your phone no must contain only 10 digits`;
    } else {
        number.classList.remove('is-invalid');
    }
    numberMsg.innerHTML = `<small id="nameValid" class="form-text text-muted">
                            ${msg}
                        </small>`;
})

// Submitting
const select = document.getElementById('select');
const address = document.getElementById('address');
const other = document.getElementById('other');
let submit = document.getElementById('submit');
let result = document.getElementById('result');
submit.addEventListener('click', () => {
    let text = "";
    let msg = "";
    let head = "";
    if (name1.classList.contains('is-invalid') | email.classList.contains('is-invalid') | number.classList.contains('is-invalid')) {
        msg = "danger";
        head = "Error";
        text = "Some fields are invalid. Cannot submit the form."
    } else if (name1.value == "" | email.value == "" | number.value == "" | address.value == "") {
        msg = "danger";
        head = "Error";
        text = "Some fields are empty. Cannot submit the form."
    } else {
        msg = "success";
        head = "Success";
        text = "Your travel request has been successfully submitted."
    }
    result.innerHTML = `<div class="alert alert-${msg} alert-dismissible fade show" role="alert">
                            <strong>${head}:</strong> ${text}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
    name1.value = "";
    email.value = "";
    number.value = "";
    select.value = "Omni";
    address.value = "";
    other.value = "";
    setTimeout(() => {
        result.innerHTML = "";
    }, 3000);
})