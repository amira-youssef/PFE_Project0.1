import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import axios from "axios";
import "./modal.css";

function AddUserModal({ show, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  const password = React.useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    console.log("Form data:", data);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/createUser",
        data,
        { withCredentials: true }
      );
      onClose();
      if (response.status === 201) {
        setOpenSnackbar(true);
        setSnackbarSeverity("success");
        reset();
      } else {
        console.error("Error submitting form:", response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      console.log("Detailed AxiosError:", error.response.data);
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const validateBirthdate = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add User</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="close-icon"
            onClick={onClose}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="register-form">
            <h2>Register as User</h2>
            <TextField
              label="Nom"
              {...register("nom", { required: "Nom is required" })}
              error={!!errors.nom}
              helperText={errors.nom ? errors.nom.message : ""}
            />
            <TextField
              label="Prénom"
              {...register("prenom", { required: "Prénom is required" })}
              error={!!errors.prenom}
              helperText={errors.prenom ? errors.prenom.message : ""}
            />
            <TextField
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
            <TextField
              label="Phone Number"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{8}$/,
                  message: "Phone number must be exactly 8 digits",
                },
              })}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber ? errors.phoneNumber.message : ""}
            />
            <TextField
              label="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
            <TextField
              label="Confirm Password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
              type="password"
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
            />
            <TextField
              label="Birthdate"
              {...register("birthdate", {
                required: "Birthdate is required",
                validate: {
                  isAdult: (value) =>
                    validateBirthdate(value) >= 18 ||
                    "You must be at least 18 years old",
                },
              })}
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.birthdate}
              helperText={errors.birthdate ? errors.birthdate.message : ""}
            />
            <div className="role-select">
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                {...register("role", { required: "Role is required" })}
              >
                <option value="user">user</option>
                <option value="manager">manager</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <Button type="submit" variant="contained">
              Register
            </Button>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
              <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                {snackbarSeverity === "success"
                  ? "Registration successful!"
                  : "Registration failed"}
              </Alert>
            </Snackbar>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserModal;
