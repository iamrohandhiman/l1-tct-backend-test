import { fetchOrders } from "../services/paymentServices.js"
import { NotFoundError } from "../utils/errors.js"

export const fetchOrdersController = async(req,res,next) =>{
  const userId = req._id
  try{
   const orders =  await fetchOrders(req._id)
   res.status(201).send(orders)
  }
  catch(e){
    next(e)
  }
}