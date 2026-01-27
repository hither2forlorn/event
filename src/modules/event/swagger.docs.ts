/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique event identifier
 *         title:
 *           type: string
 *           description: Event title
 *         description:
 *           type: string
 *           description: Event description
 *         type:
 *           type: string
 *           enum: [wedding]
 *           description: Type of event
 *         date:
 *           type: string
 *           format: date-time
 *           description: Event date
 *         duration:
 *           type: string
 *           description: Event duration
 *         parentid:
 *           type: integer
 *           nullable: true
 *           description: Parent event ID (for sub-events)
 *         location:
 *           type: string
 *           nullable: true
 *           description: Event location
 *         organizer:
 *           type: integer
 *           description: User ID of the event organizer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 1
 *         title: "Summer Wedding 2024"
 *         description: "Beautiful outdoor wedding ceremony"
 *         type: "wedding"
 *         date: "2024-06-15T14:00:00Z"
 *         duration: "4 hours"
 *         location: "Garden Venue"
 *         organizer: 1
 *
 *     EventCreate:
 *       type: object
 *       required:
 *         - title
 *         - type
 *         - date
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           description: Event title
 *         description:
 *           type: string
 *           description: Event description (optional)
 *         type:
 *           type: string
 *           description: Type of event
 *         date:
 *           type: string
 *           format: date-time
 *           description: Event date (ISO 8601 format)
 *         duration:
 *           type: string
 *           description: Event duration (optional)
 *         parentid:
 *           type: integer
 *           description: Parent event ID (optional)
 *         location:
 *           type: string
 *           description: Event location (optional)
 *         organizer:
 *           type: integer
 *           description: Organizer user ID (optional)
 *       example:
 *         title: "Summer Wedding 2024"
 *         description: "Beautiful outdoor wedding ceremony"
 *         type: "wedding"
 *         date: "2024-06-15T14:00:00Z"
 *         duration: "4 hours"
 *         location: "Garden Venue"
 *
 *     EventUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         type:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         duration:
 *           type: string
 *         parentid:
 *           type: integer
 *         location:
 *           type: string
 *         organizer:
 *           type: integer
 *       example:
 *         title: "Updated Wedding Title"
 *         location: "New Venue Location"
 */

/**
 * @swagger
 * /event:
 *   get:
 *     summary: Get all events with pagination
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [wedding]
 *         description: Filter by event type
 *     responses:
 *       200:
 *         description: List of events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Event'
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                 message:
 *                   type: string
 *                   example: SUCCESS
 *
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventCreate'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *                 message:
 *                   type: string
 *                   example: Event created successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *                 message:
 *                   type: string
 *                   example: SUCCESS
 *       404:
 *         description: Event not found
 *
 *   patch:
 *     summary: Update event
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventUpdate'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *                 message:
 *                   type: string
 *                   example: Event updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 *
 *   delete:
 *     summary: Delete event
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /user/event:
 *   get:
 *     summary: Get current user's events with pagination
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: User's events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Event'
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                 message:
 *                   type: string
 *                   example: SUCCESS
 *       401:
 *         description: Unauthorized
 */
