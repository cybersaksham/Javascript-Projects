// Grabbing search button
const search = document.getElementById('search');

// Grabbing nothing
const nothing = document.getElementById('nothing');
nothing.style.display = 'none';

// Grabbing snippets
const snippets = document.getElementsByClassName('accordion-item');

// Search Button
search.addEventListener('input', (e) => {
    let value = search.value.toLowerCase();
    let count = false;

    for (let i = 0; i < snippets.length; i++) {
        let title = snippets[i].firstElementChild.firstElementChild.textContent.toLowerCase();
        let para = snippets[i].lastElementChild.firstElementChild.firstElementChild.firstElementChild.textContent.toLowerCase();

        let snippet = document.getElementById(`snippet${i + 1}`);
        if (title.includes(value) | para.includes(value)) {
            snippet.style.display = 'block';
            count = true;
        } else {
            snippet.style.display = 'none';
        }
    }

    if (!count) {
        nothing.style.display = 'block';
    } else {
        nothing.style.display = 'none';
    }
})