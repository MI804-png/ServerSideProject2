# ASP.NET Core Web API Tutorial - Quick Start Script
# Author: Mikhael Nabil Salama Rezk (ihutsc)

Write-Host "🚀 ASP.NET Core Web API Tutorial - Quick Start" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Check .NET SDK
Write-Host "`n🔍 Checking .NET SDK version..." -ForegroundColor Yellow
$dotnetVersion = dotnet --version
Write-Host "✅ .NET SDK version: $dotnetVersion" -ForegroundColor Green

# Set location
$projectRoot = "C:\project\ServerSideProject2"
if (Test-Path $projectRoot) {
    Set-Location $projectRoot
    Write-Host "✅ Located project directory" -ForegroundColor Green
} else {
    Write-Host "❌ Project directory not found: $projectRoot" -ForegroundColor Red
    Write-Host "Please update the path in this script or run from correct directory" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n📁 Project structure:" -ForegroundColor Yellow
Get-ChildItem -Directory | Select-Object Name | Format-Table -AutoSize

# Build both projects
Write-Host "`n🔨 Building ControllerApi..." -ForegroundColor Yellow
Set-Location "$projectRoot\ControllerApi"
$buildResult1 = dotnet build --verbosity quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ ControllerApi built successfully" -ForegroundColor Green
} else {
    Write-Host "❌ ControllerApi build failed" -ForegroundColor Red
    Write-Host "Run 'dotnet build' in ControllerApi folder for details" -ForegroundColor Yellow
}

Write-Host "`n🔨 Building MongoApi..." -ForegroundColor Yellow
Set-Location "$projectRoot\MongoApi"
$buildResult2 = dotnet build --verbosity quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ MongoApi built successfully" -ForegroundColor Green
} else {
    Write-Host "❌ MongoApi build failed" -ForegroundColor Red
    Write-Host "Run 'dotnet build' in MongoApi folder for details" -ForegroundColor Yellow
}

# Return to project root
Set-Location $projectRoot

# Check for running processes
$runningDotnet = Get-Process -Name "dotnet" -ErrorAction SilentlyContinue
if ($runningDotnet) {
    Write-Host "`n⚠️  Warning: Found running dotnet processes" -ForegroundColor Yellow
    Write-Host "You may need to stop them first: taskkill /f /im dotnet.exe" -ForegroundColor Yellow
}

Write-Host "`n🎯 Setup complete! Next steps:" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

Write-Host "`n📋 OPTION 1: Automated Start (Recommended)" -ForegroundColor White
Write-Host "   1️⃣  Open PowerShell #1 and run:" -ForegroundColor Gray
Write-Host "      cd ControllerApi && dotnet run" -ForegroundColor Cyan
Write-Host "   2️⃣  Open PowerShell #2 and run:" -ForegroundColor Gray  
Write-Host "      cd MongoApi && dotnet run --urls `"http://localhost:5007`"" -ForegroundColor Cyan
Write-Host "   3️⃣  Open JavaScript Client:" -ForegroundColor Gray
Write-Host "      start WebApiJsClient\working-demo.html" -ForegroundColor Cyan

Write-Host "`n📋 OPTION 2: One-Line Commands" -ForegroundColor White
Write-Host "   Copy and paste these in separate PowerShell windows:" -ForegroundColor Gray
Write-Host "   ┌─ Terminal 1: cd C:\project\ServerSideProject2\ControllerApi; dotnet run" -ForegroundColor Green
Write-Host "   ├─ Terminal 2: cd C:\project\ServerSideProject2\MongoApi; dotnet run --urls `"http://localhost:5007`"" -ForegroundColor Green  
Write-Host "   └─ Terminal 3: start C:\project\ServerSideProject2\WebApiJsClient\working-demo.html" -ForegroundColor Green

Write-Host "`n🌐 Expected URLs:" -ForegroundColor Magenta
Write-Host "   📝 TodoItems API:     http://localhost:5021" -ForegroundColor White
Write-Host "   📚 Books API:         http://localhost:5007" -ForegroundColor White
Write-Host "   🖥️  JavaScript Client: File opened in browser" -ForegroundColor White
Write-Host "   📄 Swagger Docs:      Add /swagger to API URLs" -ForegroundColor White

Write-Host "`n🧪 Quick Test Commands:" -ForegroundColor Yellow
Write-Host "   # Test TodoItems API:" -ForegroundColor Gray
Write-Host "   Invoke-RestMethod -Uri `"http://localhost:5021/api/TodoItems`" -Method GET" -ForegroundColor Cyan
Write-Host "   # Test Books API:" -ForegroundColor Gray
Write-Host "   Invoke-RestMethod -Uri `"http://localhost:5007/api/Books`" -Method GET" -ForegroundColor Cyan

Write-Host "`n📚 Documentation:" -ForegroundColor Magenta
Write-Host "   📖 Complete Guide:    HOW_TO_RUN.md" -ForegroundColor White
Write-Host "   🔧 Technical Details: DETAILED_DOCUMENTATION.md" -ForegroundColor White
Write-Host "   🎯 Presentation:      PRESENTATION_SUMMARY.md" -ForegroundColor White

Write-Host "`n🔗 Repository: https://github.com/MI804-png/ServerSideProject2.git" -ForegroundColor Magenta
Write-Host "🎉 Ready for action! Good luck with your presentation! 🚀" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
