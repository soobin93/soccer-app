<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Soccer App!</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">

        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
    </head>

    <body>
        <div id="login-test"></div>
        <div id="register-test"></div>
        <div id="user-list-test"></div>
        <div id="admin_table" style="padding: 24px"></div>
        
    </body>
    <script>var mountNode = document.getElementById('admin_table');</script>
    <script src="{{ asset('js/app.js') }}" defer></script>
</html>
