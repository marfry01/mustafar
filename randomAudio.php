<?php
header('Content-Type: text/plain');

$dir = './';
$files = glob($dir . '*.mp3');

if ($files) {
    $randomFile = $files[array_rand($files)];
    $randomFileUrl = str_replace($_SERVER['DOCUMENT_ROOT'], '', $randomFile);
    echo trim($randomFileUrl);
} else {
    echo "No audio files found!";
    exit;
}
?>
