@echo off
REM AI-CLI Setup Script for Windows
REM Supports: Windows 10, Windows 11

echo ========================================
echo    AI-CLI Setup Script for Windows
echo ========================================
echo.

setlocal enabledelayedexpansion

REM Colors (using Windows Terminal or PowerShell)
set "GREEN=[92m"
set "YELLOW=[93m"
set "CYAN=[96m"
set "RED=[91m"
set "NC=[0m"

REM Check for administrator privileges
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo %YELLOW%Note: Some features require administrator privileges%NC%
    echo Please run as administrator for full installation
    echo.
)

REM Detect Windows version
for /f "tokens=4-5 delims=. " %%i in ('ver') do (
    set WIN_MAJOR=%%i
    set WIN_MINOR=%%j
)
echo %CYAN%Detected Windows version: !WIN_MAJOR!.!WIN_MINOR!%NC%
echo.

:menu
echo %YELLOW%Select installation options:%NC%
echo 1) Full Installation (recommended)
echo 2) Core Only (AI-CLI project)
echo 3) CLI Tools Only
echo 4) Ollama Only
echo 5) Exit
echo.
set /p choice="Enter choice [1-5]: "

if "%choice%"=="1" goto full_install
if "%choice%"=="2" goto core_install
if "%choice%"=="3" goto cli_install
if "%choice%"=="4" goto ollama_install
if "%choice%"=="5" goto end
goto menu

:full_install
echo.
echo %YELLOW%Starting full installation...%NC%
call :install_dependencies
call :install_bun
call :install_ollama
call :install_cli_tools
call :install_mcp_servers
call :setup_project
call :create_env_file
goto end

:core_install
echo.
echo %YELLOW%Starting core installation...%NC%
call :install_dependencies
call :install_bun
call :setup_project
goto end

:cli_install
echo.
echo %YELLOW%Installing CLI tools only...%NC%
call :install_cli_tools
goto end

:ollama_install
echo.
echo %YELLOW%Installing Ollama...%NC%
call :install_ollama
goto end

:install_dependencies
echo %YELLOW%Checking dependencies...%NC%

REM Check for winget
where winget >nul 2>&1
if %errorlevel% neq 0 (
    echo %RED%winget not found. Please install App Installer from Microsoft Store.%NC%
    echo Alternatively, install dependencies manually.
    pause
    exit /b 1
)

REM Install Git
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo %YELLOW%Installing Git...%NC%
    winget install --id Git.Git -e --source winget
)

REM Install Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo %YELLOW%Installing Node.js...%NC%
    winget install OpenJS.NodeJS.LTS
)

REM Install Python
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo %YELLOW%Installing Python...%NC%
    winget install Python.Python.3.12
)

REM Install Visual Studio Build Tools (for native modules)
echo %YELLOW%Checking Visual Studio Build Tools...%NC%
winget install Microsoft.VisualStudio.2022.BuildTools --silent --override "--wait --quiet --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended" 2>nul

echo %GREEN%Dependencies installed!%NC%
exit /b 0

:install_bun
echo %YELLOW%Installing Bun...%NC%

REM Check if Bun is already installed
where bun >nul 2>&1
if %errorlevel% equ 0 (
    echo %GREEN%Bun is already installed%NC%
    exit /b 0
)

REM Install Bun via PowerShell
powershell -Command "irm bun.sh/install.ps1 | iex"

REM Add Bun to PATH for current session
set PATH=%USERPROFILE%\.bun\bin;%PATH%

echo %GREEN%Bun installed!%NC%
exit /b 0

:install_ollama
echo %YELLOW%Installing Ollama...%NC%

REM Check if Ollama is already installed
where ollama >nul 2>&1
if %errorlevel% equ 0 (
    echo %GREEN%Ollama is already installed%NC%
    exit /b 0
)

REM Download and install Ollama
echo Downloading Ollama...
powershell -Command "Invoke-WebRequest -Uri 'https://ollama.com/download/OllamaSetup.exe' -OutFile '%TEMP%\OllamaSetup.exe'"

echo Installing Ollama...
start /wait "" "%TEMP%\OllamaSetup.exe" /S

REM Start Ollama
echo Starting Ollama service...
start "" ollama serve

REM Wait for service to start
timeout /t 10 /nobreak >nul

REM Pull recommended models
echo %CYAN%Pulling recommended models (this may take a while)...%NC%
ollama pull llama3
ollama pull mistral

echo %GREEN%Ollama installed and models downloaded!%NC%
exit /b 0

:install_cli_tools
echo %YELLOW%Installing AI CLI Tools...%NC%

REM Upgrade pip
python -m pip install --upgrade pip

REM Mistral CLI
echo %CYAN%Installing Mistral CLI...%NC%
pip install mistral-cli

REM OpenAI CLI
echo %CYAN%Installing OpenAI CLI...%NC%
pip install openai

REM Google Generative AI (Gemini)
echo %CYAN%Installing Gemini dependencies...%NC%
pip install google-generativeai

REM Anthropic SDK (Claude)
echo %CYAN%Installing Anthropic SDK...%NC%
pip install anthropic

REM DeepSeek SDK
echo %CYAN%Installing DeepSeek dependencies...%NC%
pip install openai

echo %GREEN%CLI Tools installed!%NC%
exit /b 0

:install_mcp_servers
echo %YELLOW%Installing MCP Servers...%NC%

REM Filesystem MCP
echo Installing Filesystem MCP...
npm install -g @modelcontextprotocol/server-filesystem 2>nul

REM Memory MCP
echo Installing Memory MCP...
npm install -g @modelcontextprotocol/server-memory 2>nul

REM Brave Search MCP
echo Installing Brave Search MCP...
npm install -g @modelcontextprotocol/server-brave-search 2>nul

REM Puppeteer MCP
echo Installing Puppeteer MCP...
npm install -g @modelcontextprotocol/server-puppeteer 2>nul

echo %GREEN%MCP Servers installed!%NC%
exit /b 0

:setup_project
echo %YELLOW%Setting up AI-CLI project...%NC%

REM Get current directory
set PROJECT_DIR=%~dp0..
cd /d "%PROJECT_DIR%"

REM Install dependencies
echo Installing project dependencies...
bun install

REM Setup database
echo Setting up database...
bun run db:push

echo %GREEN%Project setup complete!%NC%
exit /b 0

:create_env_file
echo %YELLOW%Creating environment configuration...%NC%

set ENV_FILE=%USERPROFILE%\.ai-cli-env

(
echo # AI-CLI Environment Configuration
echo # Add your API keys here
echo.
echo # Mistral AI
echo MISTRAL_API_KEY=your_mistral_api_key
echo.
echo # OpenAI / Codex
echo OPENAI_API_KEY=your_openai_api_key
echo.
echo # Anthropic Claude
echo ANTHROPIC_API_KEY=your_anthropic_api_key
echo.
echo # Google Gemini
echo GOOGLE_API_KEY=your_google_api_key
echo.
echo # DeepSeek
echo DEEPSEEK_API_KEY=your_deepseek_api_key
echo.
echo # GitHub (for MCP^)
echo GITHUB_PAT_TOKEN=your_github_token
echo.
echo # Brave Search
echo BRAVE_API_KEY=your_brave_api_key
) > "%ENV_FILE%"

echo %GREEN%Environment file created at %ENV_FILE%%NC%
echo %CYAN%Please edit the file and add your API keys%NC%
exit /b 0

:end
echo.
echo %GREEN%========================================%NC%
echo %GREEN%   AI-CLI Installation Complete!%NC%
echo %GREEN%========================================%NC%
echo.
echo %CYAN%To start AI-CLI:%NC%
echo   cd /d "%~dp0.."
echo   bun run dev
echo.
echo %CYAN%Then open http://localhost:3000 in your browser%NC%
echo.
echo %YELLOW%Don't forget to add your API keys to %USERPROFILE%\.ai-cli-env%NC%
echo.
pause
