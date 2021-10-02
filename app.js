const main = document.getElementById('main')

class List {

    constructor(place, title){
        this.place = place;
        this.title = title;
        this.cardArray = [];

        this.render();
    }
    
    render(){
        this.createToDoList();
        this.place.append(this.toDoListElement);
    }
    
    createToDoList(){
        //create elements for to do list
        this.toDoListElement = document.createElement('div');
        this.div = document.createElement('div')
        this.listHeading = document.createElement('h3');
        this.addCardButton = document.createElement('button');
        this.addCardInput = document.createElement('input');

        //append elements to parent
        this.toDoListElement.append(this.listHeading);
        this.toDoListElement.append(this.addCardButton);
        this.toDoListElement.append(this.addCardInput);
        this.toDoListElement.append(this.div);

        //set to do list title
        this.listHeading.innerText = this.title;
        this.addCardButton.innerHTML = 'add new card'

        //add class lists
        this.toDoListElement.classList.add('toDoList');

        //event listener for creating a new card
        this.addCardButton.addEventListener('click', () => {
            this.addCard();
            this.addCardInput.value = '';
        })
    }

    addCard(){
        let text = this.addCardInput.value;
        new Card(text, this.div);
    }
}

class Card {

    constructor(text, place){

        this.text = text;
        this.place = place;

        this.render();
    }

    render(){

        //create card elements 
        this.card = document.createElement('div');
        this.label = document.createElement('label');
        this.label.innerText = this.text;

        //add class lists
        this.card.classList.add('card')

        //append elements to card
        this.card.append(this.label);
        this.place.append(this.card)
    }
}

let toDoListButton = document.getElementById('addTodoListButton');
let toDoListInput = document.getElementById('addTodoListInput');

let todoList1 = new List(main, "Planning");
let todoList2 = new List(main, "In Progress");
let todoList3 = new List(main, "Testing");
let todoList4 = new List(main, "Completed");

toDoListButton.addEventListener('click',()=>{
    if (toDoListInput.value != ''){
        new List(main, addTodoListInput.value);
        toDoListInput.value = ('')
    }
    
})