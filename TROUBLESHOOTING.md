# Troubleshooting: Prisma Student Creation Issue

If you're getting an error that `prisma.student.create()` is invalid, follow these steps:

## Step 1: Regenerate Prisma Client

The Prisma Client must be generated from your schema:

```bash
npm run prisma:generate
```

## Step 2: Check Prisma Client

Run the diagnostic script:

```bash
npm run check-prisma
```

This will verify that:
- Prisma Client is properly installed
- The Student model is available
- All methods are accessible

## Step 3: Ensure Database is Set Up

Make sure your database exists and migrations are applied:

```bash
# Option 1: Push schema to database (for development)
npm run prisma:push

# Option 2: Create and run migrations (for production)
npm run prisma:migrate
```

## Step 4: Verify Environment Variables

Check that your `.env` file has the correct `DATABASE_URL`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/classmanagement"
```

## Step 5: Check Server Logs

When you try to create a student, check the server console for:
- Detailed error messages
- Prisma error codes
- Data being sent to Prisma

## Common Errors and Solutions

### Error: "Cannot find module '@prisma/client'"
**Solution:** Run `npm install` to install dependencies

### Error: "Prisma Student model not found"
**Solution:** Run `npm run prisma:generate`

### Error: "Table 'students' does not exist"
**Solution:** Run `npm run prisma:migrate` or `npm run prisma:push`

### Error: "Cannot reach database server"
**Solution:** 
- Check PostgreSQL is running
- Verify DATABASE_URL is correct
- Check database credentials

### Error: P2002 (Unique constraint violation)
**Solution:** The email already exists. Use a different email.

### Error: P2003 (Foreign key constraint)
**Solution:** Check that referenced IDs (like teacherId) exist in the database.

## Still Having Issues?

1. Check the server console for detailed error logs
2. Verify Prisma Client version matches Prisma CLI version
3. Try regenerating: `npm run prisma:generate`
4. Check database connection: `npm run prisma:studio`

