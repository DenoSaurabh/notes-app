// Getting application starting
console.log('Application TO-DO LIST has started correctly!');

var DOMstring = {
    description: '.add__description',
    date: '.add__date',
    time: '.add__time',
    enterButton: '.add__btn',
    p_Id: '.p-id',
    p_Description: '.p-description',
    p_Date: '.p-date',
    p_Time: '.p-time',
    deleteIcon: '.del-icon',
    delImg: '.del-img',
    editIcon: '.edit-icon',
    allTODO: '.list',
    tick_img: '.tick_img',
    changeImg: '.change_Img',
    circleImg: '.circle_img'
};

function changingDisplay() {
    document.querySelector(DOMstring.tick_img).style.display = 'block';
    document.querySelector(DOMstring.changeImg).style.display = 'none'; 
}

changingDisplay();

var emojis = ['😁','😎','😂','🤣','😒','😢','😉','😎','😜','😁','😆','🤔','😃','🎁','🐱‍🚀','🎶','🤷‍','️👏','🚑','🚋','🚡','🚑','🚌','🥐','🌯','🍱','🍛','🍕','🍔','🥪','🥡','👳‍','💂‍','️👨','👩','👸','👿','👻','🤥'];

var allData = [];
var ids = 0;

function Createlist(id, description, date, time) {
    
    this.id = id;
    this.description = description;
    this.date = date;
    this.time = time;
}

document.querySelector(DOMstring.enterButton).addEventListener('click', function(){
    
    // Get Data and Display it to Web browser
    appFunction();

    // Clear Fields
    clearingFields()

});



function appFunction() {

    // Getting Values
    var allValues = {
        descriptionValue: document.querySelector(DOMstring.description).value,
        dateValue: document.querySelector(DOMstring.date).value,
        timeValue: document.querySelector(DOMstring.time).value
    };

    if (allValues.descriptionValue !== '' && allValues.dateValue !== '' &&allValues.timeValue !== '' ){

            // Making new TO-DO List
            if (allData.length > 0){
                var newTODOList = new Createlist(allData[allData.length - 1].id + 1 , allValues.descriptionValue, allValues.dateValue, allValues.timeValue);
            } else {
                var newTODOList = new Createlist(0 , allValues.descriptionValue, allValues.dateValue, allValues.timeValue);
            }

            // Uploading TO-DO List to array
            allData.push(newTODOList);
        }

    // Displaying DATA Function (IIFEs) FUNCTION.
    var displayData = function () {
        if (allValues.descriptionValue !== '' && allValues.dateValue !== '' &&allValues.timeValue !== '' ){
                var html2, html3, html4, html5, html6;

                var html = '<div class="todo-list" id="%uniqueId%"><p class="p-id">%id%</p><p class="p-description">%description%</p><p class="p-date">%date%</p><p class="p-time">%time%</p><button class="del-icon"><img src="icons8-close-window-48.png" style="width: 40px;" class="del-img" id="delete-image" /></button><button class="edit-icon"><img src="icons8-compose-48.png" id="edit-image" /></button></div>';
                html2 = html.replace('%description%', allValues.descriptionValue);
                html3 = html2.replace('%date%', allValues.dateValue);
                html4 = html3.replace('%time%', allValues.timeValue);

                    if (allData.length > 0){
                        html5 = html4.replace('%id%', emojis[Math.floor(Math.random() * emojis.length)]);
                        html6 = html5.replace('%uniqueId%', allData[allData.length - 1].id + 1);
                    } else {
                        html5 = html4.replace('%id%', 0);
                        html6 = html5.replace('%uniqueId%', 0);
                    }

                document.querySelector(DOMstring.allTODO).insertAdjacentHTML('beforeend', html6);
            }
        
    };

    displayData();

    return { 
        returningDisplayData: function() {
            return displayData();
        }
    };


 }

 /* ********************************* CLEARING FIELDS **************************************** */


function clearingFields() {

    // Clearing all fields after entering a new TO-DO List
    var fields, allFields
    fields = document.querySelectorAll(DOMstring.description + ',' + DOMstring.date + ',' + DOMstring.time);
    allFields = Array.prototype.slice.call(fields);
    allFields.forEach(function(current, index, array){allFields[index].value = '';});
    allFields[0].focus();
}

document.querySelector(DOMstring.circleImg).addEventListener('click', clearingFields);

/* ********************************* DELEATING AN ITEM **************************************** */


document.querySelector(DOMstring.allTODO).addEventListener('click', deleteAndEditList);



function deleteAndEditList(event) {

        // event.target.parentNode.parentNode.id

    if (event.target.id === 'delete-image'){

        deleteData(event.target.parentNode.parentNode.id);
        deleteListUI(event.target.parentNode.parentNode.id);  

        // refreshing all IDs
        allData.map(function(c,i,a){allData[i].id = i});

    } else if (event.target.id === 'edit-image') {
        // changing Image
        document.querySelector(DOMstring.tick_img).style.display = 'none';
        document.querySelector(DOMstring.changeImg).style.display = 'block';

        // Edit Button Function
        editItem(event.target.parentNode.parentNode.id);
    }

   
}

var deleteData = function(id) {
    allData.splice(id, 1);
};

 function deleteListUI(selectorId) {
    var el = document.getElementById(selectorId);
    el.parentNode.removeChild(el);
}

/* ********************************* EDITING  AN ITEM **************************************** */


function editItem(id) {
    var oldValues, oldInput;

    // Grabing Values
    var des, tim, val;

    oldValues = {
        descriptionOldValue: document.getElementById(id).querySelector(DOMstring.p_Description).textContent,
        dateOldValue: document.getElementById(id).querySelector(DOMstring.p_Date).textContent,
        timeoldValue: document.getElementById(id).querySelector(DOMstring.p_Time).textContent
    };

    des = document.querySelector(DOMstring.description).value = oldValues.descriptionOldValue;
    dat = document.querySelector(DOMstring.date).value = oldValues.dateOldValue;
    tim = document.querySelector(DOMstring.time).value = oldValues.timeoldValue;

    if (oldValues.descriptionOldValue !== des) {
        document.getElementById(id).querySelector(DOMstring.p_Description).textContent = des;
    }

    
    document.querySelector(DOMstring.changeImg).addEventListener('click', changingItem);
    


    // Changing Item Function
    function changingItem() {
        
            var newDes, newDat, newTim;

            // Grabing Values
            newDes = document.querySelector(DOMstring.description).value;
            newDat = document.querySelector(DOMstring.date).value;
            newTim = document.querySelector(DOMstring.time).value;

            // Changing Values
            document.getElementById(id).querySelector(DOMstring.p_Description).textContent = newDes;
            document.getElementById(id).querySelector(DOMstring.p_Date).textContent = newDat;
            document.getElementById(id).querySelector(DOMstring.p_Time).textContent = newTim;

            // Converting to add List Display.
            changingDisplay()

    }


}





// ****************************************/-  PROJECT COMPLETED -/*************************************** //