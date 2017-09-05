# Sasquatch WP - starter pack
## Description
This is **SasquatchWP** with all WordPress plugins and some JS that are used in almost every project by Spiders.Agency.

### What is SasquatchWP?
It's the mix of:
- SasquatchWP - https://github.com/pandify/SasquatchWP
- Bedrock - https://github.com/timber/timber
- Zurb Foundation - https://github.com/zurb/foundation-sites
- Timber - https://github.com/timber/timber
- SoberWP Intervention - https://github.com/soberwp/intervention

and a little magic to keep it all together.

## Instalation
1. `git clone https://github.com/spidersAgency/SasquatchWP_starter.git .`
2. `composer install`
3. Change theme name in `web/app/themes/sasquatch`
4. `cd web/app/themes/{theme_name}`
5. `npm install`
6. `composer install`

Remember to change `DEVURL` in `web/app/themes/{theme_name}/config.yml`

## Usage
`npm run build` - run all tasks form production
`npm start` - run tasks in watch mode
