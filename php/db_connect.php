<?php
$servername = 'sql6.freesqldatabase.com';
$username = 'sql6684999';
$password = 'VecFMZHumb';
$dbname = 'sql6684999';

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) 
{
    die('Could not Connect MySql Server: ' . mysqli_error($conn));
}
?>