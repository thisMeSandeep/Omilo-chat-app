import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const GetStarted = () => {
    return (
        <section className='bg-omilo-light-bg dark:bg-omilo-dark-bg py-20'>
            <div className='w-[90%] mx-auto '>

                {/* heading */}
                <h1 className='mb-8 text-center text-4xl font-bold text-omilo-text-primary dark:text-white'>Ready to transform your communication?</h1>

                {/* para */}
                <p className='text-center max-w-2xl mx-auto text-lg text-omilo-text-secondary dark:text-omilo-dark-text-secondary '>Join thousands of teams using Omilo to connect, collaborate and communicate better.</p>

                <Link
                    to="/signUp"
                    className="flex items-center gap-2 bg-omilo-primary text-white rounded-md px-8 py-3 text-sm font-medium group cursor-pointer w-fit mx-auto mt-10 "
                >
                    Get Started for free
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
                </Link>

            </div>
        </section>
    )
}

export default GetStarted