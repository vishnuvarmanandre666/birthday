Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\aaaa\.gemini\antigravity\brain\376fda4d-ef88-4c70-ba97-90c0fd5e07fa\.user_uploaded\media_1794942768826_3c5bcf5f.jpg"
$outPath1 = "c:\Users\aaaa\OneDrive\Desktop\naveen\public\images\floral-corner.png"
$outPath2 = "c:\Users\aaaa\OneDrive\Desktop\naveen\images\floral-corner.png"

$sourceBmp = [System.Drawing.Bitmap]::FromFile($sourcePath)
$width = $sourceBmp.Width
$height = $sourceBmp.Height

# Create 32-bit ARGB image
$destBmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Lock bits for fast processing
$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$srcData = $sourceBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$dstData = $destBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$bytes = [Math]::Abs($srcData.Stride) * $height
$rgbValues = New-Object byte[] $bytes
[System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $rgbValues, 0, $bytes)

# Identify background pixels
# Checkerboard is neutral grey / white: R >= 180, G >= 180, B >= 180 and |R-G| <= 14 and |G-B| <= 14 and |R-B| <= 14
$isBg = New-Object bool[] ($width * $height)

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $idx = ($y * $width + $x) * 4
        $b = $rgbValues[$idx]
        $g = $rgbValues[$idx + 1]
        $r = $rgbValues[$idx + 2]
        
        $diffRG = [Math]::Abs($r - $g)
        $diffGB = [Math]::Abs($g - $b)
        $diffRB = [Math]::Abs($r - $b)

        # Check if it matches the grey/white checkerboard
        if (($r -ge 185) -and ($g -ge 185) -and ($b -ge 185) -and ($diffRG -le 14) -and ($diffGB -le 14) -and ($diffRB -le 14)) {
            $isBg[$y * $width + $x] = $true
        }
    }
}

# Flood fill from the four borders to mark only true exterior background
$queue = New-Object System.Collections.Generic.Queue[int]
$visited = New-Object bool[] ($width * $height)

# Enqueue borders
for ($x = 0; $x -lt $width; $x++) {
    $idxTop = $x
    $idxBot = ($height - 1) * $width + $x
    if ($isBg[$idxTop] -and -not $visited[$idxTop]) { $visited[$idxTop] = $true; $queue.Enqueue($idxTop) }
    if ($isBg[$idxBot] -and -not $visited[$idxBot]) { $visited[$idxBot] = $true; $queue.Enqueue($idxBot) }
}
for ($y = 0; $y -lt $height; $y++) {
    $idxLeft = $y * $width
    $idxRight = $y * $width + ($width - 1)
    if ($isBg[$idxLeft] -and -not $visited[$idxLeft]) { $visited[$idxLeft] = $true; $queue.Enqueue($idxLeft) }
    if ($isBg[$idxRight] -and -not $visited[$idxRight]) { $visited[$idxRight] = $true; $queue.Enqueue($idxRight) }
}

while ($queue.Count -gt 0) {
    $curr = $queue.Dequeue()
    $cy = [Math]::Floor($curr / $width)
    $cx = $curr % $width

    # Check 4 neighbors
    $neighbors = @(
        @{ X = $cx + 1; Y = $cy },
        @{ X = $cx - 1; Y = $cy },
        @{ X = $cx; Y = $cy + 1 },
        @{ X = $cx; Y = $cy - 1 }
    )

    foreach ($n in $neighbors) {
        $nx = $n.X
        $ny = $n.Y
        if ($nx -ge 0 -and $nx -lt $width -and $ny -ge 0 -and $ny -lt $height) {
            $nidx = $ny * $width + $nx
            if (-not $visited[$nidx] -and $isBg[$nidx]) {
                $visited[$nidx] = $true
                $queue.Enqueue($nidx)
            }
        }
    }
}

# Apply transparency: visited exterior pixels get alpha = 0, with subtle edge softening
$dstValues = New-Object byte[] $bytes

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $idx = ($y * $width + $x) * 4
        $pIndex = $y * $width + $x

        if ($visited[$pIndex]) {
            # Completely transparent
            $dstValues[$idx] = 0
            $dstValues[$idx + 1] = 0
            $dstValues[$idx + 2] = 0
            $dstValues[$idx + 3] = 0
        } else {
            # Check if near an edge for anti-aliasing
            $hasBgNeighbor = $false
            if ($x -gt 0 -and $visited[$pIndex - 1]) { $hasBgNeighbor = $true }
            if ($x -lt $width - 1 -and $visited[$pIndex + 1]) { $hasBgNeighbor = $true }
            if ($y -gt 0 -and $visited[$pIndex - $width]) { $hasBgNeighbor = $true }
            if ($y -lt $height - 1 -and $visited[$pIndex + $width]) { $hasBgNeighbor = $true }

            $b = $rgbValues[$idx]
            $g = $rgbValues[$idx + 1]
            $r = $rgbValues[$idx + 2]

            $dstValues[$idx] = $b
            $dstValues[$idx + 1] = $g
            $dstValues[$idx + 2] = $r

            # If edge pixel has high brightness close to grey, soften alpha
            if ($hasBgNeighbor -and ($r -ge 180) -and ($g -ge 180) -and ($b -ge 180)) {
                $dstValues[$idx + 3] = [byte]160
            } else {
                $dstValues[$idx + 3] = [byte]255
            }
        }
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($dstValues, 0, $dstData.Scan0, $bytes)

$sourceBmp.UnlockBits($srcData)
$destBmp.UnlockBits($dstData)
$sourceBmp.Dispose()

# Save PNG
$destBmp.Save($outPath1, [System.Drawing.Imaging.ImageFormat]::Png)
$destBmp.Save($outPath2, [System.Drawing.Imaging.ImageFormat]::Png)
$destBmp.Dispose()

Write-Output "Successfully saved transparent floral corner to $outPath1 and $outPath2!"
