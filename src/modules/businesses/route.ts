import { role } from "@/constant";
import Controller from "./controller";

const routes = [
    // ─── List all businesses (public) ────────────────────────────────────────
    {
        method: "get",
        controller: Controller.list,
        path: "business",
    },

    // ─── Create a business (authenticated) ───────────────────────────────────
    {
        method: "post",
        controller: Controller.create,
        path: "business",
        authorization: true,
        authCheckType: [role.user],
    },

    // ─── Get a single business with venue/artist detail ───────────────────────
    // (always put specific paths before :id)
    {
        method: "get",
        controller: Controller.findOne,
        path: "business/:id",
    },

    // ─── Update a business (owner only) ──────────────────────────────────────
    {
        method: "patch",
        controller: Controller.update,
        path: "business/:id",
        authorization: true,
        authCheckType: [role.user],
    },

    // ─── Delete a business (owner only) ──────────────────────────────────────
    {
        method: "delete",
        controller: Controller.remove,
        path: "business/:id",
        authorization: true,
        authCheckType: [role.user],
    },
];

export default routes;
