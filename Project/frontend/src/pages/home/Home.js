import React from "react";
import shirt1Icon from "../stockimg/shirt1.jpg"

export default function Home(){
	return (
		<>
			<div>
                <br /> <br /> <br /> 
				<section className="relative bg-blueGray-50" style={{backgroundColor:"white"}}>
					<div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
						<div
							className="absolute top-0 w-full h-full bg-center bg-cover"
							style={{
								backgroundImage:
									"url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1267&amp;q=80')",
							}}
						>
							<span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>
						</div>
						<div className="container relative mx-auto">
							<div className="items-center flex flex-wrap">
								<div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
									<div className="pr-12">
										<h1 className="text-white font-semibold text-5xl">Your story starts with us.</h1>
										<p className="mt-4 text-lg text-blueGray-200">
											This is a simple example of a Landing Page you can build using Notus JS. It features multiple CSS
											components based on the Tailwind CSS design system.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div
							className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
							style={{ transform: "translateZ(0px)" }}
						>
							<svg
								className="absolute bottom-0 overflow-hidden"
								xmlns="http://www.w3.org/2000/svg"
								preserveAspectRatio="none"
								version="1.1"
								viewBox="0 0 2560 100"
								x="0"
								y="0"
							>
								<polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
							</svg>
						</div>
					</div>
				</section>

				<section className="pb-10 bg-blueGray-200 -mt-24">
					<div className="container mx-auto px-4">
						<div className="flex flex-wrap">
							<div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
								<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
									<div className="px-4 py-5 flex-auto">
										<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
											<i className="fas fa-award"></i>
										</div>
										<h6 className="text-xl font-semibold">Awarded Agency</h6>
										<p className="mt-2 mb-4 text-blueGray-500">
											Divide details about your product or agency work into parts. A paragraph describing a feature will
											be enough.
										</p>
									</div>
								</div>
							</div>
							<div className="w-full md:w-4/12 px-4 text-center">
								<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
									<div className="px-4 py-5 flex-auto">
										<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
											<i className="fas fa-retweet"></i>
										</div>
										<h6 className="text-xl font-semibold">Free Revisions</h6>
										<p className="mt-2 mb-4 text-blueGray-500">
											Keep you user engaged by providing meaningful information. Remember that by this time, the user is
											curious.
										</p>
									</div>
								</div>
							</div>
							<div className="pt-6 w-full md:w-4/12 px-4 text-center">
								<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
									<div className="px-4 py-5 flex-auto">
										<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
											<i className="fas fa-fingerprint"></i>
										</div>
										<h6 className="text-xl font-semibold">Verified Company</h6>
										<p className="mt-2 mb-4 text-blueGray-500">
											Write a few lines about each one. A paragraph describing a feature will be enough. Keep you user
											engaged!
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <footer className="relative pt-8 pb-6 mt-1">
						<div className="container mx-auto px-4">
							<div className="flex flex-wrap items-center md:justify-between justify-center">
								<div className="w-full md:w-6/12 px-4 mx-auto text-center">
									<div className="text-sm text-blueGray-500 font-semibold py-1">
										Made with{" "}
										<a
											href="https://www.creative-tim.com/product/notus-js"
											className="text-blueGray-500 hover:text-gray-800"
											target="_blank"
											rel="noopener noreferrer"
										>
											Notus JS
										</a>{" "}
										by{" "}
										<a
											href="https://www.creative-tim.com"
											className="text-blueGray-500 hover:text-blueGray-800"
											target="_blank"
											rel="noopener noreferrer"
										>
											Creative Tim
										</a>
										.
									</div>
								</div>
							</div>
						</div>
					</footer> */}
				</section>
			</div>
			<div className="text-gray-900 pt-12 pr-0 pb-14 pl-0 bg-white">
      <div className="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16 max-w-7xl">
        <div className="flex flex-col items-center sm:px-5 md:flex-row">
          <div className="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 md:w-1/2">
            <div className="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16 md:space-y-5">
              <div className="bg-green-500 flex items-center leading-none rounded-full text-gray-50 pt-1.5 pr-3 pb-1.5 pl-2 uppercase inline-block">
                <p className="inline">
                  <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </p>
                <p className="inline text-xs font-medium">New</p>
              </div>
              <a className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl">Write anything. Be creative.</a>
              <div className="pt-2 pr-0 pb-0 pl-0">
                <p className="text-sm font-medium inline">author:</p>
                <a className="inline text-sm font-medium mt-0 mr-1 mb-0 ml-1 underline">Jack Sparrow</a>
                <p className="inline text-sm font-medium mt-0 mr-1 mb-0 ml-1">· 23rd, April 2021 ·</p>
                <p className="text-gray-200 text-sm font-medium inline mt-0 mr-1 mb-0 ml-1">1hr 20min. read</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="block">
              <img src="https://images.unsplash.com/photo-1626314928277-1d373ddb6428?ixlib=rb-1.2.1&amp;ixid=%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" className="object-cover rounded-lg max-h-64 sm:max-h-96 btn- w-full h-full" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16">
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
            <img src="https://images.unsplash.com/photo-1626318305863-bb23d0297c0b?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56 btn-" />
            <p className="bg-green-500 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase inline-block">Entertainment</p>
            <a className="text-lg font-bold sm:text-xl md:text-2xl">Improving your day to the MAX</a>
            <p className="text-sm text-black">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
            <div className="pt-2 pr-0 pb-0 pl-0">
              <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Jack Sparrow</a>
              <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 23rd, March 2021 ·</p>
              <p className="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min. read</p>
            </div>
          </div>
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
            <img src="https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56 btn-" />
            <p className="bg-green-500 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase inline-block">Entertainment</p>
            <a className="text-lg font-bold sm:text-xl md:text-2xl">Improving your day to the MAX</a>
            <p className="text-sm text-black">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
            <div className="pt-2 pr-0 pb-0 pl-0">
              <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Jack Sparrow</a>
              <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 23rd, March 2021 ·</p>
              <p className="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min. read</p>
            </div>
          </div>
          <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4">
            <img src="https://images.unsplash.com/photo-1626197031507-c17099753214?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzR8fHxlbnwwfHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56 btn-" />
            <p className="bg-green-500 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase inline-block">Entertainment</p>
            <a className="text-lg font-bold sm:text-xl md:text-2xl">Improving your day to the MAX</a>
            <p className="text-sm text-black">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
            <div className="pt-2 pr-0 pb-0 pl-0">
              <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Jack Sparrow</a>
              <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 23rd, March 2021 ·</p>
              <p className="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min. read</p>
            </div>
          </div>
        </div>
      </div>
</div>
</>
	);
};


