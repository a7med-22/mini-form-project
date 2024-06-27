import Modal from "./Modal";
import "./loanForm.css";
import { useState } from "react";
// import Modal from "./Modal";
export default function LoanForm() {
  const [formInputsValue, setFormInputs] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    isEmployee: false,
    salary: "",
  });
  const [modalMessagevalue, setModalMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [color, setColor] = useState("red");

  function nameInputHandler(event) {
    setFormInputs({ ...formInputsValue, name: event.target.value });
  }
  function PhoneInputHandler(event) {
    setFormInputs({ ...formInputsValue, phoneNumber: event.target.value });
  }
  function ageInputHandler(event) {
    setFormInputs({ ...formInputsValue, age: event.target.value });
  }

  function isEmployeeHandler(event) {
    setFormInputs({ ...formInputsValue, isEmployee: event.target.checked });
  }

  function salaryHandler(event) {
    setFormInputs({ ...formInputsValue, salary: event.target.value });
  }

  function submitHandler(event) {
    event.preventDefault();
    let message = "";
    // if (
    //   formInputsValue.phoneNumber.length < 10 ||
    //   formInputsValue.phoneNumber.length > 13
    // ) {
    //   message = "phone number should be between 10 to 13 digits";
    //   if (formInputsValue.age < 18 || formInputsValue.age > 25) {
    //     message += " and age should be between 18 and 25";
    //   }
    // } else if (formInputsValue.age < 18 || formInputsValue.age > 25) {
    //   message = "age should be between 18 and 25";
    // } else {
    //   message = "The Form Has Been Submitted Successfully";
    // }

    //   this if condition in better way

    const isPhoneNumberValid =
      formInputsValue.phoneNumber.length >= 10 &&
      formInputsValue.phoneNumber.length <= 13;

    const isAgeValid = formInputsValue.age >= 18 && formInputsValue.age <= 25;

    if (!isPhoneNumberValid) {
      message = "Phone number should be between 10 to 13 digits";
    }

    if (!isAgeValid) {
      message += message
        ? " and age should be between 18 and 25"
        : "Age should be between 18 and 25";
      //   message += message
      //     ? " and age should be between 18 and 25"
      //     : "Age should be between 18 and 25";
    }

    if (isPhoneNumberValid && isAgeValid) {
      message = "The Form Has Been Submitted Successfully";
      setColor("green");
    }
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    setModalMessage(message);
  }

  const btnDisabled =
    formInputsValue.name === "" ||
    formInputsValue.age === "" ||
    formInputsValue.phoneNumber === "";
  function handleDivClick() {
    if (isVisible) {
      setIsVisible(false);
    }
    //   we use if here because when click submit it make isvisible true then false
  }
  return (
    <div
      onClick={handleDivClick}
      className={"flex-center"}
      style={{ height: "100vh", flexDirection: "column" }}
    >
      <form
        id={"loanForm"}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h2>Requesting a Loan</h2>

        <hr></hr>

        <label>Name :</label>
        <input value={formInputsValue.name} onChange={nameInputHandler} />

        <label>Phone Number :</label>
        <input
          value={formInputsValue.phoneNumber}
          onChange={PhoneInputHandler}
        />

        <label>Age :</label>
        <input value={formInputsValue.age} onChange={ageInputHandler} />

        <label>Are you an employee ?</label>
        <input
          type="checkbox"
          checked={formInputsValue.isEmployee}
          onChange={isEmployeeHandler}
        />

        <label>salary</label>
        <select value={formInputsValue.salary} onChange={salaryHandler}>
          <option>less than 500$</option>
          <option>between 500$ and 2000$</option>
          <option>more than 2000$</option>
        </select>

        <button
          id="loanFormButton"
          className={btnDisabled ? "disabled" : ""}
          onClick={submitHandler}
          disabled={btnDisabled}
        >
          Submit
        </button>
      </form>
      {isVisible && <Modal messageColor={color} message={modalMessagevalue} />}
    </div>
  );
}
