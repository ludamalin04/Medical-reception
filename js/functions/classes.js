import {cardDesc} from "../modules/form.js"


//створення класу для карток


//батьківський клас
export class Visit {
    constructor(data) {
        this.name = data.name;
        this.doctors = data.doctors;
        this.urgency = data.urgency;
        this.status = data.status;
        this.goal = data.goal;
        this.description = data.description;
        this.id = data.id;
    }

    render(content) {
        cardDesc.insertAdjacentHTML('beforeend', `
       <div class="card-wrapper">
         <div class="card border-primary" style="width: 18rem;">
             <button type="submit" id="${this.id}" class="btn-close" aria-label="Close"></button>
             <div class="card-header"><b>${this.name}</b></div>
             <ul class="list-group list-group-flush">
                 <li class="list-group-item"><b>${this.doctors}</b></li>
             </ul>              
         </div>
         <div class="btn-container">
             <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown"
                     aria-expanded="false">
                 Показати більше
             </button>
             <ul class="dropdown-menu border-primary">
                 <li class="dropdown-item"><b>Терміновість: </b>${this.urgency}</li>
                 <li class="dropdown-itemH"><b>Статус: </b>${this.status}</li>                
                 <li class="dropdown-item"><b>Мета візиту: </b>${this.goal}</li>
                 <li class="big"><b>Опис візиту: </b>${this.description}</li>
                 ${content}
             </ul>
             <button type="submit" name="${this.id}" class="btn btn-outline-primary btn-edit">Редагувати</button>
         </div>
        </div>
       `)
    }
}

//дочірні класи
export class VisitCardiologist extends Visit {
    constructor(data) {
        super(data);
        this.bloodPressure = data.bloodPressure;
        this.weightIndex = data.weightIndex;
        this.age = data.age;
        this.anamnes = data.anamnes;
    }

    render() {
        super.render(`
        <li class="dropdown-item"><b>Звичайний тиск: </b>${this.bloodPressure}</li>
        <li class="dropdown-item"><b>Індекс маси тіла: </b>${this.weightIndex}</li>
        <li class="dropdown-item"><b>Вік: </b>${this.age}</li>
        <li class="big"><b>Перенесені захворювання ССС: </b>${this.anamnes}</li>`
        )
    }
}

export class VisitDentist extends Visit {
    constructor(data) {
        super(data)
        this.date = data.date;
    }

    render() {
        super.render(`
    <li class="dropdown-item"><b>Дата останнього візиту: </b>${this.date}</li>
    `)
    }
}

export class VisitTherapist extends Visit {
    constructor(data) {
        super(data)
        this.age = data.age;
    }

    render() {
        super.render(`
    <li class="dropdown-item"><b>Вік: </b>${this.age}</li> 
    `)
    }
}
