"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AllCustomers() {
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState<any | null>(null);

  const loadCustomers = async () => {
    const res = await axios.get("http://localhost:8080/api/v1/admin/customer/getAllCustomer");
    setCustomers(res.data);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this customer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      await axios.delete(`http://localhost:8080/api/v1/admin/customer/deleteCustomer/${id}`);
      Swal.fire('Deleted!', 'Customer has been deleted.', 'success');
      loadCustomers();
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/v1/admin/customer/updateCustomer/${editCustomer.id}`, editCustomer);
    Swal.fire('Updated!', 'Customer updated successfully.', 'success');
    setEditCustomer(null);
    loadCustomers();
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditCustomer({ ...editCustomer, [name]: value });
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <div className="container mt-5">
      <h4 className="mb-3">All Customers</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>NIC</th>
            <th>Email</th>
            <th>Monthly Income</th>
            <th>Credit Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer: any) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.nic}</td>
              <td>{customer.email}</td>
              <td>{customer.monthlyIncome}</td>
              <td>{customer.creditScore}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => setEditCustomer(customer)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editCustomer && (
        <div className="modal d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleEditSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Customer</h5>
                  <button type="button" className="btn-close" onClick={() => setEditCustomer(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" value={editCustomer.name} onChange={handleEditChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">NIC</label>
                    <input type="text" name="nic" value={editCustomer.nic} onChange={handleEditChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" value={editCustomer.email} onChange={handleEditChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Monthly Income</label>
                    <input type="number" name="monthlyIncome" value={editCustomer.monthlyIncome} onChange={handleEditChange} className="form-control" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setEditCustomer(null)}>Cancel</button>
                  <button type="submit" className="btn btn-success">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
       <button type="button" className="btn btn-outline-dark me-auto" onClick={() => window.history.back()}>
    ← Back
  </button>
    </div>
  );
}
