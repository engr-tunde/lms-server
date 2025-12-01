const { emailFooter } = require("../../includes/footer.template");
const { emailHead } = require("../../includes/head.template");

const verifyEmailCodeTemp = (first_name, otp) => {
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
                          <h2 style="margin: 0; color: #000; direction: ltr; font-family: Inter, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Dear ${first_name},&nbsp;</span></h2>
                        </td>
                      </tr>
                    </table>
                    <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                      <tr>
                        <td class="pad">
                          <div style="color:#020202;direction:ltr;font-family:Inter, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:21px;">
                            <p style="margin: 0; margin-bottom: 0px;">
                              Welcome and thank you for registering at our academy!
                            </p>
                            <p style="margin: 0; margin-bottom: 0px;">&nbsp;</p>
                            <p style="margin: 0; margin-bottom: 0px;">
                              Your account has now been created and you can log in  using your email address and password by visiting our website or at the following URL:
                            </p>
                            <p style="margin: 0; margin-bottom: 0px;">&nbsp;</p>
                            <a href="https://academylink.com" style="margin: 0; margin-bottom: 0px;">
                              academylink.com
                            </a>
                            <p style="margin: 0; margin-bottom: 0px;">&nbsp;</p>
                            <p style="margin: 0; margin-bottom: 0px;">
                              Upon logging in, you will be able to access all the avaliable courses, subscribe to a course, learn right here and perform course assessments.
                            </p>
                            <p style="margin: 0; margin-bottom: 0px;">&nbsp;</p>
                            <p style="margin: 0; margin-bottom: 0px;">
                              To get started, veriify your email account by using the One Time Passsword code seen below. 
                            </p>
                            <p style="margin: 0; margin-bottom: 0px;">&nbsp;</p>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <table class="button_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                      <tr>
                        <td class="pad" style="padding-bottom:15px;padding-top:20px;text-align:center;">
                          <div class="alignment" align="center"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.example.com" style="height:46px;width:170px;v-text-anchor:middle;" arcsize="0%" strokeweight="0.75pt" strokecolor="#FCBA41" fillcolor="#FCBA41"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#000; font-family:Georgia, serif; font-size:17px"><![endif]--><a style="text-decoration:none;display:inline-block;color:#000;background-color:#FCBA41;border-radius:0px;width:auto;border-top:1px solid #FCBA41;font-weight:400;border-right:1px solid #FCBA41;border-bottom:1px solid #FCBA41;border-left:1px solid #FCBA41;padding-top:5px;padding-bottom:5px;font-family:'Noto Serif', Georgia, serif;font-size:17px;text-align:center;cursor: normal;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:70px;padding-right:70px;font-size:24px;display:inline-block;"><span style="word-break: break-word; line-height: 34px;"><strong>${otp}</strong></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
                        </td>
                      </tr>
                    </table>
                    
                    <table class="paragraph_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                      <tr>
                        <td class="pad" style="padding-top:10px;">
                          <div style="color:#020202;direction:ltr;font-family:Inter, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:21px;">
                            <p style="margin: 0;">The verification code will be valid for 30 minutes. Please do not share this code with anyone. Contact us if you do not recognize tis activity. Welcome to ${process.env.APP_NAME} once again.</p>
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
  verifyEmailCodeTemp,
};
