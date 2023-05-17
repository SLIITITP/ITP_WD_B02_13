import React from "react";

export default function Home(){
	return (
		<>
			<div>
                <br /> <br /> <br /> 
				<section className="relative bg-blueGray-50">
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
					<footer className="relative pt-8 pb-6 mt-1">
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
					</footer>
				</section>
			</div>
		</>
	);
};


