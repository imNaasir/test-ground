import * as Device from "expo-device";


export const authorizationHeader = (token: string) => ({
    Authorization: `Bearer ${token}`,
   "x-device":`${Device.brand}-${Device.modelName}`

});
