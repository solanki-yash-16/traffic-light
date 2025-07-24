import { useEffect, useState } from "react";
const useTrafficLight = () => {
  const [light, setLight] = useState("green");
  const [time, setTime] = useState(3);
  const intervals = { green: 3, yellow: 0.5, red: 4 };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0.1) {
          const nextLight =
            light === "green" ? "yellow" : light === "yellow" ? "red" : "green";
          setLight(nextLight);
          return intervals[nextLight];
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [light]);

  return { light, time };
};
const TrafficLight = () => {
  const { light, time } = useTrafficLight();
  const intervals = { green: 3, yellow: 0.5, red: 4 };

  const trafficLight = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  const lightClass = (color) =>
    `w-16 h-16 rounded-full transition-all duration-300 ${
      light === color ? trafficLight[color] : "bg-gray-400 opacity-50"
    }`;

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col gap-4">
        <div className={lightClass("red")}></div>
        <div className={lightClass("yellow")}></div>
        <div className={lightClass("green")}></div>
      </div>
      <div className="mt-8 text-base font-bold text-zinc-800">
        {Math.ceil(time)}s
      </div>
      <div className="w-16 h-2 bg-gray-300 rounded-full overflow-hidden">
        <div
          className={`h-full bg-${light}-500 transition-all duration-100`}
          style={{ width: `${(time / intervals[light]) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TrafficLight;
