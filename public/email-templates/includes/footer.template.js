const emailFooter = () => {
  const footer = `

<table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;">
<tbody>
<tr>
<td>
	<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #FCBA41; background-color:rgb(19, 19, 19); background-size: auto; border: 7px solid #FCBA41; border-radius: 0; width: 700px; margin: 0 auto;" width="700">
		<tbody>
			<tr>
				<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; font-weight: 400; padding-bottom: 20px; padding-left: 30px; padding-right: 10px; padding-top: 20px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
					<table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
						<tr>
							<td class="pad">
								<div style="color:#ffffff;direction:ltr;font-family:Inter, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
									<p style="margin: 0;"><em>If you didn't register on ${process.env.APP_NAME} with this email, kindly ignore this email.</em></p>
								</div>
							</td>
						</tr>
					</table>
					<table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tr>
							<td class="pad">
								<div class="alignment" align="center">
									<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
										<tr>
											<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span>&#8202;</span></td>
										</tr>
									</table>
								</div>
							</td>
						</tr>
					</table>
					<table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
						<tr>
							<td class="pad">
								<div style="color:#ffffff;direction:ltr;font-family:Inter, sans-serif;font-size:12px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
									<p style="margin: 0;"><em>Copyright © 2025 ${process.env.APP_NAME}, All rights reserved.</em></p>
								</div>
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
</td>
</tr>
</tbody>
</table><!-- End -->
</body>

</html>
`;
  return footer;
};

module.exports = {
  emailFooter,
};
