import { Router } from "express";
import { Request, Response } from "express";
import Documents from "../model/doc-model";
import { authUser } from "../middlewares/userAuth";
import { IUser } from "../types";

const router = Router();

// For setting req.user as user, otherwise ts shows error as it can of any type
interface RequestWithUser extends Request {
  user?: IUser;
}

// Documents Route
router.get("/", authUser, async (req: RequestWithUser, res: Response) => {
  try {
    let documents = await Documents.find({ userId: req.user?._id });
    return res.status(200).json({ msg: "Successfully fetched!", documents: documents });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
});

export default router;
