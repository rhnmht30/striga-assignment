import Navbar from '@/components/navbar';
import { manrope } from '@/config';
import { coinsMeta } from '@/lib/constants';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useController, useForm } from 'react-hook-form';

const wallets = [
  {
    walletId: '37d2b10e-2b0f-47a2-b75e-8e729b6436a6',
    accounts: {
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
    },
    syncedOwnerId: '3365c5b5-2249-454d-99cd-42121770fc33',
    ownerType: 'CONSUMER',
    createdAt: '2023-04-27T04:49:23.870Z',
    comment: 'API',
    walletName: 'Wallet 1',
    nameId: 1,
  },
  {
    walletId: '3d6269c0-499a-4176-868b-27ab5334fb7c',
    accounts: {
      USDT: {
        accountId: '5f9296fd7a556a6cf589c493bfe9ab36',
        parentWalletId: '3d6269c0-499a-4176-868b-27ab5334fb7c',
        currency: 'USDT',
        ownerId: '3365c5b5-2249-454d-99cd-42121770fc33',
        ownerType: 'CONSUMER',
        createdAt: '2023-04-27T04:01:21.349Z',
        availableBalance: {
          amount: '0',
          currency: 'cents',
        },
        linkedCardId: 'UNLINKED',
        status: 'ACTIVE',
        permissions: ['CUSTODY', 'TRADE', 'INTER', 'INTRA'],
        enriched: false,
      },
      BTC: {
        accountId: 'ada68026d1e9f45992dc5773a87521c1',
        parentWalletId: '3d6269c0-499a-4176-868b-27ab5334fb7c',
        currency: 'BTC',
        ownerId: '3365c5b5-2249-454d-99cd-42121770fc33',
        ownerType: 'CONSUMER',
        createdAt: '2023-04-27T04:01:21.348Z',
        availableBalance: {
          amount: '0',
          currency: 'satoshis',
        },
        linkedCardId: 'UNLINKED',
        status: 'ACTIVE',
        permissions: ['CUSTODY', 'TRADE', 'INTER', 'INTRA'],
        enriched: false,
      },
      EUR: {
        accountId: '496bcf5a3c5b24c20eaa8d2f09a6d97c',
        parentWalletId: '3d6269c0-499a-4176-868b-27ab5334fb7c',
        currency: 'EUR',
        ownerId: '3365c5b5-2249-454d-99cd-42121770fc33',
        ownerType: 'CONSUMER',
        createdAt: '2023-04-27T04:01:21.348Z',
        availableBalance: {
          amount: '11',
          currency: 'cents',
        },
        linkedCardId: 'UNLINKED',
        linkedBankAccountId: 'UNLINKED',
        status: 'ACTIVE',
        permissions: ['CUSTODY', 'TRADE', 'INTER', 'INTRA'],
        enriched: false,
      },
      BNB: {
        accountId: '3fd4b7803799ad96b6ec833eb84a4b4f',
        parentWalletId: '3d6269c0-499a-4176-868b-27ab5334fb7c',
        currency: 'BNB',
        ownerId: '3365c5b5-2249-454d-99cd-42121770fc33',
        ownerType: 'CONSUMER',
        createdAt: '2023-04-27T04:01:21.349Z',
        availableBalance: {
          amount: '0',
          currency: 'wei',
        },
        linkedCardId: 'UNLINKED',
        status: 'ACTIVE',
        permissions: ['CUSTODY', 'TRADE', 'INTER', 'INTRA'],
        enriched: false,
      },
      USDC: {
        accountId: '5d318e2ef135900e452e2cd9c2c783a0',
        parentWalletId: '3d6269c0-499a-4176-868b-27ab5334fb7c',
        currency: 'USDC',
        ownerId: '3365c5b5-2249-454d-99cd-42121770fc33',
        ownerType: 'CONSUMER',
        createdAt: '2023-04-27T04:01:21.349Z',
        availableBalance: {
          amount: '0',
          currency: 'cents',
        },
        linkedCardId: 'UNLINKED',
        status: 'ACTIVE',
        permissions: ['CUSTODY', 'TRADE', 'INTER', 'INTRA'],
        enriched: false,
      },
      ETH: {
        accountId: 'd486a2771f2cbb3219d586ae4a24f29f',
        parentWalletId: '3d6269c0-499a-4176-868b-27ab5334fb7c',
        currency: 'ETH',
        ownerId: '3365c5b5-2249-454d-99cd-42121770fc33',
        ownerType: 'CONSUMER',
        createdAt: '2023-04-27T04:01:21.349Z',
        availableBalance: {
          amount: '0',
          currency: 'wei',
        },
        linkedCardId: 'UNLINKED',
        status: 'ACTIVE',
        permissions: ['CUSTODY', 'TRADE', 'INTER', 'INTRA'],
        enriched: false,
      },
      BUSD: {
        accountId: 'a9617412e590f8a5e7c1d838a5caaea9',
        parentWalletId: '3d6269c0-499a-4176-868b-27ab5334fb7c',
        currency: 'BUSD',
        ownerId: '3365c5b5-2249-454d-99cd-42121770fc33',
        ownerType: 'CONSUMER',
        createdAt: '2023-04-27T04:01:21.349Z',
        availableBalance: {
          amount: '0',
          currency: 'cents',
        },
        linkedCardId: 'UNLINKED',
        status: 'ACTIVE',
        permissions: ['CUSTODY', 'TRADE', 'INTER', 'INTRA'],
        enriched: false,
      },
    },
    syncedOwnerId: '3365c5b5-2249-454d-99cd-42121770fc33',
    ownerType: 'CONSUMER',
    createdAt: '2023-04-27T04:01:21.382Z',
    comment: 'DEFAULT',
    walletName: 'Wallet 2',
    nameId: 2,
  },
];

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

export default function Swap() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      source: {
        wallet: null,
        currency: null,
        amount: 0,
      },
      destination: {
        wallet: null,
        currency: null,
        amount: 0,
      },
    },
  });

  const {
    field: { value: sourceWallet },
  } = useController({
    name: 'source.wallet',
    control,
  });

  const {
    field: { value: destinationWallet },
  } = useController({
    name: 'destination.wallet',
    control,
  });

  const {
    field: { value: sourceCurrency },
  } = useController({
    name: 'source.currency',
    control,
  });

  const {
    field: { value: destinationCurrency },
  } = useController({
    name: 'destination.currency',
    control,
  });

  const {
    field: { value: sourceAmount, onChange: onChangeSourceAmount },
  } = useController({
    name: 'source.amount',
    control,
  });

  const {
    field: { value: destinationAmount, onChange: onChangeDestinationAmount },
  } = useController({
    name: 'destination.amount',
    control,
  });

  return (
    <main className={`flex flex-col min-h-screen ${manrope.className}`}>
      <Navbar />
      <section>
        <div className="max-w-7xl xl:mx-auto px-6 py-8">
          <div className="border-b border-gray-200 dark:border-gray-600 pb-5">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Swap currency
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_48px_1fr] gap-8 mt-8">
            <div className="flex flex-col space-y-4">
              <div>
                <label
                  htmlFor="source-wallet"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Source wallet
                </label>
                <select
                  onChange={(e) => {
                    setValue('source.wallet', wallets[e.target.value]);
                  }}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 dark:bg-gray-700/25 text-gray-900 dark:text-gray-100  ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-amber-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select</option>
                  {wallets.map((wallet, index) => (
                    <option key={wallet.walletId} value={index}>
                      {wallet.walletName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="source-currency"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Source currency
                </label>
                <select
                  onChange={(e) => {
                    setValue(
                      'source.currency',
                      sourceWallet?.accounts?.[e.target.value],
                    );
                  }}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 dark:bg-gray-700/25 text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-amber-600 sm:text-sm sm:leading-6"
                  defaultValue=""
                >
                  <option disabled value="">
                    Select
                  </option>

                  {sourceWallet
                    ? Object.entries(sourceWallet?.accounts)?.map((account) => (
                        <option key={account[1].accountId} value={account[0]}>
                          {account[0]}
                        </option>
                      ))
                    : null}
                </select>
              </div>

              {sourceCurrency ? (
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="source-amount"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                    >
                      Send amount
                    </label>
                    <p
                      className="text-xs text-gray-500 dark:text-gray-400 text-right"
                      id="source-amount-description"
                    >
                      Available balance:{' '}
                      {coinsMeta?.[sourceCurrency?.currency]?.symbol}
                      {Number(
                        Number(sourceCurrency?.availableBalance?.amount) /
                          Math.pow(
                            10,
                            coinsMeta?.[sourceCurrency?.currency]?.decimals,
                          ),
                      ).toFixed(
                        coinsMeta?.[sourceCurrency?.currency]?.decimals,
                      )}
                    </p>
                  </div>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                        {coinsMeta?.[sourceCurrency?.currency]?.symbol}
                      </span>
                    </div>
                    <input
                      type="text"
                      onChange={(e) => {
                        onChangeSourceAmount(e.target.value);
                        onChangeDestinationAmount(e.target.value * 1.5); //dummmy
                      }}
                      value={sourceAmount}
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 dark:bg-gray-700/25 text-gray-900 dark:text-gray-100  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                      placeholder="100"
                      aria-describedby="source-amount-description"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span
                        className="text-gray-500 sm:text-sm"
                        id="price-currency"
                      >
                        {sourceCurrency?.availableBalance?.currency}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div />
              )}
            </div>

            <div />

            <div className="flex flex-col space-y-4">
              <div>
                <label
                  htmlFor="destn-wallet"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 "
                >
                  Destination wallet
                </label>
                <select
                  onChange={(e) => {
                    setValue('destination.wallet', wallets[e.target.value]);
                  }}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 dark:bg-gray-700/25 text-gray-900 dark:text-gray-100  ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-amber-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select</option>
                  {wallets.map((wallet, index) => (
                    <option key={wallet.walletId} value={index}>
                      {wallet.walletName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="destn-currency"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Destination currency
                </label>
                <select
                  onChange={(e) => {
                    setValue(
                      'destination.currency',
                      destinationWallet?.accounts?.[e.target.value],
                    );
                  }}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 dark:bg-gray-700/25 text-gray-900 dark:text-gray-100  ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-amber-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select</option>
                  {destinationWallet
                    ? Object.entries(destinationWallet?.accounts)?.map(
                        (account) => (
                          <option key={account[1].accountId} value={account[0]}>
                            {account[0]}
                          </option>
                        ),
                      )
                    : null}
                </select>
              </div>

              {destinationCurrency ? (
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="destn-amount"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                    >
                      Receive amount
                    </label>
                    <p
                      className="text-xs text-gray-500 dark:text-gray-400 text-right"
                      id="destn-amount-description"
                    >
                      Balance:{' '}
                      {coinsMeta?.[destinationCurrency?.currency]?.symbol}
                      {Number(
                        Number(destinationCurrency?.availableBalance?.amount) /
                          Math.pow(
                            10,
                            coinsMeta?.[destinationCurrency?.currency]
                              ?.decimals,
                          ),
                      ).toFixed(
                        coinsMeta?.[destinationCurrency?.currency]?.decimals,
                      )}
                    </p>
                  </div>

                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                        {coinsMeta?.[destinationCurrency?.currency]?.symbol}
                      </span>
                    </div>
                    <input
                      type="text"
                      disabled
                      value={destinationAmount}
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 dark:bg-gray-700/25 text-gray-900 dark:text-gray-100  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                      placeholder="100"
                      aria-describedby="destn-amount-description"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span
                        className="text-gray-500 sm:text-sm"
                        id="price-currency"
                      >
                        {destinationCurrency?.availableBalance?.currency}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div />
              )}
            </div>

            <button
              className={`mt-8 overflow-hidden rounded-xl border ${
                sourceAmount <= 0 ? 'border-dashed' : ''
              } border-gray-200 dark:border-gray-600`}
            >
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 dark:bg-gray-800 p-6">
                <div className="flex h-12 w-12 rounded-lg p-1 ring-1 ring-gray-900/10 dark:ring-gray-50/25 items-center justify-center">
                  {sourceCurrency ? (
                    coinsMeta?.[sourceCurrency?.currency]?.icon
                  ) : (
                    <div className="bg-gray-100 dark:bg-gray-700/25 h-full w-full flex rounded-lg" />
                  )}
                </div>
                <div className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  {sourceCurrency ? (
                    sourceCurrency?.currency
                  ) : (
                    <div className="bg-gray-100 dark:bg-gray-700/25 h-6 w-16 flex rounded-lg" />
                  )}
                </div>
              </div>
              <dl
                className={`-my-3 divide-y divide-gray-100 ${
                  sourceAmount <= 0 ? 'divide-dashed' : ''
                } dark:divide-gray-50/25 px-6 py-4 text-sm leading-6`}
              >
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500 dark:text-gray-400">
                    Wallet ID
                  </dt>
                  <dd className="flex items-center text-gray-900 dark:text-white">
                    {sourceWallet ? (
                      sourceWallet?.walletId.slice(0, 6)
                    ) : (
                      <div className="bg-gray-100 dark:bg-gray-700/25 h-6 w-16 flex rounded-lg" />
                    )}
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500 dark:text-gray-400">
                    Account ID
                  </dt>
                  <dd className="flex items-center text-gray-900 dark:text-white">
                    {sourceCurrency ? (
                      sourceCurrency?.accountId.slice(0, 6)
                    ) : (
                      <div className="bg-gray-100 dark:bg-gray-700/25 h-6 w-16 flex rounded-lg" />
                    )}
                  </dd>
                </div>
                <div className="flex justify-between gap-x-1 py-3">
                  <dt className="text-gray-500 dark:text-gray-400 text-left">
                    Send amount
                  </dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    {sourceAmount > 0 ? (
                      `${
                        coinsMeta?.[sourceCurrency?.currency]?.symbol
                      }${sourceAmount}`
                    ) : (
                      <div className="bg-gray-100 dark:bg-gray-700/25 h-6 w-16 flex rounded-lg" />
                    )}
                  </dd>
                </div>
              </dl>
            </button>

            <ChevronDoubleRightIcon
              className="block h-5 w-5 text-gray-800 dark:text-gray-100 self-center justify-self-center rotate-90 sm:rotate-0"
              aria-hidden="true"
            />

            <button
              className={`mt-8 overflow-hidden rounded-xl border ${
                destinationAmount <= 0 ? 'border-dashed' : ''
              } border-gray-200 dark:border-gray-600`}
            >
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 dark:bg-gray-800 p-6">
                <div className="flex h-12 w-12 rounded-lg p-1 ring-1 ring-gray-900/10 dark:ring-gray-50/25 items-center justify-center">
                  {destinationCurrency ? (
                    coinsMeta?.[destinationCurrency?.currency]?.icon
                  ) : (
                    <div className="bg-gray-100 dark:bg-gray-700/25 h-full w-full flex rounded-lg" />
                  )}
                </div>
                <div className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  {destinationCurrency ? (
                    destinationCurrency?.currency
                  ) : (
                    <div className="bg-gray-100 dark:bg-gray-700/25 h-6 w-16 flex rounded-lg" />
                  )}
                </div>
              </div>
              <dl
                className={`-my-3 divide-y divide-gray-100 ${
                  destinationAmount <= 0 ? 'divide-dashed' : ''
                } dark:divide-gray-50/25 px-6 py-4 text-sm leading-6`}
              >
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500 dark:text-gray-400">
                    Wallet ID
                  </dt>
                  <dd className="flex items-center text-gray-900 dark:text-white">
                    {destinationWallet ? (
                      destinationWallet?.walletId.slice(0, 6)
                    ) : (
                      <div className="bg-gray-100 dark:bg-gray-700/25 h-6 w-16 flex rounded-lg" />
                    )}
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500 dark:text-gray-400">
                    Account ID
                  </dt>
                  <dd className="flex items-center text-gray-900 dark:text-white">
                    {destinationCurrency ? (
                      destinationCurrency?.accountId.slice(0, 6)
                    ) : (
                      <div className="bg-gray-100 dark:bg-gray-700/25 h-6 w-16 flex rounded-lg" />
                    )}
                  </dd>
                </div>
                <div className="flex justify-between gap-x-1 py-3">
                  <dt className="text-gray-500 dark:text-gray-400 text-left">
                    Receive amount
                  </dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    {destinationAmount > 0 ? (
                      `${
                        coinsMeta?.[destinationCurrency?.currency]?.symbol
                      }${destinationAmount}`
                    ) : (
                      <div className="bg-gray-100 dark:bg-gray-700/25 h-6 w-16 flex rounded-lg" />
                    )}
                  </dd>
                </div>
              </dl>
            </button>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => router.push('/')}
              tabIndex={2}
              type="submit"
              disabled={sourceAmount <= 0 || destinationAmount <= 0}
              className="flex w-36 justify-center rounded-md bg-amber-600 dark:bg-amber-500 px-3 py-3 text-base font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 dark:hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 dark:focus-visible:outline-amber-500 disabled:bg-gray-300 disabled:text-gray-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
            >
              Confirm swap
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
