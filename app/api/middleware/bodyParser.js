import bodyParser from "body-parser";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing by Next.js
  },
};

const jsonParser = bodyParser.json({ limit: "1mb" }); // Adjust size limit as per your requirement

export default jsonParser;
