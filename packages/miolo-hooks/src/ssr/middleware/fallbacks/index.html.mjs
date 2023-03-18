export default {
	html: `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>miolo</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta name="description" content="miolo" />
			<meta name="keywords" content="miolo web" />
			<meta name="author" content="miolo.afialapis.com" />

			<!-- Touch Icons - iOS and Android 2.1+ 180x180 pixels in size. --> 
			<!--<link rel="apple-touch-icon-precomposed" href="/favicon.ico"/>-->
			<!-- Firefox, Chrome, Safari, IE 11+ and Opera. 196x196 pixels in size. -->
			<link rel="icon" href="/favicon.ico"/>

			{styles}

			<script>
				window.__CONTEXT = {context}
			</script>		
		</head>

		<body>
			<div id="root">{children}</div>
			{bundle}
		</body>
		</html>
  `
}