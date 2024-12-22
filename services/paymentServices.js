import { InvestorDetails } from "../model/InvestorDetails.js"
import { Order } from "../model/Order.js"
import { NotFoundError } from "../utils/errors.js"

export const fetchOrders = async(userId) =>{
  try{
    const orders = await Order.find({userId:userId})
    if(!orders){
      throw new NotFoundError()
    }
    else{
      return orders
    } 
  } 
  catch(e){
    throw e
  }
}