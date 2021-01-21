const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../saved.txt");


function onLoad() {
    const text = fs.readFileSync(filePath);
    const textareaElement = document.getElementById("textToSave");
    textareaElement.value = text;
    alert("Loaded");
}

function onSave() { 
    const textareaElement = document.getElementById("textToSave");
    fs.writeFileSync(filePath, textareaElement.value);
    alert("Saved");
}


function onWindowWidthChange() {
    const rangeElement = document.getElementById("windowWidth")
    ipcRenderer
    .invoke("windowWidthChange", Number(rangeElement.value))
    .catch((error) => {
        console.error(error);
    });
}

function onPageLoaded() {
    document.getElementById("save").addEventListener("click", onSave);
    document.getElementById("load").addEventListener("click", onLoad);
    document
    .getElementById("windowWidth")
    .addEventListener("change", onWindowWidthChange);
}

document.addEventListener("DOMContentLoaded", onPageLoaded);

//ipcRenderer.on("showAlert", () => {
//    alert("Alert")
//});

