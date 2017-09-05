<?php
require_once( __DIR__ . '/vendor/autoload.php' );

$timber = new \Timber\Timber();

$sage_includes = [
  'lib/timber.php',
  'lib/assets.php',
	'lib/setup.php',
];

foreach ( $sage_includes as $file ) {
	if ( ! $filepath = locate_template( $file ) ) {
		trigger_error( sprintf( __( 'Error locating %s for inclusion', 'sage' ), $file ), E_USER_ERROR );
	}

	require_once $filepath;
}

/**
 * Sober Intervention - cleaning wp-admin
 * more info on https://github.com/soberwp/intervention
 */
use function Sober\Intervention\intervention;

if ( function_exists( 'Sober\Intervention\intervention' ) ) {
  intervention( 'add-acf-page', 'Theme Options', [ 'administrator' ] );
  intervention( 'add-dashboard-redirect' );
  intervention( 'add-svg-support' );
}
