import Navbar from '@/components/navbar';
import { manrope } from '@/config';
import { coinsMeta } from '@/lib/constants';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';

const accounts = {
  USDC: {
    accountId: '60556f0b0a93d473e01979d9b81b7b36',
    parentWalletId: '37d2b10e-2b0f-47a2-b75e-8e729b6436a6',
    currency: 'USDC',
    ownerId: '3365c5b5-2249-454d-99cd-42121770fc33',
    ownerType: 'CONSUMER',
    createdAt: '2023-04-27T04:49:23.843Z',
    availableBalance: {
      amount: '0',
      currency: 'cents',
    },
    linkedCardId: 'UNLINKED',
    blockchainDepositAddress: '0x7395713F155CEC156aeCE6420A5e8455337409B5',
    blockchainNetwork: {
      name: 'USD Coin Test (Goerli)',
      type: 'ERC20',
      contractAddress: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    },
    status: 'ACTIVE',
    permissions: ['CUSTODY', 'TRADE', 'INTER', 'INTRA'],
    enriched: true,
  },
  EUR: {
    accountId: '2cda841402ca46325296dd9740157716',
    parentWalletId: '37d2b10e-2b0f-47a2-b75e-8e729b6436a6',
    currency: 'EUR',
    ownerId: '3365c5b5-2249-454d-99cd-42121770fc33',
    ownerType: 'CONSUMER',
    createdAt: '2023-04-27T04:49:23.842Z',
    availableBalance: {
      amount: '989',
      currency: 'cents',
    },
    linkedCardId: 'UNLINKED',
    linkedBankAccountId: 'EUR02003672132233',
    status: 'ACTIVE',
    permissions: ['CUSTODY', 'TRADE', 'INTER', 'INTRA'],
    enriched: true,
  },
  BUSD: {
    accountId: '0c27fca34ba38e2eaad35bc82fa5b35b',
    parentWalletId: '37d2b10e-2b0f-47a2-b75e-8e729b6436a6',
    currency: 'BUSD',
    ownerId: '3365c5b5-2249-454d-99cd-42121770fc33',
    ownerType: 'CONSUMER',
    createdAt: '2023-04-27T04:49:23.844Z',
    availableBalance: {
      amount: '0',
      currency: 'cents',
    },
    linkedCardId: 'UNLINKED',
    status: 'ACTIVE',
    permissions: ['CUSTODY', 'TRADE', 'INTER', 'INTRA'],
    enriched: false,
  },
  USDT: {
    accountId: '52eefc22cf0896cf6ed038a8146aaea7',
    parentWalletId: '37d2b10e-2b0f-47a2-b75e-8e729b6436a6',
    currency: 'USDT',
    ownerId: '3365c5b5-2249-454d-99cd-42121770fc33',
    ownerType: 'CONSUMER',
    createdAt: '2023-04-27T04:49:23.843Z',
    availableBalance: {
      amount: '0',
      currency: 'cents',
    },
    linkedCardId: 'UNLINKED',
    status: 'ACTIVE',
    permissions: ['CUSTODY', 'TRADE', 'INTER', 'INTRA'],
    enriched: false,
  },
  BNB: {
    accountId: '834c57a6c3a127f01a868b831d9d6996',
    parentWalletId: '37d2b10e-2b0f-47a2-b75e-8e729b6436a6',
    currency: 'BNB',
    ownerId: '3365c5b5-2249-454d-99cd-42121770fc33',
    ownerType: 'CONSUMER',
    createdAt: '2023-04-27T04:49:23.844Z',
    availableBalance: {
      amount: '0',
      currency: 'wei',
    },
    linkedCardId: 'UNLINKED',
    status: 'ACTIVE',
    permissions: ['CUSTODY', 'TRADE', 'INTER', 'INTRA'],
    enriched: false,
  },
  ETH: {
    accountId: 'b96d1cfb98a36bbecc06627960501b24',
    parentWalletId: '37d2b10e-2b0f-47a2-b75e-8e729b6436a6',
    currency: 'ETH',
    ownerId: '3365c5b5-2249-454d-99cd-42121770fc33',
    ownerType: 'CONSUMER',
    createdAt: '2023-04-27T04:49:23.843Z',
    availableBalance: {
      amount: '0',
      currency: 'wei',
    },
    linkedCardId: 'UNLINKED',
    blockchainDepositAddress: '0x7395713F155CEC156aeCE6420A5e8455337409B5',
    blockchainNetwork: {
      name: 'Ethereum Test (Goerli)',
    },
    status: 'ACTIVE',
    permissions: ['CUSTODY', 'TRADE', 'INTER', 'INTRA'],
    enriched: true,
  },
  BTC: {
    accountId: '0467ae7100d2480a8c5f6c45fe39b477',
    parentWalletId: '37d2b10e-2b0f-47a2-b75e-8e729b6436a6',
    currency: 'BTC',
    ownerId: '3365c5b5-2249-454d-99cd-42121770fc33',
    ownerType: 'CONSUMER',
    createdAt: '2023-04-27T04:49:23.842Z',
    availableBalance: {
      amount: '0',
      currency: 'satoshis',
    },
    linkedCardId: 'UNLINKED',
    blockchainDepositAddress: 'tb1q02dyxn5nhxzn4s2x6hs8hwpchze4wdwm3r82n7',
    blockchainNetwork: {
      name: 'Bitcoin Testnet 3',
    },
    status: 'ACTIVE',
    permissions: ['CUSTODY', 'TRADE', 'INTER', 'INTRA'],
    enriched: true,
  },
};

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

export default function WalletDetails() {
  const router = useRouter();

  return (
    <main className={`flex flex-col min-h-screen ${manrope.className}`}>
      <Navbar />
      <section>
        <div className="max-w-7xl xl:mx-auto px-6 py-8">
          <div className="border-b border-gray-200 dark:border-gray-600 pb-5">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Wallet - Accounts
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {Object.keys(accounts).map((accountKey) => (
              <button
                onClick={() =>
                  router.push(
                    `/wallet-details/${accounts[accountKey].parentWalletId}/wallet-account-details/${accounts[accountKey].accountId}`,
                  )
                }
                key={accountKey}
                className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 dark:bg-gray-800 p-6">
                  <div className="block h-12 w-12 rounded-lg p-2 ring-1 ring-gray-900/10 dark:ring-gray-50/25">
                    {coinsMeta[accountKey].icon}
                  </div>
                  <div className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
                    {accounts[accountKey].currency}
                  </div>
                </div>
                <dl className="-my-3 divide-y divide-gray-100 dark:divide-gray-50/25 px-6 py-4 text-sm leading-6">
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500 dark:text-gray-400">
                      Account ID
                    </dt>
                    <dd className="flex items-center text-gray-900 dark:text-white">
                      {accounts[accountKey].accountId.slice(0, 6)}
                      <ClipboardDocumentIcon
                        className="block h-5 w-5 ml-3 text-gray-800 dark:text-gray-100"
                        aria-hidden="true"
                      />
                    </dd>
                  </div>
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500 dark:text-gray-400">
                      Balance
                    </dt>
                    <dd className="flex items-start gap-x-2">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {coinsMeta[accountKey].symbol}
                        {Number(
                          Number(accounts[accountKey].availableBalance.amount) /
                            Math.pow(10, coinsMeta[accountKey].decimals),
                        ).toFixed(coinsMeta[accountKey].decimals)}
                      </div>
                    </dd>
                  </div>
                </dl>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
