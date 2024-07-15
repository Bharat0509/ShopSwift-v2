import mongoose from "mongoose";
import { emailQueue } from "../utils/emailQueue";
import ejs from "ejs";
import path from "path";
interface EmailOptions {
    email: string;
    subject: string;
    template: string;
    data: { [key: string]: any };
    queue: string;
}
export const sendWelcomeEmail = async () => {
    const emailHTML = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html dir="ltr" lang="en">

        <head>
          <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        </head>
        <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">The sales intelligence platform that helps you uncover qualified leads.<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
        </div>

        <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
            <tbody>
              <tr style="width:100%">
                <td><img alt="Koala" height="50" src="https://react-email-demo-ndjnn09xj-resend.vercel.app/static/koala-logo.png" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" width="170" />
                  <p style="font-size:16px;line-height:26px;margin:16px 0">Hi <!-- -->Alan<!-- -->,</p>
                  <p style="font-size:16px;line-height:26px;margin:16px 0">Welcome to Koala, the sales intelligence platform that helps you uncover qualified leads and close deals faster.</p>
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center">
                    <tbody>
                      <tr>
                        <td><a href="https://getkoala.com" style="line-height:100%;text-decoration:none;display:block;max-width:100%;background-color:#5F51E8;border-radius:3px;color:#fff;font-size:16px;text-align:center;padding:12px 12px 12px 12px" target="_blank"><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Get started</span><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                      </tr>
                    </tbody>
                  </table>
                  <p style="font-size:16px;line-height:26px;margin:16px 0">Best,<br />The Koala team</p>
                  <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
                  <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">470 Noor Ave STE B #1148, South San Francisco, CA 94080</p>
                </td>
              </tr>
            </tbody>
          </table>
        </body>

      </html>`;

    await emailQueue.add(`send-welcome-email-${Date.now()}`, {
        from: "shopswift.noreply@noreply.com",
        to: "lightingbolt8491@gmail.com",
        subject: "Welcome to ShopSwift ",
        html: emailHTML,
    });
};
export const sendForgotPasswordEmail = async (
    resetPasswordURL: string,
    userName: string,
    userEmail: string
) => {
    const emailHTML = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html dir="ltr" lang="en">

          <head>
            <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
          </head>
          <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Dropbox reset your password<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
          </div>

          <body style="background-color:#f6f9fc;padding:10px 0">
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;background-color:#ffffff;border:1px solid #f0f0f0;padding:45px">
              <tbody>
                <tr style="width:100%">
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody>
                        <tr>
                          <td>
                            <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">Hi <!-- -->${userName}<!-- -->,</p>
                            <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">Someone recently requested a password change for your ShopSwift account. If this was you, you can set a new password here:</p>
                            <a href=${resetPasswordURL} style="line-height:100%;text-decoration:none;display:block;max-width:100%;background-color:#007ee6;border-radius:4px;color:#fff;font-family:&#x27;Open Sans&#x27;, &#x27;Helvetica Neue&#x27;, Arial;font-size:15px;text-align:center;width:210px;padding:14px 7px 14px 7px" target="_blank"><span><!--[if mso]><i style="letter-spacing: 7px;mso-font-width:-100%;mso-text-raise:21" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:10.5px">Reset password</span><span><!--[if mso]><i style="letter-spacing: 7px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>
                            <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">If you don&#x27;t want to change your password or didn&#x27;t request this, just ignore and delete this message.</p>
                            <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">To keep your account secure, please don&#x27;t forward this email to anyone. See our Help Center for<!-- --> <a href="https://shop-swiftv2.vercel.com" style="color:#067df7;text-decoration:underline" target="_blank">more security tips.</a></p>
                            <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">Happy Shop-Swifting!</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </body>

        </html>`;
    await emailQueue.add(`send-forgot-password-email-${Date.now()}`, {
        from: "shopswift@noreply.com",
        to: userEmail,
        subject: "Welcome to ShopSwift ",
        html: emailHTML,
    });
};

export const sendOrderPlacedEmail = async (
    orderInfo: any,
    userEmail: string
) => {
    const emailHTML = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html dir="ltr" lang="en">

          <head>
            <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
          </head>
          <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Get your order summary, estimated delivery date and more<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
          </div>

          <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:100%;margin:10px auto;width:600px;border:1px solid #E5E5E5">
              <tbody>
                <tr style="width:100%">
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:22px 40px;background-color:#F7F7F7">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td data-id="__react-email-column">
                                    <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Tracking Number</p>
                                    <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">${orderInfo?.id}</p>
                                  </td>
                                  <td align="right" data-id="__react-email-column"><a style="color:#000;text-decoration:none;border:1px solid #929292;font-size:16px;padding:10px 0px;width:220px;display:block;text-align:center;font-weight:500" target="_blank">Order Status</a></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:40px 74px;text-align:center">
                      <tbody>
                        <tr>
                          <td><img alt="Nike" height="22" src="https://react-email-demo-ndjnn09xj-resend.vercel.app/static/nike-logo.png" style="display:block;outline:none;border:none;text-decoration:none;margin:auto" width="66" />
                            <h1 style="font-size:32px;line-height:1.3;font-weight:700;text-align:center;letter-spacing:-1px">It&#x27;s On Its Way.</h1>
                            <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">You order&#x27;s is on its way. Use the link above to track its progress.</p>
                            <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500;margin-top:24px">We´ve also charged your payment method for the cost of your order and will be removing any authorization holds. For payment details, please visit your Orders page on ShopSwift .</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:40px;padding-right:40px;padding-top:22px;padding-bottom:22px">
                      <tbody>
                        <tr>
                          <td>
                            <p style="font-size:15px;line-height:2;margin:0;font-weight:bold">Shipping to: ${orderInfo.shippingInfo.address}</p>
                            <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">{${orderInfo.shippingInfo.city}, ${orderInfo.shippingInfo.state}, ${orderInfo.shippingInfo.country} ${orderInfo.shippingInfo.pinCode}}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:40px;padding-right:40px;padding-top:40px;padding-bottom:40px">
                      <tbody>
                        <tr>
                          <td>g
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td data-id="__react-email-column"><img alt="Brazil 2022/23 Stadium Away Women&#x27;s Nike Dri-FIT Soccer Jersey" src="https://react-email-demo-ndjnn09xj-resend.vercel.app/static/nike-product.png" style="display:block;outline:none;border:none;text-decoration:none;float:left" width="260px" /></td>
                                  <td data-id="__react-email-column" style="vertical-align:top;padding-left:12px">
                                    <p style="font-size:14px;line-height:2;margin:0;font-weight:500">Brazil 2022/23 Stadium Away Women&#x27;s Nike Dri-FIT Soccer Jersey</p>
                                    <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">Size L (12–14)</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:40px;padding-right:40px;padding-top:22px;padding-bottom:22px">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="display:inline-flex;margin-bottom:40px">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td data-id="__react-email-column" style="width:170px">
                                    <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Order Number</p>
                                    <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">C0106373851</p>
                                  </td>
                                  <td data-id="__react-email-column">
                                    <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Order Date</p>
                                    <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">Sep 22, 2022</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td align="center" data-id="__react-email-column"><a style="color:#000;text-decoration:none;border:1px solid #929292;font-size:16px;padding:10px 0px;width:220px;display:block;text-align:center;font-weight:500" target="_blank">Order Status</a></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <p style="font-size:32px;line-height:1.3;margin:16px 0;font-weight:700;text-align:center;letter-spacing:-1px">Top Picks For You</p>
                                </tr>
                              </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:20px 0">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td align="center" data-id="__react-email-column" style="vertical-align:top;text-align:left;padding-left:4px;padding-right:2px"><img alt="Brazil 2022/23 Stadium Away Women&#x27;s Nike Dri-FIT Soccer Jersey" src="https://react-email-demo-ndjnn09xj-resend.vercel.app/static/nike-recomendation-1.png" style="display:block;outline:none;border:none;text-decoration:none" width="100%" />
                                    <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:12px;font-weight:500">USWNT 2022/23 Stadium Home</p>
                                    <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:4px;color:#747474">Women&#x27;s Nike Dri-FIT Soccer Jersey</p>
                                  </td>
                                  <td align="center" data-id="__react-email-column" style="vertical-align:top;text-align:left;padding-left:2px;padding-right:2px"><img alt="Brazil 2022/23 Stadium Away Women&#x27;s Nike Dri-FIT Soccer Jersey" src="https://react-email-demo-ndjnn09xj-resend.vercel.app/static/nike-recomendation-2.png" style="display:block;outline:none;border:none;text-decoration:none" width="100%" />
                                    <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:12px;font-weight:500">Brazil 2022/23 Stadium Goalkeeper</p>
                                    <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:4px;color:#747474">Men&#x27;s Nike Dri-FIT Short-Sleeve Football Shirt</p>
                                  </td>
                                  <td align="center" data-id="__react-email-column" style="vertical-align:top;text-align:left;padding-left:2px;padding-right:2px"><img alt="Brazil 2022/23 Stadium Away Women&#x27;s Nike Dri-FIT Soccer Jersey" src="https://react-email-demo-ndjnn09xj-resend.vercel.app/static/nike-recomendation-4.png" style="display:block;outline:none;border:none;text-decoration:none" width="100%" />
                                    <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:12px;font-weight:500">FFF</p>
                                    <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:4px;color:#747474">Women&#x27;s Soccer Jacket</p>
                                  </td>
                                  <td align="center" data-id="__react-email-column" style="vertical-align:top;text-align:left;padding-left:2px;padding-right:4px"><img alt="Brazil 2022/23 Stadium Away Women&#x27;s Nike Dri-FIT Soccer Jersey" src="https://react-email-demo-ndjnn09xj-resend.vercel.app/static/nike-recomendation-4.png" style="display:block;outline:none;border:none;text-decoration:none" width="100%" />
                                    <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:12px;font-weight:500">FFF</p>
                                    <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:4px;color:#747474">Women&#x27;s Nike Pre-Match Football Top</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:20px;padding-right:20px;padding-top:20px;background-color:#F7F7F7">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <p style="font-size:14px;line-height:24px;margin:16px 0;padding-left:20px;padding-right:20px;font-weight:bold">Get Help</p>
                                </tr>
                              </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px;padding-left:20px;padding-right:20px">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td colSpan="1" data-id="__react-email-column" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Shipping Status</a></td>
                                  <td colSpan="1" data-id="__react-email-column" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Shipping &amp; Delivery</a></td>
                                  <td colSpan="1" data-id="__react-email-column" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Returns &amp; Exchanges</a></td>
                                </tr>
                              </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:0;padding-bottom:22px;padding-left:20px;padding-right:20px">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td colSpan="1" data-id="__react-email-column" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">How to Return</a></td>
                                  <td colSpan="2" data-id="__react-email-column" style="width:66%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Contact Options</a></td>
                                </tr>
                              </tbody>
                            </table>
                            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:20px;padding-right:20px;padding-top:32px;padding-bottom:22px">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td data-id="__react-email-column">
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                      <tbody style="width:100%">
                                        <tr style="width:100%">
                                          <td data-id="__react-email-column" style="width:16px"><img height="26px" src="https://react-email-demo-ndjnn09xj-resend.vercel.app/static/nike-phone.png" style="display:block;outline:none;border:none;text-decoration:none;padding-right:14px" width="16px" /></td>
                                          <td data-id="__react-email-column">
                                            <p style="font-size:13.5px;line-height:24px;margin:16px 0;margin-top:0;font-weight:500;color:#000;margin-bottom:0">1-800-806-6453</p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td data-id="__react-email-column">
                                    <p style="font-size:13.5px;line-height:24px;margin:16px 0;margin-top:0;font-weight:500;color:#000;margin-bottom:0">4 am - 11 pm PT</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <p style="font-size:32px;line-height:1.3;margin:16px 0;font-weight:700;text-align:center;letter-spacing:-1px">Nike.com</p>
                                </tr>
                              </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:370px;margin:auto;padding-top:12px">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Men</a></td>
                                  <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Women</a></td>
                                  <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Kids</a></td>
                                  <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Customize</a></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0;margin-top:12px" />
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:166px;margin:auto">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td data-id="__react-email-column">
                                    <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">Web Version</p>
                                  </td>
                                  <td data-id="__react-email-column">
                                    <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">Privacy Policy</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center;padding-top:30px;padding-bottom:30px">Please contact us if you have any questions. (If you reply to this email, we won&#x27;t be able to see it.)</p>
                                </tr>
                              </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">© 2022 Nike, Inc. All Rights Reserved.</p>
                                </tr>
                              </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">NIKE, INC. One Bowerman Drive, Beaverton, Oregon 97005, USA.</p>
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
            </table>
          </body>

        </html>`;
    await emailQueue.add(`send-forgot-password-email-${Date.now()}`, {
        from: "shopswift@noreply.com",
        to: userEmail,
        subject: "Your Order Placed Successfully.",
        html: emailHTML,
    });
};
export const sendEmail = async (options: EmailOptions): Promise<void> => {
    //async-workers.onrender.com/admin/queues
    fetch("https://async-workers.onrender.com/admin/queues").then(() => {
        console.log("Email Service online now...!");
    });
    try {
        const { email, subject, template, data, queue } = options;

        // get the path from the email template file
        const emailTemplatePath = path.join(__dirname, `./`, template);

        //   render the email template with the Ejs
        console.log(data);
        const html: string = await ejs.renderFile(emailTemplatePath, data);

        const mail = {
            from: "shopswift@noreply.com",
            to: email,
            subject,
            html,
        };

        await emailQueue.add(`${queue}-${Date.now()}`, mail);
    } catch (error) {
        console.log("[ EMAIL FAILED ] ", error);
    }
};
