import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const path = request.nextUrl.pathname;

  // Rotas antigas que você já bloqueava
  const isLegacyProtectedRoute =
    path.startsWith("/dashboard") || path.startsWith("/studio");

  if (isLegacyProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin: exige sessão Supabase, mas permite a própria página de login.
  const isAdminRoute = path.startsWith("/admin");
  const isAdminLoginPage = path === "/admin/login";

  if (isAdminRoute && !isAdminLoginPage) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );

            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // getUser() valida o token com o Supabase e permite refresh da sessão.
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";

      // Preserva para onde o usuário queria ir depois do login
      loginUrl.searchParams.set("redirectTo", path);

      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Roda em páginas e API routes, exceto:
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - arquivos estáticos com extensão
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};