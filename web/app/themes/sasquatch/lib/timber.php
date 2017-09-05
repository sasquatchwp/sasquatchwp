<?php
/**
 * Conditional tags for Timber
 */

function add_to_context( $data ){
   $data['is_home'] = is_home();
   $data['is_front_page'] = is_front_page();
   $data['is_single'] = is_single();
   $data['is_page'] = is_page();
   $data['is_page_template'] = is_page_template();
   $data['is_category'] = is_category();
   $data['is_tag'] = is_tag();
   $data['is_tax'] = is_tax();
   $data['is_author'] = is_author();
   $data['is_date'] = is_date();
   $data['is_year'] = is_year();
   $data['is_month'] = is_month();
   $data['is_day'] = is_day();
   $data['is_archive'] = is_archive();
   $data['is_404'] = is_404();
   $data['is_paged'] = is_paged();
   $data['is_singular'] = is_singular();
   $data['is_main_query'] = is_main_query();
   return $data;
}
add_filter( 'timber_context', 'add_to_context' );

/**
 * Config vars
 */

function add_to_config( $data ) {
  /**
   * Example
   * $data['config']['name'] = 'value'l
   */
  return $data;
}

add_filter( 'timber_context', 'add_to_config' );
