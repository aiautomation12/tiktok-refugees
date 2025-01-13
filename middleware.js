export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/add-refugee"], // Protect this route
};