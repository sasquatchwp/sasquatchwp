<?php
function setup() {
  // Make theme available for translation
  // Community translations can be found at https://github.com/roots/sage-translations
  load_theme_textdomain( 'sage', get_template_directory() . '/lang' );

  // Enable plugins to manage the document title
  // http://codex.wordpress.org/Function_Reference/add_theme_support#Title_Tag
  add_theme_support( 'title-tag' );

  // Register wp_nav_menu() menus
  // http://codex.wordpress.org/Function_Reference/register_nav_menus

  // Enable post thumbnails
  // http://codex.wordpress.org/Post_Thumbnails
  // http://codex.wordpress.org/Function_Reference/set_post_thumbnail_size
  // http://codex.wordpress.org/Function_Reference/add_image_size
  add_theme_support( 'post-thumbnails' );

  // Enable post formats
  // http://codex.wordpress.org/Post_Formats
  //add_theme_support('post-formats', ['aside', 'gallery', 'link', 'image', 'quote', 'video', 'audio']);

  // Enable HTML5 markup support
  // http://codex.wordpress.org/Function_Reference/add_theme_support#HTML5
  add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'search-form']);

  // Use main stylesheet for visual editor
  // To add custom styles edit /assets/styles/layouts/_tinymce.scss
  // add_editor_style(Assets\asset_path('styles/main.css'));
}
add_action( 'after_setup_theme', 'setup' );

/**
 * Theme assets
 */

function assets() {
  wp_enqueue_style('sage/css', asset_path( 'css/app.css' ), false, null);

  if (is_single() && comments_open() && get_option( 'thread_comments' )) {
    wp_enqueue_script( 'comment-reply' );
  }

  wp_enqueue_script( 'sage/js', asset_path( 'js/app.js' ), ['jquery'], null, true);
  //wp_enqueue_script('livehelpnow', 'http://www.livehelpnow.net/lhn/widgets/chatbutton/lhnchatbutton-current.min.js', false, null);

}
add_action( 'wp_enqueue_scripts', 'assets', 100 );

// ACF Sync Fields
add_filter('acf/settings/save_json', 'acf_json_save_point');

function acf_json_save_point( $path ) {
    // update path
    $path = get_stylesheet_directory() . '/acf-fields';

    // return
    return $path;
}

add_filter('acf/settings/load_json', 'acf_json_load_point');

function acf_json_load_point( $paths ) {
    // remove original path (optional)
    unset($paths[0]);

    // append path
    $paths[] = get_stylesheet_directory() . '/acf-fields';

    // return
    return $paths;
}
