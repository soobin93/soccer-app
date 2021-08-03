# Soccer App

## Road Map
- [x] User Authentication
- [ ] User Manager
- [ ] Match Manager
- [ ] Attend / Not Attend Vote Page for users
- [ ] Team Member Pick Page
- [ ] Team chat
- [ ] Team Strategy / Position Page
- [ ] First Launch (Going Live)

## Installation
1. Install plugins (Both back-end and front-end)
```bash
composer install && npm install
```

2. Copy `.env.example` file to `.env`
   
3. Fill out `.env` file (Local domain, DB configuration)
   
4. Generate key
```bash
php artisan key:generate
```

5. Create a symlink for Storage
```bash
php artisan storage:link
```

6. Compile Javascript files
`npm run dev` or
`npm run watch` or
`npm run production`

7. Migrate DB
`php artisan migrate` or
`php artisan migrate:fresh`

## Useful Commands
- Creating dummy data for user (following command will create 5 dummy data for user, number can be changed)
```bash
php artisan factory:user 5
```
