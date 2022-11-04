import React, { Component } from 'react';

class PlusIcon extends Component {
   render() {
      return (
         <>
            <svg
               width="24"
               height="24"
               viewBox="0 0 24 24"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <g clipPath="url(#clip0_92234_46)">
                  <path
                     d="M12 8V16"
                     stroke="#1D1F22"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
                  <path
                     d="M8 12H16"
                     stroke="#1D1F22"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </g>
               <defs>
                  <clipPath id="clip0_92234_46">
                     <rect width="24" height="24" fill="white" />
                  </clipPath>
               </defs>
            </svg>
         </>
      );
   }
}

export default PlusIcon;
