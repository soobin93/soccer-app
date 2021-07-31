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
```
composer install && npm install
```

2. Copy `.env.example` file to `.env`
   
3. Fill out `.env` file (Local domain, DB configuration)
   
4. Generate key
```
php artisan key:generate
```

5. Create a symlink for Storage
```
php artisan storage:link
```

6. Compile Javascript files
`npm run dev` or
`npm run watch` or
`npm run production`

7. Migrate DB
`php artisan migrate` or
`php artisan migrate:fresh`
