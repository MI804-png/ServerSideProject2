# 🚀 How to Run the ASP.NET Core Web API Project

**Project:** ServerSideProject2  
**Author:** Mikhael Nabil Salama Rezk (ihutsc)

---

## 📋 Quick Start Checklist

Before running the project, ensure you have:
- [ ] .NET 9.0 SDK installed
- [ ] PowerShell or Command Prompt access
- [ ] Web browser (Chrome, Firefox, Edge, Safari)
- [ ] Project files downloaded/cloned

---

## 🎯 Three Ways to Run the Project

### Option 1: 🚀 **Automated Start (Recommended)**
```powershell
# Navigate to project directory
cd C:\project\ServerSideProject2

# Run the automated setup script
.\quick-start.ps1

# Then follow the instructions displayed
```

### Option 2: ⚡ **Quick Manual Start**
```powershell
# Navigate to project directory
cd C:\project\ServerSideProject2

# Start APIs in separate PowerShell windows
# Window 1: TodoItems API
cd ControllerApi
dotnet run

# Window 2: Books API
cd ..\MongoApi
dotnet run --urls "http://localhost:5007"

# Window 3: Open JavaScript Client
start WebApiJsClient\working-demo.html
```

### Option 3: 🔧 **Detailed Manual Steps**

#### Step 1: Prepare the Environment
```powershell
# Check .NET version (should be 9.0+)
dotnet --version

# Navigate to project
cd C:\project\ServerSideProject2

# Restore dependencies (if needed)
cd ControllerApi
dotnet restore
cd ..\MongoApi
dotnet restore
cd ..
```

#### Step 2: Start the TodoItems API
```powershell
# Open PowerShell Terminal 1
cd C:\project\ServerSideProject2\ControllerApi
dotnet run

# ✅ Should display:
# info: Microsoft.Hosting.Lifetime[14]
#       Now listening on: http://localhost:5021
```

#### Step 3: Start the Books API  
```powershell
# Open PowerShell Terminal 2
cd C:\project\ServerSideProject2\MongoApi
dotnet run --urls "http://localhost:5007"

# ✅ Should display:
# info: Microsoft.Hosting.Lifetime[14]
#       Now listening on: http://localhost:5007
```

#### Step 4: Open the JavaScript Client
```powershell
# Option A: From PowerShell
start C:\project\ServerSideProject2\WebApiJsClient\working-demo.html

# Option B: Manual - Open in any web browser:
# File path: C:\project\ServerSideProject2\WebApiJsClient\working-demo.html
```

---

## 🌐 What You'll See When Running

### 1. **TodoItems API** (Port 5021)
- **Swagger Documentation**: http://localhost:5021/swagger
- **API Base URL**: http://localhost:5021/api/TodoItems
- **Features**: Create, read, update, delete todo items

### 2. **Books API** (Port 5007)  
- **Swagger Documentation**: http://localhost:5007/swagger
- **API Base URL**: http://localhost:5007/api/Books
- **Features**: Manage book inventory (works with or without MongoDB)

### 3. **JavaScript Client**
- **Interface**: Interactive web page with forms
- **TodoItems Section**: Add/edit/delete tasks
- **Books Section**: Add/edit/delete books
- **Features**: Real-time API interaction, error handling

---

## 🧪 Testing the Installation

### Quick API Tests with PowerShell

#### Test TodoItems API:
```powershell
# Get all todos (should return empty array initially)
Invoke-RestMethod -Uri "http://localhost:5021/api/TodoItems" -Method GET

# Create a test todo
$body = @{ name = "Test Todo"; isComplete = $false } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5021/api/TodoItems" -Method POST -Body $body -ContentType "application/json"

# Verify it was created
Invoke-RestMethod -Uri "http://localhost:5021/api/TodoItems" -Method GET
```

#### Test Books API:
```powershell
# Get all books (should return empty array initially)
Invoke-RestMethod -Uri "http://localhost:5007/api/Books" -Method GET

# Create a test book
$bookBody = @{ 
    bookName = "Test Book"; 
    author = "Test Author"; 
    category = "Programming"; 
    price = 29.99 
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5007/api/Books" -Method POST -Body $bookBody -ContentType "application/json"

# Verify it was created
Invoke-RestMethod -Uri "http://localhost:5007/api/Books" -Method GET
```

---

## 📁 File Structure Reference

```
ServerSideProject2/
├── 📄 README.md                    # Basic project info
├── 📄 DETAILED_DOCUMENTATION.md    # Complete technical guide
├── 📄 quick-start.ps1              # Automated setup script
│
├── 📁 ControllerApi/               # TodoItems API
│   ├── 📄 Program.cs               # Main configuration
│   └── dotnet run                  # Start command
│
├── 📁 MongoApi/                    # Books API  
│   ├── 📄 Program.cs               # Main configuration
│   └── dotnet run --urls "http://localhost:5007"  # Start command
│
└── 📁 WebApiJsClient/              # Frontend
    └── 📄 working-demo.html        # Main interface
```

---

## ⚙️ Configuration Notes

### Current Settings:
- **TodoItems API**: Port 5021, In-Memory Database
- **Books API**: Port 5007, MongoDB Atlas connection
- **JavaScript Client**: File-based, no server needed

### MongoDB Configuration:
The project is currently configured to use **MongoDB Atlas** (cloud):
```json
{
  "BookstoreDatabase": {
    "ConnectionString": "mongodb+srv://demo:demo123@cluster0.mongodb.net/",
    "DatabaseName": "BookStore",
    "BooksCollectionName": "Books"
  }
}
```

**Note**: If MongoDB Atlas is unavailable, the project includes a mock service that works without any database.

---

## 🔧 Troubleshooting Common Issues

### Issue 1: "Port already in use"
```powershell
# Solution: Kill existing processes
taskkill /f /im dotnet.exe

# Or use different ports
dotnet run --urls "http://localhost:5022"  # TodoItems API
dotnet run --urls "http://localhost:5008"  # Books API
```

### Issue 2: "Failed to fetch" in JavaScript
**Cause**: APIs not running or CORS issues  
**Solution**: 
1. Ensure both APIs are running
2. Check URLs in browser developer tools
3. Refresh the page (Ctrl+F5)

### Issue 3: MongoDB Connection Error
**Cause**: Database connection issues  
**Solution**: The app automatically falls back to mock service - no action needed

### Issue 4: Build Errors
```powershell
# Solution: Clean and rebuild
cd ControllerApi
dotnet clean
dotnet restore
dotnet build
```

---

## 📱 Using the JavaScript Interface

### TodoItems Section:
1. **Add Todo**: Enter task name, check if complete, click "Add Todo"
2. **View Todos**: Click "Get All Todos" to see current list
3. **Toggle Complete**: Use buttons in the table to mark complete/incomplete
4. **Delete**: Use delete button to remove items

### Books Section:
1. **Add Book**: Fill in name, author, category, price, click "Add Book"
2. **View Books**: Click "Get All Books" to see inventory
3. **Delete**: Use delete button to remove books

### Error Handling:
- Red error messages appear if APIs are stopped
- Successful operations show green confirmation messages

---

## 🚀 Next Steps After Running

### For Development:
1. **Explore Swagger**: Visit http://localhost:5021/swagger and http://localhost:5007/swagger
2. **Modify Code**: Edit controllers, models, or client code
3. **Test Changes**: APIs auto-reload on file changes (dotnet watch run)

### For Presentation:
1. **Prepare Demo Data**: Add a few todos and books through the interface
2. **Test Error Scenarios**: Stop one API to show error handling
3. **Show Swagger Docs**: Demonstrate the auto-generated API documentation

### For Further Learning:
1. **Add Features**: Authentication, logging, database migrations
2. **Deploy**: Azure, AWS, or other cloud platforms
3. **Extend**: Add more entities, relationships, advanced queries

---

## 📞 Support & References

### Project Files:
- **Quick Reference**: README.md
- **Technical Details**: DETAILED_DOCUMENTATION.md
- **API Examples**: api-requests.http

### External Resources:
- **Microsoft Tutorial**: https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api
- **GitHub Repository**: https://github.com/MI804-png/ServerSideProject2.git

---

## ✅ Success Indicators

**You know everything is working when:**
- [ ] Two PowerShell windows show "Now listening on..." messages
- [ ] Browser opens JavaScript interface without errors
- [ ] You can add todos and books through the web interface
- [ ] Swagger documentation loads at both API URLs
- [ ] PowerShell API tests return JSON data

**🎉 Congratulations! Your ASP.NET Core Web API project is running successfully!**

---

*Save this guide for future reference. The project is designed to run consistently with these steps every time.*
