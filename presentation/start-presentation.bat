@echo off
echo =====================================================
echo   ASP.NET Core Web API - Interactive Presentation
echo =====================================================
echo.
echo Starting presentation...
echo.
echo For the best experience:
echo - Ensure both APIs are running (use quick-start.ps1)
echo - Use fullscreen mode (F11)
echo - Have a modern web browser
echo.

REM Try to open with default browser
start "" "index.html"

echo.
echo Presentation should open in your default browser.
echo.
echo If it doesn't open automatically, navigate to:
echo %cd%\index.html
echo.
echo Keyboard shortcuts:
echo - Arrow keys or Space: Navigate slides
echo - F11: Fullscreen mode
echo - N: Toggle presenter notes
echo - ?: Show all shortcuts
echo.
pause
