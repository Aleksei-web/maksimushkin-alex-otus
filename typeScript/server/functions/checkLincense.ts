import qs from "querystring";
import axios from "axios";

export async function checkLicense(INN: string, RegDate: string): Promise<boolean> {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const requestBody = {
    INN,
    RegDate,
  };

  const result = await axios
    .post(
      "http://payaction.ru/uop/check.php",
      qs.stringify(requestBody),
      config
    )

  return result.data.split("</head>")[1].includes("OK")

}
