import React, { useEffect } from "react";
import TrafficLight from "./traffic-light/TrafficLight";
import RealtimeUi from "./realtime-ui/RealtimeUi";
import MouseTracker from "./mouse-tracker/MouseTracker";
import useCustomFetch from "./custom-use-fetch/useCustomFetch";
import StepperForm from "./stepper-form/StepperForm";
import useWindowDimension from "./window-dimension/useWindowDimension";
// import LikeButton from "./like-button/LikeButton";


function App() {
  // const {size} = useWindowDimension();
  // const { fetchData, data, error,loading} = useCustomFetch()

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchData('https://jsonplaceholder.typicode.com/todos');
  //   }, 10000);
  //   // return clearInterval(interval);
  // },[])
  // console.log(loading, '<---fetching');
    // console.log(size, 'afewfew');
    

  return (
    <div>
      {/* <RealtimeUi />
      <TrafficLight  /> */}
      {/* <MouseTracker /> */}
      {/* <StepperForm /> */}
      <LikeButton />
   </div>
  );
}

export default App;
