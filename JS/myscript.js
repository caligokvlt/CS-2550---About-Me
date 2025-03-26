function openPage(pageName) {
    var i;
    var x = document.getElementsByClassName("page");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(pageName).style.display = "block";
}
lightMode = false;
darkMode = true;
currentMode = document.createElement("link");
currentMode.rel = "stylesheet";
currentMode.href = "CSS/theme.css";
head = document.head;
head.appendChild(currentMode);
function toggleLightDark() {
    if (darkMode == true) {
        lightMode = true;
        darkMode = false;
        currentMode.href = "CSS/lightmode.css";
    }
    else {
        lightMode = false;
        darkMode = true;
        currentMode.href = "CSS/theme.css";
    }
}