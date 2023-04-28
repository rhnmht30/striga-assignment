import { useRouter } from 'next/router';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navbarRoutes = [
  {
    name: 'Dashboard',
    path: '/home',
  },
  {
    name: 'Swap',
    path: '/swap',
  },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <Disclosure as="nav" className="bg-white dark:bg-black shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Logo */}
                <div className="flex flex-shrink-0 items-center">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="striga-black"
                    role="img"
                    width="90"
                    height="48"
                    viewBox="0 0 196 104"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m53.69 72.438-39.5 19.664-11.936-5.84 38.728-19.835 12.709 6.01Z"
                      fill="#044B7F"
                    ></path>
                    <path
                      opacity="0.8"
                      d="m53.69 72.438-12.708-6.011V40.064l12.709 6.011v26.363Z"
                      fill="#107E7D"
                    ></path>

                    <path
                      opacity="0.8"
                      d="M40.981 66.426 2.253 86.263l38.728-46.2v26.363Z"
                      fill="#FFD049"
                    ></path>
                    <path
                      d="m53.69 46.075-39.5 46.027 39.5-19.665V46.075Z"
                      fill="#FFD049"
                    ></path>
                    <path
                      opacity="0.8"
                      d="m14.19 92.102-11.937-5.84 38.728-46.198 12.71 6.01L14.19 92.103Z"
                      fill="#18C0C0"
                    ></path>
                    <path
                      opacity="0.8"
                      d="m28.015 63.936-12.71-6.01 39.502-46.028 11.936 5.84-38.728 46.198Z"
                      fill="#941369"
                    ></path>
                    <path
                      d="M15.306 31.563v26.362l39.5-46.027-39.5 19.665Z"
                      fill="#FFD049"
                    ></path>
                    <path
                      d="M28.015 37.574v26.362l38.728-46.199-38.728 19.837Z"
                      fill="#FFD049"
                    ></path>
                    <path
                      d="m15.306 31.563 12.709 6.01v26.363l-12.71-6.01V31.561Z"
                      fill="#F29F05"
                    ></path>
                    <path
                      opacity="0.8"
                      d="m15.306 31.563 39.5-19.665 11.937 5.84-38.728 19.836-12.71-6.011Z"
                      fill="#F25C54"
                    ></path>
                    <path
                      className="fill-gray-900 dark:fill-gray-100"
                      d="M82.023 39.784c3.584 0 6.656 1.024 9.216 3.072l-2.592 3.888c-2.144-1.344-4.256-2.016-6.336-2.016-1.12 0-1.984.208-2.592.624-.608.416-.912.976-.912 1.68 0 .512.128.944.384 1.296.288.352.8.688 1.536 1.008.768.32 1.904.704 3.408 1.152 2.688.736 4.688 1.728 6 2.976 1.312 1.216 1.968 2.896 1.968 5.04 0 1.696-.496 3.168-1.488 4.416-.96 1.248-2.272 2.208-3.936 2.88-1.664.64-3.52.96-5.568.96-2.144 0-4.096-.32-5.856-.96-1.76-.672-3.264-1.584-4.512-2.736l3.36-3.744c2.144 1.664 4.416 2.496 6.816 2.496 1.28 0 2.288-.24 3.024-.72.768-.512 1.152-1.2 1.152-2.064 0-.672-.144-1.2-.432-1.584-.288-.384-.816-.736-1.584-1.056-.768-.352-1.968-.752-3.6-1.2-2.56-.704-4.464-1.696-5.712-2.976-1.216-1.312-1.824-2.928-1.824-4.848a6.48 6.48 0 0 1 1.248-3.888c.832-1.152 2-2.048 3.504-2.688 1.536-.672 3.312-1.008 5.328-1.008ZM111.76 64.792c-.928.64-1.984 1.12-3.168 1.44a11.773 11.773 0 0 1-3.456.528c-2.624-.032-4.608-.784-5.952-2.256-1.344-1.472-2.016-3.632-2.016-6.48V45.352h-3.792v-4.8h3.792v-5.568l6.816-.816v6.384h5.856l-.672 4.8h-5.184V57.88c0 1.216.208 2.096.624 2.64.416.544 1.056.816 1.92.816.864 0 1.824-.288 2.88-.864l2.352 4.32ZM127.93 39.832c.768 0 1.616.128 2.544.384l-1.152 6.576c-.896-.224-1.648-.336-2.256-.336-1.504 0-2.672.528-3.504 1.584-.832 1.056-1.488 2.656-1.968 4.8v13.152h-6.816v-25.44h5.904l.624 4.944c.608-1.792 1.488-3.184 2.64-4.176 1.184-.992 2.512-1.488 3.984-1.488ZM140.672 40.552v25.44h-6.816v-25.44h6.816Zm-3.456-13.104c1.216 0 2.208.384 2.976 1.152.8.736 1.2 1.68 1.2 2.832s-.4 2.112-1.2 2.88c-.768.736-1.76 1.104-2.976 1.104s-2.208-.368-2.976-1.104c-.768-.768-1.152-1.728-1.152-2.88s.384-2.096 1.152-2.832c.768-.768 1.76-1.152 2.976-1.152ZM170.155 41.944c-1.664.64-4.112.96-7.344.96 1.6.704 2.784 1.584 3.552 2.64.768 1.024 1.152 2.32 1.152 3.888 0 1.632-.432 3.104-1.296 4.416-.832 1.28-2.048 2.288-3.648 3.024-1.568.736-3.408 1.104-5.52 1.104-1.12 0-2.112-.112-2.976-.336-.64.416-.96.976-.96 1.68 0 .512.192.928.576 1.248.416.288 1.2.432 2.352.432h3.888c1.888 0 3.536.32 4.944.96 1.44.608 2.544 1.472 3.312 2.592.8 1.088 1.2 2.336 1.2 3.744 0 2.592-1.12 4.608-3.36 6.048-2.208 1.472-5.408 2.208-9.6 2.208-3.008 0-5.392-.32-7.152-.96-1.728-.608-2.944-1.504-3.648-2.688-.704-1.184-1.056-2.672-1.056-4.464h6.096c0 .832.16 1.488.48 1.968.32.512.896.88 1.728 1.104.864.256 2.096.384 3.696.384 2.208 0 3.744-.272 4.608-.816.896-.544 1.344-1.312 1.344-2.304 0-.896-.336-1.584-1.008-2.064-.672-.48-1.664-.72-2.976-.72h-3.744c-2.528 0-4.416-.464-5.664-1.392-1.248-.96-1.872-2.16-1.872-3.6 0-.896.256-1.76.768-2.592.544-.864 1.28-1.584 2.208-2.16-1.568-.864-2.72-1.872-3.456-3.024-.704-1.184-1.056-2.592-1.056-4.224 0-1.856.448-3.472 1.344-4.848.928-1.408 2.208-2.48 3.84-3.216 1.664-.768 3.552-1.152 5.664-1.152 2.624.064 4.784-.16 6.48-.672 1.696-.512 3.504-1.312 5.424-2.4l1.68 5.232Zm-13.44 2.4c-1.28 0-2.304.416-3.072 1.248-.736.8-1.104 1.904-1.104 3.312 0 1.44.368 2.576 1.104 3.408.768.832 1.808 1.248 3.12 1.248 1.376 0 2.416-.4 3.12-1.2.704-.8 1.056-1.984 1.056-3.552 0-2.976-1.408-4.464-4.224-4.464ZM191.875 58.936c0 .992.144 1.728.432 2.208.288.448.768.784 1.44 1.008l-1.44 4.512c-1.504-.128-2.736-.48-3.696-1.056-.928-.576-1.648-1.472-2.16-2.688-1.664 2.56-4.208 3.84-7.632 3.84-2.528 0-4.544-.72-6.048-2.16-1.472-1.472-2.208-3.376-2.208-5.712 0-2.784 1.008-4.912 3.024-6.384 2.016-1.472 4.912-2.208 8.688-2.208h2.928v-1.248c0-1.568-.352-2.656-1.056-3.264-.704-.608-1.872-.912-3.504-.912-1.792 0-4.032.448-6.72 1.344l-1.536-4.56c3.168-1.248 6.304-1.872 9.408-1.872 3.456 0 6 .752 7.632 2.256 1.632 1.472 2.448 3.68 2.448 6.624v10.272Zm-11.184 2.928c1.92 0 3.424-.944 4.512-2.832v-4.848h-2.256c-3.68 0-5.52 1.376-5.52 4.128 0 1.12.272 2 .816 2.64.576.608 1.392.912 2.448.912Z"
                    ></path>
                  </svg>
                </div>

                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {navbarRoutes.map((route) => (
                    <Link
                      key={route.name}
                      href={route.path}
                      className={`inline-flex items-center border-b-2 ${
                        router.asPath === route.path
                          ? 'border-amber-500'
                          : 'border-transparent'
                      } px-1 pt-1 text-sm font-medium text-gray-900 dark:text-white`}
                    >
                      {route.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  <button
                    // as="a"
                    href="#"
                    className="block px-4 sm:px-0 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu, show/hide based on menu state. */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navbarRoutes.map((route) => (
                <Disclosure.Button
                  as={Link}
                  key={route.name}
                  href={route.path}
                  className={`block border-l-4 ${
                    router.asPath === route.path
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-600/25'
                      : 'border-transparent'
                  } py-2 pl-3 pr-4 text-base font-medium text-amber-700 sm:pl-5 sm:pr-6`}
                >
                  {route.name}
                </Disclosure.Button>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-50/25 pb-3 pt-4">
              <Disclosure.Button
                as="a"
                href="#"
                className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 sm:px-6"
              >
                Sign out
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
