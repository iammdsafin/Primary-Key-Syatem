<?php
include 'db_connect.php';

if (isset($_POST['submit'])) {
    $email = $_POST['email'];
    $phone = $_POST['phone'];

    $checkTableData = "SELECT id FROM submissions WHERE email = ? AND phone = ?";
    $checkData = $conn->prepare($checkTableData);
    $checkData->bind_param("ss", $email, $phone);
    $checkData->execute();
    $checkData->store_result();

    if ($checkData->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'This email and phone number has already been submitted.']);
    } else {
        $data = $conn->prepare("INSERT INTO submissions (email, phone) VALUES (?, ?)");
        $data->bind_param("ss", $email, $phone);

        if ($data->execute()) {
            echo json_encode(['success' => true, 'message' => 'Your contact details submitted successfully!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $data->error]);
        }

        $data->close();
    }
    $checkData->close();
}
$conn->close();
?>