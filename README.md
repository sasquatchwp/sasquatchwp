<p align="center">
  <img src="sasquatch%20logo.png">
</p>

# Sasquatch WP - starter pack
## Description
This is **SasquatchWP** starter stack. 

### What is SasquatchWP?
It's the mix of:
- Bedrock - https://github.com/timber/timber
- Zurb Foundation - https://github.com/zurb/foundation-sites
- Timber - https://github.com/timber/timber
- SoberWP Intervention - https://github.com/soberwp/intervention
- SoberWP Models - https://github.com/soberwp/models


and a little magic to keep it all together.

## Instalation
1. `git clone https://github.com/SasquatchWP/SasquatchWP.git .`
2. `composer install`
3. Change theme name in `web/app/themes/sasquatch`
4. `cd web/app/themes/{theme_name}`
5. `npm install`
6. `composer install`

Remember to change `DEVURL` in `web/app/themes/{theme_name}/config.yml`

## Usage
`npm run build` - run all tasks for production
`npm run development` - run all tasks for development (sitemaps etc)
`npm start` - run tasks in watch mode

`npm es-lint` - runs javascript lint - to change configuration look at `.browserslistrc`
`npm sass-lint` - runs sass lint - to change configuration look at `.sass-lint.yml`
`npm audit` - runs Parker audit

## Where is it used
- https://bezprawnik.pl - one of the biggest law blogs in Poland
- https://autoblog.pl - fast growing polish automobile service
- https://wrc.net.pl - biggest racing site in Poland
- https://liberte.pl - selection of best articles from around the world

If you are using SasquatchWP contact me at m.palmowski@freshpixels.pl.