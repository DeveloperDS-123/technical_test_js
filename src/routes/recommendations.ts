// src/routes/recommendations.ts

import { Router } from 'express';
import { generateRecommendations } from '../controllers/recommendations-controller';
import { validateRecommendationRequest } from '../utils/schemas';
import { validationResult } from 'express-validator';
import { Request, Response } from 'express';

const router = Router();

/**
 * TODO: Set up the `/recommendations` POST route.
 *
 * Steps:
 * 1. Apply validation middleware to validate the request body.
 * 2. Use the `generateRecommendations` controller to handle the request.
 * 3. Handle validation errors appropriately.
 *
 * Hints:
 * - Use `express-validator` for input validation.
 * - Use `validationResult` to check for validation errors.
 */

 // Example (from a different context):

 
 router.post('/', validateRecommendationRequest, (req: Request, res: Response) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   generateRecommendations(req, res);
 });
 

export default router;
