import React from "react";
import { motion } from "framer-motion";

const Cart = ({ text, icon, number, style }) => {
  return (
    <motion.div whileHover={{scale:1.1}} transition={{ease:'linear'}} className={` ${style} h-[200px] p-4 shadow-md rounded-lg cursor-pointer`}>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">{text}</span>
        {icon}
      </div>
      <span className="text-4xl font-bold">{number}</span>
    </motion.div>
  );
};

export default Cart;
