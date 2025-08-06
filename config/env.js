import dotenv from 'dotenv';
config ({path: `.env.${process.env.NODE_ENV || "development"}.local`});
// eslint-disable-next-line no-undef
export const {PORT, EMAIL_USER, EMAIL_PASS} = process.env;