# Soccer App

## Road Map
___
- [ ] User Authentication
- [ ] User Manager
- [ ] Attend / Not Attend Vote Page
- [ ] Captain Picker
- [ ] Match Generator
- [ ] Team Member Pick Page
- [ ] First Launching

## Installation
___
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

5. Compile Javascript files
`npm run dev` or
`npm run watch` or
`npm run production`

6. Migrate DB
`php artisan migrate` or
`php artisan migrate:fresh`
