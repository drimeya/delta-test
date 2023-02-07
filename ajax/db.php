<?php
namespace Api;
class DB {
    private $host = 'localhost';
    private $login = 'paulinnnya';
    private $password = 'LBG1GGCWCd61U%5C';
    private $database = 'paulinnnya';

    public function connectDB() {
        // Create connection
        $con = mysqli_connect($this->host, $this->login, $this->password, $this->database);
        // Check connection
        if (!$con) {
            die("Connection failed: " . mysqli_connect_error());
        }
        return $con;
    }
    public function getData() {
        $lastday = date("Y-m-d", strtotime("-8 days"));
        $result = $this->connectDB()->query('SELECT * FROM data where date > '.$lastday); 
        $data = [];
        while($row = $result->fetch_assoc()){
            $data[] = $row;
        }
        return $data;
    }

    public function __construct() {
    }
}