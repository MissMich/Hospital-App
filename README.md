# EXPRESS

### Setup

A basic Express application, that makes a CRUD operation (create, read, update, delete) using SQLite database.
In this project, you’ll build a basic CRUD (Create, Read, Update, Delete) for an Hospital Report Application.


IMPLEMENT AUTHORIZATION AND AUTHENTICATION: PROTECT ALL ROUTES. ONLY THE LOGGED-IN DOCTORS CAN PERFORM THE FOLLOWING OPERATIONS
- Browsing through reports
- Can add report.
- Can edit report.
- Can delete report.


- This aplication can perform the following:
  - `GET` Request which returns all the data in your database
  - `POST` Request which adds data to your database
  - `PUT` Request which updates fields of a particular data using the id in database
  - `DELETE` Request which removes a particular data from your database using the id

```
[

 {
   DoctorsName: 'john doe',
   email: 'john@example.com', // no duplicates allowed.
   specialization:"Surgeon"
   gender:'m',
   phone:'+2347085647535',
 }
 
   Report:[
   {
  patientId: "databaseID",
  patientName: "String",
  age: 45,
  hospitalName: "String",
  weight: "String",
  height: "String",
  bloodGroup: "String",
  genotype: "String",
  bloodPressure: "String",
  HIV_status: "String",
  hepatitis: "String"
  }
   ......
]
```
