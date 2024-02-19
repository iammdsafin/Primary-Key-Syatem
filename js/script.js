var phoneInput = document.getElementById("phone");
var emailInput = document.getElementById("email");

phoneInput.addEventListener("input", PhoneValidation);
emailInput.addEventListener("input", EmailValidation);

document
    .getElementById("formData")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let messageDiv = document.getElementById("message");

        if (!EmailValidation() || !PhoneValidation()) {
            return;
        }

        fetch("php/handleFormData.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                email: email,
                phone: phone,
                submit: true,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    messageDiv.classList.remove("error");
                    messageDiv.classList.add("success");
                    messageDiv.textContent = data.message;
                    setTimeout(function () {
                        messageDiv.textContent = "";
                    }, 3000);
                } else {
                    messageDiv.classList.remove("success");
                    messageDiv.classList.add("error");
                    messageDiv.textContent = data.message;
                    setTimeout(function () {
                        messageDiv.textContent = "";
                    }, 3000);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                messageDiv.classList.remove("success");
                messageDiv.classList.add("error");
                messageDiv.textContent =
                    "An error occurred while processing your request.";
                setTimeout(function () {
                    messageDiv.textContent = "";
                }, 3000);
            });
    });

function PhoneValidation() {
    var phone = document.getElementById("phone").value;
    var phoneError = document.getElementById("phoneError");
    var phoneRegex = /^(\+?88)?(01[3-9]\d{8})$/;
    var submitButton = document.getElementById("submitButton");

    if (phone === "") {
        phoneError.textContent = "Phone number is required.";
        return false;
    } else if (phone.length !== 11 && phone.length !== 13) {
        phoneError.textContent = "Phone number must be 11 or 13 digits long.";
        submitButton.disabled = true;
        return false;
    } else if (!phoneRegex.test(phone)) {
        phoneError.textContent = "The provided phone number is not valid.";
        submitButton.disabled = true;
        return false;
    } else {
        phoneError.textContent = "";
        submitButton.disabled = false;
        return true;
    }
}

function EmailValidation() {
    var email = document.getElementById("email").value;
    var emailError = document.getElementById("emailError");
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var submitButton = document.getElementById("submitButton");

    if (email === "") {
        emailError.textContent = "Email is required.";
        return false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = "The provided email address is not valid.";
        submitButton.disabled = true;
        return false;
    } else {
        emailError.textContent = "";
        submitButton.disabled = false;
        return true;
    }
}
