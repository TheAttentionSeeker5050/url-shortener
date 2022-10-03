// get the alert element
const formValidationAlert = document.getElementById("formValidationAlert")

// this is the updated long url, sorry for the confusion but I call original url to
// the long url
const originalUrl = document.getElementById("originalUrl")
const ROCheck = document.getElementById("ROCheck")


// get the form element
const form = document.getElementById("editUrlForm")


form.addEventListener("submit", e => {
    if (originalUrl === null || originalUrl === "") {
        e.preventDefault()
        formValidationAlert.innerText = "Please fill the url data, you cannot submit empty URLs"
        formValidationAlert.classList.add("error")
        console.log("Triggering!!")
    }
})