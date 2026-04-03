$templates = @(
    'PDP-CEL-GLASS', 'PDP-CEL-PRESTIGE', 'PDP-CEL-MECHA', 'PDP-CEL-SCIFI', 
    'PDP-CEL-BUSINESS', 'PDP-CEL-OUTDOOR', 'PDP-CEL-NORDIC', 
    'PDP-CEL-TERMINAL', 'PDP-CEL-VINTAGE', 'PDP-CEL-STREETWEAR'
)

foreach ($t in $templates) {
    Write-Host "Verifying template: $t"
    $body = @{
        id = $t
        action = "verify"
        verified = $true
    } | ConvertTo-Json -Compress
    
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3000/api/templates/pdp" -Method POST -ContentType "application/json" -Body $body
        Write-Host "Success: $($response.message)" -ForegroundColor Green
    } catch {
        Write-Host "Error verifying $t" -ForegroundColor Red
        Write-Host $_.Exception.Message
    }
}
