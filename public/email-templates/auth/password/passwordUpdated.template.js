const { emailFooter } = require("../../includes/footer.template");
const { emailHead } = require("../../includes/head.template");

const passwordUpdatedTemp = (firstName) => {
  const head = emailHead();
  const footer = emailFooter();

  const body = `


    <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;">
      <tbody>
        <tr>
          <td>
            <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; background-color: #eef4f3; background-size: auto; border: 0 solid #efeef4; width: 700px; margin: 0 auto;" width="700">
              <tbody>
                <tr>
                  <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; font-weight: 400; background-color: #ffffff; padding-bottom: 20px; padding-left: 25px; padding-right: 25px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                    <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                      <tr>
                        <td class="pad" style="padding-bottom:20px;padding-top:10px;text-align:center;width:100%;">
                          <h2 style="margin: 0; color: #000; direction: ltr; font-family: Inter, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Dear ${firstName},&nbsp;</span></h2>
                        </td>
                      </tr>
                    </table>
                    <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                      <tr>
                        <td class="pad">
                          <div style="color:#201f42;direction:ltr;font-family:Inter, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:21px;">
                            <p style="margin: 0; margin-bottom: 0px;">
                              This is to inform you that your attempt to reset your account password has been successfully completed. Kindly note that you can only login using the new password henceforth.
                            </p>
                            <p style="margin: 0; margin-bottom: 0px;">&nbsp;</p>
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                    <table class="paragraph_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                      <tr>
                        <td class="pad" style="padding-top:10px;">
                          <div style="color:#201f42;direction:ltr;font-family:Inter, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:21px;">
                            <p style="margin: 0;">If you did not sanction this activity, be sure to get in touch with our customer support team. Welcome to ${process.env.APP_NAME} once again.</p>
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


  `;

  const template = `${head} ${body} ${footer}`;

  return template;
};

module.exports = {
  passwordUpdatedTemp,
};
