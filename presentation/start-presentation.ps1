# ASP.NET Core Web API - Presentation Launcher
# Author: Mikhael Nabil Salama Rezk

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "  ASP.NET Core Web API - Interactive Presentation" -ForegroundColor Yellow
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "🚀 Starting presentation..." -ForegroundColor Green
Write-Host ""

Write-Host "📋 For the best experience:" -ForegroundColor Blue
Write-Host "   • Ensure both APIs are running (use ../quick-start.ps1)" -ForegroundColor Gray
Write-Host "   • Use fullscreen mode (F11)" -ForegroundColor Gray
Write-Host "   • Have a modern web browser" -ForegroundColor Gray
Write-Host ""

# Check if APIs are running
Write-Host "🔍 Checking API status..." -ForegroundColor Yellow

$todoApi = $false
$booksApi = $false

try {
    $todoResponse = Invoke-WebRequest -Uri "http://localhost:5021/swagger" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    $todoApi = $true
    Write-Host "   ✅ TodoItems API (port 5021) - RUNNING" -ForegroundColor Green
} catch {
    Write-Host "   ❌ TodoItems API (port 5021) - NOT RUNNING" -ForegroundColor Red
}

try {
    $booksResponse = Invoke-WebRequest -Uri "http://localhost:5007/swagger" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    $booksApi = $true
    Write-Host "   ✅ Books API (port 5007) - RUNNING" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Books API (port 5007) - NOT RUNNING" -ForegroundColor Red
}

Write-Host ""

if (-not $todoApi -or -not $booksApi) {
    Write-Host "⚠️  Some APIs are not running. Demo features will be limited." -ForegroundColor Yellow
    Write-Host "   To start APIs, run: ..\quick-start.ps1" -ForegroundColor Gray
    Write-Host ""
}

# Open presentation
Write-Host "🌐 Opening presentation in browser..." -ForegroundColor Green
$presentationPath = Join-Path $PSScriptRoot "index.html"

try {
    Start-Process $presentationPath
    Write-Host "   ✅ Presentation opened successfully!" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Could not open automatically. Please open manually:" -ForegroundColor Red
    Write-Host "   📁 $presentationPath" -ForegroundColor Gray
}

Write-Host ""
Write-Host "⌨️  Keyboard shortcuts:" -ForegroundColor Blue
Write-Host "   • → or Space: Next slide" -ForegroundColor Gray
Write-Host "   • ←: Previous slide" -ForegroundColor Gray
Write-Host "   • F11: Fullscreen mode" -ForegroundColor Gray
Write-Host "   • N: Toggle presenter notes" -ForegroundColor Gray
Write-Host "   • ?: Show all shortcuts" -ForegroundColor Gray
Write-Host ""

Write-Host "📊 Presentation contains 9 slides:" -ForegroundColor Blue
Write-Host "   1. Project Overview" -ForegroundColor Gray
Write-Host "   2. Architecture" -ForegroundColor Gray
Write-Host "   3. Technologies" -ForegroundColor Gray
Write-Host "   4. Tutorial 1 (TodoItems API)" -ForegroundColor Gray
Write-Host "   5. Tutorial 2 (Books API)" -ForegroundColor Gray
Write-Host "   6. Tutorial 3 (JavaScript Client)" -ForegroundColor Gray
Write-Host "   7. File Structure" -ForegroundColor Gray
Write-Host "   8. Live Demo" -ForegroundColor Gray
Write-Host "   9. Conclusion & GitHub" -ForegroundColor Gray
Write-Host ""

Write-Host "🎯 Enjoy your presentation!" -ForegroundColor Magenta
Write-Host ""

# Keep PowerShell window open
Read-Host "Press Enter to close this window"
