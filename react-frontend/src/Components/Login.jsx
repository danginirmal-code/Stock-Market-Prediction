import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock} from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "../axios";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
 
    const { setIsLoggedIn } = React.useContext(AuthContext); // Assuming you have a context for user authentication

    const onSubmit = async (data) => {
      
        try {
            const response = await axiosInstance.post("token/", data);
            const { access, refresh } = response.data;
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            toast.success("Login successful!");
            setIsLoggedIn(true); // Set the user in context or state
            navigate("/dashboard"); // Redirect to dashboard on successful login
           
        } catch (error) {
            const errorMessage = error.response?.data?.detail || "Login failed. Please check your credentials.";
            toast.error(errorMessage);
            console.error("Login error:", error);
        } 
    };


 
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ backgroundColor: "#2B3035", color: "#fff" }}>
                        <div className="card-header text-center">
                            <h3>Login</h3>
                        </div>
                        <div className="card-body">

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        <Mail size={18} className="me-2" />
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
                                        {...register("password", { required: "Password is required" })}
                                    />
                                    {errors.password && (
                                        <small className="text-danger">{errors.password.message}</small>
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
                                    Login
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;