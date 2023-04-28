import Navbar from '@/components/navbar';
import { manrope } from '@/config';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

const people = [
  {
    id: '71fde9a6-35c3-49a7-bd36-d6ae06bd30aa',
    name: 'Intra-Ledger Send',
    status: 'failed',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: '2023-01-23T13:23Z',
    amount: '€0.11',
    type: 'debit',
  },
  {
    id: '71fde9a6-35c6-60a7-bd36-d6ae06bd30aa',
    name: 'Intra-Ledger Send',
    status: 'pending',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: '2023-01-23T13:23Z',
    amount: '€0.11',
    type: 'debit',
  },
  {
    id: '71fde9b6-35c3-49a7-bd36-d6ae06bd30aa',
    name: 'SEPA Payin Completed',
    status: 'success',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: '2023-01-23T13:23Z',
    amount: '€100.11',
    type: 'credit',
  },
];

export default function WalletAccountDetails() {
  return (
    <main className={`flex flex-col min-h-screen ${manrope.className}`}>
      <Navbar />
      <section>
        <div className="max-w-7xl xl:mx-auto px-6 py-8">
          <div className="border-b border-gray-200 dark:border-gray-600 pb-5">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Wallet 1 - Accounts - EUR - Transactions
            </h2>
          </div>

          <ul
            role="list"
            className="divide-y divide-gray-100 dark:divide-gray-50/25 mt-8"
          >
            {people.map((person) => (
              <li key={person.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={person.imageUrl}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="flex text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                      {person.name}
                      <span className="flex text-xs font-normal items-center ml-2 text-gray-500 dark:text-gray-400">
                        {person.id.slice(0, 6)}
                        <ClipboardDocumentIcon
                          className="block h-3 w-3 ml-1 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-400">
                      {person.createdAt}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900 dark:text-white">
                    {person.type === 'credit' ? '+ ' : '- '}
                    {person.amount}
                  </p>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div
                      className={`flex-none rounded-full p-1 ${
                        person.status === 'failed'
                          ? 'bg-red-500/50'
                          : person.status === 'success'
                          ? 'bg-emerald-500/50'
                          : 'bg-yellow-500/50'
                      }`}
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${
                          person.status === 'failed'
                            ? 'bg-red-500'
                            : person.status === 'success'
                            ? 'bg-emerald-500'
                            : 'bg-yellow-500'
                        }`}
                      />
                    </div>
                    <p className="text-xs leading-5 text-gray-500 dark:text-gray-400 capitalize">
                      {person.status}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
