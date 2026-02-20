import React, { useState, useEffect } from "react";
import ComponentFactory from "./ComponentFactory";

const formData = {
  title: "User Registration",
  submitLabel: "Register",
  fields: [
    {
      type: "text",
      label: "Full Name",
      name: "fullName",
      placeholder: "Enter your name",
      defaultValue: "Shahaab",
      validation: {
        required: true,
        minLength: 3,
      },
    },
    {
      type: "email",
      label: "Email Address",
      name: "email",
      placeholder: "Enter your email",
      defaultValue: "Shahaab79797@gmail.com",
      validation: {
        required: true,
        pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      },
    },
    {
      type: "password",
      label: "Password",
      name: "password",
      defaultValue: "Shahaab@123",
      validation: {
        required: true,
        minLength: 6,
      },
    },
    {
      type: "select",
      label: "Country",
      defaultValue: "US",
      name: "country",
      options: [
        { label: "India", value: "IN" },
        { label: "USA", value: "US" },
        { label: "Germany", value: "DE" },
      ],
      validation: {
        required: true,
      },
    },
    {
      type: "checkbox",
      label: "Accept Terms & Conditions",
      name: "termsAccepted",
      defaultValue: true,
      validation: {
        required: true,
      },
    },
  ],
};

const DynamicFormBuilder = () => {
  const [activeForm, setActiveForm] = useState({});
  const [activeError, setActiveError] = useState({});
  const initializeForm = () => {
    const form = {};
    const error = {};
    formData.fields.forEach((item) => {
      form[item.name] = item.defaultValue;
      error[item.name] = '';
    });
    setActiveError(error);
    setActiveForm(form);
  };

  useEffect(() => {
    initializeForm();
  }, []);

  const getIsError = (val, control) => {
    if (
      control?.validation?.minLength &&
      val?.length < control?.validation?.minLength
    ) {
      return `Minimum length should be greater than ${control?.validation?.minLength - 1}`;
    }
    if (
      control?.validation?.pattern &&
      !control?.validation?.pattern?.test(val)
    ) {
      return `Input is not valid`;
    }
    if (control?.validation?.required && !val) {
      return `${control.name} is required`;
    }
    return "";
  };
   const updateActiveForm = (value, control) => {
    
    const isError = getIsError(value,control);
    setActiveError((prev) => {
      return { ...prev, [control.name]: isError };
    });
    setActiveForm((prev) => {
      return { ...prev, [control.name]: value };
    });
  };

  
  return (
    <div>
      <h1>Dynamic Form Builder</h1>
      {Object.keys(activeForm).length && formData.fields.map((item) => {
        return (
          <ComponentFactory
            key={item.name}
            error={activeError[item.name]}
            value={activeForm[item.name]}
            validation={item.validation}
            updateForm={updateActiveForm}
            control={item}
          />
        );
      })}
    </div>
  );
};

export default DynamicFormBuilder;
