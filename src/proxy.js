import { withAuth } from "next-auth/middleware";

export default withAuth(
  function proxy(req) {
    // This function runs for all matched routes
    return;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
