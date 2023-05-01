import Navbar from '@/components/navbar';
import { manrope } from '@/config';
import { isNonEmptyString } from '@/lib/validators';
import {
  ChevronDoubleRightIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useController, useForm } from 'react-hook-form';

const coinsMeta = {
  USDC: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000">
        <path
          fill="#2775ca"
          d="M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z"
        ></path>
        <path
          fill="#fff"
          d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z"
        ></path>
        <path
          fill="#fff"
          d="M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zm441.67-1300c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z"
        ></path>
      </svg>
    ),
    symbol: '$',
    decimals: 2,
  },
  EUR: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#037BDB"></circle>
        <path
          fill="#fff"
          d="M21.076 20.388c-.152-.135-.388-.135-.523.017-.792.792-1.804 1.213-2.815 1.213-1.484 0-2.9-.91-3.71-2.41h3.845c.219 0 .387-.17.387-.388v-1.315a.381.381 0 00-.387-.388h-4.519c-.034-.253-.034-.506-.034-.742s.017-.489.05-.759h4.502a.38.38 0 00.388-.387v-1.315a.382.382 0 00-.388-.388h-3.844c.81-1.484 2.21-2.411 3.71-2.411 1.028 0 2.023.438 2.815 1.23.152.152.388.152.523.017l1.467-1.348c.084-.068.118-.17.135-.287a.458.458 0 00-.102-.287c-1.332-1.349-3.034-2.09-4.822-2.09-2.95 0-5.63 2.073-6.693 5.159H9.442a.381.381 0 00-.387.387v1.316a.38.38 0 00.387.387h1.18c-.016.27-.033.523-.033.759s.017.489.034.742h-1.18a.381.381 0 00-.388.388v1.315a.38.38 0 00.387.387h1.62c1.061 3.086 3.742 5.16 6.693 5.16 1.787 0 3.506-.742 4.821-2.091a.407.407 0 00.119-.287.416.416 0 00-.135-.286l-1.484-1.298z"
        ></path>
      </svg>
    ),
    symbol: '€',
    decimals: 2,
  },
  BUSD: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 336.41 337.42">
        <g>
          <path
            fill="#F0B90B"
            d="M168.2.71l41.5 42.5-104.5 104.5-41.5-41.5zm63 63l41.5 42.5-167.5 167.5-41.5-41.5zm-189 63l41.5 42.5-41.5 41.5-41.5-41.5zm252 0l41.5 42.5-167.5 167.5-41.5-41.5z"
          ></path>
        </g>
      </svg>
    ),
    symbol: '$',
    decimals: 2,
  },
  USDT: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 339.43 295.27">
        <path
          fill="#50AF95"
          fillRule="evenodd"
          d="M62.15 1.45l-61.89 130a2.52 2.52 0 00.54 2.94l167.15 160.17a2.55 2.55 0 003.53 0L338.63 134.4a2.52 2.52 0 00.54-2.94l-61.89-130A2.5 2.5 0 00275 0H64.45a2.5 2.5 0 00-2.3 1.45z"
        ></path>
        <path
          fill="#FFF"
          fillRule="evenodd"
          d="M191.19 144.8c-1.2.09-7.4.46-21.23.46-11 0-18.81-.33-21.55-.46-42.51-1.87-74.24-9.27-74.24-18.13s31.73-16.25 74.24-18.15v28.91c2.78.2 10.74.67 21.74.67 13.2 0 19.81-.55 21-.66v-28.9c42.42 1.89 74.08 9.29 74.08 18.13s-31.65 16.24-74.08 18.12zm0-39.25V79.68h59.2V40.23H89.21v39.45h59.19v25.86c-48.11 2.21-84.29 11.74-84.29 23.16s36.18 20.94 84.29 23.16v82.9h42.78v-82.93c48-2.21 84.12-11.73 84.12-23.14s-36.09-20.93-84.12-23.15zm0 0z"
        ></path>
      </svg>
    ),
    symbol: '$',
    decimals: 2,
  },
  BNB: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2496 2496">
        <path
          fill="#F0B90B"
          fillRule="evenodd"
          d="M1248 0c689.3 0 1248 558.7 1248 1248s-558.7 1248-1248 1248S0 1937.3 0 1248 558.7 0 1248 0z"
          clipRule="evenodd"
        ></path>
        <path
          fill="#FFF"
          d="M685.9 1248l.9 330 280.4 165v193.2l-444.5-260.7v-524l163.2 96.5zm0-330v192.3l-163.3-96.6V821.4l163.3-96.6L850 821.4 685.9 918zm398.4-96.6l163.3-96.6 164.1 96.6-164.1 96.6-163.3-96.6z"
        ></path>
        <path
          fill="#FFF"
          d="M803.9 1509.6v-193.2l163.3 96.6v192.3l-163.3-95.7zm280.4 302.6l163.3 96.6 164.1-96.6v192.3l-164.1 96.6-163.3-96.6v-192.3zm561.6-990.8l163.3-96.6 164.1 96.6v192.3l-164.1 96.6V918l-163.3-96.6zm163.3 756.6l.9-330 163.3-96.6v524l-444.5 260.7v-193.2l280.3-164.9z"
        ></path>
        <path
          fill="#FFF"
          d="M1692.1 1509.6l-163.3 95.7V1413l163.3-96.6v193.2z"
        ></path>
        <path
          fill="#FFF"
          d="M1692.1 986.4l.9 193.2-281.2 165v330.8l-163.3 95.7-163.3-95.7v-330.8l-281.2-165V986.4l164-96.6 279.5 165.8 281.2-165.8 164.1 96.6h-.7zM803.9 656.5l443.7-261.6 444.5 261.6-163.3 96.6-281.2-165.8-280.4 165.8-163.3-96.6z"
        ></path>
      </svg>
    ),
    symbol: 'E',
    decimals: 18,
  },
  ETH: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <g fill="none">
          <circle cx="16" cy="16" r="16" fill="#627EEA"></circle>
          <g fill="#FFF">
            <path fillOpacity="0.602" d="M16.498 4v8.87l7.497 3.35z"></path>
            <path d="M16.498 4L9 16.22l7.498-3.35zM16.498 21.968v6.027L24 17.616zM16.498 27.995v-6.028L9 17.616zM16.498 20.573l7.497-4.353-7.497-3.348zM9 16.22l7.498 4.353v-7.701z"></path>
          </g>
        </g>
      </svg>
    ),
    symbol: 'E',
    decimals: 18,
  },
  BTC: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4091.27 4091.73">
        <path
          fill="#F7931A"
          d="M4030.06 2540.77C3756.82 3636.78 2646.74 4303.79 1550.6 4030.48 454.92 3757.24-212.09 2647.09 61.27 1551.17c273.12-1096.13 1383.2-1763.19 2479-1489.95C3636.33 334.46 4303.3 1444.73 4030.03 2540.79l.02-.02z"
        ></path>
        <path
          fill="#fff"
          d="M2947.77 1754.38c40.72-272.26-166.56-418.61-450-516.24l91.95-368.8-224.5-55.94-89.51 359.09c-59.02-14.72-119.63-28.59-179.87-42.34L2186 768.69l-224.36-55.94-92 368.68c-48.84-11.12-96.81-22.11-143.35-33.69l.26-1.16-309.59-77.31-59.72 239.78s166.56 38.18 163.05 40.53c90.91 22.69 107.35 82.87 104.62 130.57l-104.74 420.15c6.26 1.59 14.38 3.89 23.34 7.49-7.49-1.86-15.46-3.89-23.73-5.87l-146.81 588.57c-11.11 27.62-39.31 69.07-102.87 53.33 2.25 3.26-163.17-40.72-163.17-40.72l-111.46 256.98 292.15 72.83c54.35 13.63 107.61 27.89 160.06 41.3l-92.9 373.03 224.24 55.94 92-369.07c61.26 16.63 120.71 31.97 178.91 46.43l-91.69 367.33 224.51 55.94 92.89-372.33c382.82 72.45 670.67 43.24 791.83-303.02 97.63-278.78-4.86-439.58-206.26-544.44 146.69-33.83 257.18-130.31 286.64-329.61l-.07-.05zm-512.93 719.26c-69.38 278.78-538.76 128.08-690.94 90.29l123.28-494.2c152.17 37.99 640.17 113.17 567.67 403.91zm69.43-723.3c-63.29 253.58-453.96 124.75-580.69 93.16l111.77-448.21c126.73 31.59 534.85 90.55 468.94 355.05h-.02z"
        ></path>
      </svg>
    ),
    symbol: '₿',
    decimals: 8,
  },
};
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
    watch,
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

  console.log(sourceWallet, sourceCurrency);
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
                      onChange={onChangeSourceAmount}
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
                  <option disabled value="">
                    Select
                  </option>
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
                      onChange={onChangeDestinationAmount}
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
