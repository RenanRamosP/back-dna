import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { DNA } from "../entity/DNA";
import { isSigmano } from "../functions/DNA";

export class DNAController {
  private dnaRepository = AppDataSource.getRepository(DNA);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const allDNAs = await this.dnaRepository
        .createQueryBuilder("DNA")
        .leftJoinAndSelect("DNA.humanType", "type")
        .getMany();

      response.status(200).send(allDNAs);
    } catch (err) {
      response.status(400).send(err.message);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      if (request.params.id === undefined) throw new Error("ID is required");
      const id = parseInt(request.params.id);

      const DNA = await this.dnaRepository.findOne({
        where: { id },
      });

      if (!DNA) {
        throw new Error("DNA not found");
      }
      response.status(200).send(DNA);
    } catch (err) {
      response.status(400).send(err.message);
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
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

      if (existantDNA) response.status(200).send(existantDNA);

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

      response.status(201).send(dnaToSave);
    } catch (err) {
      response.status(400).send(err.message);
    }
  }
}
