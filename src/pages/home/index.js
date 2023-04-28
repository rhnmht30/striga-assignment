import Navbar from '@/components/navbar';
import { manrope } from '@/config';
import { ClipboardDocumentIcon, WalletIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

const clients = [
  {
    id: '71fde9a6-35c3-49a7-bd36-d6ae06bd30aa',
    name: 'Wallet 1',
    color: 'yellow',
    accounts: 4,
  },
  {
    id: '71fde9a6-35c6-49a7-bd36-d6ae06bd30aa',
    name: 'Wallet 2',
    color: 'lime',
    accounts: 4,
  },
  {
    id: '41fde9a6-35c3-49a7-bd36-d6ae06bd30aa',
    name: 'Wallet 3',
    color: 'orange',
    accounts: 4,
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <main className={`flex flex-col min-h-screen ${manrope.className}`}>
      <Navbar />
      <section>
        <div className="max-w-7xl xl:mx-auto px-6 py-8">
          <div className="border-b border-gray-200 dark:border-gray-600 pb-5">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Your wallets
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {clients.map((client, index) => (
              <button
                key={index}
                onClick={() => router.push(`/wallet-details/${client.id}`)}
                className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 dark:bg-gray-800 p-6">
                  <WalletIcon
                    className={`block h-12 w-12 rounded-lg ring-1 ring-gray-900/10 dark:ring-gray-50/25 text-${client.color}-500 dark:text-${client.color}-400 `}
                    aria-hidden="true"
                  />
                  <div className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
                    {client.name}
                  </div>
                </div>
                <dl className="-my-3 divide-y divide-gray-100 dark:divide-gray-50/25 px-6 py-4 text-sm leading-6">
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500 dark:text-gray-400">ID</dt>
                    <dd className="flex items-center text-gray-900 dark:text-white">
                      {client.id.split('-')[0]}
                      <ClipboardDocumentIcon
                        className="block h-5 w-5 ml-3 text-gray-800 dark:text-gray-100"
                        aria-hidden="true"
                      />
                    </dd>
                  </div>
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500 dark:text-gray-400">
                      Number of accounts
                    </dt>
                    <dd className="flex items-start gap-x-2">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {client.accounts}
                      </div>
                    </dd>
                  </div>
                </dl>
              </button>
            ))}

            <button
              type="button"
              className="group flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 dark:border-gray-200 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <WalletIcon
                className="block h-12 w-12 text-gray-800 dark:text-gray-100 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                aria-hidden="true"
              />
              <span className="mt-2 block text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-gray-500 dark:group-hover:text-gray-400 ">
                Create a new wallet
              </span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
