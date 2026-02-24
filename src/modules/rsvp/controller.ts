import type { IAuthRequest } from "@/routes/index";
import Service from "./service";
import logger from "@/config/logger";
const create = async (req: IAuthRequest) => {
    try{
        //GUest of the event , 
        const rsvp = await Service.create({
            ...req.body,
            userId: req.user.id,
        });
        if(!rsvp){
            throw new Error("Failed to create RSVP");
        }
        logger.info(`RSVP created successfully with id: ${rsvp.id}`);
        return rsvp;
    }catch(err:any){
        throw err ; 
    }
}
export default {
    create,
};
