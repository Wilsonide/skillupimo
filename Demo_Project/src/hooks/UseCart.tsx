import { UseCartContextType } from "../context/cartProvider";
import { useContext } from "react";
import cartContext from "../context/cartProvider";

const useCart = ():UseCartContextType =>{
    return useContext(cartContext)
}
export default useCart