import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../axios";


const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const navigate = useNavigate(); // Import useNavigate from react-router-dom
   

    const onSubmit = async (data) => {
      
        try {
            const response = await axiosInstance.post("register/", data);
            toast.success("Registration successful!");
            navigate("/login"); // Redirect to login page on error
            console.log("Registration successful:", response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.username?.[0] || "There was a problem with the registration request.";
            toast.error(errorMessage);
            console.error("There was a problem with the registration request:", error);
          
        } 
    };



  

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ backgroundColor: "#2B3035", color: "#fff" }}>
                        <div className="card-header text-center">
                            <h3>Register</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        <User size={18} className="me-2" />
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        style={{
                                            backgroundColor: "#3A3F44",
                                            color: "#fff",
                                            border: "1px solid #555",
                                        }}
                                        {...register("username", { required: "Username is required" })}
                                    />
                                    {errors.username && (
                                        <small className="text-danger">{errors.username.message}</small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        <Mail size={18} className="me-2" />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        style={{
                                            backgroundColor: "#3A3F44",
                                            color: "#fff",
                                            border: "1px solid #555",
                                        }}
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: "Invalid email address",
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <small className="text-danger">{errors.email.message}</small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        <Lock size={18} className="me-2" />
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        style={{
                                            backgroundColor: "#3A3F44",
                                            color: "#fff",
                                            border: "1px solid #555",
                                        }}
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters",
                                            },
                                        })}
                                    />
                                    {errors.password && (
                                        <small className="text-danger">{errors.password.message}</small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        <CheckCircle size={18} className="me-2" />
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        style={{
                                            backgroundColor: "#3A3F44",
                                            color: "#fff",
                                            border: "1px solid #555",
                                        }}
                                        {...register("confirmPassword", {
                                            required: "Confirm Password is required",
                                            validate: (value) =>
                                                value === watch("password") || "Passwords do not match",
                                        })}
                                    />
                                    {errors.confirmPassword && (
                                        <small className="text-danger">{errors.confirmPassword.message}</small>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-md"
                                    style={{
                                        fontWeight: "bold",
                                        borderRadius: "5px",
                                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                    }}
                                 
                                >
                                   Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;