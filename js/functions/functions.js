import { sendRequest } from "./sendRequest.js"
import { modalBig,  noItems } from "../modules/form.js"
import { token, API } from "../configs/APIToken.js"
import {VisitCardiologist,VisitDentist, VisitTherapist } from "../functions/classes.js"

//прописування структури великої модалки, яка спільна для всіх лікарів

export function forAll() {
    modalBig.insertAdjacentHTML('beforeend', `
        <input required type="text" name="goal" placeholder="мета візиту" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        <textarea name="description" class="form-control" placeholder="короткий опис візиту" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></textarea>
        <label class="urgency-select" for="urgency-select">Терміновість</label>
        <select required id="urgency-select" name="urgency" class="form-select" aria-label="Disabled select example">
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
        </select>
        <label class="status-select" for="status-select">Статус</label>
        <select required id="status-select" name="status" class="form-select" aria-label="Disabled select example">
            <option value="open">open</option>
            <option value="done">done</option>        
        </select>
        <input required name="name" type="text" placeholder="ПІБ" class="form-control form-control-name" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">     
`)
}


export function loadAndDisplayCards() {
    sendRequest(API, 'GET',{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => response.json())
    .then(data => {
        const cardDesc = document.querySelector('.card-desc');
        cardDesc.innerHTML = '';

        //видалення напису No items при створенні карток

        if (data.length > 0) {
            noItems.style.display = 'none'; 
        } else {
            noItems.style.display = 'block'; 
        }

        for (const key in data) {
            switch (data[key].doctors) {
                case "Кардіолог":
                    new VisitCardiologist(data[key]).render();
                    break;
                case "Стоматолог":
                    new VisitDentist(data[key]).render();
                    break;
                default:
                    new VisitTherapist(data[key]).render();
            }
        }
    });
}