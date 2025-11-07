# ASP.NET Core Web API Tutorial - Quick Start Script
# Author: Mikhael Nabil Salama Rezk (ihutsc)

Write-Host "ASP.NET Core Web API Tutorial - Quick Start" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

# Check .NET SDK
Write-Host "`nChecking .NET SDK version..." -ForegroundColor Yellow
dotnet --version

# Set location
$projectRoot = "C:\project\ServerSideProject2"
Set-Location $projectRoot

Write-Host "`nProject structure:" -ForegroundColor Yellow
Get-ChildItem -Directory | Select-Object Name

# Build both projects
Write-Host "`nBuilding ControllerApi..." -ForegroundColor Yellow
Set-Location "$projectRoot\ControllerApi"
dotnet build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ ControllerApi built successfully" -ForegroundColor Green
} else {
    Write-Host "✗ ControllerApi build failed" -ForegroundColor Red
}

Write-Host "`nBuilding MongoApi..." -ForegroundColor Yellow
Set-Location "$projectRoot\MongoApi"
dotnet build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ MongoApi built successfully" -ForegroundColor Green
} else {
    Write-Host "✗ MongoApi build failed" -ForegroundColor Red
}

# Return to project root
Set-Location $projectRoot

Write-Host "`nSetup complete! Next steps:" -ForegroundColor Cyan
Write-Host "1. Ensure MongoDB is running (local or Atlas)" -ForegroundColor White
Write-Host "2. Start ControllerApi: cd ControllerApi && dotnet run" -ForegroundColor White
Write-Host "3. Start MongoApi: cd MongoApi && dotnet run" -ForegroundColor White
Write-Host "4. Open WebApiJsClient\index.html in browser" -ForegroundColor White
Write-Host "5. Test APIs using the web interface" -ForegroundColor White

Write-Host "`nAPI URLs will be:" -ForegroundColor Cyan
Write-Host "- ControllerApi: https://localhost:7000" -ForegroundColor White
Write-Host "- MongoApi: https://localhost:7001" -ForegroundColor White
Write-Host "- Swagger docs available at /swagger endpoint" -ForegroundColor White

Write-Host "`nRepository: https://github.com/MI804-png/ServerSideProject2.git" -ForegroundColor Magenta
Write-Host "Ready for presentation! 🚀" -ForegroundColor Green
