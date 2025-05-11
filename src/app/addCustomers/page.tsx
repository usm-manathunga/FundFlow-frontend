
"use client";
import { useState } from "react";
import axios from "axios";
import Head from "next/head";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function CustomerSave({  onCancel }: any) {

 const [form, setForm] = useState({
    name: '',
    nic: '',
    email: '',
    monthlyIncome: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/v1/admin/customer/createCustomer", form);
      Swal.fire({
      icon: 'success',
      title: 'Customer Saved!',
      text: 'The customer has been saved successfully.',
      confirmButtonColor: '#3085d6',
    });
      setForm({ name: '', nic: '', email: '', monthlyIncome: '' }); 
    } catch (error: any) {
       Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to save the customer.',
    });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '500px' }}>
        <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
          <h5 className="mb-3">Add Customer</h5>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">NIC</label>
            <input type="text" name="nic" className="form-control" value={form.nic} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <label className="form-label">Monthly Income</label>
            <input type="number" name="monthlyIncome" className="form-control" value={form.monthlyIncome} onChange={handleChange} required />
          </div>

          <div className="d-flex justify-content-end">
             <button type="button" className="btn btn-outline-dark me-auto" onClick={() => window.history.back()}>
    ← Back
  </button>
            <button type="submit" className="btn btn-primary me-2">Save</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}