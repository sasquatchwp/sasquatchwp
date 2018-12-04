<?php
$ret = [];
if( WP_ENV != 'production' ) {
  $ret = [
      'type' => 'cpt',
      'name' => 'front',

      'supports' => [
        'title',
        'editor',
        'page-attributes',
      ],

      'config' => [
          'hierarchical' => true,
      ],
  ];
}

return $ret;
