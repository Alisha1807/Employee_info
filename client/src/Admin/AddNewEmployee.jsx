import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function AddNewEmployee({ addEmployee }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobNum, setMobNum] = useState("");
  const [designation, setDesignation] = useState("HR"); // Default value
  const [gender, setGender] = useState("Male"); // Default value
  const [courses, setCourses] = useState([]);
  const [img, setImg] = useState(null); // Allow null initially

  const handleCourseChange = (e) => {
    const selectedCourses = [...courses];
    if (e.target.checked) {
      selectedCourses.push(e.target.value);
    } else {
      const index = selectedCourses.indexOf(e.target.value);
      if (index > -1) {
        selectedCourses.splice(index, 1);
      }
    }
    setCourses(selectedCourses);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const createEmployee = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !email || !mobNum) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("mobNum", mobNum);
      formData.append("designation", designation);
      formData.append("gender", gender);
      formData.append("courses", JSON.stringify(courses)); 
      if (img) {
        formData.append("img", img); 
      }

    
      const response = await axios.post(
        "http://localhost:4000/api/employeeDetails/employee",
        formData, // Send FormData with file data
        {
          headers: {
            "Content-Type": "multipart/form-data", // Correct header for file upload
          },
        }
      );

      addEmployee(response.data);
      setShow(false); 
    } catch (err) {
      console.error("Error creating employee:", err);
      alert("Error creating employee. Please try again.");
    }
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        + Add New Employee
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createEmployee}>
            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            {/* Mobile Number */}
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                value={mobNum}
                onChange={(e) => setMobNum(e.target.value)}
              />
            </Form.Group>

            {/* Designation Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                as="select"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              >
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </Form.Control>
            </Form.Group>

            {/* Gender Radio Buttons */}
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Male"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </Form.Group>

            {/* Course Checkboxes */}
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  label="MCA"
                  value="MCA"
                  checked={courses.includes("MCA")}
                  onChange={handleCourseChange}
                />
                <Form.Check
                  type="checkbox"
                  label="BCA"
                  value="BCA"
                  checked={courses.includes("BCA")}
                  onChange={handleCourseChange}
                />
                <Form.Check
                  type="checkbox"
                  label="BSC"
                  value="BSC"
                  checked={courses.includes("BSC")}
                  onChange={handleCourseChange}
                />
              </div>
            </Form.Group>

            {/* Image Upload */}
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" type="submit">
                Create Employee
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddNewEmployee;
