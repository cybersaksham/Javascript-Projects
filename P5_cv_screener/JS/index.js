const data = [
    {
        name: 'Person 1',
        age: 'age 1',
        city: 'city 1',
        language: 'Lang 1',
        framework: 'Frame 1',
        image: 'https://randomuser.me/api/portraits/men/51.jpg'
    },
    {
        name: 'Person 2',
        age: 'age 2',
        city: 'city 2',
        language: 'Lang 2',
        framework: 'Frame 2',
        image: 'https://randomuser.me/api/portraits/men/52.jpg'
    },
    {
        name: 'Person 3',
        age: 'age 3',
        city: 'city 3',
        language: 'Lang 3',
        framework: 'Frame 3',
        image: 'https://randomuser.me/api/portraits/men/53.jpg'
    },
    {
        name: 'Person 4',
        age: 'age 4',
        city: 'city 4',
        language: 'Lang 4',
        framework: 'Frame 4',
        image: 'https://randomuser.me/api/portraits/men/54.jpg'
    },
    {
        name: 'Person 5',
        age: 'age 5',
        city: 'city 5',
        language: 'Lang 5',
        framework: 'Frame 5',
        image: 'https://randomuser.me/api/portraits/men/55.jpg'
    }
]

// Starting
let image2 = document.getElementById('image');
let profile = document.getElementById('profile');

// CV Iterator
function cvIter(profiles) {
    let nextIndex = 0
    return {
        next: () => {
            return nextIndex < profiles.length ? {
                value: profiles[nextIndex++],
                done: false
            } : {
                done: true
            }
        }
    }
}

// nextBtn listener
const next = document.getElementById('next');
const candidates = cvIter(data);
cvShow();

next.addEventListener('click', cvShow)

// Showing in DOM
function cvShow() {
    const currentCandidate = candidates.next().value;

    if (currentCandidate != undefined) {
        image2.innerHTML = `<img src=${currentCandidate.image}>`;

        profile.innerHTML = `<ul class="list-group">
                            <li class="list-group-item">${currentCandidate.name}</li>
                            <li class="list-group-item">${currentCandidate.age}</li>
                            <li class="list-group-item">${currentCandidate.city}</li>
                            <li class="list-group-item">${currentCandidate.language}</li>
                            <li class="list-group-item">${currentCandidate.framework}</li>
                        </ul>`;
    } else {
        alert("End of candidates.")
        window.location.reload();
    }
}