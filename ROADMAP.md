# Next Pizza — роадмап до завершения

> Составлен 16.10.2026 по текущему состоянию кода. Отмечайте `[x]` по мере выполнения.

## Где проект сейчас

**Готово:** схема БД (Prisma + PostgreSQL, миграция `init`), seed-файл, хедер, поиск по товарам (`/api/products/search`),
список категорий (zustand + подсветка при скролле), блок фильтров (UI + синхронизация с URL), API ингредиентов, shadcn/ui.

**Не готово:** главная показывает захардкоженные товары, страница товара — заглушка, нет корзины, оформления заказа,
оплаты, авторизации, деплоя. В git закоммичено только начало (3 коммита), текущая работа не закоммичена.

---

## Этап 0. Починить то, что уже есть (0.5–1 день)

- [+] **Бесконечный `router.push` в `components/shared/filters.tsx`.** Массив зависимостей стоит *после* `useEffect(...)`,
      а не внутри — эффект срабатывает на каждый рендер. Должно быть `}, [sizes, pizzaTypes, prices, selectedingredients]);`
- [+] **Seed упадёт на ценах.** `randomDecimalNumber` даёт дробные числа (например 245.3), а `ProductItem.price` — `Int`.
      Округлять: `Math.floor(...)`. Проверить: `npm run prisma:seed`.
- [+] Модель `ingredient` с маленькой буквы → переименовать в `Ingredient` (+ миграция), чтобы клиент был `prisma.ingredient`,
      а тип — `Ingredient` без путаницы.
- [+] Единообразно назвать «ingredients» (сейчас `ingredients` в роутах, хуке, сервисах, query-параметрах).
- [+] `app/api/users/route.ts`: `POST` создаёт пользователя из любого JSON, `GET` отдаёт всех пользователей с паролями.
      Удалить этот роут (регистрация будет на этапе 6).
- [+] `prisma.config.ts`: добавить `import "dotenv/config"` (об этом пишет сам `.env`).
- [+] Убрать дубли конфигов: `postcss.config.js` и `postcss.config.mjs` — оставить один.
- [+] Предупреждение о lockfile: удалить лишний `G:\VS-code\package-lock.json` или задать `turbopack.root` в `next.config.mjs`.
- [+] `<html lang="ru">` в `app/layout.tsx`.
- [+] Закоммитить текущее состояние и дальше коммитить после каждого пункта.

## Этап 1. Главная страница из БД (2–3 дня)

- [+] `lib/find-pizzas.ts`: серверная функция, которая читает `searchParams` (`sizes`, `pizzaTypes`, `ingredients`,
      `priceFrom`, `priceTo`) и делает `prisma.category.findMany({ include: { products: { where: ..., include: { items, ingredients } } } })`.
- [+] `app/page.tsx` — async server component, принимает `searchParams`, вызывает `findPizzas`, рендерит `ProductGroupList`
      для каждой непустой категории.
- [+] `Categories` получает категории пропсом (из БД), а не из массива `cats`; скрывать пустые категории.
- [] `ProductCard`: реальное описание из ингредиентов, цена «от» = минимальная цена вариантов.
- [] `SortPopup`: рабочая сортировка (популярное / цена ↑ / цена ↓) через `?sortBy=`.
- [] Хук `useQueryFilters` / `useFilters` — вынести логику из `Filters`, чтобы компонент стал чище.
- [] Скелетоны при загрузке (`app/loading.tsx`), пустое состояние «ничего не найдено».
- [] Заменить `<img>` на `next/image` + `images.remotePatterns` для `media.dodostatic.net`.

## Этап 2. Карточка товара и выбор пиццы (2–3 дня)

- [] `app/product/[id]/page.tsx`: загрузка товара с `items` и `ingredients`, `notFound()` если нет.
- [] Модалка товара поверх главной через intercepting routes: `app/@modal/(.)product/[id]/page.tsx` + `app/@modal/default.tsx`.
- [] Компоненты: `PizzaImage` (картинка меняет размер), `GroupVariants` (размер 20/30/40, тесто тонкое/традиционное),
      `IngredientItem` (выбор добавок), `ChooseProductForm` (не-пицца), `ChoosePizzaForm`.
- [] Логика: недоступные комбинации размер/тесто отключены, автоматический выбор доступного варианта,
      пересчёт итоговой цены `цена варианта + сумма добавок`.
- [] Константы `lib/pizza-constants.ts` (`pizzaSizes`, `pizzaTypes`, маппинги).

## Этап 3. Корзина (3–4 дня)

- [] Токен корзины в cookie (`cartToken`) для гостей; позже — привязка к `userId`.
- [] API: `GET /api/cart`, `POST /api/cart` (добавить; если такой же товар с теми же добавками — увеличить `quantity`),
      `PATCH /api/cart/[id]` (количество), `DELETE /api/cart/[id]`.
- [] `lib/update-cart-total-amount.ts` — пересчёт `Cart.totalAmount` после каждого изменения.
- [] `services/cart.ts` + zustand `store/cart.ts` (items, totalAmount, loading, fetch/add/update/remove).
- [] UI: `CartDrawer` (shadcn Sheet), `CartDrawerItem`, `CountButton`, пустая корзина.
- [] Хедер: реальные сумма и количество вместо `520 ₽ / 3`; кнопка «Добавить» в карточке и модалке работает.
- [] Тосты об успехе/ошибке (`react-hot-toast` или `sonner`).

## Этап 4. Оформление заказа (3–4 дня)

- [] Страница `app/checkout/page.tsx` (отдельный layout без поиска в хедере).
- [] Форма: `react-hook-form` + `zod` — имя, фамилия, email, телефон, адрес, комментарий.
- [] Подсказки адреса (DaData `react-dadata` — опционально).
- [] Правая колонка: состав, доставка, налог, итог.
- [] Server action `createOrder`: проверить корзину, создать `Order` (статус `PENDING`, `items` — JSON снимок корзины),
      очистить корзину.

## Этап 5. Оплата и письма (2–3 дня)

- [] Платёжка (ЮKassa / Stripe test mode): создать платёж в `createOrder`, сохранить `paymentId`, редирект на оплату.
- [] Webhook `app/api/checkout/callback/route.ts`: обновить статус `SUCCEEDED`/`CANCELED`.
- [] Письма через Resend (`resend` + шаблоны на React): «заказ создан, оплатите», «заказ оплачен».
- [] Страница/тост успеха после возврата с оплаты.

## Этап 6. Авторизация и профиль (3–4 дня)

- [] Auth.js (NextAuth): Credentials (email + bcrypt) + GitHub/Google OAuth (поля `provider`, `providerId` уже в схеме).
- [] Модалка входа/регистрации вместо кнопки «Войти»; аватар/меню в хедере.
- [] Регистрация: создать пользователя с `verified = null`, отправить `VerificationCode` на почту,
      роут `/api/auth/verify?code=` подтверждает.
- [] При входе слить гостевую корзину с корзиной пользователя.
- [] `app/profile/page.tsx`: изменение имени/email/пароля, история заказов, выход.
- [] `middleware.ts`: защитить `/profile` (и `/dashboard`).

## Этап 7. Полировка (2–3 дня)

- [] Адаптив (сейчас сетка жёстко на 3 колонки и фильтры шириной 250px): мобильная версия, фильтры в Drawer.
- [] `not-found.tsx`, `error.tsx`, состояния ошибок в API (`try/catch` + коды ответа).
- [] SEO: `metadata` / `generateMetadata` для главной и товара, `favicon`, OpenGraph.
- [] Типизация: убрать `any` (`ProductGroupList.items`), общий тип `ProductWithRelations`.
- [] `npm run lint`, `npm run typecheck`, `npm run build` без ошибок.
- [] README: описание проекта, стек, как запустить, переменные окружения, скриншоты.

## Этап 8. Админка (опционально, 3–5 дней)

- [] `app/dashboard` для `role = ADMIN`: CRUD товаров/вариантов/ингредиентов/категорий, список заказов и смена статусов.

## Этап 9. Деплой (1 день)

- [] БД: Neon / Supabase / Vercel Postgres; `prisma migrate deploy` + seed.
- [] Vercel: переменные окружения (`DATABASE_URL`, `NEXT_PUBLIC_API_URL`, ключи auth/оплаты/почты),
      `postinstall: prisma generate`.
- [] Webhook оплаты и OAuth callback URL указать на прод-домен.
- [] Финальная проверка полного сценария: поиск → фильтры → товар → корзина → заказ → оплата → письмо → профиль.

---

**Итого:** примерно 3–5 недель при работе по вечерам. Минимально «завершённый» проект для портфолио — этапы 0–4 + 7 + 9;
оплата, авторизация и админка делают его полноценным.
