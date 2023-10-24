<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>💻 Học tài thi phận - KennaTech</title>
  <meta name="description" content="Trang web dạy học và thi trực tuyến KennaTech">

  <meta property="og:image" content="{{ asset('asset/img/thi-cu.png') }}" />
  <meta property="og:url" content="{{ config('app.url') }}" />
  <meta property="og:type" content="Website" />
  <meta property="og:title" content="💻 Học tài thi phận - KennaTech" />
  <meta property="og:description" content="Trang web dạy học và thi trực tuyến KennaTech" />

  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
  
  @viteReactRefresh
  @vite('resources/js/main.tsx')
</head>
<body>
  <div id="root"></div>
</body>
</html>