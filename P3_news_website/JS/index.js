// Not using API key in this project because of some error

// API Key - 09def55c3971413f8b7882b3f8f56979
let api = '09def55c3971413f8b7882b3f8f56979';

// Grabbing news container
let newsAccordion = document.getElementById('newsAccordion');

// Creating an AZAX get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `JSON/data.json`, true);

// What to do when response is ready
xhr.onload = function () {
    if (this.status == 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        let newsHtml = "";
        articles.forEach(function (element, index) {
            let newsStr = `<div class="accordion-item">
                                <h2 class="accordion-header" id="heading${index + 1}">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index + 1}" aria-expanded="false" aria-controls="collapse${index + 1}">
                                    <b>News ${index + 1}:</b>${element.title}
                                    </button>
                                </h2>
                                <div id="collapse${index + 1}" class="accordion-collapse collapse" aria-labelledby="heading${index + 1}" data-bs-parent="#newsAccordion">
                                    <div class="accordion-body">
                                        <strong>${element.source.name}</strong><br>
                                        <strong>Description :</strong> ${element.description}<br>
                                        <strong>Content :</strong> ${element.content}
                                        <a target="_blank" href="${element.url}">Read More</a>
                                        <br>
                                        <strong>Published At : </strong>${element.publishedAt}
                                    </div>
                                </div>
                            </div>`;
            newsHtml += newsStr;
        });
        newsAccordion.innerHTML = newsHtml;
    } else {
        console.log("Some error occurred.");
    }
}
xhr.send();