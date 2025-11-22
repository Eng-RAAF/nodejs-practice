# Script to fix Prisma EPERM errors on Windows
Write-Host "Fixing Prisma client generation issues..." -ForegroundColor Yellow

# Step 1: Check for running Node processes
Write-Host "`nChecking for running Node processes..." -ForegroundColor Cyan
$nodeProcesses = Get-Process | Where-Object {$_.ProcessName -like "*node*"}
if ($nodeProcesses) {
    Write-Host "Found running Node processes. Please stop your server first." -ForegroundColor Red
    $nodeProcesses | Format-Table ProcessName, Id
    Write-Host "`nStopping Node processes..." -ForegroundColor Yellow
    $nodeProcesses | Stop-Process -Force
    Start-Sleep -Seconds 2
} else {
    Write-Host "No Node processes found. Good!" -ForegroundColor Green
}

# Step 2: Remove .prisma folder
Write-Host "`nRemoving old Prisma client..." -ForegroundColor Cyan
$prismaPath = "node_modules\.prisma"
if (Test-Path $prismaPath) {
    try {
        Remove-Item -Path $prismaPath -Recurse -Force -ErrorAction Stop
        Write-Host "Removed .prisma folder successfully" -ForegroundColor Green
    } catch {
        Write-Host "Could not remove .prisma folder: $_" -ForegroundColor Red
        Write-Host "Please close all applications and try again, or delete manually" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host ".prisma folder not found" -ForegroundColor Yellow
}

# Step 3: Generate Prisma client
Write-Host "`nGenerating Prisma client..." -ForegroundColor Cyan
try {
    npx prisma generate
    Write-Host "`n✓ Prisma client generated successfully!" -ForegroundColor Green
} catch {
    Write-Host "`n✗ Error generating Prisma client: $_" -ForegroundColor Red
    exit 1
}

Write-Host "`nDone!" -ForegroundColor Green

