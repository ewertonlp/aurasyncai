import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  // Pega a rota que o usuário está tentando acessar
  const path = request.nextUrl.pathname;

  // Defina aqui as rotas que estão bloqueadas (em construção ou privadas)
  // Exemplo: se ele tentar acessar meusaas.com/dashboard ou meusaas.com/studio
  const isProtectedRoute = path.startsWith('/dashboard') || path.startsWith('/studio') || path.startsWith('./login');

  if (isProtectedRoute) {
    // Aqui no futuro você pode colocar a verificação de token do Supabase.
    // Por enquanto, como é uma waitlist, apenas redirecionamos de volta para a Home.
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se não for uma rota protegida (ex: /, /api/waitlist), deixa passar normalmente
  return NextResponse.next();
}

// Opcional: Otimização de performance
// Isso diz ao Next.js para rodar o middleware apenas em rotas de páginas, 
// ignorando imagens, arquivos CSS e ícones, poupando servidor.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}