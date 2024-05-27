"use client";

import PageContentLayout from "#/components/layout/PageContentLayout";
import MenuCard from "#/components/menuCard/MenuCard";
import "./globals.css"

import Booking from "#/public/assets/booking.png";
import Timesheet from "#/public/assets/timesheet.png";
import Photo from "#/public/assets/photo.png";
import Service from "#/public/assets/service.png";
import Program from "#/public/assets/programlink.png";
import Skill from "#/public/assets/skillmatrix.png";
import { PathUrls } from "#/constants/pathUrls";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center m-4 gap-4">
        <Button onClick={() => router.push(PathUrls.test.root)} variant="contained" className=" self-center">GO TO TEST PAGE</Button>
        <Button onClick={() => router.push(PathUrls.candidate.root)} variant="contained" className=" self-center">GO TO EXAMPLE CANDIDATE PAGE</Button>
      </div>
      <PageContentLayout>
        <div className="flex justify-center">
          <div className="flex flex-col md:px-8  md:w-4/5 ">
            {/* <div className="md:px-8  md:w-4/5 "> */}
            <div className="text-center text-purple-950 text-4xl font-bold">
              Protoss Portal
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 pt-3">
              <MenuCard
                img={Timesheet}
                title="timesheet"
                link="/timesheet"
                desc="For managing timesheet"
              />
              <MenuCard
                img={Booking}
                title="room booking"
                link="https://docs.google.com/spreadsheets/d/10a1LHHnR6I4mpsMh_dq4FcFcabg7wWwUafd5m4W28Dc/edit#gid=2103946690"
                desc="For booking room"
              />
              <MenuCard
                img={Photo}
                title="protoss asset"
                link="https://docs.google.com/spreadsheets/d/1H7gBCkAIIYOoyJO0S69fFsLAkE-UZiIcruW4kWrumt0/edit#gid=0"
                desc="For getting protoss asset"
              />
              <MenuCard
                img={Service}
                title="problem service"
                link="https://docs.google.com/spreadsheets/d/1LKEAeA3EmHEEdQLsUTN6pb5OWPQB1XFFwCPbkc-xsMg/edit#gid=0"
                desc="For reporting problem service"
              />
              <MenuCard
                img={Program}
                title="program link"
                link="https://docs.google.com/spreadsheets/d/1Y9KmsOCWf6pwNH9zpyAyU5pAq7xQVFQ4nambvHsN8A8/edit#gid=1849056364"
                desc="For getting program link"
              />
              <MenuCard
                img={Skill}
                title="skill matrix"
                link="https://docs.google.com/spreadsheets/d/11TMY-TlWHXkYde2b4cgvb6_nrSf0ZDU2bfTCDmO2dBg"
                desc="For getting skill matrix"
              />
            </div>
            {/* </div> */}
            {/* <div className="w-1/5 rounded-md hidden md:block overflow-y-scroll h-screen">
            {graphUser.isLoading ? (
              <div className="h-screen relative">
                <div className="absolute bottom-1/2">
                  <LoadingCard />
                </div>
              </div>
            ) : (
              <Member member={member} client={"Protoss"} data={graphUser.data} />
            )}
          </div> */}
          </div>

          {/* {isOpen && (
          <div className="fixed top-0 right-0 z-50 w-full h-screen md:hidden bg-black/70">
            <div className="h-screen  w-3/5 absolute overflow-y-scroll bg-white  top-0 right-0 z-50 drop-shadow-lg rounded-md">
              <div className="flex justify-end m-4">
                <button
                  className="bg-slate-400 rounded-lg px-2 py-1"
                  onClick={() => {
                    setIsOpen(false);
                  }}>
                  Close
                </button>
              </div>
              {!graphUser.isLoading ? (
                <Member
                  member={member}
                  client={"Protoss"}
                  data={graphUser.data}
                />
              ) : (
                <LoadingCard />
              )}
            </div>
          </div>
        )} */}
        </div>
      </PageContentLayout>

      {/* <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main> */}
    </>
  );
}
