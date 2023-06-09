import { UseProductsContextType } from "../context/productsProvider";
import { useContext } from "react";
import productsContext from "../context/productsProvider";

const useProducts = ():UseProductsContextType =>{
    return useContext(productsContext)
}
export default useProducts