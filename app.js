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
        
        //append elements to parent
        this.toDoListElement.append(this.listHeading);
        this.toDoListElement.append(this.addCardButton);
     
        this.toDoListElement.append(this.div);

        //set to do list title
        this.listHeading.innerText = this.title;
        this.addCardButton.innerHTML = 'add new card'

        //add class lists
        this.toDoListElement.classList.add('toDoList');

        //event listener for creating a new card
        this.addCardButton.addEventListener('click', () => {
            this.addCardMenu();
        });

        //Drag and Drop Event listeners
        this.toDoListElement.addEventListener('dragover',(e)=>{
            e.preventDefault();
            const draggable = document.querySelector('.dragging')
            this.toDoListElement.append(draggable)
            this.toDoListElement.classList.add('toDoListHover')
        })

        this.toDoListElement.addEventListener('dragleave',(e)=>{
            e.preventDefault();
            this.toDoListElement.classList.remove('toDoListHover');
        })

        this.toDoListElement.addEventListener('drop',(e)=>{
            this.toDoListElement.classList.remove('toDoListHover');
        })
    }

    addCard(name,description){
        
        new Card(name, description, this.div);
    }

    addCardMenu(){
        
        this.menuContainer = document.createElement('div');
        
        this.cardNameLabel = document.createElement('label')
        this.cardName = document.createElement('input')
        
        this.taskDescriptionLabel = document.createElement('label')
        this.taskDescription = document.createElement('textarea');
        
        this.cancel = document.createElement('button');
        this.saveCard = document.createElement('button');
        

        document.body.appendChild(this.menuContainer);
        this.menuContainer.appendChild(this.cardNameLabel);
        this.menuContainer.appendChild(this.cardName);
        this.menuContainer.appendChild(this.taskDescriptionLabel)
        this.menuContainer.appendChild(this.taskDescription);
        this.menuContainer.appendChild(this.cancel);
        this.menuContainer.appendChild(this.saveCard);

        this.cardNameLabel.innerText = 'Task Name'
        this.taskDescriptionLabel.innerText = 'Task Description'
        this.cancel.innerText = 'X';
        this.saveCard.innerText = 'Save';
        this.taskDescription.placeholder = 'Enter details of your task here...';

        this.menuContainer.classList.add('menu');
        this.cardName.classList.add('cardName');
        
        this.cardName.innerText = this.text;

        this.cancel.addEventListener('click', ()=>{
            this.menuContainer.remove();
        })
        
        //Save button on the menu
        this.saveCard.addEventListener('click', ()=>{
            /*
            we need to make the heading editbable, and save the changes to the card object.
            we need to make the taskDescription editable, and save the changes to the card object.
            */

            let name = this.cardName.value
            let description = this.taskDescription.value
            this.addCard(name,description)
            this.menuContainer.remove();
        })

        
    }
}

class Card {

    constructor(text, description, place){

        this.text = text;
        this.place = place;
        this.description = description;

        this.render();
    }

    render(){

        //create card elements 
        this.card = document.createElement('div');
        this.label = document.createElement('label');
        this.deleteButton = document.createElement('button');

        this.label.innerText = this.text;

        //add class lists
        this.card.classList.add('card')
        this.card.draggable = 'true'

        //append elements to card
        this.card.append(this.label);
        this.place.append(this.card);
        this.card.appendChild(this.deleteButton);

        this.card.addEventListener('click',()=>{
            this.renderMenu();
        });


        //Event listeners for dragging card & delete button
        this.card.addEventListener('dragstart',(e)=>{
            let draggedCard = e.target
            draggedCard.classList.add('dragging');

            setTimeout(()=>{
                draggedCard.style.display = 'none';
            }, 0)
        })

        this.card.addEventListener('dragend', (e)=> {
            e.target.classList.remove('dragging');

            setTimeout(()=>{
                e.target.style.display = 'block'
            },0);
        });

        this.deleteButton.addEventListener('click', (e)=> {
            this.card.remove();
        })
    }

    renderMenu(){
        this.menuContainer = document.createElement('div');
        this.menuHeading = document.createElement('h2');
        this.removeMenu = document.createElement('button');
        this.saveMenu = document.createElement('button');
        this.taskDescription = document.createElement('textarea');

        document.body.appendChild(this.menuContainer);
        this.menuContainer.appendChild(this.menuHeading);
        this.menuContainer.appendChild(this.removeMenu);
        this.menuContainer.appendChild(this.saveMenu);
        this.menuContainer.appendChild(this.taskDescription);

        this.menuHeading.contentEditable = 'true';
        this.removeMenu.innerText = 'X';
        this.saveMenu.innerText = 'Save';
        
        this.menuContainer.classList.add('menu');
        this.menuHeading.classList.add('menuheading');
        
        this.menuHeading.innerText = this.text;
        this.taskDescription.value = this.description;

        this.removeMenu.addEventListener('click', ()=>{
            this.menuContainer.remove();
        })
        
        //Save button on the menu
        this.saveMenu.addEventListener('click', ()=>{
            /*
            we need to make the heading editbable, and save the changes to the card object.
            we need to make the taskDescription editable, and save the changes to the card object.
            */
            this.menuContainer.remove();
        })
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