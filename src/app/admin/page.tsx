"use client";

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
export default function AdminDashboard() {
  const [customers, setCustomers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [minScore, setMinScore] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [authorized, setAuthorized] = useState(false);

  

  const loadData = async () => {
    try {
      const customerRes = await axios.get(
        "http://localhost:8080/api/v1/admin/customer/getAllCustomer"
      );
      const loanRes = await axios.get(
        "http://localhost:8080/api/v1/customer/loan/getAllLoans"
      );

      setCustomers(customerRes.data);
      setLoans(loanRes.data);
    } catch (error) {
      Swal.fire("Error", "Failed to load dashboard data", "error");
    }
  };

    const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user.role !== "ADMIN") {
    setAuthorized(false);
  } else {
    setAuthorized(true);
  }
}, []);

useEffect(() => {
  if (authorized) {
    loadData();
  }
}, [authorized]);

  const filteredLoans = loans.filter((loan: any) => {
    const matchStatus = statusFilter ? loan.status === statusFilter : true;
    const matchMinScore = minScore ? loan.score >= parseInt(minScore) : true;
    const matchMaxScore = maxScore ? loan.score <= parseInt(maxScore) : true;
    return matchStatus && matchMinScore && matchMaxScore;
  });

  if (!authorized) {
  return (
    <div className="container mt-5">
      <div className="alert alert-danger text-center">
        You are not authorized to view this page.
      </div>
    </div>
  );
}

  return (
    <div className="d-flex min-vh-100">
      <div className="bg-dark text-white p-4" style={{ minWidth: "220px" }}>
        <h4 className="mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link href="/addCustomers" className="nav-link text-white">
              Add
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link href="/showAllCustomers" className="nav-link text-white">
              Edit & Delete
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-grow-1 p-4 bg-light">
        <h2>Welcome, Admin 👋</h2>
           <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
        <p className="text-muted">
          Use the menu to manage customers and loans.
        </p>

        <div className="container py-5">
          <h2 className="mb-4">Admin Dashboard</h2>

          <h4>All Customers</h4>
          <div className="table-responsive mb-5">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>NIC</th>
                  <th>Email</th>
                  <th>Monthly Income</th>
                  <th>Credit Score</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c: any) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.nic}</td>
                    <td>{c.email}</td>
                    <td>{c.monthlyIncome}</td>
                    <td>{c.creditScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4>Loan Applications</h4>

          <div className="row g-3 align-items-center mb-3">
            <div className="col-md-3">
              <label className="form-label">Filter by Status</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Min Score</label>
              <input
                type="number"
                className="form-control"
                value={minScore}
                onChange={(e) => setMinScore(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Max Score</label>
              <input
                type="number"
                className="form-control"
                value={maxScore}
                onChange={(e) => setMaxScore(e.target.value)}
              />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setStatusFilter("");
                  setMinScore("");
                  setMaxScore("");
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Customer</th>
                  <th>Loan Amount</th>
                  <th>Duration (Months)</th>
                  <th>Purpose</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map((loan: any) => (
                  <tr key={loan.id}>
                    <td>{loan.customer?.name || "N/A"}</td>
                    <td>{loan.loanAmount}</td>
                    <td>{loan.durationMonths}</td>
                    <td>{loan.purpose}</td>
                    <td>{loan.score}</td>
                    <td>
                      <span
                        className={`badge ${
                          loan.status === "Approved"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {loan.status}
                      </span>
                    </td>
                    <td>{loan.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
