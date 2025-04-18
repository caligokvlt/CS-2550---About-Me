console.log("in main.js")
document.addEventListener("DOMContentLoaded", function(event) {    
    console.log("in event listener before initValidation")
    initValidation("myform", "successMessage");
    console.log("in event listener after initValidation")
 });