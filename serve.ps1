$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootPrefix = $root.TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Parse("127.0.0.1"), 4173)
$listener.Start()

$contentTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".webp" = "image/webp"
    ".mp4"  = "video/mp4"
    ".webm" = "video/webm"
}

function Send-Response {
    param(
        [System.IO.Stream]$Stream,
        [int]$StatusCode,
        [string]$StatusText,
        [byte[]]$Body,
        [string]$ContentType = "text/plain; charset=utf-8"
    )

    $header = @(
        "HTTP/1.1 $StatusCode $StatusText"
        "Content-Type: $ContentType"
        "Content-Length: $($Body.Length)"
        "Connection: close"
        ""
        ""
    ) -join "`r`n"

    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
    $Stream.Write($headerBytes, 0, $headerBytes.Length)
    $Stream.Write($Body, 0, $Body.Length)
    $Stream.Flush()
}

try {
    while ($true) {
        $client = $listener.AcceptTcpClient()

        try {
            $stream = $client.GetStream()
            $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
            $requestLine = $reader.ReadLine()

            if ([string]::IsNullOrWhiteSpace($requestLine)) {
                continue
            }

            # A disconnected client returns null instead of an empty header line.
            while ($null -ne ($headerLine = $reader.ReadLine()) -and $headerLine -ne "") { }

            $parts = $requestLine.Split(" ")
            if ($parts.Length -lt 2) {
                $body = [System.Text.Encoding]::UTF8.GetBytes("Bad Request")
                Send-Response -Stream $stream -StatusCode 400 -StatusText "Bad Request" -Body $body
                continue
            }
            $method = $parts[0]
            $rawPath = $parts[1]

            if ($method -ne "GET") {
                $body = [System.Text.Encoding]::UTF8.GetBytes("Method Not Allowed")
                Send-Response -Stream $stream -StatusCode 405 -StatusText "Method Not Allowed" -Body $body
                continue
            }

            $pathOnly = $rawPath.Split("?")[0]
            $requestPath = [System.Uri]::UnescapeDataString($pathOnly.TrimStart("/"))
            if ([string]::IsNullOrWhiteSpace($requestPath)) {
                $requestPath = "index.html"
            }

            $safePath = $requestPath -replace "/", "\"
            $fullPath = [System.IO.Path]::GetFullPath((Join-Path $root $safePath))

            if (-not $fullPath.StartsWith($rootPrefix, [System.StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
                $body = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
                Send-Response -Stream $stream -StatusCode 404 -StatusText "Not Found" -Body $body
                continue
            }

            $extension = [System.IO.Path]::GetExtension($fullPath).ToLowerInvariant()
            $contentType = $contentTypes[$extension]
            if (-not $contentType) {
                $contentType = "application/octet-stream"
            }

            $body = [System.IO.File]::ReadAllBytes($fullPath)
            Send-Response -Stream $stream -StatusCode 200 -StatusText "OK" -Body $body -ContentType $contentType
        }
        finally {
            $client.Close()
        }
    }
}
finally {
    $listener.Stop()
}
