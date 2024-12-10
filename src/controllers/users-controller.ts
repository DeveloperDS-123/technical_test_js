// src/controllers/usersController.ts

import { Request, Response } from 'express';
import { RecommendationModel } from '../models/recommendation';

export const getUserRecommendations = async (req: Request, res: Response) => {
  /**
   * TODO: Implement this controller function.
   *
   * Steps:
   * 1. Extract `clientId` from `req.params`.
   * 2. Retrieve the promotions for the given `clientId` from the database.
   * 3. If promotions exist, return them in the response.
   * 4. If not, return a 404 error with an appropriate message.
   *
   * Handle exceptions and errors appropriately.
   *
   * Hints:
   * - Use `PromotionModel` to query the database.
   * - Use try-catch blocks to handle exceptions.
   */

  // Example (from a different context):


  const userId = req.params.user_id;

  try {
    const recommendation = await RecommendationModel.findOne({ user_id: userId });

    if (!recommendation) {
      return res.status(404).json({
        error: `No recommendations found for user ${userId}.`,
      });
    }

    res.json({
      userId,
      recommendations: recommendation?.recommendations,
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({
      error: 'Unable to fetch recommendations at this time. Please try again later.',
    });
  }

};
