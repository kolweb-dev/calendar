let popup = document.querySelector("#popup"),
    addEvent = document.querySelector("#addEvent"),
    popupClose = document.querySelector('#popupClose'),
    popupMultiselect = document.querySelector('.popup__multiselect');
let checkboxes = document.querySelector("#checkboxes");
let popupSelect = document.querySelector('#popupSelect');
let creatEvent = popup.querySelector('#creatEvent');
let selectWorkTime = document.querySelector('#selectWorkTime');
let checkInput = document.querySelectorAll('.popupUser');
let booked = document.querySelector('.booked');
let eventPerson = document.querySelector('#eventPerson');
let eventOptions = eventPerson.querySelectorAll('option');
let enventInput = document.querySelector('.popup__item-event')
popupSelect.innerHTML = '';
const worksDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeFay = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const eventAll = [{person: ["Maria"], nameEvent: "Daily Standup", time: "10:00", day: "Monday"},
    {person: ["Bob","Alex"], nameEvent: "FE team sync", time: "11:00", day: "Monday"},
    {person: ["Maria","Bob","Alex"], nameEvent: "Planning session", time: "13:00", day: "Thursday"}
];

creatEvent.classList.add('btn-disabled');
creatEvent.disabled = true;

enventInput.oninput = function () {
    if(enventInput.value.length > 0){
        creatEvent.style.opacity = '1';
        creatEvent.style.cursor = 'pointer';
        creatEvent.disabled = false;
    }else if(enventInput.value.length === 0){
        creatEvent.style.opacity = '.4';
        creatEvent.style.cursor = 'default';
        creatEvent.disabled = true;
    }
}

function checkEvent(arr,day,time){
    for (let element of eventAll){
        if (element.day === day && element.time === time){
            return false;
        }
    }
    return true;
}

function filterPersonEvent(person){
    let eventsMaria = [];
    eventAll.forEach((element) =>{
        for (let i of element.person)
            if (i === person){
                eventsMaria.push(element);
            }
    })
    return eventsMaria;
}
eventPerson.addEventListener('click',()=>{
    if (eventPerson.value === 'Maria'){
        renderCalendar(filterPersonEvent('Maria'));
    }else if(eventPerson.value === 'Bob'){
        renderCalendar(filterPersonEvent('Bob'));
    }else if(eventPerson.value === 'Alex'){
        renderCalendar(filterPersonEvent('Alex'));
    }else if(eventPerson.value === 'All members'){
        renderCalendar(eventAll);
    }
})

/*????? form does not submit*/
document.querySelector('#formPopup').addEventListener('submit', function (e) {
    e.preventDefault();
})

renderCalendar(eventAll);




let namesArray = [];


creatEvent.addEventListener('click', () => {
    let calendarTabelTime = document.querySelector('.calendar-table')
    let workTimeStrings = calendarTabelTime.rows;
    let eventDays = document.querySelector('#eventDays').value;
    
    let newEnventText = popup.querySelector('.popup__item-event').value;
    let selectWorkTime = document.querySelector('#selectWorkTime').value;
    let checkedInputArray = [];

    if (checkEvent(eventAll,eventDays,selectWorkTime)){
        for (let elm of checkInput) {
            if (elm.checked)
                checkedInputArray.push(elm.name)
        }
        eventAll.push({
            person: checkedInputArray.slice(),
            nameEvent: newEnventText,
            time: selectWorkTime,
            day: eventDays
        })
        popup.style.display = "none";
        if (booked.style.display === 'block'){
            booked.style.display = 'none';

        }
    }else{
        booked.style.display = 'block';
        enventInput = checkedInputArray.slice();
        enventInput.value = '';
    }



    renderCalendar(eventAll);


    for (let elm of checkInput) {
        elm.checked = false;
    }

    checkedInputArray = [];
    eventPerson.value = 'All members';
    namesArray = [];
    popupSelect.innerHTML = '';
    enventInput.value = ' ';
    popupSelect.innerHTML = ' ';
    creatEvent.disabled = true;
    creatEvent.style.cursor = 'default';
    creatEvent.style.opacity = '.4';
    checkboxes.style.display = 'none';
})

addEvent.onclick = function () {
    popup.style.display = "block";
}
popupClose.onclick = function () {
    popup.style.display = "none ";

}

function showCheckboxes() {
    let checkboxesStyle = getComputedStyle(checkboxes)
    if (checkboxesStyle.display === 'none') {
        checkboxes.style.display = 'block';
    } else {
        checkboxes.style.display = 'none';
    }
}


for (let i = 0; i < checkInput.length; i++) {
    checkInput[i].addEventListener('change', e => {

        if (e.target.checked) {
            namesArray.push(e.target.name)
            popupSelect.innerHTML = namesArray.join(',');

        } else if (!e.target.checked) {
            let indexDelete = namesArray.indexOf(e.target.name);
            namesArray.splice(indexDelete, 1)
            popupSelect.innerHTML = namesArray.join(',')

        }
    })
}





let deleteBox = document.querySelector('.deletie-box');
let trElements = document.getElementsByTagName('tr');

for (let tr of trElements){
    tr.addEventListener('click', (event)=>{
        let deleteBtnNo = document.querySelector('#deleteBtnNo');
        let deleteBtnYes = document.querySelector('#deleteBtnYes');
        if (event.target.getAttribute('class') === 'delete-event'){
            deleteBox.style.display = 'flex';
            deleteBtnNo.addEventListener('click', ()=>{
                deleteBox.style.display = 'none';
            })
            deleteBtnYes.addEventListener('click', ()=>{
                let parentText = Array.from(event.target.parentNode.innerHTML);

                let indexEndWord = parentText.indexOf('<');
                let wordDelete = parentText.slice(0,indexEndWord).join('');




                for (let i=0; i < eventAll.length; i++){

                    if (eventAll[i].nameEvent === wordDelete){

                        eventAll.splice(i,1)

                    }
                }


                renderCalendar(eventAll);

                deleteBox.style.display = 'none';
            })
        }
    })
}

function renderCalendar(eventAll) {
    let eventDays = document.querySelector('#eventDays').value;
    let selectWorkTime = document.querySelector('#selectWorkTime').value;
    let calendarTabelTime = document.querySelector('.calendar-table')
    let workTimeStrings = calendarTabelTime.rows;
    let newEnventText = popup.querySelector('.popup__item-event').value;

    for (let i=1;i<workTimeStrings.length;i++){
        for (let y=0; y < 6;y++){

            if(workTimeStrings[i].children[y].className === 'event'){
                workTimeStrings[i].children[y].textContent = ' ';
                workTimeStrings[i].children[y].classList.remove('event');
            }
        }
    }

    for (let elm of eventAll) {
        let indexDay = worksDay.indexOf(elm.day) + 1;
        let indexTime = timeFay.indexOf(elm.time) + 1;

        workTimeStrings[indexTime].children[indexDay].classList = 'event';
        workTimeStrings[indexTime].children[indexDay].textContent = elm.nameEvent;

        workTimeStrings[indexTime].children[indexDay].insertAdjacentHTML('beforeEnd',
            '<span class="delete-event">X</span>');
    }
}
document.querySelector('.booked__btn').addEventListener('click',()=>{
    booked.style.display = 'none';
})





