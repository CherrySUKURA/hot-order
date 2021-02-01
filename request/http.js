import {get,post,put,Delete} from './index.js'

export const loginRequest = p => post('/login/userLogin',p)
export const getChannel = p => get('/mini/getChannel',p)
export const logicNoReply = p => post('/mini/logicNoReply',p)
export const logicReply = p => post('/mini/logicReply',p)
export const orderNum = p => post('/mini/orderNum',p)
export const getTodayProductPrice = p => get('/mini/getTodayProductPrice',p)
export const getOrderInfo = p => get('/mini/getOrderInfo',p)
export const getOrderSkuInfo = p => get('/mini/getOrderSkuInfo',p)