import React from "react";
import Table from "react-bootstrap/Table";

const EmployeeList = ({ employees, handleDelete }) => {
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action - Update</th>
            <th>Action - Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>
                <img
                  src={employee.img || "path/to/placeholder.jpg"}
                  alt={employee.name}
                  width="50"
                  height="50"
                />
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobNum}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course?.join(", ") || "N/A"}</td>
              <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
              <td>
                <button>Update</button>
              </td>
              <td>
                <button onClick={() => handleDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeList;

