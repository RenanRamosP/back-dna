import { DNAController } from "./controller/DNAController";

export const Routes = [
  {
    method: "get",
    route: "/dna",
    controller: DNAController,
    action: "all",
  },
  {
    method: "get",
    route: "/dna/:id",
    controller: DNAController,
    action: "one",
  },
  {
    method: "post",
    route: "/dna",
    controller: DNAController,
    action: "save",
  },
];
