import Controller from "./controller"
const route = [
  {
    method: "post",
    controller: Controller.accept,
    path: "rsvp/accept/:id",
  },
  {
    method: "get",
    controller: Controller.getInvitations,
    path: "rsvp/invitations",
    authorization: true,
  },

]
export default route; 
