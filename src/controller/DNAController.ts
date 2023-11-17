import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { DNA } from "../entity/DNA";
import { isSigmano } from "../functions/DNA";

export class DNAController {
  private dnaRepository = AppDataSource.getRepository(DNA);

  async all(request: Request, response: Response, next: NextFunction) {
    const allDNAs = await this.dnaRepository.find({
      relations: { humanType: true },
    });

    return await this.dnaRepository
      .createQueryBuilder("DNA")
      .leftJoinAndSelect("DNA.humanType", "type")
      .getMany();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.dnaRepository.findOne({
      where: { id },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { dna } = request.body;
    if (!dna) throw new Error("DNA is required");
    const matrixSize = Math.sqrt(dna.length);
    if (matrixSize % 1 !== 0) throw new Error("Invalid DNA size");
    if (!dna.match(/^[ATCG]+$/)) throw new Error("Invalid DNA sequence");

    const existantDNA = await this.dnaRepository
      .createQueryBuilder("DNA")
      .leftJoinAndSelect("DNA.humanType", "type")
      .where("content = :dna", { dna })
      .getOne();

    if (existantDNA) return existantDNA;

    const splittedDNA = [];
    for (let i = 0; i < dna.length; i += matrixSize) {
      splittedDNA.push(dna.slice(i, i + matrixSize));
    }

    let humanType = 1;
    const isModded = isSigmano(splittedDNA);

    if (isModded) humanType = 2;

    const dnaToSave = Object.assign(new DNA(), {
      content: dna,
      humanType,
    });

    return this.dnaRepository.save(dnaToSave);
  }
}
