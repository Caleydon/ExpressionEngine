<!doctype html>
<html>
	<head>
		<title>Error | <?=APP_NAME?></title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" lang="<?=ee()->config->item('xml_lang')?>" dir="ltr">
		<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"  name="viewport">
		<style>
			<?php echo file_get_contents(__DIR__.'/eecms-error.min.css'); ?>
		</style>
	</head>
	<body>
		<section class="wrap">
			<div class="err-wrap error">
				<?php if ($heading == 'Error'): ?>
					<p><b><?php echo $heading ?></b>: <?php echo $message; ?></p>
				<?php else: ?>
					<h1><?php echo $heading ?></h1>
					<h2><?php echo $message ?></h2>
				<?php endif ?>
			</div>
		</section>
	</body>
</html>