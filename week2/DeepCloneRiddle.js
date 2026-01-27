const state = {
  user: { id: 101, details: { city: 'Bangalore' } },
  theme: 'dark'
};

const newState = {...state };
newState.user.details.city = 'Chennai';

console.log(state.user.details.city); 
// Expected output? Why did it change?

// the state object is shallow copied into new state so the nested objects are still referencing to the same memory location