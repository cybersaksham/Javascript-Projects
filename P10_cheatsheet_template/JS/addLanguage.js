// Grabbing addLanguage
let languageList = document.getElementById('languageList');

// Adding language
let languageStr = `<li id="l1"><a class="dropdown-item" href="./html.html">HTML</a></li>
                    <li id="l2"><a class="dropdown-item" href="./js.html">JS</a></li>`;
languageList.innerHTML = languageStr;