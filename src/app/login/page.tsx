"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
const [authorized, setAuthorized] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/login",
        form
      );
      const user = response.data;

      if (user.role === "ADMIN") {
        localStorage.setItem("user", JSON.stringify(user));
         setAuthorized(true);
        router.push("/admin");
      } else if (user.role === "USER") {
        localStorage.setItem("user", JSON.stringify(user));
         setAuthorized(true);
        router.push("/user");
      } else {
         setAuthorized(false);
        router.push("/");
      }
      console.log(response.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid credentials. Please try again.",
      });
    }
  };

  

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url("background_image.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p
          className="text-center text-muted mt-3 mb-0"
          style={{ fontSize: "14px" }}
        >
          © {new Date().getFullYear()} FundFlow Microfinance
        </p>
      </div>
    </div>
  );
}
