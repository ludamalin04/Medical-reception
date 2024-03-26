import Modal from "./modules/modal.js";
import { doctorsSelect } from "./modules/form.js"

const userEmail = document.getElementById("username")
const userPasswoed = document.getElementById("password")

const userLogin = new Modal (userEmail ,userPasswoed)
userLogin.showModal()


const doctorSelect = document.querySelector('.form-select');

doctorsSelect(doctorSelect)

