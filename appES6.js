//book constructor
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI constructor
class UI{
    //add book to list
    addBookToList(book){
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
    deleteBook(target){
        if(target.className === "delete"){
            target.parentElement.parentElement.remove();
        }
    }

    //clear fields
    clearFields(){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }
    
    //show alert
    showAlert(msg, className){
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
    
}


//local storage class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem("books") === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem("books")); 
        }

        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI();
            //add book to list
            ui.addBookToList(book);
        })
    }

    static addBooks(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBooks(isbn){
        const books = Store.getBooks();
        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index,1)
            }
        })
        localStorage.setItem("books", JSON.stringify(books));
    }
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

        //add book to local storage
        Store.addBooks(book);

        //show alert
        ui.showAlert("Book Added!", "success");

        //clear fields
        ui.clearFields();
    }


    e.preventDefault();
})

//DOM load event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

//event listener for delete
document.querySelector("#book-list").addEventListener("click", function(e){
    //instantiate UI
    const ui = new UI();
    ui.deleteBook(e.target);
    //remove book from local storage
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
    //show alert
    ui.showAlert("Book Removed","success")
    e.preventDefault();
})

