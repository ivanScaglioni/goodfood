import { createContext, useState, useEffect } from "react";
import data from "../utils/foodBBDD.json";

export const FoodMenuContext = createContext();

export function FoodMenuContextProvider(props) {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [elemOrder, setElemOrder] = useState();
  const [openOrder, setOpenOrder] = useState(false);
  const [headerOrder, setHeaderOrder] = useState();

  useEffect(() => {
    setMenu(data);
    setElemOrder(document.getElementById("order"));
    setHeaderOrder(document.getElementById("header-order"));
    initOrder(document.getElementById("order"));
  }, []);

  function initOrder(ele) {
    
    ele.style.top = `${innerHeight - ele.offsetHeight}px`;
  }

  function handleOrder(event) {
  
    if (openOrder) {
      elemOrder.style.top = `${innerHeight - headerOrder.offsetHeight}px`;
      setOpenOrder(false);
    } else if (order.length > 0){
      elemOrder.style.top = `${innerHeight - elemOrder.offsetHeight}px`;
      setOpenOrder(true);
    }
  }

  function addOrder(ord) {
    setOrder([
      ...order,
      {
        id: ord.id,
        name: ord.name,
        price: ord.price,
      },
    ]);
  }
  
  function deleteOrder(id) {
    const itemOrd = document.getElementById(`item-${id}`)
    const btnCard = document.getElementById(`btn-card-${id}`)   
    elemOrder.style.top = `${(innerHeight + itemOrd.offsetHeight) - elemOrder.offsetHeight}px`;
    btnCard.className = btnCard.className.replace("remove", "add");
    setOrder(order.filter((ord) => ord.id != id)); 
  }

  window.onresize = ()=>{
    
    if(openOrder){
      elemOrder.style.top = `${innerHeight - elemOrder.offsetHeight}px`;
    }else{
      elemOrder.style.top = `${innerHeight - headerOrder.offsetHeight}px`;
    }
    
    
  }

  return (
    <FoodMenuContext.Provider
      value={{ order, menu, addOrder, deleteOrder, handleOrder }}
    >
      {props.children}
    </FoodMenuContext.Provider>
  );
}
