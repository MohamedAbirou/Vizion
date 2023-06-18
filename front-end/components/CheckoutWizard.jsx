import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {["Cart", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            key={step}
            className={`flex px-10 border-b-2  
          text-center 
       ${
         index <= activeStep
           ? "border-cyan text-cyan font-bold"
           : "border-gray-400 text-gray-200"
       }
       `}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
