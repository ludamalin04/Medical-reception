import {sendRequest} from "../functions/sendRequest.js";
import {token, API} from "../configs/APIToken.js";
import {forAll, loadAndDisplayCards} from "../functions/functions.js"
import {Visit, VisitCardiologist, VisitDentist, VisitTherapist} from "../functions/classes.js"
import filter from "./filter.js";
export const noItems = document.querySelector(".noItems")
export const modalBig = document.querySelector('.modal-body-change');
export const cardDesc = document.querySelector('.card-desc');
const changeName = document.querySelector("#exampleModalLabel")

/////відкриття модалки 
const createVisitBtn = document.querySelector('.create-visit');
const modal = document.querySelector(".modal")

createVisitBtn.addEventListener("click", () => {
    modalContent.reset()
    modalBig.innerHTML = '';

    modal.style.display = "block"
    modal.classList.add("show")
    changeName.innerHTML = "Створити візит"
})

const btnClose = document.querySelector(".btn-close")
btnClose.addEventListener("click", () => {
    modal.style.display = "none";
});


document.body.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


//додаткові поля форми
export function doctorsSelect(formSelect) {
    formSelect.addEventListener('change', function () {
        if (!!modalBig.innerHTML) {
            modalBig.innerHTML = '';
        }
        if (this.value === "Кардіолог") {
            forAll();
            modalBig.insertAdjacentHTML('beforeend', `
                    <input required name="bloodPressure" type="text" placeholder="звичайний тиск" class="form-control"
                               aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    <input required name="weightIndex" type="text" placeholder="Індекс маси тіла" class="form-control"
                               aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    <textarea required name="anamnes" class="form-control"
                                  placeholder="перенесені захворювання серцево-судинної системи"
                                  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></textarea>
                    <input required name="age" type="text" placeholder="вік" class="form-control" aria-label="Sizing example input"
                               aria-describedby="inputGroup-sizing-sm">
                               <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрити</button>
                    <button type="submit" class="btn btn-primary btn-create">Створити</button>
            </div> 
            `)
        } else if (this.value === "Стоматолог") {
            forAll();
            modalBig.insertAdjacentHTML('beforeend', `
                    <input required name="date" type="text" placeholder="дата останнього відвідування, ДД.ММ.РР." class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
            <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрити</button>
                    <button type="submit" class="btn btn-primary btn-create">Створити</button>
            </div> 
    `)
        } else {
            forAll();
            modalBig.insertAdjacentHTML('beforeend', `          
                   <input required name="age" type="text" placeholder="вік" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
            <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрити</button>
                    <button type="submit" class="btn btn-primary btn-create">Створити</button>
            </div> 
    `)
        }
    })

}


//відправка при сабміті
const modalContent = document.querySelector('.modal-content');
const doctorSelect = document.querySelector('.form-select');

//закриття модалки при натискані на кнопку "Закрити"
modalContent.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('btn-secondary')) {
        modal.style.display = "none";
    }
});


//стерти все з форми при новому відкриті модалки
modal.addEventListener('show.bs.modal', function () {
    modalContent.dataset.id = "0";
    modalContent.reset()
    modalBig.innerHTML = '';
})

//взаємодія з кнопкою "створити"/"редагувати"

modalContent.addEventListener('submit', (event) => {
    event.preventDefault();
    modal.style.display = "none"
    noItems.style.display = "none"
    const information = new FormData(modalContent);


    //варіанти інформації для різних лікарів
    let bodyInfo;

    if (doctorSelect.value === "Кардіолог") {
        bodyInfo = {
            name: information.get('name'),
            doctors: information.get('doctors'),
            urgency: information.get('urgency'),
            status: information.get('status'),
            goal: information.get('goal'),
            description: information.get('description'),
            bloodPressure: information.get('bloodPressure'),
            weightIndex: information.get('weightIndex'),
            age: information.get('age'),
            anamnes: information.get('anamnes'),
        }
    } else if (doctorSelect.value === "Стоматолог") {
        bodyInfo = {
            name: information.get('name'),
            doctors: information.get('doctors'),
            urgency: information.get('urgency'),
            status: information.get('status'),
            goal: information.get('goal'),
            description: information.get('description'),
            date: information.get('date'),
        }
    } else {
        bodyInfo = {
            name: information.get('name'),
            doctors: information.get('doctors'),
            urgency: information.get('urgency'),
            status: information.get('status'),
            goal: information.get('goal'),
            description: information.get('description'),
            age: information.get('age'),
        }
    }

//запит на сервер для відправки даних з великого модального вікна

    if (modalContent.dataset.id === "0") {
        sendRequest(API, 'POST', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bodyInfo)
        })
            .then(response => response.json())
            .then(data => {
                if (data.doctors === "Кардіолог") {
                    new VisitCardiologist(data).render();
                } else if (data.doctors === "Стоматолог") {
                    new VisitDentist(data).render()
                } else {
                    new VisitTherapist(data).render()
                }
            })
    } else {

        //відправка інформації на картку після її редакції, видалення старої картки

        sendRequest(`${API}/${modalContent.dataset.id}`, 'PUT', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bodyInfo)
        })
            .then(response => response.json())
            .then(data => {
                if (data.doctors === "Кардіолог") {
                    new VisitCardiologist(data).render();
                } else if (data.doctors === "Стоматолог") {
                    new VisitDentist(data).render()
                } else {
                    new VisitTherapist(data).render()
                }
            })
        let btnClose = document.querySelector(`.btn-close[id='${modalContent.dataset.id}']`);
        btnClose.closest('.card-wrapper').remove();
    }
})


filter()

// відображення всіх карток при завантаженні сайту
window.addEventListener('load', function () {
    loadAndDisplayCards()
})


//видалення карток

cardDesc.addEventListener('click', (event) => {
    if (event.target.className === 'btn-close') {
        let cardId = event.target.id;
        sendRequest(`${API}/${cardId}`, "DELETE", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                loadAndDisplayCards()
            })
        event.target.closest('.card-wrapper').remove();
    }
})


// отримання інформації з картки


cardDesc.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-edit')) {
        let cardId = event.target.name;
        sendRequest(`${API}/${cardId}`, "GET", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then((data) => {
                editCard(data);
            })
            .then(()=>{
                changeName.innerHTML = "Редагувати картку візиту"
                const btnCraete = document.querySelector(".btn-create")
                btnCraete.innerHTML = "Редагувати"
            })
    }
})

// відкриття великої модалки при кліку на кнопку "редагувати"
//заповнення великої модалки інформацією з картки перед її редагуванням

function editCard(data) {
    createVisitBtn.click();
    modalContent.dataset.id = data.id.toString();

    let doctor = data.doctors;
    let doctor_select = document.getElementById('doctor-select');
    for (let key in doctor) {
        if (doctor_select.options[key].value === doctor) {
            doctor_select.options[key].selected = true;
            break;
        }
    }
    doctor_select.dispatchEvent(new Event("change"));

    setTimeout(() => {
        let goalInput = document.getElementsByName('goal');
        goalInput[0].value = data.goal;
        let descriptionInput = document.getElementsByName('description');
        descriptionInput[0].value = data.description;
        let urgencySelect = document.getElementById('urgency-select');
        let urgency = data.urgency;
        for (let key in urgency) {
            if (urgencySelect.options[key].value === urgency) {
                urgencySelect.options[key].selected = true;
                break;
            }
        }
        let statusSelect = document.getElementById('status-select');
        let status = data.status;
        for (let key in status) {
            if (statusSelect.options[key].value === status) {
                statusSelect.options[key].selected = true;
                break;
            }
        }
        let nameInput = document.getElementsByName('name');
        nameInput[0].value = data.name;
        let dateInput = document.getElementsByName('date');
        if (data.date) {
            dateInput[0].value = data.date;
        }
        let ageInput = document.getElementsByName('age');
        if (data.age) {
            ageInput[0].value = data.age;
        }
        let bloodPressureInput = document.getElementsByName('bloodPressure');
        if (data.bloodPressure) {
            bloodPressureInput[0].value = data.bloodPressure;
        }
        let weightIndexInput = document.getElementsByName('weightIndex');
        if (data.weightIndex) {
            weightIndexInput[0].value = data.weightIndex;
        }
        let anamnesInput = document.getElementsByName('anamnes');
        if (data.anamnes) {
            anamnesInput[0].value = data.anamnes;
        }
    }, 10)
}