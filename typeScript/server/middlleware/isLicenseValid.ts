import { NextFunction, Request, Response } from "express";
import { writeLog } from "../functions/writeLog";
import { checkLicense } from "../functions/checkLincense";
import { LicenseRequestInterface } from "../types/licenseRequestInterface";

export const isLicenseValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { INN, RegDate, id_company }: LicenseRequestInterface = req.body;
  const license = await checkLicense(INN, RegDate);
  if (!license) {
    await writeLog(
      id_company,
      "получить данные",
      400,
      `инн ${INN} или дата регистрации ${RegDate} не верные`
    );
    return res.sendStatus(400);
  } else {
    next();
  }
};
