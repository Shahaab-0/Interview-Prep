import React, { useEffect, useRef, useState } from "react";

const delay = async (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const LIGHTS = {
  RED: { Id: "RED", colour: "red", delay: 4000 },
  YELLOW: { Id: "YELLOW", colour: "yellow", delay: 500 },
  GREEN: { Id: "GREEN", colour: "green", delay: 3000 },
};

function TrafficLight() {
  const [currentLight, setCurrentLight] = useState(null);
  const lightRef = useRef(currentLight);

  const getNextLight = (currentLight) => {
    if (!currentLight || currentLight.Id == "GREEN") {
      return LIGHTS.RED;
    } else if (currentLight.Id == "RED") {
      return LIGHTS.YELLOW;
    } else {
      return LIGHTS.GREEN;
    }
  };

  const triggerStart = async () => {
    while (true) {
      const nextLight = getNextLight(lightRef.current);
      setCurrentLight(nextLight);
      await delay(nextLight.delay);
    }
  };

  useEffect(() => {
    triggerStart();
  }, []);

  useEffect(() => {
    lightRef.current = currentLight;
  }, [currentLight]);

  return (
    <div
      style={{
        height: 30,
        width: 30,
        backgroundColor: currentLight.colour,
        borderRadius: "50%",
      }}
    />
  );
}

export default TrafficLight;
