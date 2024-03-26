import {API } from "../configs/APIToken.js"
import { sendRequest } from "../functions/sendRequest.js";
export default class Modal {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.modal = document.querySelector(".modal-entrance");
        this.btnLogin = document.querySelector(".login-button");
        this.createVisitBtn = document.querySelector(".create-visit");
    }

    showModal() {
        this.btnLogin.addEventListener("click", () => {
            this.modal.style.display = "block";
            this.password.value = "";
            this.email.value = "";
        });

        this.close();
        this.checkCorrectValue();


        document.addEventListener("DOMContentLoaded", () => {
            const isUserLoggedIn = localStorage.getItem("btnLogin");
            const btnLogin = document.querySelector(".login-button");

            if (isUserLoggedIn === "true") {
                this.createVisitBtn.style.display = "block";
                btnLogin.style.display = "none";
            } else if (isUserLoggedIn === "false") {
                this.createVisitBtn.style.display = "none";
                btnLogin.style.display = "block";
            }
        });

    }

    close() {
        const close = document.querySelector(".close");
        close.addEventListener("click", () => {
            this.modal.style.display = "none";
        });
        document.body.addEventListener("click", (event) => {
            if (event.target === this.modal) {
                this.modal.style.display = "none";
            }
        });
    }


    checkCorrectValue() {
        const submit = document.getElementById("submitButton");
        submit.addEventListener("click", () => {
            this.loginUser()

        });
    }


    visitbtn() {
        localStorage.setItem("btnLogin", "true");
        this.createVisitBtn.style.display = "block";
        this.btnLogin.style.display = "none";
        this.modal.style.display = "none";
    }


    loginbtn() {
        localStorage.setItem("btnLogin", "false");
        this.createVisitBtn.style.display = "none";
        this.btnLogin.style.display = "block";
        this.email.value = ""
        this.password.value = ""
    }


    loginUser() {
        sendRequest(`${API}/login`, 'POST',{

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: `${this.email.value}`, password: `${this.password.value}`})
        })

            .then(response => {
                if (response.ok) {
                    this.visitbtn()
                    return response.text();
                } else {
                    alert('не вірний пароль або email');
                    this.loginbtn()
                }
            })
            .then(token => {
                if (typeof token !== 'undefined') {
                    localStorage.setItem('authToken', token);
                }
            })
    }

}