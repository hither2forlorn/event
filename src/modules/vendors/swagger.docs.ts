/**
 * @swagger
 * tags:
 *   name: Vendors
 *   description: Vendor management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Vendor:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique vendor identifier
 *         vendorName:
 *           type: string
 *           description: Vendor name
 *         description:
 *           type: string
 *           description: Vendor description
 *         owner:
 *           type: integer
 *           description: User ID of the vendor owner
 *         city:
 *           type: string
 *           description: Vendor city
 *         nation:
 *           type: string
 *           description: Vendor country/nation
 *         culture:
 *           type: string
 *           description: Cultural specialization
 *         theme:
 *           type: string
 *           description: Vendor theme
 *         space:
 *           type: string
 *           description: Available space
 *         infos:
 *           type: object
 *           properties:
 *             question:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   question:
 *                     type: string
 *                   answer:
 *                     type: string
 *           description: Additional vendor information including Q&A
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 1
 *         vendorName: "Elegant Events Catering"
 *         description: "Premium catering services for all occasions"
 *         owner: 1
 *         city: "New York"
 *         nation: "USA"
 *         culture: "International"
 *         theme: "Modern"
 *         space: "500 sq ft"
 *
 *     VendorCreate:
 *       type: object
 *       required:
 *         - name
 *         - username
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           description: Vendor name
 *         username:
 *           type: string
 *           minLength: 1
 *           description: Vendor username
 *         email:
 *           type: string
 *           format: email
 *           description: Vendor email address
 *         password:
 *           type: string
 *           format: password
 *           minLength: 8
 *           description: Vendor account password
 *         vendorName:
 *           type: string
 *           description: Display name for the vendor
 *         description:
 *           type: string
 *           description: Vendor description
 *         city:
 *           type: string
 *           description: Vendor city
 *         nation:
 *           type: string
 *           description: Vendor country
 *         culture:
 *           type: string
 *           description: Cultural specialization
 *         theme:
 *           type: string
 *           description: Vendor theme
 *         space:
 *           type: string
 *           description: Available space
 *         permissions:
 *           type: object
 *           description: Vendor permissions (optional)
 *       example:
 *         name: "John Doe"
 *         username: "johndoe_catering"
 *         email: "john@elegantevents.com"
 *         password: "securePass123"
 *         vendorName: "Elegant Events Catering"
 *         description: "Premium catering services"
 *         city: "New York"
 *         nation: "USA"
 *
 *     VendorUpdate:
 *       type: object
 *       properties:
 *         vendorName:
 *           type: string
 *         description:
 *           type: string
 *         city:
 *           type: string
 *         nation:
 *           type: string
 *         culture:
 *           type: string
 *         theme:
 *           type: string
 *         space:
 *           type: string
 *         infos:
 *           type: object
 *       example:
 *         vendorName: "Updated Vendor Name"
 *         city: "Los Angeles"
 */

/**
 * @swagger
 * /vendors:
 *   get:
 *     summary: Get all vendors with pagination
 *     tags: [Vendors]
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
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: nation
 *         schema:
 *           type: string
 *         description: Filter by nation
 *       - in: query
 *         name: theme
 *         schema:
 *           type: string
 *         description: Filter by theme
 *     responses:
 *       200:
 *         description: List of vendors retrieved successfully
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
 *                         $ref: '#/components/schemas/Vendor'
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
 *     summary: Create a new vendor
 *     tags: [Vendors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VendorCreate'
 *     responses:
 *       201:
 *         description: Vendor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Vendor'
 *                 message:
 *                   type: string
 *                   example: Vendor created successfully
 *       400:
 *         description: Validation error or vendor already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /vendors/{id}:
 *   patch:
 *     summary: Update vendor
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Vendor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VendorUpdate'
 *     responses:
 *       200:
 *         description: Vendor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Vendor'
 *                 message:
 *                   type: string
 *                   example: Vendor updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Vendor not found
 *
 *   delete:
 *     summary: Delete vendor (Note Route currently mapped to GET - needs fixing)
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Vendor ID
 *     responses:
 *       200:
 *         description: Vendor deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vendor deleted successfully
 *       404:
 *         description: Vendor not found
 */
