<?php
/**
 * Plugin Name:       Suggested Blog Posts
 * Description:       Suggested Blog Post block where user can choose a title, subtitle, and multiple blog posts. 
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Michelle
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       suggested-blog-posts
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_boilerplate_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_boilerplate_block_init' );
