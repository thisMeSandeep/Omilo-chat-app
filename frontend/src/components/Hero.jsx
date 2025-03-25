import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const users = [
    { src: assets.user1 },
    { src: assets.user2 },
    { src: assets.user3 },
    { src: assets.user4 },
    { src: assets.user5 },
];

const Hero = () => {
    return (
        <section className="bg-omilo-light-bg dark:bg-omilo-dark-bg py-32">
            <div className="max-w-[90%] mx-auto flex flex-col lg:flex-row items-center gap-12">

                {/* Left Content */}
                <div className="w-full lg:w-1/2 space-y-10 text-center lg:text-left">

                    {/* New Badge */}
                    <div className="flex items-center justify-center lg:justify-start gap-2 bg-gray-100 dark:bg-white/10 w-fit rounded-full px-4 py-1 text-sm">
                        <span className="bg-omilo-primary text-white rounded-full px-2">New</span>
                        <p className="font-medium text-omilo-text-primary dark:text-white">
                            Introducing Omilo v1.0
                        </p>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold dark:text-white">
                        Communication <span className="text-omilo-primary">reimagined</span>
                    </h1>

                    {/* Description */}
                    <p className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary text-lg sm:text-xl">
                        Omilo provides a seamless and elegant chat experience. Connect, collaborate,
                        and communicate with stunning simplicity worldwide.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link
                            to="/signUp"
                            className="flex items-center gap-2 bg-omilo-primary text-white rounded-md px-8 py-3 text-sm font-medium group cursor-pointer"
                        >
                            Get Started
                            <ArrowRight className="size-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
                        </Link>

                        <Link
                            to="/learn-more"
                            className="rounded-md px-8 py-3 text-sm font-medium border border-gray-200 dark:text-white dark:border-white/10 cursor-pointer"
                        >
                            Learn more
                        </Link>
                    </div>

                    {/* Avatar Group */}
                    <div className="flex flex-col lg:flex-row items-center  gap-4 justify-center lg:justify-start">
                        <div className="flex">
                            {users.map((item, index) => (
                                <img
                                    key={index}
                                    src={item.src}
                                    className="w-12 h-12 object-cover rounded-full border-2 border-white dark:border-white/10 -ml-4 first:ml-0"
                                />
                            ))}
                        </div>
                        <p className="text-sm text-omilo-text-secondary dark:text-omilo-dark-text-secondary">
                            Trusted by thousands of users worldwide
                        </p>
                    </div>

                </div>

                {/* Right Content (Image) */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <img src={assets.omilo} alt="Omilo" className="w-full max-w-md sm:max-w-lg lg:max-w-xl" />
                </div>

            </div>
        </section>
    );
};

export default Hero;
