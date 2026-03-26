import { type IAuthRequest } from "@/routes/index";
import Service "./serv"
import { throwErrorOnValidation } from "@/utils/error";

const list = async (req: IAuthRequest) => {
    try {
        return await Service.list(req.query);
    } catch (err) {
        throw err;
    }
};

const create = async (req: IAuthRequest) => {
    try {
        const ownerId = req.user?.id;
        if (!ownerId) throwErrorOnValidation("User not authenticated");
        return await Service.create(req.body, ownerId);
    } catch (err) {
        throw err;
    }
};

const findOne = async (req: IAuthRequest) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) throwErrorOnValidation("Invalid business ID");
        return await Service.find(Number(id));
    } catch (err) {
        throw err;
    }
};

const update = async (req: IAuthRequest) => {
    try {
        const { id } = req.params;
        const ownerId = req.user?.id;
        if (!id || isNaN(Number(id))) throwErrorOnValidation("Invalid business ID");
        if (!ownerId) throwErrorOnValidation("User not authenticated");
        return await Service.update(Number(id), req.body, ownerId);
    } catch (err) {
        throw err;
    }
};

const remove = async (req: IAuthRequest) => {
    try {
        const { id } = req.params;
        const ownerId = req.user?.id;
        if (!id || isNaN(Number(id))) throwErrorOnValidation("Invalid business ID");
        if (!ownerId) throwErrorOnValidation("User not authenticated");
        return await Service.remove(Number(id), ownerId);
    } catch (err) {
        throw err;
    }
};

export default { list, create, findOne, update, remove };
