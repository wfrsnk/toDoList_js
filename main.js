var checkId = 0;
var countText = ' item left';
var flagCheck = true;

const footer = document.getElementById('footerID');
const divCounter = document.getElementById('count');
const inputEdit = document.getElementById('inputEdit');
const current = document.getElementById('currentId');
const selectHeader = document.querySelector('.select__header');
const selectItem = document.querySelectorAll('.select__item');
const select = document.getElementById('selectID');
const lu = document.getElementById('luID');
const luTag = document.getElementsByTagName('lu');
const li = document.getElementsByTagName('li');
const crossId = document.getElementById('closeId');
const iconId = document.getElementById('icon');



selectHeader.addEventListener('click', selectToggle);

function selectToggle() {
    this.parentElement.classList.add('is-active');
};

function checkAll() {
    flagCheck = !flagCheck;
    if (flagCheck === true) {

        for (let i = 0; i < li.length; i++) {

            li[i].firstElementChild.firstElementChild.checked = false;
            li[i].children[1].setAttribute('class', 'taskText');
        }
    } else {
        for (let i = 0; i < li.length; i++) {
            li[i].firstElementChild.firstElementChild.checked = true;
            li[i].children[1].setAttribute('class', 'taskTextChoesed');
        }
    }
    document.getElementById('clear').innerHTML = 'Clear completed';
    countList();
};


function showActive() {
    for (let i = 0; i < li.length; i++) {
        let flag = li[i].firstElementChild.firstElementChild.checked
        if (flag === true)
            li[i].style.display = 'none';
        else
            li[i].style.display = 'flex';
    }
    document.getElementById('all').style.border = 'none';
    document.getElementById('active').style.border = '1px solid #d19090';
    document.getElementById('completed').style.border = 'none';
};

function showAll() {
    for (let i = 0; i < li.length; i++) {
        li[i].style.display = 'flex';
    }
    document.getElementById('all').style.border = '1px solid #d19090';
    document.getElementById('active').style.border = 'none';
    document.getElementById('completed').style.border = 'none';
};

function showCompleted() {
    for (let i = 0; i < li.length; i++) {
        let flag = li[i].firstElementChild.firstElementChild.checked
        if (flag === false)
            li[i].style.display = 'none';
        else
            li[i].style.display = 'flex';
    }
    document.getElementById('all').style.border = 'none';
    document.getElementById('active').style.border = 'none';
    document.getElementById('completed').style.border = '1px solid #d19090';
};

function chooseCheckBox(id) {
    textCheckboxId = 'text__';
    textCheckboxId += id;
    let textElement = document.getElementById(textCheckboxId);
    let checkBoxId = document.getElementById(id);

    if (checkBoxId.checked) {
        textElement.setAttribute('class', 'taskTextChoesed');
    } else {
        textElement.setAttribute('class', 'taskText');
    }
    let flagForClear = false;
    for (let i = 0; i < li.length; i++)
        if (li[i].firstElementChild.firstElementChild.checked === true)
            flagForClear = true;
    if (flagForClear === true)
        document.getElementById('clear').innerHTML = 'Clear completed';
    else
        document.getElementById('clear').innerHTML = '';
    countList();
};

function deleteStr(id) {
    console.log(id);
    console.log(luTag);

    for (let i = 0; i < luTag[0].children.length; i++) {
        if (luTag[0].children[i].children[2].id === id)
            li[i].remove();
    }
    if (lu.innerHTML === '') {
        footer.innerHTML = '';
        iconId.innerHTML = '';
    }

    countList();
};

function countList() {
    let count = 0;
    for (let i = 0; i < li.length; i++)
        if (li[i].firstElementChild.firstElementChild.checked === false && li[i].style.display != 'none')
            count++;

    if (footer.innerHTML != '') {
        if (count === 1)
            countText = ' item left';
        else
            countText = ' items left';
        document.getElementById('count').innerHTML = count + countText;
    }
};

function delCompleted() {

    console.log('luTag[0]: ', luTag);
    for (let i = 0; i < luTag[0].children.length; i++) {
        if (luTag[0].children[i].firstElementChild.firstElementChild.checked === true) {
            li[i].remove();
            i--;
        }
    }
    document.getElementById('clear').innerHTML = '';
    if (lu.innerHTML === '') {
        footer.innerHTML = '';
        iconId.innerHTML = '';
    }
};



function handleKeyPress(e) {
    let key = e.which;

    if (key === 13 && inputEdit.value != '') {
        let flagRepet = false;
        console.log('li: ', li);
        for (let i = 0; i < li.length; i++) {
            if (inputEdit.value === document.getElementById('text__checkbox' + i).innerHTML)
                flagRepet = true;
        }
        if (flagRepet === true)
            inputEdit.value = '';
        else {
            iconId.innerHTML = '<img src="./icon.png">';
            lu.innerHTML += `<li class="select__item">
        
        <div class="round">
            <input  type="checkbox" onclick = "chooseCheckBox(id)" id="checkbox` + checkId + `"/>
            <label  for="checkbox` + checkId + `"></label>
        </div>
        <div id = "text__checkbox` + checkId + `" class = "taskText"  >` + inputEdit.value + `</div>
        
        <div id = "close` + checkId + `" class="close" onclick = "deleteStr(id)"></div>
        </li>`;


            footer.innerHTML = `<div class="footer">
                                <div id = "count" class = "counter"></div>                               
                                <div class ="divButton" ><button id="all" onclick = "showAll()">All</button>
                                <button id="active" onclick = "showActive()">Active</button>
                                <button id="completed" onclick = "showCompleted()">Completed</button></div>
                                <div id="clear" class="counter" onclick = "delCompleted()"></div>
                            </div>
                            <div class="backDiv1"></div>
                            <div class="backDiv2"></div>`
            showAll();
            countList();
            inputEdit.value = '';
            checkId++;
        }

    }
};