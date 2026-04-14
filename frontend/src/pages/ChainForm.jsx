// src/pages/ChainManagement/ChainForm.jsx
// This single component handles BOTH Add and Edit operations.
// If chainId exists in URL → Edit mode. If not → Add mode.
// This avoids duplicating form code.

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import chainService from "../../api/chainService";
// import groupService from "../../api/groupService";
import chainService from "../api/chainService";
import { getGroups, createGroup, deleteGroup, updateGroup } from "../api/groupService";

const ChainForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // id exists only when editing (/chains/edit/:id)
  const isEditMode = Boolean(id);

  // Form fields state
  const [formData, setFormData] = useState({
    companyName: "",
    gstnNo: "",
    groupId: "",
  });

  // Validation errors per field
  const [errors, setErrors] = useState({});
  // List of active groups for the dropdown
  const [groups, setGroups] = useState([]);
  // Loading state for form submission button
  const [submitting, setSubmitting] = useState(false);
  // Loading state when fetching existing chain data (edit mode)
  const [loadingData, setLoadingData] = useState(isEditMode);
  // Server-side error (e.g., duplicate GSTN)
  const [serverError, setServerError] = useState("");

  // On mount: Load active groups for dropdown
  useEffect(() => {
    groupService.getAllActiveGroups()
      .then(setGroups)
      .catch(() => setGroups([]));
  }, []);

  // On mount (edit mode only): Pre-fill form with existing chain data
  useEffect(() => {
    if (isEditMode) {
      chainService.getChainById(id)
        .then((chain) => {
          setFormData({
            companyName: chain.companyName,
            gstnNo: chain.gstnNo,
            groupId: String(chain.groupId),
          });
          setLoadingData(false);
        })
        .catch((err) => {
          setServerError(err.message || "Failed to load chain data.");
          setLoadingData(false);
        });
    }
  }, [id, isEditMode]);

  // Update form field when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the field's error as user starts typing
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Client-side validation before sending to backend
  const validate = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    } else if (formData.companyName.trim().length > 255) {
      newErrors.companyName = "Company name must be under 255 characters.";
    }

    if (!formData.gstnNo.trim()) {
      newErrors.gstnNo = "GSTN number is required.";
    } else {
      // GSTN format: 15 characters, e.g. 27ABCDE1234F1Z5
      const gstnRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstnRegex.test(formData.gstnNo.toUpperCase().trim())) {
        newErrors.gstnNo = "Invalid GSTN format. Example: 27ABCDE1234F1Z5";
      }
    }

    if (!formData.groupId) {
      newErrors.groupId = "Please select a group.";
    }

    return newErrors;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    // Run client-side validation first
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        companyName: formData.companyName.trim(),
        gstnNo: formData.gstnNo.toUpperCase().trim(),
        groupId: parseInt(formData.groupId),
      };

      if (isEditMode) {
        await chainService.updateChain(id, payload);
      } else {
        await chainService.addChain(payload);
      }

      // On success → go to dashboard
      navigate("/chains", {
        state: {
          success: isEditMode
            ? "Chain updated successfully!"
            : "Chain added successfully!",
        },
      });
    } catch (err) {
      setServerError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Show spinner while loading existing data in edit mode
  if (loadingData) {
    return (
      <div className="container-fluid py-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2 text-muted">Loading chain data...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* ---- Breadcrumb ---- */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <button className="btn btn-link p-0 text-decoration-none" onClick={() => navigate("/chains")}>
              Chain Management
            </button>
          </li>
          <li className="breadcrumb-item active">{isEditMode ? "Edit Chain" : "Add Chain"}</li>
        </ol>
      </nav>

      {/* ---- Page Header ---- */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1 text-dark">
          <i className={`bi ${isEditMode ? "bi-pencil-square" : "bi-plus-circle"} me-2 text-primary`}></i>
          {isEditMode ? "Edit Chain / Company" : "Add New Chain / Company"}
        </h4>
        <p className="text-muted small mb-0">
          {isEditMode
            ? "Update the company details below."
            : "Fill in the details to register a new chain/company in the system."}
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-10">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">

              {/* Server-side error */}
              {serverError && (
                <div className="alert alert-danger d-flex align-items-center gap-2">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>

                {/* Company Name Field */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Company Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    className={`form-control form-control-lg ${errors.companyName ? "is-invalid" : ""}`}
                    placeholder="e.g., Persian Darbar Pvt Ltd"
                    value={formData.companyName}
                    onChange={handleChange}
                    maxLength={255}
                    autoFocus
                  />
                  {errors.companyName && (
                    <div className="invalid-feedback">{errors.companyName}</div>
                  )}
                  <div className="form-text">Enter the full legal name of the company/chain.</div>
                </div>

                {/* GSTN Number Field */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    GSTN Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="gstnNo"
                    className={`form-control form-control-lg ${errors.gstnNo ? "is-invalid" : ""}`}
                    placeholder="e.g., 27ABCDE1234F1Z5"
                    value={formData.gstnNo}
                    onChange={(e) => handleChange({
                      target: { name: "gstnNo", value: e.target.value.toUpperCase() }
                    })}
                    maxLength={15}
                    style={{ fontFamily: "monospace", letterSpacing: "1px" }}
                  />
                  {errors.gstnNo ? (
                    <div className="invalid-feedback">{errors.gstnNo}</div>
                  ) : (
                    <div className="form-text">
                      15-character GST number. Format: <code>27ABCDE1234F1Z5</code>. Must be unique.
                    </div>
                  )}
                </div>

                {/* Group Dropdown */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Customer Group <span className="text-danger">*</span>
                  </label>
                  <select
                    name="groupId"
                    className={`form-select form-select-lg ${errors.groupId ? "is-invalid" : ""}`}
                    value={formData.groupId}
                    onChange={handleChange}
                  >
                    <option value="">-- Select Group --</option>
                    {groups.length === 0 && (
                      <option disabled>No active groups found</option>
                    )}
                    {groups.map((g) => (
                      <option key={g.groupId} value={g.groupId}>
                        {g.groupName}
                      </option>
                    ))}
                  </select>
                  {errors.groupId && (
                    <div className="invalid-feedback">{errors.groupId}</div>
                  )}
                  <div className="form-text">
                    Only active groups are shown. Create groups in the Group Management module first.
                  </div>
                </div>

                {/* Info box */}
                <div className="alert alert-info d-flex gap-2 align-items-start mb-4">
                  <i className="bi bi-info-circle-fill mt-1"></i>
                  <div className="small">
                    Each Chain ID is automatically generated. Each GSTN number must be unique
                    across all chains in the system. One Chain = One GSTN Number.
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="d-flex gap-3 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => navigate("/chains")}
                    disabled={submitting}
                  >
                    <i className="bi bi-x-circle me-1"></i> Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-5"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        {isEditMode ? "Updating..." : "Adding..."}
                      </>
                    ) : (
                      <>
                        <i className={`bi ${isEditMode ? "bi-check-circle" : "bi-plus-circle"} me-2`}></i>
                        {isEditMode ? "Update Chain" : "Add Chain"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChainForm;