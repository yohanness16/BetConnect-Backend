import express from 'express';
import {
    createProperty,
    getProperties,
    getPropertyById,
    updateProperty,
    deleteProperty
} from '../controllers/property.controller.js';
import { protect, approvedAgent, optionalAuth } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.js';
import {
    createPropertyValidator,
    updatePropertyValidator
} from '../validators/property.validator.js';

const router = express.Router();

/**
 * @openapi
 * /property:
 *   post:
 *     summary: Create a property (protected, agent approved)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Property created
 */
router.post('/', protect, approvedAgent, validate(createPropertyValidator), createProperty);
/**
 * @openapi
 * /property:
 *   get:
 *     summary: Get properties (optional auth)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of properties
 */
router.get('/', optionalAuth, getProperties);


/**
 * @openapi
 * /property/{id}:
 *   get:
 *     summary: Get property by ID (optional auth)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Property details
 */
router.get('/:id', optionalAuth, getPropertyById);
/**
 * @openapi
 * /property/{id}:
 *   put:
 *     summary: Update property (protected)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Property updated
 */
router.put('/:id', protect, validate(updatePropertyValidator), updateProperty);
/**
 * @openapi
 * /property/{id}:
 *   delete:
 *     summary: Delete property (protected)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Property deleted
 */
router.delete('/:id', protect, deleteProperty);

export default router;
