@echo off
REM ============================================================
REM  Sree Collections - Start Everything
REM  Double-click this file. It opens TWO windows:
REM    1) Backend  (API server on port 5000)
REM    2) Frontend (Website on port 5173)
REM  Both windows must stay open while you use the site.
REM  Closing a window stops that server.
REM ============================================================

set "ROOT=%~dp0"

echo Starting backend...
start "SREE COLLECTIONS - BACKEND (port 5000)" cmd /k "cd /d "%ROOT%backend" && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting frontend...
start "SREE COLLECTIONS - FRONTEND (port 5173)" cmd /k "cd /d "%ROOT%frontend" && npm run dev"

echo.
echo Two windows should now be open: BACKEND and FRONTEND.
echo Wait until BACKEND says "Server running on port 5000"
echo and FRONTEND says "Local: http://localhost:5173/"
echo Then open http://localhost:5173 in your browser.
echo.
echo This window can be closed - it only launched the other two.
pause
