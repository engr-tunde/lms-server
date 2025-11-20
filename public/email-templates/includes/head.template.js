const emailHead = () => {
  const head = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css?family=Noto+Serif" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css2?family=Inter&amp;family=Work+Sans:wght@700&amp;display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		@media (max-width:720px) {
			.desktop_hide table.icons-inner {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.image_block img.fullWidth {
				max-width: 100% !important;
			}

			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				max-width: 0;
				min-height: 0;
				max-height: 0;
				font-size: 0;
				display: none;
				overflow: hidden;
			}

			.desktop_hide,
			.desktop_hide table {
				max-height: none !important;
				display: table !important;
			}

			.row-3 .column-1 .block-2.paragraph_block td.pad>div {
				font-size: 13px !important;
			}

			.row-4 .column-1 .block-1.heading_block h1 {
				text-align: center !important;
			}

			.row-3 .column-1 .block-5.paragraph_block td.pad>div {
				font-size: 13px !important;
			}

			.row-4 .column-2 .block-1.paragraph_block td.pad>div {
				text-align: center !important;
			}

			.row-4 .column-2 .block-1.paragraph_block td.pad {
				padding: 0 !important;
			}

			.row-5 .column-1 .block-2.paragraph_block td.pad>div {
				text-align: center !important;
			}

			.row-1 .column-1 {
				padding: 0 !important;
			}

			.row-4 .column-1 {
				padding: 40px 25px 25px !important;
			}

			.row-4 .column-2 {
				padding: 5px 25px 30px !important;
			}

			.row-5 .column-1 {
				padding: 20px 10px !important;
			}
		}
	</style>
</head>

<body style="text-size-adjust: none; background-color: #f7f7f7; margin: 0; padding: 0;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f7f7;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
	</td>
</tr>
</tbody>
</table>
<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
<tbody>
<tr>
	<td>
		<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; background-color: #efefef; border: 2px solid #FCBA41; width: 700px; margin: 0 auto;" width="700">
			<tbody>
				<tr>
					<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; font-weight: 400; padding-bottom: 15px; padding-left: 25px; padding-right: 25px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
						<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
							<tr>
								<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
									<div class="alignment" align="center" style="line-height:10px"><img src="https://demo.stripocdn.email/content/guids/7dd4ff09-31e5-485e-be6b-f1cca53aad02/images/logo.png" style="height: auto; display: block; border: 0; max-width: 130px; width: 100%;" width="130"></div>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	</td>
</tr>
</tbody>
</table>

`;
  return head;
};

module.exports = {
  emailHead,
};
