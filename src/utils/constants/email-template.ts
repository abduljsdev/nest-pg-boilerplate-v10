const EMAIL_TEMPLATES_HEADER = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <title>Browser</title>
</head>
<body>
`;
const EMAIL_TEMPLATES_FOOTER = `</body></html>`;

export const ACCOUNT_CREATE_EMAIL_TEMPLATE = `
${EMAIL_TEMPLATES_HEADER}
<h3>
    Your Password is : {{password}}
</h3>
<h4>
   Click GO TO Home link to visit main site
</h4>
<a href={{login_url}}>Go To Home</a>
${EMAIL_TEMPLATES_FOOTER}
`;

export const FORGET_PASSWORD_TEMPLATE = `
${EMAIL_TEMPLATES_HEADER}
<h1>
    Below is your updated password !
</h1>
<h3>
    {{password}}
</h3>
${EMAIL_TEMPLATES_FOOTER}
`;

export const verificationCodeEmailTemplate = `${EMAIL_TEMPLATES_HEADER}
<h2>Password verification code</h2>
<h3>{{verificationCode}}</h3>
<p>Code is expire at {{expireTime}}</p>
${EMAIL_TEMPLATES_FOOTER}`;
