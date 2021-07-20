function generateID() {
    return '_' + Math.random().toString(36).substr(2, 10);
}
function checkTime(time) {
    // return true if the current time is lower than the given time else return false
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const [hours, minutes] = time.split(":");
    const isHoursLower = currentHours > parseInt(hours) ? false : true;
    if (isHoursLower) {
        const isMinsLower = currentMinutes > parseInt(minutes) ? false : true;
        if (isMinsLower) {
            return false;
        }
    }
    return true;
}
function checkDate(inputDate) {
    const currentDate = new Date();
    const dateObject = new Date(inputDate);
    return dateObject.setHours(0, 0, 0, 0) >= currentDate.setHours(0, 0, 0, 0);
}
function clearForm() {
    const myForm = document.getElementById("myForm")
    myForm.noteArea.value = "";
    myForm.dateNote.value = "";
    myForm.timeNote.value = "";
}
function addNote() {
    const myForm = document.getElementById("myForm");
    let textNote = myForm.noteArea.value;
    const dateNote = myForm.dateNote.value;
    const timeNote = myForm.timeNote.value;

    const currentDate = new Date();
    const dateObject = new Date(dateNote);
    
    const isValidDate = dateObject.setHours(0, 0, 0, 0) >= currentDate.setHours(0, 0, 0, 0);
    const isToday = dateObject.setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0);
    if (textNote === "") {
        alert("please insert your note text")
        return;
    }
    if (!isValidDate || dateNote === "") {
        alert("please insert a legal date");
        return;
    }

    if (isToday && checkTime(timeNote) && timeNote !== "") {
        alert("please insert a legal time");
        return;

    }

    textNote = textNote.toString().replaceAll("\n", "<br>");
    const noteObject = {
        text: textNote,
        date: dateNote,
        time: timeNote
    };
    const noteID = generateID();
    localStorage.setItem(noteID, JSON.stringify(noteObject));
    createNote(noteObject, noteID);
    clearForm();

}
function createNote(noteObject, noteID) {
    const notes = document.getElementById("notes");
    const noteDiv = document.createElement("div");
    const noteTextDiv = document.createElement("div");
    const glyphIcon = document.createElement("i");
    const noteDateTime = document.createElement("div");

    noteDiv.className = "note";
    noteDiv.id = noteID;
    // glyph icon
    glyphIcon.classList.add("fas", "fa-minus-circle");
    glyphIcon.setAttribute("onclick", `deleteNote("${noteID}")`);
    noteDiv.appendChild(glyphIcon);

    //the text
    noteTextDiv.className = "note-text";
    noteTextDiv.innerHTML += noteObject.text;
    noteDiv.appendChild(noteTextDiv);

    noteDateTime.className = "note-date-time";
    noteDateTime.innerHTML += `${noteObject.date}<br>${noteObject.time}`;
    noteDiv.appendChild(noteDateTime);

    notes.appendChild(noteDiv);

}

function deleteNote(id) {
    localStorage.removeItem(id);
    document.getElementById(id).remove()
}
window.onload = function () {
    let len = localStorage.length;
    for (let i = 0; i < len; ++i) {
        const noteID = localStorage.key(i);
        const noteObject = JSON.parse(localStorage.getItem(noteID));
        createNote(noteObject, noteID);
    }

}