import React, { useReducer } from "react";
import formReducer from "./formReducer";
const initialState = {
  step: 1,
  data: {},
  errors: {},
  isSubmitting: false,
};
const StepperForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const {step, data,errors} = state;
const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!data.firstname) newErrors.firstname = "First Name required";
      if (!data.lastname) newErrors.lastname = "Last Name required";
      if (!data.email) newErrors.email = "Email required";
    }

    if (step === 2) {
      if (!data.age) newErrors.age = "Age required";
      if (!data.bloodgroup) newErrors.bloodgroup = "Blood Group required";
    }

    if (step === 3) {
      if (!data.address) newErrors.address = "Address required";
      if (!data.income) newErrors.income = "Income required";

    }

    dispatch({ type: "SET_ERRORS", errors: newErrors });

    return Object.keys(newErrors).length === 0;
  };

  const onNextStepClick = () => {
    if(state.step == 3)return;
    dispatch({type:  "NEXT_STEP"});
  };
  const onPrevStepClick = () => {
    if (state.step == 1) return;
    dispatch({type : "PREV_STEP"});
  };

  const onValueChange = (value, fieldName) => {
    dispatch({type : 'UPDATE_FIELD', field : fieldName, value : value});
  }

  const onSubmitClick = () =>{
    const isValid = validateStep();
    if(!isValid)return;
    onNextStepClick();
  }
  
  return (
    <div>
      {state.step == 1 && 
        <div style={{marginBottom : 20}}>
            <input value={state.data?.firstname} onChange={(e) => onValueChange(e.target.value, 'firstname')} title="First Name" placeholder="Enter First Name" />
            <p>{errors.firstname}</p>
             <div style={{marginBottom : 10}} />
            <input value={state.data?.lastname} onChange={(e) => onValueChange(e.target.value, 'lastname')} title="Last Name"placeholder="Enter Last Name" />
            <p>{errors.lastname}</p>
             <div style={{marginBottom : 10}} />
            <input  value={state.data?.email} onChange={(e) => onValueChange(e.target.value, 'email')} inputMode="email" title="Email"  placeholder="Enter Email" />
            <p>{errors.email}</p>
        </div>
        }
         {state.step == 2 && 
        <div style={{marginBottom : 20}}>
            <input  value={state.data?.age} onChange={(e) => onValueChange(e.target.value, 'age')} title="Age" placeholder="Enter Age" />
            <p>{errors.age}</p>
           <div style={{marginBottom : 10}} />
            <input  value={state.data?.bloodgroup} onChange={(e) => onValueChange(e.target.value, 'bloodgroup')} title="Blood Group" placeholder="Enter Blood Group" />
             <p>{errors.bloodgroup}</p>
        </div>
        }
          {state.step == 3 && 
        <div style={{marginBottom : 20}}>
            <input  value={state.data?.address} onChange={(e) => onValueChange(e.target.value, 'address')} title="Address" placeholder="Enter Address" />
             <p>{errors.address}</p>
            <div style={{marginBottom : 10}} />
            <input  value={state.data?.income} onChange={(e) => onValueChange(e.target.value, 'income')} title="Income" placeholder="Enter Income" />
             <p>{errors.income}</p>
        </div>
        }
        <div style={{marginBottom : 20}}>
            <button onClick={onSubmitClick}>Submit</button>
        </div>
      <button onClick={onPrevStepClick}>Prev Step</button>
      <button onClick={onNextStepClick}>Next Step</button>
    </div>
  );
};

export default StepperForm;
