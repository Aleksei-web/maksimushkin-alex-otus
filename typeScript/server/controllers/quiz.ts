import { db } from "../db";
import { writeLog } from "../functions/writeLog";
import { Request, Response } from "express";
import { generateUrl } from "../functions/generateUrl";
import {
  getDataByIdAndDate,
  GetDataByIdAndDateInterface,
} from "./getDataByIdAndDate";

interface Company {
  id_client: number;
  id_manager: number;
  id_deal: boolean;
}

export class QuizController {
  static async getQuizsCount(req: Request, res: Response) {
    const { id_company, startDate, endDate } = req.params;
    try {
      const countAllDate = await db.query(
        `SELECT COUNT(*) FROM
      quiz
      WHERE id_company = $1
      AND 
      ts IS NOT NULL
      AND ts BETWEEN $2 AND $3
      `,
        [id_company, startDate, endDate]
      );

      await writeLog(
        id_company,
        `получить колличество записей с ${startDate} по ${endDate}`,
        200,
        ""
      );
      res.send(countAllDate.rows[0].count);
    } catch (error) {
      console.log(error.message);
      await writeLog(
        id_company,
        `получить колличество записей с ${startDate} по ${endDate}`,
        400
      );
      res.sendStatus(400);
    }
  }

  static async getOneQuiz(req: Request, res: Response) {
    const { url } = req.params;
    try {
      if (url) {
        const quiz = await db.query(
          "SELECT * FROM quiz JOIN company ON quiz.id_company = company.id where url = $1",
          [url]
        );
        if (quiz.rows[0].rating) {
          res.send({ status: 400 });
          await writeLog(null, "перейти на страницу комментария", 400);
        } else {
          await db.query(
            `UPDATE quiz set
          ts = $1
          WHERE url = $2
          `,
            [new Date(), url]
          );
          await writeLog(null, "перейти на страницу комментария", 200);
          res.send(quiz.rows[0].name);
        }
      }
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400 });
    }
  }

  static async updateQuiz(req: Request, res: Response) {
    try {
      const { url } = req.params;
      const { rating, comment } = req.body;
      const answer = await db.query(
        `UPDATE quiz set 
        rating =  $1,
        comment = $2,
        ts = $3
        where url = $4 RETURNING *`,
        [rating, comment, new Date(), url]
      );
      await writeLog(null, "оценить работу", 200);
      res.json(answer.rows[0]);
    } catch (error) {
      console.log(error.message);
      await writeLog(null, "оценить работу", 400);
      res.sendStatus(400);
    }
  }

  static async generateToken(req: Request, res: Response) {

    const { id_company, name } = req.body;

    const data: Company[] = req.body.data;

    const company = await db.query(
      `SELECT * FROM
    company WHERE id = $1
    `,
      [id_company]
    );

    if (company.rows[0] === undefined) {
      try {
        await db.query(
          `INSERT INTO company
        (id, name, isActive)
        values ($1, $2, $3) RETURNING id
        `,
          [id_company, name, true]
        );

        const ans = [];
        for (let i = 0; i < data.length; i++) {
          const note = await generateUrl({
            id_client: data[i].id_client,
            id_company,
            id_manager: data[i].id_manager,
            id_deal: data[i].id_deal,
          });
          ans.push(note);
        }
        await writeLog(
          id_company,
          `сгенерировать ${data.length} url адресов`,
          200
        );
        return res.json(ans);
      } catch (error) {
        console.log(error.message);
        await writeLog(
          id_company,
          `сгенерировать ${data.length} url адресов`,
          400
        );
        return res.sendStatus(400);
      }
    } else {
      try {
        const ans = [];
        for (let i = 0; i < data.length; i++) {
          const note = await generateUrl({
            id_client: data[i].id_client,
            id_company,
            id_manager: data[i].id_manager,
            id_deal: data[i].id_deal,
          });
          ans.push(note);
        }
        await writeLog(
          id_company,
          `сгенерировать ${data.length} url адресов`,
          200
        );
        return res.json(ans);
      } catch (error) {
        console.log(error.message);
        await writeLog(
          id_company,
          `сгенерировать ${data.length} url адресов`,
          400
        );
        res.sendStatus(400);
      }
    }
  }

  static async getAllDataCompany(req: Request, res: Response) {
    const id_company = req.params.id;
    const {
      page,
      limit,
      startDate,
      endDate,
    }: GetDataByIdAndDateInterface = req.body;
    try {
      const data = await getDataByIdAndDate({
        id_company,
        limit,
        page,
        startDate,
        endDate,
      });
      await writeLog(
        id_company,
        `получить ${limit} записей c ${startDate} по ${endDate}`,
        200
      );
      res.send(data.rows);
    } catch (error) {
      await writeLog(
        id_company,
        `получить ${limit} записей c ${startDate} по ${endDate}`,
        400
      );
      res.sendStatus(400);
    }
  }
}

