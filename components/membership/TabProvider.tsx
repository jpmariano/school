
'use client'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';





type TabContextType = {
    tab_value: number;
    setTabValue: React.Dispatch<React.SetStateAction<number>>;
}


interface TabProviderProps {
  children: ReactNode;
  //initialMembership: UserAccountDetails;
}



export const TabContext = createContext<null | TabContextType> (null);

//Context Children Wrapper
export const TabProvider: React.FC<TabProviderProps> =  ({ children}) => {

  const [tab_value, setTabValue] = useState<number>(0);


  return (
    <TabContext.Provider value={{  tab_value, setTabValue }}>
      {children}
    </TabContext.Provider>
    );
};  

//Use by Children
export const useTabContext = () => {
  const tabContext = useContext(TabContext);
  if(!tabContext) throw new Error("You need to use this context inside the TabProvider");
  return (tabContext);
}; 


