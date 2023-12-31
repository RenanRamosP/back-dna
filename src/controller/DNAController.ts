import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { DNA } from "../entity/DNA";
import { isSigmano } from "../functions/DNA";

export class DNAController {
  private dnaRepository = AppDataSource.getRepository(DNA);

  private async getDNAById(id: number) {
    return await this.dnaRepository
      .createQueryBuilder("DNA")
      .leftJoinAndSelect("DNA.humanType", "type")
      .where("DNA.id = :id", { id })
      .getOne();
  }

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const allDNAs = await this.dnaRepository
        .createQueryBuilder("DNA")
        .leftJoinAndSelect("DNA.humanType", "type")
        .getMany();

      return response.status(200).json(allDNAs);
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      if (request.params.id === undefined) throw new Error("ID is required");
      const id = parseInt(request.params.id);

      const DNA = await this.getDNAById(id);

      if (!DNA) {
        throw new Error("DNA not found");
      }
      return response.status(200).json(DNA);
    } catch (err) {
      return response.status(400).json(err.message);
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

      if (existantDNA) return response.status(200).json(existantDNA);

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
      const dbResp = await this.dnaRepository.save(dnaToSave);
      console.log("inserted: ", dbResp);
      const insertedDNA = await this.getDNAById(dbResp.id);

      return response.status(201).json(insertedDNA);
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }
}
