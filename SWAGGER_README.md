# API Documentation with Swagger

This project uses **Swagger UI** for interactive API documentation and testing.

## 🚀 Quick Start

1. **Start the server:**

   ```bash
   pnpm dev
   ```

2. **Access Swagger UI:**
   Open your browser and navigate to:
   ```
   http://localhost:9000/api-docs
   ```

## 📖 How to Test APIs Using Swagger UI

### Testing Public Endpoints (No Authentication)

1. Open Swagger UI at `http://localhost:9000/api-docs`
2. Browse available endpoints organized by tags (Users, Events, etc.)
3. Click on any endpoint to expand it
4. Click **"Try it out"** button
5. Fill in required parameters/request body
6. Click **"Execute"**
7. View the response below (status code, headers, body)

**Example: Create a User**

```
POST /api/user
1. Click "Try it out"
2. Fill in the form:
   - email: test@example.com
   - password: password123
   - fullName: John Doe
   - phoneNumber: +1234567890
3. Click "Execute"
4. See the response with created user data
```

### Testing Protected Endpoints (Requires Authentication)

Protected endpoints have a 🔒 lock icon.

**Step 1: Login to Get Token**

```
POST /api/user/login
1. Click "Try it out"
2. Enter credentials:
   {
     "email": "test@example.com",
     "password": "password123"
   }
3. Click "Execute"
4. Copy the "token" from the response
```

**Step 2: Authorize Swagger**

```
1. Click the "Authorize" button at the top right (🔓)
2. Paste your token in the "Value" field
3. Click "Authorize"
4. Click "Close"
```

**Step 3: Test Protected Endpoints**

```
Now you can test any endpoint with the 🔒 icon:

GET /api/user (Get all users)
1. Click "Try it out"
2. Click "Execute"
3. See list of users (token automatically included)

POST /api/event (Create event)
1. Click "Try it out"
2. Fill event data
3. Click "Execute"
4. Event created with your authentication
```

## 🔑 Authentication Flow Example

```bash
# 1. Register a new user
POST /api/user
Body: {
  "email": "john@example.com",
  "password": "securepass123",
  "fullName": "John Doe",
  "phoneNumber": "+1234567890"
}

# 2. Login with credentials
POST /api/user/login
Body: {
  "email": "john@example.com",
  "password": "securepass123"
}
Response: {
  "data": {
    "user": {...},
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

# 3. Use token in Swagger "Authorize" button

# 4. Test protected endpoints
GET /api/user (with token)
POST /api/event (with token)
```

## 📚 Available Endpoints

### Users Module

- `GET /api/user` - Get all users (🔒 Protected)
- `POST /api/user` - Create new user
- `POST /api/user/login` - User login
- `PATCH /api/user/{id}` - Update user (🔒 Protected)
- `DELETE /api/user/{id}` - Delete user (🔒 Protected)

### Events Module

- `GET /api/event` - Get all events
- `GET /api/event/{id}` - Get event by ID
- `POST /api/event` - Create event (🔒 Protected)
- `PATCH /api/event/{id}` - Update event (🔒 Protected)
- `DELETE /api/event/{id}` - Delete event (🔒 Protected)
- `GET /api/user/event` - Get current user's events (🔒 Protected)

## 🛠️ Testing with cURL (Alternative)

If you prefer command line:

```bash
# Login and save token
curl -X POST http://localhost:9000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Use token in subsequent requests
TOKEN="your-jwt-token-here"

curl -X GET http://localhost:9000/api/user \
  -H "Authorization: Bearer $TOKEN"

curl -X POST http://localhost:9000/api/event \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tech Conference 2024",
    "description": "Annual tech event",
    "eventType": "CONFERENCE",
    "startDate": "2024-06-15T09:00:00Z",
    "endDate": "2024-06-17T18:00:00Z",
    "categoryId": "uuid-here"
  }'
```

## 📝 Adding Documentation for New Modules

To add Swagger docs for other modules (admin, category, vendors):

1. **Create `swagger.docs.ts` in the module folder:**

   ```
   src/modules/category/swagger.docs.ts
   ```

2. **Add JSDoc annotations:**

   ```typescript
   /**
    * @swagger
    * tags:
    *   name: Categories
    *   description: Category management endpoints
    */

   /**
    * @swagger
    * components:
    *   schemas:
    *     Category:
    *       type: object
    *       properties:
    *         id:
    *           type: string
    *           format: uuid
    *         name:
    *           type: string
    *         description:
    *           type: string
    */

   /**
    * @swagger
    * /category:
    *   get:
    *     summary: Get all categories
    *     tags: [Categories]
    *     responses:
    *       200:
    *         description: List of categories
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 data:
    *                   type: array
    *                   items:
    *                     $ref: '#/components/schemas/Category'
    */
   ```

3. **Restart the server:**

   ```bash
   pnpm dev
   ```

4. **Check Swagger UI** - new endpoints appear automatically!

## 🎨 Swagger Configuration

Configuration file: `src/config/swagger.ts`

- OpenAPI version: 3.0.0
- Automatically scans: `./src/modules/*/swagger.docs.ts`
- Server URL: `http://localhost:9000/api`

## 📂 File Structure

```
src/
├── config/
│   └── swagger.ts              # Main Swagger configuration
├── modules/
│   ├── user/
│   │   └── swagger.docs.ts     # User API documentation
│   ├── event/
│   │   └── swagger.docs.ts     # Event API documentation
│   └── [module]/
│       └── swagger.docs.ts     # Add docs for each module
└── index.ts                    # Swagger UI integrated here
```

## 🔍 Troubleshooting

**Swagger UI not loading?**

- Ensure server is running: `pnpm dev`
- Check console for errors
- Verify URL: `http://localhost:9000/api-docs`

**Authorization not working?**

- Make sure you clicked "Authorize" button
- Token should NOT include "Bearer" prefix (added automatically)
- Token format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Endpoints not showing?**

- Check `swagger.docs.ts` files exist in module folders
- Restart server after adding new docs
- Verify JSDoc syntax is correct

## 📦 Dependencies

- `swagger-jsdoc` - Generates OpenAPI spec from JSDoc comments
- `swagger-ui-express` - Serves interactive Swagger UI
- `@types/swagger-jsdoc` - TypeScript types
- `@types/swagger-ui-express` - TypeScript types

## 🔗 Useful Links

- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger JSDoc Documentation](https://github.com/Surnet/swagger-jsdoc)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)

---

**Happy Testing! 🚀**
