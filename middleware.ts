import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Проверяем тумблер. Если он выключен (false) — пускаем всех без пароля
  if (process.env.SITE_LOCKED !== 'true') {
    return NextResponse.next();
  }

  // 2. Если тумблер включен (true) — требуем пароль (Basic Auth)
  const authorizationHeader = request.headers.get('authorization');

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(' ')[1];
    try {
      // Декодируем логин и пароль
      const [username, password] = atob(basicAuth).split(':');

      // Твой личный секретный логин и пароль, чтобы ТЫ мог зайти в любой момент
      if (username === 'admin' && password === 'warstation2026') {
        return NextResponse.next();
      }
    } catch (e) {
      // Ошибка декодирования
    }
  }

  // Запрос пароля у браузера
  return new NextResponse('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// Указываем, какие системные файлы Next.js не нужно блокировать
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|noise.png|characters-left.jpg|characters-right.jpg).*)',
};
