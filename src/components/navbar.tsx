/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/vn001thFID3
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

"use client"

import Link from "next/link"
import { NavigationMenuLink, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuList, NavigationMenu } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { useSession } from "next-auth/react"
import { Avatar, Dropdown } from "flowbite-react";

export function Navbar() {

  const { data: session, status } = useSession();

  return (
    <>
      <header className="fixed top-0 left-0 flex h-20 w-full shrink-0 items-center px-4 md:px-6 backdrop-blur-md z-1">
        <Link className="mr-6 hidden lg:flex" href="/">
          <MountainIcon className="h-6 w-6" />
          <span className="">Dann&apos;s Meme</span>
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                  href="/add-meme"
                >
                  Add Meme
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Wiki Meme</NavigationMenuTrigger>
              <NavigationMenuContent className="opacity-100">
                <div className="grid w-[400px] p-2 opacity-100">
                  <NavigationMenuLink className="opacity-100" asChild>
                    <Link
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-gray p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50 z-100 opacity-100"
                      href="/list-wiki-meme"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">List Wiki Meme</div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                        See all wiki meme
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink className="opacity-100" asChild>
                    <Link
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50 z-100 opacity-100"
                      href="/add-wiki-meme"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">Add Wiki Meme</div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                        You can add a new wiki meme
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center">
          {
            status === "authenticated" ?
            (
              <Dropdown
                label={<Avatar alt="User settings" img={session?.user?.image ?? "https://gravatar.com/avatar/37b8f62b0022031fcb7b838592896ad7?s=400&d=robohash&r=x"} rounded />}
                arrowIcon={false}
                inline
              >
                <Dropdown.Header>
                  <span className="block text-sm">{session?.user?.name ?? ""}</span>
                  <span className="block truncate text-sm font-medium">{session?.user?.email}</span>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item><p className="text-red-500">Sign Out</p></Dropdown.Item>
              </Dropdown>
            )
            :
            (
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors text-blue dark:text-blue hover:bg-blue-100 hover:text-gray-900 focus:bg-blue-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-blue-100/50 data-[state=open]:bg-blue-100/50 dark:hover:bg-blue-800 dark:hover:text-gray-50 dark:focus:bg-blue-800 dark:focus:text-blue-50 dark:data-[active]:bg-blue-800/50 dark:data-[state=open]:bg-blue-800/50"
                        href="/signin"
                      >
                        Login
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )
          }
        </div>
      </header>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-64" side="left">
          <Link className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4 mt-4" href="#">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Dann&aposs Meme</span>
          </Link>
          <nav className="text-sm text-gray-500 grid gap-4 dark:text-gray-400 mt-8">
            <Link className="font-semibold text-gray-900 dark:text-gray-50" href="/">
              Home
            </Link>
            <Link href="/add-meme">Add Meme</Link>
            <Link href="/list-wiki-meme">List Wiki Meme</Link>
            <Link href="/add-wiki-meme">Add Wiki Meme</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

