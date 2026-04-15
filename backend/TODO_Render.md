# Backend Render Deployment TODO

## Plan Steps:
- [x] 1. Update backend/src/server.js: Bind server to 0.0.0.0
- [x] 2. Update backend/src/config/db.js: Remove localhost fallback
- [x] 3. Update backend/src/services/api.js: Use env var for baseURL
- [x] 4. Create backend/.env.example with required vars
- [x] 5. Create backend/DEPLOYMENT.md with Render instructions
- [ ] 6. Set env vars on Render (MONGO_URI, etc.)
- [ ] 7. Deploy and test /health endpoint

**Status: Ready for deployment! Follow DEPLOYMENT.md**
