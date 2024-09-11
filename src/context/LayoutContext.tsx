// 'use client';
// import React, { createContext, useState } from 'react';

// interface LayoutContextProps {
//   mainPage: boolean;
//   setMainPage: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

// export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
//   const [mainPage, setMainPage] = useState(false);

//   return (
//     <LayoutContext.Provider value={{ mainPage, setMainPage }}>
//       {children}
//     </LayoutContext.Provider>
//   );
// };

// export const useLayoutContext = () => {
//   const context = React.useContext(LayoutContext);
//   if (!context) {
//     throw new Error(
//       'useLayoutContext must be used within a LayoutContextProvider',
//     );
//   }
//   return context;
// };

// export default LayoutContext;
