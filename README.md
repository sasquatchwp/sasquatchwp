<p align="center">
  <img src="sasquatch%20logo.png">
</p>

# Sasquatch WP - starter pack
## Description
This is **SasquatchWP** starter stack. 

### What is SasquatchWP?
It's the mix of:
- Bedrock - https://roots.io/bedrock/
- Zurb Foundation - https://github.com/zurb/foundation-sites
- Timber - https://github.com/timber/timber
- SoberWP Intervention - https://github.com/soberwp/intervention
- SoberWP Models - https://github.com/soberwp/models


and a little magic to keep it all together.

## Instalation
1. `git clone https://github.com/SasquatchWP/SasquatchWP.git .`
2. Rename `.env.example` to `.env` and fill it with correct data (database name, password etc) - remember to add salts from [here](https://roots.io/salts.html)
3. Prepare [.htaccess](#htaccess) or [vhost](#vhost) 
4. `composer install`
5. Change theme name in `web/app/themes/sasquatch`
6. `cd web/app/themes/{theme_name}`
7. `npm install`
8. `composer install`

Remember to change `DEVURL` in `web/app/themes/{theme_name}/config.yml`

## .htaccess
This is universal `.htaccess` you can use fot shared hosting.

Example for domains (domain.test)
```
RewriteEngine on
RewriteCond %{HTTP_HOST} ^(www.)?domain.test$
RewriteCond %{REQUEST_URI} !^/web/
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /web/$1
RewriteCond %{HTTP_HOST} ^(www.)?domain.test$
RewriteRule ^(/)?$ web/index.php [L]
```

Example for subfolders (domain.test/subfolder)
```
RewriteEngine on
RewriteCond %{HTTP_HOST} ^(www.)?domain.test$
RewriteCond %{REQUEST_URI} !^/subfolder/web/
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /subfolder/web/$1
RewriteCond %{HTTP_HOST} ^(www.)?domain.test$
RewriteRule ^(/)?$ web/index.php [L]
```

## vhost
Set your site vhost document root to /path/to/site/web/

Example
```
<VirtualHost *:80>
	ServerName domain.test
	DocumentRoot "/path/to/site/web"
	<Directory  "/path/to/site/">
		Options +Indexes +Includes +FollowSymLinks +MultiViews
		AllowOverride All
	</Directory>
</VirtualHost>
```

## Usage
* `npm run build` - run all tasks for production
* `npm run development` - run all tasks for development (sitemaps etc)
* `npm start` - run tasks in watch mode

* `npm es-lint` - runs javascript lint - to change configuration look at `.browserslistrc`
* `npm sass-lint` - runs sass lint - to change configuration look at `.sass-lint.yml`
* `npm audit` - runs Parker audit

## Where is it used
- https://bezprawnik.pl - one of the biggest law blogs in Poland
- https://autoblog.pl - fast growing polish automobile service
- https://wrc.net.pl - biggest racing site in Poland
- https://liberte.pl - selection of best articles from around the world

If you are using SasquatchWP contact me at m.palmowski@freshpixels.pl.
