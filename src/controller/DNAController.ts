import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { DNA } from "../entity/DNA";

export class DNAController {
  private userRepository = AppDataSource.getRepository(DNA);

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, age } = request.body;

    const user = Object.assign(new DNA(), {
      firstName,
      lastName,
      age,
    });

    return this.userRepository.save(user);
  }
}
