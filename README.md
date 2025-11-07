# ASP.NET Core Web API Tutorial Implementation

**Author:** Mikhael Nabil Salama Rezk  
**Neptun:** ihutsc  
**Repository:** https://github.com/MI804-png/ServerSideProject2.git

This project implements the three main sections from the Microsoft ASP.NET Core Web API tutorial:
https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-8.0&tabs=visual-studio

## 🛠️ Technologies Used

| Component | Technologies | Purpose |
|-----------|-------------|---------|
| **Backend APIs** | C# (.NET 9.0), ASP.NET Core | High-performance web APIs |
| **Data Storage** | Entity Framework Core, MongoDB | SQL and NoSQL database integration |
| **Frontend Client** | JavaScript (ES6+), HTML5, CSS3 | Interactive web interface |
| **Automation** | PowerShell, JSON | Setup scripts and configuration |
| **Data Exchange** | REST APIs, JSON | Standard web communication |

## Project Structure

```
ServerSideProject2/
├── ControllerApi/          # 1. Controller-based Web API (Todo Items)
├── MongoApi/              # 2. Web API with MongoDB (Books)
├── WebApiJsClient/        # 3. JavaScript client for both APIs
├── presentation/          # 🎯 Interactive web presentation
├── *.md                   # Comprehensive documentation
├── quick-start.ps1        # Automated setup script
└── api-requests.http      # Ready-to-use API test requests
```

## 🎯 Interactive Presentation

A comprehensive **web-based presentation** is available to showcase the complete project:

### **Quick Start Presentation:**
```powershell
# Navigate to presentation folder
cd presentation

# Option 1: PowerShell launcher (recommended)
.\start-presentation.ps1

# Option 2: Batch file launcher  
.\start-presentation.bat

# Option 3: Direct browser
# Open: presentation/index.html
```

### **Presentation Features:**
- **9 comprehensive slides** covering all project aspects
- **Interactive API demos** with live testing capabilities
- **Professional design** with animations and code highlighting
- **Mobile-friendly** responsive layout
- **Keyboard shortcuts** and presenter notes
- **Fullscreen support** for professional presentations

### **Presentation Content:**
1. 📑 **Project Overview** - Introduction and credentials
2. 🏗️ **Architecture** - System design and relationships
3. 💻 **Technologies** - Language choices and justifications
4. 📝 **Tutorial 1** - Controller-based Web API
5. 📚 **Tutorial 2** - MongoDB integration
6. 🌐 **Tutorial 3** - JavaScript client
7. 📂 **File Structure** - Professional organization
8. 🎮 **Live Demo** - Interactive API testing
9. 🏆 **Conclusion** - Achievements and GitHub showcase

### 📁 **Why This Structure?**

**🎯 Educational Progression:**
- **ControllerApi**: Basic REST API with Entity Framework (SQL)
- **MongoApi**: Advanced NoSQL integration with MongoDB
- **WebApiJsClient**: Modern frontend consuming both APIs

**🔧 Professional Organization:**
- **Separation of Concerns**: Each project has dedicated Controllers/, Models/, Services/
- **Configuration Management**: Environment-specific appsettings.json files
- **Security Patterns**: DTO usage prevents over-posting vulnerabilities
- **Testing Resources**: HTTP request files and interactive web interfaces

**🚀 Production Ready:**
- **Independent Deployment**: Each API can be deployed separately
- **CORS Configuration**: Enables cross-origin requests for web clients
- **Error Handling**: Comprehensive error management throughout
- **Documentation**: Multiple levels from quick-start to technical deep-dive

**📂 Why This Structure?**
- **Educational Progression**: Simple → Advanced → Integration
- **Separation of Concerns**: Each project demonstrates specific concepts
- **Production Ready**: Professional file organization and documentation
- **Easy Navigation**: Clear naming and logical grouping

### **Key Files Explained**
| File | Purpose | When to Use |
|------|---------|-------------|
| **📄 quick-start.ps1** | One-click setup | First time running project |
| **📄 DETAILED_DOCUMENTATION.md** | Complete technical guide | Learning implementation details |
| **📄 HOW_TO_RUN.md** | Step-by-step instructions | Manual setup and troubleshooting |
| **📄 api-requests.http** | Test requests for VS Code | Testing APIs without Postman |

## 1. Controller-based Web API (ControllerApi)

A simple Todo API using Entity Framework Core with In-Memory database.

### Features
- CRUD operations for Todo items
- Entity Framework Core with In-Memory database
- RESTful API endpoints
- OpenAPI/Swagger documentation

### API Endpoints
- `GET /api/TodoItems` - Get all todo items
- `GET /api/TodoItems/{id}` - Get specific todo item
- `POST /api/TodoItems` - Create new todo item
- `PUT /api/TodoItems/{id}` - Update existing todo item
- `DELETE /api/TodoItems/{id}` - Delete todo item

### Running the API
```bash
cd ControllerApi
dotnet restore
dotnet run
```
The API will be available at `https://localhost:7000` (HTTPS) or `http://localhost:5000` (HTTP).

### Testing with curl
```bash
# Get all todos
curl -X GET "https://localhost:7000/api/TodoItems"

# Add a new todo
curl -X POST "https://localhost:7000/api/TodoItems" \
  -H "Content-Type: application/json" \
  -d '{"name": "Learn ASP.NET Core", "isComplete": false}'
```

## 2. Web API with MongoDB (MongoApi)

A Books API using MongoDB as the database.

### Prerequisites
- MongoDB installed and running locally, OR
- MongoDB Atlas connection string

### Configuration
Update `appsettings.json` with your MongoDB connection:
```json
{
  "BookstoreDatabase": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "BookStore",
    "BooksCollectionName": "Books"
  }
}
```

For MongoDB Atlas, replace the connection string:
```json
"ConnectionString": "mongodb+srv://username:password@cluster.mongodb.net/"
```

### Features
- CRUD operations for Books
- MongoDB integration
- Model validation
- RESTful API endpoints

### API Endpoints
- `GET /api/Books` - Get all books
- `GET /api/Books/{id}` - Get specific book by ID
- `POST /api/Books` - Create new book
- `PUT /api/Books/{id}` - Update existing book
- `DELETE /api/Books/{id}` - Delete book

### Running the API
```bash
cd MongoApi
dotnet restore
dotnet run
```
The API will be available at `https://localhost:7001` (HTTPS) or `http://localhost:5001` (HTTP).

### Testing with curl
```bash
# Get all books
curl -X GET "https://localhost:7001/api/Books"

# Add a new book
curl -X POST "https://localhost:7001/api/Books" \
  -H "Content-Type: application/json" \
  -d '{
    "bookName": "Clean Code",
    "author": "Robert C. Martin",
    "category": "Programming",
    "price": 45.99
  }'
```

## 3. JavaScript Client (WebApiJsClient)

A web-based client that demonstrates consuming both APIs using JavaScript fetch() calls.

### Features
- Interactive forms for both APIs
- Real-time API testing
- Error handling and response display
- Modern responsive design
- CRUD operations demonstration

### Usage
1. Start both API projects (ControllerApi and MongoApi)
2. Open `WebApiJsClient/index.html` in a web browser
3. Use the forms to test both APIs

### What it demonstrates
- GET requests to retrieve data
- POST requests to create new items
- PUT requests to update existing items (Todo API)
- DELETE requests to remove items
- Error handling and response display
- Modern JavaScript fetch API usage

## Setup Instructions

### Prerequisites
- .NET 9.0 SDK
- MongoDB (local installation or Atlas account)
- Web browser for testing the JavaScript client

### Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/MI804-png/ServerSideProject2.git
   cd ServerSideProject2
   ```

2. Start MongoDB (if using local instance):
   ```bash
   mongod
   ```

3. Start the Controller API:
   ```bash
   cd ControllerApi
   dotnet restore
   dotnet run
   ```
   Keep this running (default: https://localhost:7000)

4. Start the MongoDB API (in a new terminal):
   ```bash
   cd MongoApi
   dotnet restore
   dotnet run
   ```
   Keep this running (default: https://localhost:7001)

5. Open the JavaScript client:
   - Open `WebApiJsClient/index.html` in your web browser
   - Test both APIs using the provided forms

## Technologies Used

- **Backend:** ASP.NET Core 9.0 Web API
- **Database:** Entity Framework Core (In-Memory), MongoDB
- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Documentation:** OpenAPI/Swagger
- **HTTP Client:** JavaScript Fetch API

## API Documentation

Both APIs include OpenAPI/Swagger documentation:
- ControllerApi: https://localhost:7000/swagger
- MongoApi: https://localhost:7001/swagger

## Sample Data

### Todo Items (ControllerApi)
```json
{
  "id": 1,
  "name": "Learn ASP.NET Core",
  "isComplete": false
}
```

### Books (MongoApi)
```json
{
  "id": "507f1f77bcf86cd799439011",
  "bookName": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Programming",
  "price": 45.99
}
```

## Common Issues and Solutions

### CORS Issues
If you encounter CORS issues when testing with the JavaScript client, you may need to configure CORS in the API projects. Add this to `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// After building the app
app.UseCors();
```

### MongoDB Connection Issues
- Ensure MongoDB is running on the default port (27017)
- Check the connection string in `appsettings.json`
- For MongoDB Atlas, ensure your IP is whitelisted

### SSL Certificate Issues
For development, you can trust the development certificate:
```bash
dotnet dev-certs https --trust
```

## Presentation Notes

This project fulfills the requirements for the additional 10 points towards the lecture exam by implementing:

1. ✅ **Controller-based Web API** - Complete Todo API with CRUD operations
2. ✅ **Web API with MongoDB** - Complete Books API with MongoDB integration
3. ✅ **Web API with JavaScript** - Interactive client consuming both APIs

The implementation follows the Microsoft documentation examples closely while adding modern touches and comprehensive error handling.

## Next Steps

For production deployment, consider:
- Adding authentication and authorization
- Implementing proper logging
- Adding input validation and sanitization
- Setting up proper database migrations
- Implementing caching strategies
- Adding unit and integration tests
