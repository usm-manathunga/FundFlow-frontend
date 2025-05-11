"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
export default function LoanApplicationPage() {
    const userId : string = JSON.parse(localStorage.getItem("user") || "{}").id;
  const [form, setForm] = useState({
    loanAmount: "",
    durationMonths: "",
    purpose: "",
    monthlyIncome: "",
    existingLoans: "",
    id:userId
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/customer/loan/apply",
        form
      );

      Swal.fire({
        icon: "success",
        title: "Loan Submitted",
        text: `Status: ${response.data.status}\nScore: ${response.data.score}`,
        confirmButtonColor: "#3085d6",
      });

      setForm({
        loanAmount: "",
        durationMonths: "",
        purpose: "",
        monthlyIncome: "",
        existingLoans: "",
        id:""
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please check your inputs or try again.",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h4 className="text-center mb-4">Loan Application</h4>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Loan Amount</label>
            <input
              type="number"
              className="form-control"
              name="loanAmount"
              value={form.loanAmount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Duration (Months)</label>
            <input
              type="number"
              className="form-control"
              name="durationMonths"
              value={form.durationMonths}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Purpose</label>
            <textarea
              className="form-control"
              name="purpose"
              rows={2}
              value={form.purpose}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Monthly Income</label>
            <input
              type="number"
              className="form-control"
              name="monthlyIncome"
              value={form.monthlyIncome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Existing Loans</label>
            <input
              type="number"
              className="form-control"
              name="existingLoans"
              value={form.existingLoans}
              onChange={handleChange}
              required
            />
            {parseInt(form.existingLoans) >= 2 && (
              <div className="text-danger mt-1">
                Cannot apply if 2 or more existing loans are active.
              </div>
            )}
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => window.history.back()}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={parseInt(form.existingLoans) >= 2}
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
