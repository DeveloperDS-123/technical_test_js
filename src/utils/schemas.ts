// src/utils/schemas.ts

// TODO: Define request and response validation schemas.

// Hints:
// - Use `express-validator` to create validation chains for incoming requests.
// - For the `/promotions` endpoint:
//   - Validate that `clientId` is a non-empty string.
//   - Validate that `productInterests` is a non-empty array of non-empty strings.
// - Define TypeScript interfaces for type checking if needed.

// Example interfaces and validation chains (for candidate to use):

import { body, ValidationChain } from 'express-validator';

export const validateRecommendationRequest: ValidationChain[] = [
  body('user_id')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('user_id is required and must be a non-empty string'),
  body('preferences')
    .isArray({ min: 1 })
    .withMessage('preferences must be a non-empty array'),
];

// Define interfaces

export interface RecommendationRequest {
  user_id: string;
  recommendations: string[];
}

export interface RecommendationResponse {
  user_id: string;
  recommendations: string[];
}

