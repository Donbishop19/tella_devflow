"use server";

import  { IInteractionDoc } from "@/database/interaction.model";
import action from "../handlers/action";
import { CreateInteractionSchema } from "../validations";
import handleError from "../handlers/error";
import  mongoose  from "mongoose";
import { CreateInteractionParams, UpdateReputationParams } from "@/types/action";
import { User, Interaction } from "@/database";

export async function createInteraction(params: CreateInteractionParams): Promise<ActionResponse<IInteractionDoc>> {
  const validationResult = await action({
    params,
    schema: CreateInteractionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const {
    action: actionType,
    actionId,
    actionTarget,
    authorId, //target user who own the content (question/answer)
  } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [interaction] = await Interaction.create(
      [
        {
          user: userId,
          action: actionType,
          actionId,
          actionType: actionTarget,
        },
      ],
      { session }
    );
    
    // Update reputation for both the perfomer and the current author
    await updateReputation({
      interaction,
      session,
      performerId: userId!,
      authorId,
    })

    await session.commitTransaction();

    return { 
      success: true,
      data: JSON.parse(JSON.stringify({interaction}))
     };

  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

async function updateReputation(params: UpdateReputationParams) {
  const { interaction, session, performerId, authorId } = params;
  const { action, actionType } = interaction;

  let perfomerPoints = 0;
  let authorPoints = 0;

  switch (action) {
    case "upvote":
      perfomerPoints = 2;
      authorPoints = 10;
      break;
    case "downvote":
      perfomerPoints = -1;
      authorPoints = -2;
      break;
    case "post":
      authorPoints = actionType === "question" ? 5 : 10;
      break;
    case "delete":
      authorPoints = actionType === "question" ? -5 : -10;
      break;      
  }

  if (performerId === authorId) {
    await User.findByIdAndUpdate(
      performerId,
      { $inc: { reputation: authorPoints } },
      { session }
    )

    return
  }

  await User.bulkWrite([
    {
      updateOne: {
        filter: { _id: performerId },
        update: { $inc: { reputation: perfomerPoints } },
      },
    },

    {
      updateOne: {
        filter: { _id: authorId },
        update: { $inc: { reputation: authorPoints } },
      },
    },
  ], { session });
}