console.log("in validate.js")
let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/;
const stateAbbreviations = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
let form = null;
let successMessage = null;
function initValidation(formId, successId) {
    form = document.getElementById(formId);
    successMessage = document.getElementById(successId);
    let inputs = document.querySelectorAll("input");
    for (let input of inputs) {
        input.addEventListener("change", inputChanged)
    }
    form.addEventListener("submit", submitForm)
}
function inputChanged(ev) {
    let element = ev.currentTarget;
    validateForm();
    //TODO: ADD 'was-validated' to the current element
    element.classList.add("was-validated"); // done?
}

function submitForm(ev) {
    console.log("in submit");
    form = ev.currentTarget;
    ev.preventDefault();
    ev.stopPropagation();
    validateForm();
    if (!form.checkValidity()) {
        //TODO - if form is invalid, set 'was-validated' class on all inputs to show errors
        let inputs = document.querySelectorAll("input");
        for (let input of inputs) {
            input.classList.add("was-validated");
        }
    } else {
        /*TODO - hide form and show success Message. Done?*/
        let formInfo = document.getElementById("register-bottom");
        let successMessage = document.getElementById("successMessage");
        formInfo.style.display = "none";
        successMessage.style.display = "block";
    }
}

function validateForm() {
    checkRequired("first-name", "First name is required");
    checkRequired("last-name", "Last name is required");
    checkRequired("address", "Address is required")
    checkRequired("city", "City is required")
    if (checkRequired("state", "State is required")) {
        validateState("state", "Not a valid State, enter two digit code e.g., UT");
    }
    if (checkRequired("email", "Email is required")) {
        checkFormat("email", "email format is bad", emailRegex);
    }
    if (checkRequired("zip", "Zip is required")) {
        checkFormat("zip", "zip format is bad, please use either ##### or #####-#### format.", zipCodeRegex);
    }
    if (checkRequired("phone", "Phone is required")) {
        checkFormat("phone", "phone format is bad", phoneRegex);
    }
    checkRequired("other", "(You must select at least one)");
}

function validateState(id, msg) {
    let el = document.getElementById(id);
    let valid = false;
    //TODO
    //get value from el, and convert to upper case
    //check whether the value is in the stateAbbreviations array Done?
    upperEl = el.value.toUpperCase();
    for (i = 0; i < stateAbbreviations.length; i++) {
        if (upperEl === stateAbbreviations[i]) {
            valid = true;
            break;
        }
    }
    setElementValidity(id, valid, msg);
}

function checkFormat(id, msg, regex) {
    //this function applies a regex to determine if element is valid
    //TODO-get element value and test it against the regex that was passed in Done?
    let el = document.getElementById(id);
    let valid = regex.test(el.value);
    setElementValidity(id, valid, msg);
    return valid;
}

function checkRequired(id, message) {
    let element = document.getElementById(id);
    console.log("Element ID:", id, element)
    let valid = false;
    let type = element.type;
    switch (type) {
        case 'text':
            //TODO-check if input has a 'value', set valid to true if so, false if not Done?
            textVal = element.value;
            if (!textVal == "") {
                valid = true;
            }
            break;
  //TODO
  //Validate whether any of the checkboxes are checked. set 'valid' to true if checked
  //remember that the 'name' field is shared by all of them so you can get the element's name, then
  //use a querySelectorAll to get the radio/check elements to validate.
  //if any of the elements is 'checked', return true. Done?
        case 'checkbox':
            let name = element.name;
            checkboxes = document.getElementsByName(name);
            for (i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    valid = true;
                }
            }
            break;
    }
    setElementValidity(id, valid, message);
    return valid;
}

function setElementValidity(id, valid, message) {
    let element = document.getElementById(id);
    if (valid) {
        element.setCustomValidity('');
    } else {
        element.setCustomValidity(message);
    }
    let errorDiv = element.parentElement.querySelector(".errorMessage");
    errorDiv.innerHTML = message;
}