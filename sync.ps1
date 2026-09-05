$ErrorActionPreference = 'Stop'
Set-Location -Path $PSScriptRoot

$modsDir = Join-Path $PSScriptRoot 'mods'
$stash   = Join-Path $PSScriptRoot '.jarstash'
$backup  = Join-Path $PSScriptRoot '.jarstash-new'

function Get-TrackedNames {
    $map = @{}
    Get-ChildItem -Path $modsDir -Filter '*.pw.toml' -File | ForEach-Object {
        $hit = Select-String -Path $_.FullName -Pattern '^\s*filename\s*=\s*"(.+)"' | Select-Object -First 1
        if ($hit) { $map[$hit.Matches[0].Groups[1].Value] = $_.FullName }
    }
    return $map
}

$jars    = @(Get-ChildItem -Path $modsDir -Filter '*.jar' -File)
$tracked = Get-TrackedNames
$jarNames = @($jars | ForEach-Object { $_.Name })

# 実体が消えたメタデータを削除（Mod削除・更新の検出）
foreach ($name in @($tracked.Keys)) {
    if ($jarNames -notcontains $name) {
        Write-Host "[削除] $name" -ForegroundColor Yellow
        Remove-Item -LiteralPath $tracked[$name] -Force
        $tracked.Remove($name)
    }
}

# メタデータの無い jar を洗い出す
$newJars = @($jars | Where-Object { -not $tracked.ContainsKey($_.Name) })

if ($newJars.Count -eq 0) {
    Write-Host "新しい jar はなし" -ForegroundColor DarkGray
} else {
    Write-Host "[検出対象] $($newJars.Count) 個" -ForegroundColor Cyan
    $newJars | ForEach-Object { Write-Host "  $($_.Name)" }

    New-Item -ItemType Directory -Path $stash, $backup -Force | Out-Null
    $newNames = @($newJars | ForEach-Object { $_.Name })

    # 既存 jar を退避（同一ドライブ内の移動なので一瞬）
    foreach ($j in $jars) {
        if ($newNames -notcontains $j.Name) {
            Move-Item -LiteralPath $j.FullName -Destination $stash -Force
        }
    }
    # 対象 jar は複製して保険をかける
    foreach ($j in $newJars) { Copy-Item -LiteralPath $j.FullName -Destination $backup -Force }

    packwiz curseforge detect -y

    Get-ChildItem -Path $stash -Filter '*.jar' -File | Move-Item -Destination $modsDir -Force
    foreach ($b in @(Get-ChildItem -Path $backup -Filter '*.jar' -File)) {
        $dest = Join-Path $modsDir $b.Name
        if (-not (Test-Path -LiteralPath $dest)) { Move-Item -LiteralPath $b.FullName -Destination $modsDir }
    }
    Remove-Item -LiteralPath $stash, $backup -Recurse -Force -ErrorAction SilentlyContinue
}

packwiz refresh

# 結果を突き合わせる
$after = Get-TrackedNames
$jarCount  = @(Get-ChildItem -Path $modsDir -Filter '*.jar' -File).Count
Write-Host ""
Write-Host "jar: $jarCount / メタデータ: $($after.Count)" -ForegroundColor Green

$orphans = @(Get-ChildItem -Path $modsDir -Filter '*.jar' -File | Where-Object { -not $after.ContainsKey($_.Name) })
if ($orphans.Count -gt 0) {
    Write-Host "CurseForge で特定できなかった Mod（要手動対応）:" -ForegroundColor Yellow
    $orphans | ForEach-Object { Write-Host "  $($_.Name)" }
}