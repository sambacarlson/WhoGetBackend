/** These helper functions help for development mode only */

const isProduction: boolean = process.env.NODE_ENV === "production";

export function log_message(message = ""): void {
  !isProduction && console.log("log ---> ", message);
}
