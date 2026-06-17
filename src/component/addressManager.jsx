import { useState } from "react";
import useEcommerceContext from "../context/useEcommerceContext";
import AddressFormModal from "./addressFormModal";

const AddressManager = ({ selectedAddressId, onSelect, radioOff }) => {
  const { addresses, addNewAddress, removeAddress, editAddress } = useEcommerceContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addMaxLengthAlert, setaddMaxLengthAlert] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [formData, setFormData] = useState({
    FullName: "",
    MobileNumber: "",
    FlatNo: "",
    Area: "",
    Town: "",
    State: "",
    Pincode: "",
    Country: "India",
    Landmark: "",
  });

  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const openNewAddressForm = () => {
    setEditId(null);
    setFormData({ FullName: "", MobileNumber: "", FlatNo: "", Area: "", Town: "", State: "", Pincode: "", Country: "India", Landmark: "" });
    setIsModalOpen(true);
  };

  const handleEditClick = (address) => {
    setEditId(address._id);
    setFormData(address);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleAddMaxLength = () => {
    if (addresses.length === 3) {
      setaddMaxLengthAlert(true);
      setTimeout(() => setaddMaxLengthAlert(false), 3000);
    } else {
      openNewAddressForm();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let success = false;
    if (editId) {
      success = await editAddress(editId, formData);
    } else {
      success = await addNewAddress(formData);
    }
    setIsSubmitting(false);
    if (success) closeModal();
  };

  return (
    <div >
      <div >
        <div>
          {addresses.length === 0 ? (
            <p className="text-muted">No addresses saved yet.</p>
          ) : (
          addresses.map((addr) => (
            <ul key={addr._id} className="list-group list-group mb-3 shadow-sm" style={{ width: "100%", maxWidth: "590px" }}>
              <li className="list-group-item p-3">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2">
                  <div className="d-flex flex-wrap align-items-center gap-2 w-100">
                    <input type="radio" name="selectedAddress"
                      checked={addr._id === selectedAddressId}
                      onChange={() => onSelect(addr._id)} className={`flex-shrink-0 ${radioOff ? "d-none" : ""}`}/>
                    <span className="fw-bold">{addr.FullName}</span>
                    <span className="text-muted">|</span>
                    <span>{addr.FlatNo}, {addr.Area}</span>
                    <span className="text-muted">|</span>
                    <span>{addr.Town}, {addr.State} - {addr.Pincode}</span>
                  </div>
                  <div className="d-flex gap-2 flex-shrink-0">
                    <button className="btn btn-outline-info btn-sm" type="button" onClick={() => handleEditClick(addr)}>Edit</button>
                     <button className={addresses.length === 1 ? "btn btn-outline-danger btn-sm d-none" : "btn btn-outline-danger btn-sm"} type="button" onClick={() => setDeleteTargetId(addr._id)}>Delete</button>
                  </div>
                </div>
              </li>
            </ul>
          )))}
        </div>
      </div>
      {addMaxLengthAlert && (
        <div className="alert alert-warning alert-dismissible fade show mt-3" role="alert">
          Only 3 Addresses Can Be Added.
          <button type="button" className="btn-close" onClick={() => setaddMaxLengthAlert(false)} />
        </div>
      )}
      <div className="d-grid">
        <button className="btn btn-outline-success" type="button" onClick={handleAddMaxLength}>Add New Address</button>
      </div>


      {isModalOpen && (
        <AddressFormModal
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          editId={editId}
          onClose={closeModal}
        />
      )}

      {deleteTargetId && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="bg-white rounded p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
            <h5 className="mb-3">Confirm Delete</h5>
            <p>Are you sure you want to delete this address?</p>
            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-secondary" type="button" onClick={() => setDeleteTargetId(null)}>Cancel</button>
              <button className="btn btn-danger" type="button" onClick={() => { removeAddress(deleteTargetId); setDeleteTargetId(null); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressManager;