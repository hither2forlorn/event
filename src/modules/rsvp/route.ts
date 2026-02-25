import Controller from "./controller"
const route = [
  {
    method: "post",
    controller: Controller.accept,
    path: "rsvp/accept/:id",
  }
]
export default route; 
