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


function suggested_blog_posts_block_init() {
	register_block_type( __DIR__ . '/build' );

	wp_set_script_translations( 'create-block-suggested-blog-posts-editor-script', 'suggested-blog-posts', plugin_dir_path( __FILE__ ) . 'languages' );
}
add_action( 'init', 'suggested_blog_posts_block_init' );