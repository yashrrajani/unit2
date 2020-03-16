/******************************************
Project 2 - Dynamic Web Page: Pagination and Filtering
Adapted from Treehouse FSJS Techdegree:
Yash Rajani - Advanced Topics in Computer Science Period 3
******************************************/



//variables that grab the entire list of student names and its children, which are the names themselves
var studentList = document.getElementsByClassName('student-list')[0]; 
var names = studentList.children;

//variables for the page itself
const page = document.getElementsByClassName("page")[0]; //page
const page_div = document.createElement("div"); //creates a div for the page
page_div.className = "pagination"; //gives the div a class name
page.appendChild(page_div); //appends the div to the page

//variables for the content of the page
const pageList = document.createElement("ul"); //creates list for students
page_div.appendChild(pageList); //appends list to the page div created earlier


//variables for the search bar on the page
const searchDiv = document.createElement("div"); //creates search div
searchDiv.className = "student-search"; //names the search div

const pageHeader = document.getElementsByClassName("page-header cf")[0]; //header for the search bar
pageHeader.appendChild(searchDiv); //appends to search div

const input = document.createElement("input"); //creates input option in search bar
input.placeholder = "Search for students..."; //pre-existing text in the search bar
searchDiv.appendChild(input); //appends input option to the search div

const button = document.createElement("button"); //creates the button itself for searching
button.textContent = "Search"; //gives the button a display name
searchDiv.appendChild(button); //appends button to the search div


//controls the page display with desired number of students per page
function showPage(page, list) { //takes in page number and the overall student list
   var start = (page * 10) - 10; //start index
   var end = (page * 10); //end index
   for (let i of names) { //initially hides all names
      i.style.display = "none";
   }
   for (let i = 0; i < list.length; i++) { 
      if (i >= start && i < end) //if i falls within start and end index...
         list[i].style.display = "block"; //show the names
   }
}


//creates buttons with functions to navigate through the big list
function appendPageLinks(list) { //takes a list
   var buttonNum = Math.ceil(list.length / 10); //sets the number of buttons for 10 per page
   var oldButtons = pageList.children;
   for (let i = oldButtons.length - 1; i >= 0; i--) {
      pageList.removeChild(oldButtons[i]);
   }
   for (let i = 0; i < buttonNum; i++) {
      let child = document.createElement("li"); //creates a child element to display
      pageList.appendChild(child); //append child to the page
      let actual = document.createElement("A"); //creates a new element with tag name "A"
      actual.textContent = i + 1; //add one to the display
      
      if ( i == 0 )
         actual.className = "active"; //automatically display the first page and select first button
      child.appendChild(actual); //append child to list
   }

   showPage(1, list); //display first page

}


//creates event listeners for navigating the page through buttons
pageList.addEventListener('click', () => { 
   var target = event.target; //on click, set a target for the page

   if (target.tagName == "A") { 
      for (let a of pageList.children) { //for every button...
         a.firstElementChild.className = ""; //initially do not trigger it
      }
      target.className = "active"; //change to active if tag name is "A"
      showPage(target.textContent, search()); //call showPage function based on which button is clicked
   }
});


//search function to filter through the list based on keywords
function search() {
   var arr = []; //create empty array
   for (let x of names) {
      if ((x.children[0].children[1].textContent).indexOf(input.value) != -1) //if keyword is found...
         arr.push(x); //add the names to the array
   }
   
   return arr; //return the updated array of names
   
   
}


button.addEventListener("click", () => {
   appendPageLinks(search()); //add functionality to button click
})
input.addEventListener('keyup', () => {
   appendPageLinks(search()); //add functionality to keyup
})

appendPageLinks(names); //call button functions

