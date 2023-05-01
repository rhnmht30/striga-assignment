import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { manrope } from '@/config';
import { in200s } from '@/lib/validators';
import { APIClient } from '@/lib/apiClient';

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const onSubmit = React.useCallback(
    async (formData) => {
      const { email, password } = formData;

      delete formData.confirmPassword;
      delete formData.password;

      const toastId = toast.loading('Creating your account...');

      try {
        const response = await APIClient.post('/user/create', formData);

        if (in200s(response.status)) {
          toast.loading('Finalizing last steps...', { id: toastId });
          const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
              data: {
                strigaUserId: response.data.userId,
              },
            },
          });

          if (error) throw error;

          toast.success('Account created successfully', { id: toastId });
          router.push('/');
        }
      } catch (error) {
        console.log(error);

        if (error.response) {
          // throw error response from server
          // handle error in react-query
          // throw error.response;
          toast.error(`Error: ${error?.response?.data?.message}`, {
            id: toastId,
          });
        } else {
          toast.error(`Error: ${error?.message}`, {
            id: toastId,
          });
        }
      }
    },
    [router, supabaseClient.auth],
  );

  // call api in useEffect
  React.useEffect(() => {
    // call api
    APIClient.post('/ping')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className={`flex flex-col min-h-screen ${manrope.className}`}>
      <Toaster />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-md">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="striga-black"
            role="img"
            width="120"
            height="64"
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
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[30rem]">
          <div className="bg-white dark:bg-gray-950 px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    {...register('firstName', {
                      required: {
                        value: true,
                        message: 'First name is required',
                      },
                      minLength: {
                        value: 2,
                        message: 'First name must be at least 2 characters',
                      },
                      maxLength: {
                        value: 25,
                        message: 'First name must not exceed 25 characters',
                      },
                    })}
                    className="block w-full rounded-md border-0 dark:bg-white/5 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    placeholder="John"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    {...register('lastName', {
                      required: {
                        value: true,
                        message: 'Last name is required',
                      },
                      minLength: {
                        value: 2,
                        message: 'Last name must be at least 2 characters',
                      },
                      maxLength: {
                        value: 25,
                        message: 'Last name must not exceed 25 characters',
                      },
                    })}
                    className="block w-full rounded-md border-0 dark:bg-white/5 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="mobile-number"
                  className="block text-sm font-medium leading-6"
                >
                  Mobile number
                </label>
                <div className="flex mt-2 rounded-md shadow-sm">
                  <div className="flex items-center">
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>
                    <input
                      {...register('mobile.countryCode', {
                        required: {
                          value: true,
                          message: 'Country code is required',
                        },
                        pattern: {
                          value: /[\+][0-9]+/i,
                          message:
                            'Entered value does not match country code format',
                        },
                      })}
                      placeholder="+91"
                      className="w-20 mr-3 rounded-md border-0 dark:bg-white/5 p-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <input
                    {...register('mobile.number', {
                      required: {
                        value: true,
                        message: 'Mobile number is required',
                      },
                      pattern: {
                        value: /^[0-9]+/i,
                        message:
                          'Entered value does not match mobile number format',
                      },
                    })}
                    className="block w-full rounded-md border-0 dark:bg-white/5 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    placeholder="9876564324"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'Email address is required',
                      },
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Entered value does not match email format',
                      },
                    })}
                    className="block w-full rounded-md border-0 dark:bg-white/5 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                    placeholder="john@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    {...register('password', {
                      required: {
                        value: true,
                        message: 'Please enter a password',
                      },
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    className="block w-full rounded-md border-0 dark:bg-white/5 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6"
                >
                  Confirm password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    {...register('confirmPassword', {
                      required: {
                        value: true,
                        message: 'Please confirm your password',
                      },
                      validate: (val) => {
                        if (watch('password') != val) {
                          return 'Your passwords do no match';
                        }
                      },
                    })}
                    className="block w-full rounded-md border-0 dark:bg-white/5 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleSubmit(onSubmit)}
                  type="submit"
                  disabled={Object.keys(errors).length > 0}
                  className="flex w-full justify-center rounded-md bg-amber-600 dark:bg-amber-500 px-3 py-3 text-base font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 dark:hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 dark:focus-visible:outline-amber-500 disabled:bg-gray-300 disabled:text-gray-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
            Already a member?{' '}
            <Link
              href="/auth/login"
              className="font-semibold leading-6 text-amber-600 dark:text-amber-400 hover:text-amber-500  dark:hover:text-amber-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
