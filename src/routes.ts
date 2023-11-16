import { DNAController } from "./controller/DNAController";

export const Routes = [
  {
    method: "get",
    route: "/users/:id",
    controller: DNAController,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: DNAController,
    action: "save",
  },
];
