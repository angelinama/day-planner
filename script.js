var todayDate = moment().format('LLLL');
var totalHour = 9; //9am to 5pm
var startHour = 9; 

//set current time in the header
$('#currentDay').text(todayDate);

//according to stylesheet the outer wrap has class "time-block"
var olEl = document.createElement('ol');
olEl.className = "time-block";
$('div.container').append(olEl);

//create each row
for (var h = startHour; h < startHour + totalHour; h++) {
    var liEl = document.createElement('li');
    liEl.className = "row"; //also based on style sheet
    $('ol').append(liEl);

   //format the time label, i.e. 9am
   if (h < 12) {
        var str = h + "AM";
   } else if (h == 12) {
        var str = h + "PM";
   } else {
        var str = h - 12 + "PM";
   }

    //each row has one one label, one textarea input event, one save button
    var label = document.createElement('label');
    label.className = "hour";
    label.textContent = str;
    
    var inputEl = document.createElement('textarea');
    inputEl.id = str;
    label.setAttribute("for", inputEl.id);

    var saveBtn = document.createElement('button');
    saveBtn.className = "saveBtn";
    //font awesome save icon
    var iEl = document.createElement('i');
    iEl.className = "fa fa-save";
    saveBtn.appendChild(iEl);

    liEl.appendChild(label);
    liEl.appendChild(inputEl);
    liEl.appendChild(saveBtn);


    //event listener
}