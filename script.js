var curTime = moment();
const totalHour = 9; //9am to 5pm, set consts to avoid magic number in the codes
const startHour = 9; 

//function to generate all the time slots rows
function generateSlots() {
    //according to stylesheet the outer wrap has class "time-block"
    var olEl = $("<ol>");
    olEl.attr("class", "ime-block");
    $('div.container').append(olEl);

    //create each row
    for (var i = startHour; i < startHour + totalHour; i++) {
        var liEl = $("<li>");
        liEl.attr("class", "row"); //also based on style sheet
        $('ol').append(liEl);

        var str = '';
        //format the time label, i.e. 9am
        var h = i % 24; //make sure it's still correct if the calendar is till the second day
        if (h < 12) {
            str = h + "AM";
        } else if (h == 12) {
            str = h + "PM";
        } else {
            str = (h - 12) + "PM";
        }

        //each row has one one label, one textarea input event, one save button
        var label = $("<label>");
        label.attr("class", "col-1 hour py-3");
        label.text(str);
        
        var inputEl = $("<textarea>");
        inputEl.attr({
            'class': "col-10",
            'id': str,
            'data-begin': h, //time slot hour
        });

        label.attr("for", inputEl.attr('id'));
        inputEl.val(localStorage.getItem(inputEl.attr('id'))); //read value from localStorage in case user refresh page

        var saveBtn = $('<button>');
        saveBtn.attr("class", "col-1 saveBtn");
        //font awesome save icon
        saveBtn.html("<i class='fa fa-save'></i>")

        liEl.append(label).append(inputEl).append(saveBtn);  
        
        //save button onclick listener
        saveBtn.click(function(e) {callback(e)});
    }
}

//TODO...change this function to Jquery
//callback function for click save button eventlistener
function callback(event) {
    var element = $( event.target );
    if (element.is( "i" )) { // click i tag will also trigger button click, here we want the sibling of savebtn not <i>
        element = element.parent();
    }
    var inputEl = element.prev();
    var key = inputEl.attr('id');
    var value = inputEl.val();
    localStorage.setItem(key, value);
}

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

    for (var i = 0; i < classList.length; i++) {
        if (i === idx) {
            element.toggleClass(classList[i], true);
        } else {
            element.toggleClass(classList[i], false);
        }
    }
}


$( document ).ready(function() {
    generateSlots(); //create all the DOM 
    setTime(); // set time in description and color class in each row after page loaded

    //timer to trigger update time slot every hour on the hour
    //if you really want to be super accurate, we can even start timer on the minute using setTimeout()
    var timer = setInterval(function() {
        curTime = moment(); //update current time every minite
        var curMin = curTime.minute();
        minLeftBfRefresh = (60 - curMin) % 60;
        if (minLeftBfRefresh === 0) {
            setTime();
        }
    }, 1000 * 60);  
});

