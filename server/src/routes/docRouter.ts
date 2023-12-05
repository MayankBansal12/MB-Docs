import { Router } from "express";
import { Request, Response } from "express";
import Documents from "../model/doc-model";
import { authUser } from "../middlewares/userAuth";
import { IUser } from "../types";
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
      const documents = await Documents.find({ userId: req.user?._id });
      if (!documents) {
        return res.status(404).json({ msg: "Documents not found!", documents: null });
      }
      return res.status(200).json({ msg: "Successfully fetched!", documents: documents });
    } catch (error) {
      return res.status(500).json({ msg: "Internal Server Error!", error });
    }
  });

// /doc/:docId :-> Performing operations based on the docId
router.route("/:docId")
  .get(authUser, async (req: RequestWithUser, res: Response) => {
    const { docId } = req.params;
    try {
      const doc = await Document.findOne({ docId: docId }).select("title");
      if (!doc) {
        return res.status(404).json({ msg: "Document not found!", document: null });
      }
      return res.status(200).json({ msg: "Successfully fetched!", document: doc });
    } catch (error) {
      return res.status(500).json({ msg: "Internal Server Error!", error });
    }
  })
  .put(authUser, async (req: RequestWithUser, res: Response) => {
    const { docId } = req.params;
    let { title } = req.body;
    if (title.trim() === "") {
      title = "New Document";
    }

    try {
      const doc = await Document.findOneAndUpdate({ docId: docId }, { title: title });
      if (!doc) {
        return res.status(404).json({ msg: "Document not found!" });
      }
      return res.status(200).json({ msg: "Successfully updated!" });
    } catch (error) {
      return res.status(500).json({ msg: "Internal Server Error!", error });
    }
  })
  .delete(authUser, async (req: RequestWithUser, res: Response) => {
    const { docId } = req.params;

    try {
      const doc = await Document.findOneAndDelete({ docId });
      if (!doc) {
        return res.status(404).json({ msg: "Document not found!" });
      }
      return res.status(200).json({ msg: "Successfully deleted!" });
    } catch (error) {
      return res.status(500).json({ msg: "Internal Server Error!", error });
    }
  });

export default router;
