<?php
$height        = isset( $attributes['height'] ) ? intval( $attributes['height'] ) : 640;
$show_legend   = ! empty( $attributes['showLegend'] );
$api_base_url  = isset( $attributes['apiBaseUrl'] ) ? esc_url_raw( $attributes['apiBaseUrl'] ) : '';
$center_lat    = isset( $attributes['centerLat'] ) ? floatval( $attributes['centerLat'] ) : 27.9514;
$center_lng    = isset( $attributes['centerLng'] ) ? floatval( $attributes['centerLng'] ) : -82.4605;
$map_zoom      = isset( $attributes['mapZoom'] ) ? intval( $attributes['mapZoom'] ) : 15;

$props = wp_json_encode(
	array(
		'height'      => $height,
		'showLegend'  => $show_legend,
		'apiBaseUrl'  => $api_base_url,
		'centerLat'   => $center_lat,
		'centerLng'   => $center_lng,
		'mapZoom'     => $map_zoom,
	)
);
?>
<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-gmf-map-root
	data-props='<?php echo esc_attr( $props ); ?>'
	style="min-height: <?php echo esc_attr( $height ); ?>px;"
></div>
