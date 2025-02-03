import { Outlet } from "@remix-run/react";

export default function Post() {
  return (
    <>
      <header className="bg-[url('/images/cover.png')] bg-cover bg-center h-[296px] flex items-center justify-center relative">
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}