// console.log("Welcome to  javascript projectg ");

showNotes();

// if user adds a notes , add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let AddTitle = document.getElementById("AddTitle");
  let notes = localStorage.getItem("notes");

  if (AddTitle.value == "" && addTxt.value == "") {
    return alert("Please Add SomeThing");
  }
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: AddTitle.value,
    text: addTxt.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  AddTitle.value = ""; // clear ther title
  console.log(notes);
  showNotes();
});
//  function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";

  notesObj.forEach(function (element, index) {
    html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text"> ${element.text}</p>
                            <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                            <button id="${index}"onclick="EditNote(this.id)" class="btn btn-primary">Edit Note</button>
                        </div>
                    </div>`;
  });

  let notesEln = document.getElementById("notes");

  if (notesObj.length != 0) {
    notesEln.innerHTML = html;
  } else {
    notesEln.innerHTML = ` NOthing to show ! Use "Add a Note" section above to add notes.`;
  }
}

// function to delete a note

function deleteNote(index) {
  let confirmDelO = confirm("You are deleting this note!!!");

  if (confirmDelO == true) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
  } else {
    return alert("Not deleted");
  }
  console.log("delete is working");
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log("input event fired!", inputVal);
  let noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    let cardTxt2 = element.getElementsByTagName("h5")[0].innerText;

    if (cardTxt.includes(inputVal) || cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

// function to Edit a note
function EditNote(index) {
  let notes = localStorage.getItem("notes");

  if (AddTitle.value != "" || addTxt.value != "") {
    return alert("Please Clear the form before editing a note");
  }

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.findIndex((element, index) => {
    AddTitle.value = element.title;
    addTxt.value = element.text;
    console.log(notesObj);
  });
  
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  
  showNotes();
}
