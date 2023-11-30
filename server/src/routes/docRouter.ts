import { Router } from "express";
import { Request, Response } from "express";
import Documents from "../model/doc-model";
import { authUser } from "../middlewares/userAuth";
import { IDocument, IUser } from "../types";
import Document from "../model/doc-model";

const router = Router();

// For setting req.user as user, otherwise ts shows error as it can of any type
interface RequestWithUser extends Request {
  user?: IUser;
}

// /doc :-> To fetch all the docs for that userId
router.route("/")
  .get(authUser, async (req: RequestWithUser, res: Response) => {
    try {
      let documents = await Documents.find({ userId: req.user?._id });
      return res.status(200).json({ msg: "Successfully fetched!", documents: documents });
    } catch (error) {
      return res.status(500).json({ msg: "Internal Server Error!" });
    }
  });

export default router;
