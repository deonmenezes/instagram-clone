import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { NextPage } from 'next';
import atoms from '../util/atoms';
import useHandleSignIn from '../hooks/useHandleSignIn';
import useSetFormErrors from '../hooks/useSetFormErrors';
import handleCreateUser from '../util/handleCreateUser';
import InstagramSVG from '../components/svgComps/InstagramSVG';

const SignUp: NextPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [emailFormErrors, setEmailFormErrors] = React.useState('');
  const [passwordFormErrors, setPasswordFormErrors] = React.useState('');
  const [usernameFormErrors, setUsernameFormErrors] = React.useState('');
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [listeners] = useAtom(atoms.listeners);

  useSetFormErrors({
    email,
    password,
    username,
    setEmailFormErrors,
    setPasswordFormErrors,
    setUsernameFormErrors,
  });

  useHandleSignIn({ isSubmit });

  if (loading) {
    return (
      <div className="flex h-[100vh] w-full items-center justify-center dark:bg-[#131313]">
        <picture>
          <img src="/instagramLoading.png" alt="loading" />
        </picture>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Instagram • Sign up</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/instagram.png" />
      </Head>
      <div className="flex min-h-[100vh] w-full items-center justify-center bg-[#fafafa]">
        <div>
          <div className="relative hidden h-[590px] overflow-hidden lg:block">
            <Image
              priority
              src="/loginFrame.png"
              alt="instagram"
              height={635}
              width={465}
            />
            <div className="absolute top-[26px] right-14 h-full w-full">
              <div className="relative">
                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage1 opacity-0">
                  <Image
                    priority
                    src="/loginImg1.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                
                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage2 opacity-0">
                  <Image
                    src="/loginImg2.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                
                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage3 opacity-0">
                  <Image
                    src="/loginImg3.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage4 opacity-0">
                  <Image
                    src="/loginImg4.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex max-w-[350px] flex-col items-center justify-center border border-stone-300 bg-white">
            <div className="h-auto w-[175px] pt-10 pb-5">
              <InstagramSVG disableDarkMode white={false} />
            </div>
            <div className="px-10 pb-5 text-center font-semibold text-[#8e8e8e]">
              <p>Login to see Internship opportunities inside of Meta</p>
            </div>
            <div className="w-full px-10">
              <form
                action=""
                className="signInPageFormContainer"
                onSubmit={(e: any) =>
                  handleCreateUser({
                    e,
                    listeners,
                    username,
                    email,
                    password,
                    passwordFormErrors,
                    emailFormErrors,
                    usernameFormErrors,
                    setIsSubmit,
                    setLoading,
                    setPasswordFormErrors,
                  })
                }
              >
                <label htmlFor="signInPageUserName">
                  <input
                    className="w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="text"
                    id="signInPageUserName"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </label>
                <p className="h-[30px] text-[10px] text-red-600">
                  {usernameFormErrors}
                </p>
                <label htmlFor="signInPageEmail">
                  <input
                    className="w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="email"
                    id="signInPageEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                  />
                </label>
                <p className="h-[20px] pb-2 text-[10px] text-red-600">
                  {emailFormErrors}
                </p>
                <label htmlFor="signInPagePassword">
                  <input
                    className="w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="password"
                    id="signInPagePassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </label>
                <p className="h-[20px] text-[10px] text-red-600">
                  {passwordFormErrors}
                </p>
                <button
                  className={`${
                    emailFormErrors === '' && passwordFormErrors === ''
                      ? 'bg-[#0095f6]'
                      : 'pointer-events-none cursor-default bg-[#abddff]'
                  } my-5 w-full rounded-[4px] px-2 py-1 text-sm font-semibold text-white`}
                  type="submit"
                >
                  Sign Up
                </button>
                <div className="mb-5 flex h-0 items-center justify-center">
                  <div className="w-full border-b border-stone-300" />
                  {/* <p className="mx-2 text-sm font-semibold text-[#6d6d6d]">
                    OR
                  </p> */}
                  <div className="w-full border-b border-stone-300" />
                </div>
              </form>
            </div>
          </div>
          <div className="mt-2 flex max-w-[350px] justify-center border border-stone-300 bg-white py-5 text-[14px]">
            <p>Please Log in on Instagram to apply for the internship</p>
            {/* <button
              className="ml-1 font-semibold text-[#0095f6]"
              type="button"
              onClick={() => Router.push('/Login')}
            >
              Log in
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;