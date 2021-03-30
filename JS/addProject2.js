// Grabbing addProject
let projectList = document.getElementById('projectList');

// Adding projects to page 2 type
let projectStr = `<li id="p1"><a class="dropdown-item" href="../../P1_create_notes/">Notes App</a></li>
                    <li id="p2"><a class="dropdown-item" href="../../P2_college_library/">College Library</a></li>
                    <li id="p3"><a class="dropdown-item" href="../../P3_news_website/">News Website</a></li>
                    <li id="p4"><a class="dropdown-item" href="../../P4_form_validation/">Form Validation</a></li>
                    <li id="p5"><a class="dropdown-item" href="../../P5_cv_screener/">CV Screener</a></li>
                    <li id="p6"><a class="dropdown-item" href="../../P6_postman_clone/">Postman Clone</a></li>
                    <li id="p7"><a class="dropdown-item" href="../../P7_calculator/">Calculator</a></li>
                    <li id="p8"><a class="dropdown-item" href="../../P8_clock/">Clock App</a></li>
                    <li id="p9"><a class="dropdown-item" href="../../P9_dino_game/">Dino Game</a></li>
                    <li id="p10"><a class="dropdown-item" href="../../P10_cheatsheet_template/">Cheatsheet Template</a></li>`;
projectList.innerHTML = projectStr;