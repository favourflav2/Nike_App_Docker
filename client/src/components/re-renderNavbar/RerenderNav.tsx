import * as React from "react";
import { motion } from "framer-motion";

export interface IRerenderNavProps {}
const names = [
  { top: "Shop All New Arrivals", bottom: "Shop Now" },
  {
    top: "Why Wait? Try Store Pickup",
    bottom:
      "Buy online and find a store near you for pick up in less than 2 hours. Shop now.",
  },
  { top: "Members: Free Shipping on Orders $50+", bottom: "Join Now" },
];

export default function RerenderNav(props: IRerenderNavProps) {
  const [index, setIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const intervalID = setInterval(() => {
      setIndex((value) => value + 1);
    }, 5000);
    return () => clearInterval(intervalID);
  }, []);
  return (
    <div className="flex flex-col">
      <div className="items-center justify-center flex font-semibold">
        <motion.div key={index} initial={{ x: 300 }} animate={{ x: 0 }}>
          {names[index % names.length].top}
        </motion.div>
      </div>
      <div className="items-center justify-center flex lg:text-sm text-xs font-normal underline mt-1">
        <motion.div key={index} initial={{ x: 300 }} animate={{ x: 0 }}>
          {names[index % names.length].bottom}
        </motion.div>
      </div>
    </div>
  );
}
