import { PythonShell } from "python-shell";
import { join } from "path";
import { verifyToken } from "../middlewares/handle_token";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }

  const x = await verifyToken(req);

  if (x.type == "company") {
    res.status(500).send();
  }

  const scriptPath = join(process.cwd(), "./pages/api/prediction/predict.py");
  const inputData = JSON.stringify(req.body);
  console.log(inputData);
  const options = {
    pythonPath: "python", // Replace with the path to your Python executable if necessary
    args: ["predict", inputData],
  };
  try {
    const result = await PythonShell.run(scriptPath, options);
    console.log(result[2]);
    const predictedJob = JSON.parse(result[2]);
    return res.status(200).json({ predictedJob });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}
