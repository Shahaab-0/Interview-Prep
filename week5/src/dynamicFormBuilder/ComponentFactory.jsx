import React from "react";

const ComponentFactory = ({
  error,
  value,
  updateForm,
  control,
}) => {
  
 
  switch (control.type) {
    case "text":
    case "email":
    case "password":
      return (
        <div style={{marginBottom : 15, width: '50%'}}>
            <div>
            <label>{control.label}</label>
            </div>
          <input
            minLength={control.validation?.minLength}
            placeholder={control.label}
            type={control.type}
            onChange={(e) => updateForm(e.target.value)}
            title={control.name}
            value={value}
          />
          {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
        </div>
      );
    case "select":
      return (
        <div style={{marginBottom : 15, width: '50%'}}>
        <select
        value={value ?? ""}
        onChange={(e) => updateForm(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: 6,
          border: error ? "1px solid red" : "1px solid #ccc",
        }}
      >
        <option value="" disabled>
          {control.name}
        </option>

        {control?.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

          <p style={{ color: "red", fontSize: "12px" }}>{error}</p>
        </div>
      );
    case "checkbox":
      return (
        <label>
          <input
            type="checkbox"
            checked={value}
            onChange={() => updateForm(!value)}
          />
          {control.name}
        </label>
      );

    default:
      return null;
  }
};
export default ComponentFactory;
