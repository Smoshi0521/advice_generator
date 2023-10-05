// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  err: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await fetch("https://api.adviceslip.com/advice");
    if (!response.ok) {
      throw new Error("Failed to fetch advice");
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching advice:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
}
