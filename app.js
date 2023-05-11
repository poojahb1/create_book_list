//book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI(){}

//add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById("book-list");
    //create tr element
    const row = document.createElement("tr");
    //insert cols
    row.innerHTML = `
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href="#" class="delete">X</a></td>
    `
    //append row in list
    list.appendChild(row);
}

//delete book
UI.prototype.deleteBook = function(target){
    if(target.className === "delete"){
        target.parentElement.parentElement.remove();
    }
}

//clear fields
UI.prototype.clearFields = function(){
    const title = document.getElementById("title").value = "";
    const author = document.getElementById("author").value = "";
    const isbn = document.getElementById("isbn").value = "";

}

//show alert
UI.prototype.showAlert = function(msg, className){
    //add classes
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(msg));
    //insert div in DOM
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    // timeout after 3 sec
    setTimeout(function(){
        document.querySelector(".alert").remove();
    }, 3000)
}

//event listeners
document.getElementById("book-form").addEventListener("submit", function(e){
    //get form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    //instantiate book
    const book = new Book(title, author, isbn);

    //instantiate UI
    const ui = new UI();

    //validate
    if(title==="" || author==="" || isbn===""){
        ui.showAlert("Please fill in all fields", "error");
    }else{
        //add book to list
        ui.addBookToList(book);

        //show alert
        ui.showAlert("Book Added!", "success");

        //clear fields
        ui.clearFields();
    }


    e.preventDefault();
})

//event listener for delete
document.querySelector("#book-list").addEventListener("click", function(e){
    //instantiate UI
    const ui = new UI();
    ui.deleteBook(e.target);
    //show alert
    ui.showAlert("Book Removed","success")
    e.preventDefault();
})