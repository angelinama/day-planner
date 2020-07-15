var curTime = moment();
const totalHour = 9; //9am to 5pm, set consts to avoid magic number in the codes
const startHour = 18; 

//function to generate all the time slots rows
function generateSlots() {
    //according to stylesheet the outer wrap has class "time-block"
    var olEl = document.createElement('ol');
    olEl.className = "time-block";
    $('div.container').append(olEl);

    //create each row
    for (var h = startHour; h < startHour + totalHour; h++) {
        var liEl = document.createElement('li');
        liEl.className = "row"; //also based on style sheet
        $('ol').append(liEl);

        var str = '';
        //format the time label, i.e. 9am
        if (h < 12) {
            str = h + "AM";
        } else if (h == 12) {
            str = h + "PM";
        } else {
            str = h - 12 + "PM";
        }

        //each row has one one label, one textarea input event, one save button
        var label = document.createElement('label');
        label.className = "col-1 hour py-3";
        label.textContent = str;
        
        var inputEl = document.createElement('textarea');
        inputEl.className = "col-10";
        inputEl.id = str;
        //each time slot start from current hour end (not included) endTime
        inputEl.setAttribute('data-begin', h);
        // inputEl.setAttribute('data-end', h + 1);
        label.setAttribute("for", inputEl.id);

        var saveBtn = document.createElement('button');
        saveBtn.className = "col-1 saveBtn";
        //font awesome save icon
        var iEl = document.createElement('i');
        iEl.className = "fa fa-save";
        saveBtn.appendChild(iEl);

        liEl.appendChild(label);
        liEl.appendChild(inputEl);
        liEl.appendChild(saveBtn);    
    }
}
//TODO...event listener when click save

// change color class for time slots and refresh the date in description
function setTime() {
    //update date, this could be done by just at 12AM but here without check to use this function to set time when page load too
    todayDate = curTime.format('dddd, MMMM DD');
    $('#currentDay').text(todayDate);
    
    //update class for all the input textarea 
    $('textarea').each(function() {
        if ($(this).attr('data-begin') < curTime.hour()) { // should have class "past"
            changeClass($(this), 'past');     
        }  else if ($(this).attr('data-begin') == curTime.hour()) {//should have class "present"
            changeClass($(this), 'present'); 
        } else {
            changeClass($(this), 'future');
        }
    });
}

//Helper fucntion: to change the class of <element> and add <target> class to element
function changeClass(element, target) {
    var classList = ['past', 'present','future'];
    var idx = classList.indexOf(target);
    classList.splice(idx, 1);

    for (var i = 0; i < classList.length; i++) {
        if (element.hasClass(classList[i])) {
            element.removeClass(classList[i]);
        }
    }

    element.addClass(target);
}


$( document ).ready(function() {
    generateSlots(); //create all the DOM 
    setTime(); // set time in description and color class in each row after page loaded

    //timer to trigger update time slot every hour on the hour
    var timer = setInterval(function() {
        curTime = moment(); //update current time every minite
        var curMin = curTime.minute();
        minLeftBfRefresh = (60 - curMin) % 60;
        if (minLeftBfRefresh === 0) {
            setTime();
        }
    }, 1000 * 60);  
});

