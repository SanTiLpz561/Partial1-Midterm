const mainSection = document.getElementById("main-section");
const themeSlider = document.getElementById("themeSlider");
const themeLabel = document.getElementById("themeLabel");

themeSlider.addEventListener('input', (event) => {
    const themeValue = event.target.value;
    if (themeValue === "0") {
        mainSection.setAttribute("data-theme", "blue");
        themeLabel.textContent = "1";
    } else if (themeValue === "1") {
        mainSection.setAttribute("data-theme", "white");
        themeLabel.textContent = "2";
    }
    else if (themeValue === "2") {
        mainSection.setAttribute("data-theme", "purple");
        themeLabel.textContent = "3";
    }
});