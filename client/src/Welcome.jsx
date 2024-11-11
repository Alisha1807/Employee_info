import axios from "axios";
import EmployeeList from "./Admin/EmployeeList";
import Navbar2 from "./Admin/Navbar2";
import { useEffect, useState } from "react";
import AddNewEmployee from './Admin/AddNewEmployee';

const Welcome = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch all employees from the server
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/employeeDetails/employee");
      setEmployees(res.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/employeeDetails/employee/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div>
      <Navbar2 />
      <h1 style={{ textAlign: "center" }}>Welcome to Admin Panel</h1>

   <EmployeeList employees={employees} handleDelete={handleDelete} />
   
      <AddNewEmployee  addEmployee={addEmployee} />
    </div>
  );
};

export default Welcome;
