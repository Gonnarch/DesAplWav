import { withAuth } from "next-auth/middleware";

// Protege las rutas privadas: si no hay sesión redirige a /signIn
export default withAuth({ pages: { signIn: "/signIn" } });

export const config = { matcher: ["/dashboard", "/profile"] };
