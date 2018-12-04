<?php
/*
Template Name: Front Index
Template Post Type: front
*/

$context = Timber::get_context();
$context['posts'] = Timber::get_posts();
Timber::render( 'views/templates/front/front-index.twig', $context );

?>
