// Presentation Script
let currentSlide = 0;
const totalSlides = 9;

// API URLs
const TODO_API_URL = 'http://localhost:5021/api/TodoItems';
const BOOKS_API_URL = 'http://localhost:5007/api/Books';

// Initialize presentation
document.addEventListener('DOMContentLoaded', function() {
    showSlide(0);
    setupKeyboardNavigation();
    setupAutocode();
});

// Slide Navigation
function showSlide(slideIndex) {
    // Hide all slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Update indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show target slide
    const targetSlide = document.getElementById(`slide-${slideIndex}`);
    if (targetSlide) {
        targetSlide.classList.add('active');
        
        // Add animation class based on direction
        if (slideIndex > currentSlide) {
            targetSlide.classList.remove('slide-left');
        } else if (slideIndex < currentSlide) {
            targetSlide.classList.add('slide-left');
        }
        
        currentSlide = slideIndex;
        
        // Update active indicator
        if (indicators[slideIndex]) {
            indicators[slideIndex].classList.add('active');
        }
        
        // Update navigation buttons
        updateNavigationButtons();
        
        // Trigger any slide-specific actions
        onSlideChange(slideIndex);
    }
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

function updateNavigationButtons() {
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }
}

// Keyboard Navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowRight':
            case ' ': // Space bar
                event.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                prevSlide();
                break;
            case 'Home':
                event.preventDefault();
                showSlide(0);
                break;
            case 'End':
                event.preventDefault();
                showSlide(totalSlides - 1);
                break;
            case 'Escape':
                event.preventDefault();
                showSlide(0);
                break;
        }
    });
}

// Slide-specific actions
function onSlideChange(slideIndex) {
    // Add any slide-specific initialization here
    switch(slideIndex) {
        case 7: // Demo slide
            initializeDemoSlide();
            break;
        case 2: // Technologies slide
            animateTechCards();
            break;
        case 6: // File structure slide
            animateFileTree();
            break;
    }
}

// Demo Slide Functions
function initializeDemoSlide() {
    // Clear previous results
    const todoResult = document.getElementById('todo-result');
    const bookResult = document.getElementById('book-result');
    
    if (todoResult) {
        todoResult.innerHTML = '<pre><code>Ready to test TodoItems API...</code></pre>';
    }
    
    if (bookResult) {
        bookResult.innerHTML = '<pre><code>Ready to test Books API...</code></pre>';
    }
}

// Demo API testing functions
async function testTodoAPI(action) {
    const resultElement = document.getElementById('todo-result');
    const baseUrl = 'http://localhost:5021/api/TodoItems';
    
    try {
        let response, result;
        
        switch (action) {
            case 'get':
                response = await fetch(baseUrl);
                result = await response.json();
                displayDemoResult(resultElement, 'GET Todos', result);
                break;
                
            case 'post':
                const todoData = {
                    name: `Demo Todo ${Date.now()}`,
                    isComplete: false
                };
                response = await fetch(baseUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(todoData)
                });
                result = await response.json();
                displayDemoResult(resultElement, 'POST Todo', result);
                break;
                
            case 'put':
                // First get existing todos
                const getResponse = await fetch(baseUrl);
                const todos = await getResponse.json();
                
                if (todos.length > 0) {
                    const todoToUpdate = todos[0];
                    todoToUpdate.isComplete = !todoToUpdate.isComplete;
                    
                    response = await fetch(`${baseUrl}/${todoToUpdate.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(todoToUpdate)
                    });
                    
                    if (response.ok) {
                        result = { message: `Todo ${todoToUpdate.id} updated successfully`, updatedTodo: todoToUpdate };
                    } else {
                        result = { error: 'Failed to update todo' };
                    }
                } else {
                    result = { message: 'No todos available to update. Create one first!' };
                }
                displayDemoResult(resultElement, 'PUT Todo', result);
                break;
                
            case 'delete':
                // First get existing todos
                const getDelResponse = await fetch(baseUrl);
                const delTodos = await getDelResponse.json();
                
                if (delTodos.length > 0) {
                    const todoToDelete = delTodos[delTodos.length - 1];
                    
                    response = await fetch(`${baseUrl}/${todoToDelete.id}`, {
                        method: 'DELETE'
                    });
                    
                    if (response.ok) {
                        result = { message: `Todo ${todoToDelete.id} deleted successfully` };
                    } else {
                        result = { error: 'Failed to delete todo' };
                    }
                } else {
                    result = { message: 'No todos available to delete. Create one first!' };
                }
                displayDemoResult(resultElement, 'DELETE Todo', result);
                break;
        }
    } catch (error) {
        displayDemoResult(resultElement, `${action.toUpperCase()} Error`, { 
            error: error.message,
            note: 'Make sure the TodoItems API is running on port 5021'
        });
    }
}

async function testBookAPI(action) {
    const resultElement = document.getElementById('book-result');
    const baseUrl = 'http://localhost:5007/api/Books';
    
    try {
        let response, result;
        
        switch (action) {
            case 'get':
                response = await fetch(baseUrl);
                result = await response.json();
                displayDemoResult(resultElement, 'GET Books', result);
                break;
                
            case 'post':
                const bookData = {
                    bookName: `Demo Book ${Date.now()}`,
                    author: 'John Doe',
                    category: 'Programming',
                    price: 29.99
                };
                response = await fetch(baseUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookData)
                });
                result = await response.json();
                displayDemoResult(resultElement, 'POST Book', result);
                break;
                
            case 'put':
                // First get existing books
                const getResponse = await fetch(baseUrl);
                const books = await getResponse.json();
                
                if (books.length > 0) {
                    const bookToUpdate = books[0];
                    bookToUpdate.price = (Math.random() * 50 + 10).toFixed(2);
                    
                    response = await fetch(`${baseUrl}/${bookToUpdate.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bookToUpdate)
                    });
                    
                    if (response.ok) {
                        result = { message: `Book ${bookToUpdate.id} updated successfully`, updatedBook: bookToUpdate };
                    } else {
                        result = { error: 'Failed to update book' };
                    }
                } else {
                    result = { message: 'No books available to update. Create one first!' };
                }
                displayDemoResult(resultElement, 'PUT Book', result);
                break;
                
            case 'delete':
                // First get existing books
                const getDelResponse = await fetch(baseUrl);
                const delBooks = await getDelResponse.json();
                
                if (delBooks.length > 0) {
                    const bookToDelete = delBooks[delBooks.length - 1];
                    
                    response = await fetch(`${baseUrl}/${bookToDelete.id}`, {
                        method: 'DELETE'
                    });
                    
                    if (response.ok) {
                        result = { message: `Book ${bookToDelete.id} deleted successfully` };
                    } else {
                        result = { error: 'Failed to delete book' };
                    }
                } else {
                    result = { message: 'No books available to delete. Create one first!' };
                }
                displayDemoResult(resultElement, 'DELETE Book', result);
                break;
        }
    } catch (error) {
        displayDemoResult(resultElement, `${action.toUpperCase()} Error`, { 
            error: error.message,
            note: 'Make sure the Books API is running on port 5007'
        });
    }
}

function displayDemoResult(element, operation, data) {
    const timestamp = new Date().toLocaleTimeString();
    const formattedData = JSON.stringify(data, null, 2);
    
    element.innerHTML = `<pre><code># ${operation} - ${timestamp}
${formattedData}</code></pre>`;
}

// Open Swagger documentation
function openSwagger(port) {
    window.open(`http://localhost:${port}/swagger`, '_blank');
}

// Open JavaScript clients
function openClient(type) {
    const clientUrls = {
        'working-demo': '../WebApiJsClient/working-demo.html',
        'index': '../WebApiJsClient/index.html',
        'simple': '../WebApiJsClient/simple.html'
    };
    
    const url = clientUrls[type];
    if (url) {
        window.open(url, '_blank');
    }
}

// API Testing Functions
async function testTodoAPI(operation) {
    const resultElement = document.getElementById('todo-result');
    if (!resultElement) return;
    
    try {
        let response, result;
        
        switch(operation) {
            case 'get':
                updateResult(resultElement, 'Fetching todos...', 'loading');
                response = await fetch(TODO_API_URL);
                result = await response.json();
                updateResult(resultElement, `GET /api/TodoItems\nStatus: ${response.status}\n\n${JSON.stringify(result, null, 2)}`, 'success');
                break;
                
            case 'post':
                const newTodo = {
                    name: `Demo Todo ${Date.now()}`,
                    isComplete: false
                };
                updateResult(resultElement, 'Creating new todo...', 'loading');
                response = await fetch(TODO_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTodo)
                });
                result = await response.json();
                updateResult(resultElement, `POST /api/TodoItems\nStatus: ${response.status}\nCreated: ${JSON.stringify(result, null, 2)}`, 'success');
                break;
                
            case 'put':
                // First get todos to find one to update
                const todosResponse = await fetch(TODO_API_URL);
                const todos = await todosResponse.json();
                
                if (todos.length > 0) {
                    const todoToUpdate = todos[0];
                    todoToUpdate.isComplete = !todoToUpdate.isComplete;
                    
                    updateResult(resultElement, `Updating todo ${todoToUpdate.id}...`, 'loading');
                    response = await fetch(`${TODO_API_URL}/${todoToUpdate.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(todoToUpdate)
                    });
                    
                    updateResult(resultElement, `PUT /api/TodoItems/${todoToUpdate.id}\nStatus: ${response.status}\nUpdated todo completion status`, 'success');
                } else {
                    updateResult(resultElement, 'No todos found to update. Create a todo first.', 'warning');
                }
                break;
                
            case 'delete':
                // First get todos to find one to delete
                const deleteResponse = await fetch(TODO_API_URL);
                const deleteTodos = await deleteResponse.json();
                
                if (deleteTodos.length > 0) {
                    const todoToDelete = deleteTodos[0];
                    updateResult(resultElement, `Deleting todo ${todoToDelete.id}...`, 'loading');
                    
                    response = await fetch(`${TODO_API_URL}/${todoToDelete.id}`, {
                        method: 'DELETE'
                    });
                    
                    updateResult(resultElement, `DELETE /api/TodoItems/${todoToDelete.id}\nStatus: ${response.status}\nTodo deleted successfully`, 'success');
                } else {
                    updateResult(resultElement, 'No todos found to delete. Create a todo first.', 'warning');
                }
                break;
        }
    } catch (error) {
        updateResult(resultElement, `Error: ${error.message}\n\nMake sure the TodoItems API is running on port 5021:\ncd ControllerApi\ndotnet run`, 'error');
    }
}

async function testBookAPI(operation) {
    const resultElement = document.getElementById('book-result');
    if (!resultElement) return;
    
    try {
        let response, result;
        
        switch(operation) {
            case 'get':
                updateResult(resultElement, 'Fetching books...', 'loading');
                response = await fetch(BOOKS_API_URL);
                result = await response.json();
                updateResult(resultElement, `GET /api/Books\nStatus: ${response.status}\n\n${JSON.stringify(result, null, 2)}`, 'success');
                break;
                
            case 'post':
                const newBook = {
                    bookName: `Demo Book ${Date.now()}`,
                    author: 'Demo Author',
                    category: 'Programming',
                    price: 29.99
                };
                updateResult(resultElement, 'Creating new book...', 'loading');
                response = await fetch(BOOKS_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newBook)
                });
                result = await response.json();
                updateResult(resultElement, `POST /api/Books\nStatus: ${response.status}\nCreated: ${JSON.stringify(result, null, 2)}`, 'success');
                break;
                
            case 'put':
                // First get books to find one to update
                const booksResponse = await fetch(BOOKS_API_URL);
                const books = await booksResponse.json();
                
                if (books.length > 0) {
                    const bookToUpdate = books[0];
                    bookToUpdate.price = (parseFloat(bookToUpdate.price) + 5).toFixed(2);
                    
                    updateResult(resultElement, `Updating book ${bookToUpdate.id}...`, 'loading');
                    response = await fetch(`${BOOKS_API_URL}/${bookToUpdate.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bookToUpdate)
                    });
                    
                    updateResult(resultElement, `PUT /api/Books/${bookToUpdate.id}\nStatus: ${response.status}\nUpdated book price to $${bookToUpdate.price}`, 'success');
                } else {
                    updateResult(resultElement, 'No books found to update. Create a book first.', 'warning');
                }
                break;
                
            case 'delete':
                // First get books to find one to delete
                const deleteResponse = await fetch(BOOKS_API_URL);
                const deleteBooks = await deleteResponse.json();
                
                if (deleteBooks.length > 0) {
                    const bookToDelete = deleteBooks[0];
                    updateResult(resultElement, `Deleting book ${bookToDelete.id}...`, 'loading');
                    
                    response = await fetch(`${BOOKS_API_URL}/${bookToDelete.id}`, {
                        method: 'DELETE'
                    });
                    
                    updateResult(resultElement, `DELETE /api/Books/${bookToDelete.id}\nStatus: ${response.status}\nBook deleted successfully`, 'success');
                } else {
                    updateResult(resultElement, 'No books found to delete. Create a book first.', 'warning');
                }
                break;
        }
    } catch (error) {
        updateResult(resultElement, `Error: ${error.message}\n\nMake sure the Books API is running on port 5007:\ncd MongoApi\ndotnet run --urls "http://localhost:5007"`, 'error');
    }
}

function updateResult(element, message, type = 'info') {
    const colors = {
        loading: '#ffc107',
        success: '#28a745',
        error: '#dc3545',
        warning: '#fd7e14',
        info: '#17a2b8'
    };
    
    element.innerHTML = `<pre><code style="color: ${colors[type]}">${message}</code></pre>`;
    
    // Auto-scroll to bottom
    element.scrollTop = element.scrollHeight;
}

// External Links
function openSwagger(port) {
    const url = `http://localhost:${port}/swagger`;
    window.open(url, '_blank');
}

function openClient(page) {
    const clientPath = '../WebApiJsClient/';
    let filename;
    
    switch(page) {
        case 'working-demo':
            filename = 'working-demo.html';
            break;
        case 'index':
            filename = 'index.html';
            break;
        case 'simple':
            filename = 'simple.html';
            break;
        default:
            filename = 'working-demo.html';
    }
    
    // Try to open the file - note that this might not work in all browsers due to security restrictions
    try {
        window.open(clientPath + filename, '_blank');
    } catch (error) {
        alert(`Please navigate to: ${clientPath}${filename}`);
    }
}

// Animation Functions
function animateTechCards() {
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

function animateFileTree() {
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 50);
        }, index * 50);
    });
}

// Auto-typing effect for code sections
function setupAutocode() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    // Store original content
    codeBlocks.forEach((block, index) => {
        block.dataset.originalText = block.textContent;
        block.dataset.blockIndex = index;
    });
}

function typeCode(blockIndex) {
    const block = document.querySelector(`[data-block-index="${blockIndex}"]`);
    if (!block) return;
    
    const text = block.dataset.originalText;
    const container = block.parentElement;
    
    // Create a new element for typing effect
    const typingElement = document.createElement('code');
    typingElement.className = block.className;
    container.appendChild(typingElement);
    block.style.display = 'none';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        typingElement.textContent = text.substring(0, i);
        i++;
        
        if (i > text.length) {
            clearInterval(typeInterval);
            block.style.display = 'block';
            container.removeChild(typingElement);
        }
    }, 20);
}

// Touch/Swipe Support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            prevSlide();
        }
    }
}

// Fullscreen Support
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err.message);
        });
    } else {
        document.exitFullscreen();
    }
}

// Add fullscreen toggle on F11 or double-click title
document.addEventListener('keydown', function(event) {
    if (event.key === 'F11') {
        event.preventDefault();
        toggleFullscreen();
    }
});

// Presentation Timer
let presentationStartTime = Date.now();
let timerInterval;

function startPresentationTimer() {
    presentationStartTime = Date.now();
    
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - presentationStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        // Update timer display if element exists
        const timerElement = document.getElementById('presentation-timer');
        if (timerElement) {
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

function stopPresentationTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}

// Initialize timer when presentation starts
document.addEventListener('DOMContentLoaded', startPresentationTimer);

// Cleanup on page unload
window.addEventListener('beforeunload', stopPresentationTimer);

// Presentation Notes (for presenter)
const presentationNotes = {
    0: "Welcome to my ASP.NET Core Web API project presentation. This project implements all three sections of Microsoft's tutorial with additional production-ready features.",
    1: "Here's our three-layer architecture: Frontend JavaScript client, dual ASP.NET Core APIs, and both SQL and NoSQL data storage.",
    2: "I chose these technologies strategically - C# for type safety and performance, JavaScript for universal browser support, and both Entity Framework and MongoDB for diverse data scenarios.",
    3: "Tutorial 1 demonstrates RESTful API fundamentals with Entity Framework. Notice the DTO pattern that prevents security vulnerabilities.",
    4: "Tutorial 2 shows NoSQL integration with MongoDB, including cloud database options and service layer patterns.",
    5: "Tutorial 3 creates a modern JavaScript client using ES6+ features, Fetch API, and comprehensive error handling.",
    6: "The project structure follows professional best practices with clear separation of concerns and progressive complexity.",
    7: "Let's see the live demo - I can test both APIs and show the JavaScript client in action.",
    8: "In conclusion, this project demonstrates complete mastery of modern web development, going beyond tutorial requirements with production-ready features."
};

// Show presenter notes (toggle with 'N' key)
let notesVisible = false;

document.addEventListener('keydown', function(event) {
    if (event.key.toLowerCase() === 'n') {
        togglePresentationNotes();
    }
});

function togglePresentationNotes() {
    notesVisible = !notesVisible;
    
    let notesElement = document.getElementById('presentation-notes');
    
    if (notesVisible) {
        if (!notesElement) {
            notesElement = document.createElement('div');
            notesElement.id = 'presentation-notes';
            notesElement.style.cssText = `
                position: fixed;
                bottom: 80px;
                right: 20px;
                max-width: 300px;
                background: rgba(44, 62, 80, 0.95);
                color: white;
                padding: 1rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 1001;
                font-size: 0.9rem;
                line-height: 1.4;
            `;
            document.body.appendChild(notesElement);
        }
        
        const note = presentationNotes[currentSlide] || "No notes for this slide.";
        notesElement.innerHTML = `<strong>Presenter Notes:</strong><br>${note}<br><br><em>Press 'N' to hide</em>`;
        notesElement.style.display = 'block';
    } else {
        if (notesElement) {
            notesElement.style.display = 'none';
        }
    }
}

// Update notes when slide changes
const originalShowSlide = showSlide;
showSlide = function(slideIndex) {
    originalShowSlide(slideIndex);
    if (notesVisible) {
        togglePresentationNotes();
        togglePresentationNotes();
    }
};

// Print Support
function printPresentation() {
    window.print();
}

// Add print styles
const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        .navbar, .slide-navigation, #presentation-notes { display: none !important; }
        .slide { display: block !important; page-break-after: always; }
        .slide-content { box-shadow: none; margin: 0; }
        body { background: white !important; }
    }
`;
document.head.appendChild(printStyles);

// Keyboard shortcuts help
document.addEventListener('keydown', function(event) {
    if (event.key === '?' || (event.key === '/' && event.shiftKey)) {
        showKeyboardHelp();
    }
});

function showKeyboardHelp() {
    const helpText = `
        Keyboard Shortcuts:
        
        → / Space    Next slide
        ←            Previous slide
        Home         First slide  
        End          Last slide
        Esc          Return to start
        F11          Toggle fullscreen
        N            Toggle presenter notes
        ?            Show this help
        
        Mouse/Touch:
        - Click navigation buttons
        - Swipe left/right on mobile
    `;
    
    alert(helpText);
}

// Export for external use
window.PresentationController = {
    showSlide,
    nextSlide,
    prevSlide,
    testTodoAPI,
    testBookAPI,
    openSwagger,
    openClient,
    toggleFullscreen,
    printPresentation,
    getCurrentSlide: () => currentSlide,
    getTotalSlides: () => totalSlides
};
