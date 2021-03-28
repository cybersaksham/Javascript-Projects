// Grabbing search button
const search = document.getElementById('search');

// Grabbing nothing
const nothing = document.getElementById('nothing');
nothing.style.display = 'none';

// Grabbing projects
const projects = document.getElementsByClassName('accordion-item');

// Search Button
search.addEventListener('input', (e) => {
    let value = search.value.toLowerCase();
    let count = false;

    for (let i = 0; i < projects.length; i++) {
        let title = projects[i].firstElementChild.firstElementChild.textContent.toLowerCase();
        let para = projects[i].lastElementChild.firstElementChild.textContent.toLowerCase();

        let project = document.getElementById(`project${i + 1}`);
        if (title.includes(value) | para.includes(value)) {
            project.style.display = 'block';
            count = true;
        } else {
            project.style.display = 'none';
        }
    }

    if (!count) {
        nothing.style.display = 'block';
    } else {
        nothing.style.display = 'none';
    }
})