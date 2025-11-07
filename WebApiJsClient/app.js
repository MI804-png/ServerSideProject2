// Configuration
const TODO_API_URL = 'https://localhost:7000/api/TodoItems';
const BOOKS_API_URL = 'https://localhost:7001/api/Books';

// Helper function to display API responses
function displayResponse(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = 'block';
}

// Helper function to handle API errors
function handleApiError(error, responseElementId) {
    console.error('API Error:', error);
    displayResponse(responseElementId, `Error: ${error.message}`);
}

// ====================
// TODO API Functions
// ====================

// Get all todos
async function getTodos() {
    try {
        const response = await fetch(TODO_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const todos = await response.json();
        displayTodos(todos);
        displayResponse('todoResponse', `Retrieved ${todos.length} todo items`);
    } catch (error) {
        handleApiError(error, 'todoResponse');
    }
}

// Add a new todo
async function addTodo() {
    const name = document.getElementById('todoName').value.trim();
    const isComplete = document.getElementById('todoComplete').checked;
    
    if (!name) {
        displayResponse('todoResponse', 'Please enter a todo name');
        return;
    }
    
    const todo = {
        name: name,
        isComplete: isComplete
    };
    
    try {
        const response = await fetch(TODO_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const createdTodo = await response.json();
        displayResponse('todoResponse', `Todo created successfully with ID: ${createdTodo.id}`);
        
        // Clear form
        document.getElementById('todoName').value = '';
        document.getElementById('todoComplete').checked = false;
        
        // Refresh the list
        getTodos();
    } catch (error) {
        handleApiError(error, 'todoResponse');
    }
}

// Update todo completion status
async function updateTodo(id, name, isComplete) {
    const todo = {
        id: id,
        name: name,
        isComplete: !isComplete
    };
    
    try {
        const response = await fetch(`${TODO_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        displayResponse('todoResponse', `Todo ${id} updated successfully`);
        getTodos(); // Refresh the list
    } catch (error) {
        handleApiError(error, 'todoResponse');
    }
}

// Delete a todo
async function deleteTodo(id) {
    if (!confirm('Are you sure you want to delete this todo?')) {
        return;
    }
    
    try {
        const response = await fetch(`${TODO_API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        displayResponse('todoResponse', `Todo ${id} deleted successfully`);
        getTodos(); // Refresh the list
    } catch (error) {
        handleApiError(error, 'todoResponse');
    }
}

// Display todos in the table
function displayTodos(todos) {
    const table = document.getElementById('todosTable');
    const tbody = document.getElementById('todosBody');
    
    if (todos.length === 0) {
        table.style.display = 'none';
        return;
    }
    
    tbody.innerHTML = '';
    todos.forEach(todo => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${todo.id}</td>
            <td class="${todo.isComplete ? 'completed' : ''}">${todo.name}</td>
            <td>${todo.isComplete ? 'Yes' : 'No'}</td>
            <td>
                <button onclick="updateTodo(${todo.id}, '${todo.name}', ${todo.isComplete})">
                    ${todo.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button class="delete" onclick="deleteTodo(${todo.id})">Delete</button>
            </td>
        `;
    });
    
    table.style.display = 'table';
}

// Clear todos display
function clearTodos() {
    document.getElementById('todosTable').style.display = 'none';
    displayResponse('todoResponse', 'Todo list cleared from display');
}

// ====================
// BOOKS API Functions
// ====================

// Get all books
async function getBooks() {
    try {
        const response = await fetch(BOOKS_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        displayBooks(books);
        displayResponse('booksResponse', `Retrieved ${books.length} books`);
    } catch (error) {
        handleApiError(error, 'booksResponse');
    }
}

// Add a new book
async function addBook() {
    const bookName = document.getElementById('bookName').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const category = document.getElementById('bookCategory').value.trim();
    const price = parseFloat(document.getElementById('bookPrice').value);
    
    if (!bookName || !author || !category || isNaN(price)) {
        displayResponse('booksResponse', 'Please fill in all fields with valid data');
        return;
    }
    
    const book = {
        bookName: bookName,
        author: author,
        category: category,
        price: price
    };
    
    try {
        const response = await fetch(BOOKS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const createdBook = await response.json();
        displayResponse('booksResponse', `Book created successfully with ID: ${createdBook.id}`);
        
        // Clear form
        document.getElementById('bookName').value = '';
        document.getElementById('bookAuthor').value = '';
        document.getElementById('bookCategory').value = '';
        document.getElementById('bookPrice').value = '';
        
        // Refresh the list
        getBooks();
    } catch (error) {
        handleApiError(error, 'booksResponse');
    }
}

// Delete a book
async function deleteBook(id) {
    if (!confirm('Are you sure you want to delete this book?')) {
        return;
    }
    
    try {
        const response = await fetch(`${BOOKS_API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        displayResponse('booksResponse', `Book ${id} deleted successfully`);
        getBooks(); // Refresh the list
    } catch (error) {
        handleApiError(error, 'booksResponse');
    }
}

// Display books in the table
function displayBooks(books) {
    const table = document.getElementById('booksTable');
    const tbody = document.getElementById('booksBody');
    
    if (books.length === 0) {
        table.style.display = 'none';
        return;
    }
    
    tbody.innerHTML = '';
    books.forEach(book => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${book.id || 'N/A'}</td>
            <td>${book.bookName}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>$${book.price.toFixed(2)}</td>
            <td>
                <button class="delete" onclick="deleteBook('${book.id}')">Delete</button>
            </td>
        `;
    });
    
    table.style.display = 'table';
}

// Clear books display
function clearBooks() {
    document.getElementById('booksTable').style.display = 'none';
    displayResponse('booksResponse', 'Books list cleared from display');
}

// ====================
// Initialize
// ====================

// Update API URLs in the HTML
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('todoApiUrl').textContent = TODO_API_URL;
    document.getElementById('booksApiUrl').textContent = BOOKS_API_URL;
    
    // Add Enter key support for forms
    document.getElementById('todoName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTodo();
    });
    
    document.getElementById('bookPrice').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addBook();
    });
});
