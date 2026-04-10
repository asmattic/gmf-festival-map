<?php
/**
 * Plugin Name: GMF Festival Map Block
 * Description: Interactive festival map block for stages, vendors, restrooms, parking, and overlays.
 * Version: 0.1.0
 * Requires at least: 6.5
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function gmf_register_festival_map_block() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'gmf_register_festival_map_block' );
