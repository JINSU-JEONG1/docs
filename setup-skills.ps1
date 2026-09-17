[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$canonicalSkills = [IO.Path]::GetFullPath((Join-Path $repoRoot 'skills'))
$linkPaths = @(
    (Join-Path $repoRoot '.claude\skills'),
    (Join-Path $repoRoot '.agents\skills')
)

if (-not (Test-Path -LiteralPath $canonicalSkills -PathType Container)) {
    throw "Canonical skills directory does not exist: $canonicalSkills"
}

foreach ($linkPath in $linkPaths) {
    $parent = Split-Path -Parent $linkPath
    New-Item -ItemType Directory -Path $parent -Force | Out-Null

    if (Test-Path -LiteralPath $linkPath) {
        $item = Get-Item -LiteralPath $linkPath -Force
        $targets = @($item.Target | ForEach-Object {
            if ([IO.Path]::IsPathRooted($_)) {
                [IO.Path]::GetFullPath($_)
            } else {
                [IO.Path]::GetFullPath((Join-Path $parent $_))
            }
        })

        if ($item.LinkType -eq 'Junction' -and $targets -contains $canonicalSkills) {
            Write-Host "Already linked: $linkPath -> $canonicalSkills"
            continue
        }

        if ($item.PSIsContainer -and -not (Get-ChildItem -LiteralPath $linkPath -Force)) {
            [IO.Directory]::Delete($linkPath)
        } else {
            throw "Refusing to replace an existing non-empty or non-matching path: $linkPath"
        }
    }

    New-Item -ItemType Junction -Path $linkPath -Target $canonicalSkills | Out-Null
    Write-Host "Linked: $linkPath -> $canonicalSkills"
}
