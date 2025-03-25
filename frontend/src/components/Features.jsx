import { MessageCircle, MessageSquare, User, Users } from 'lucide-react';

const features = [
    {
        icon: MessageCircle,
        title: "Real-time Messaging",
        description: "Send and receive messages instantly with our powerful real-time engine.",
        delay: "0s"
    },
    {
        icon: Users,
        title: "Personalised Communication",
        description: "One-to-one chat, channels, and groups to organize your conversations.",
        delay: "0.2s"
    },
    {
        icon: MessageSquare,
        title: "Rich Media Support",
        description: "Share images, videos, files, and more with intuitive interfaces.",
        delay: "0.4s"
    },
    {
        icon: User,
        title: "Personalized Experience",
        description: "Customize your interface and notifications to match your workflow.",
        delay: "0.6s"
    }
];


const Features = () => {
    return (
        <section className='bg-[#F3F6F9] dark:bg-[#162033] py-20'>
            <div className='w-[90%] mx-auto '>

                {/* heading */}
                <h1 className='mb-8 text-center text-3xl md:text-4xl font-bold text-omilo-text-primary dark:text-white'>Designed for <span className='text-omilo-primary'>modern communication</span></h1>

                {/* para */}
                <p className='text-center max-w-2xl mx-auto text-lg text-omilo-text-secondary dark:text-omilo-dark-text-secondary '>Omilo combines beautiful design with powerful features to create the perfect communication platform.</p>

                {/*feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-[#0F1729]  rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-[#111F3C] flex items-center justify-center mb-4">
                                <feature.icon className="h-6 w-6 text-omilo-primary" />
                            </div>
                            <h3 className="text-xl dark:text-white font-semibold mb-2">{feature.title}</h3>
                            <p className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary">{feature.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Features