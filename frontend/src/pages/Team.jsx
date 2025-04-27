import { useState } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Import icons from react-icons

// Team member data with image paths and descriptions
const teamMembers = [
    {
        name: 'Utsav Singhal',
        image: '/images/utsav.jpeg',
        linkedin: 'https://linkedin.com/in/UTSAVS26',
        github: 'https://github.com/UTSAVS26',
        shortDesc: 'Team Lead & AI/ML enthusiast focused on innovative solutions',
        bio: 'Utsav is an AI and ML enthusiast with a deep passion for both frontend and backend development. With a strong background in deep learning, machine learning, Python, NLP, and computer vision, he focuses on creating innovative solutions. His expertise spans various technologies, including Python, React, and Node.js. Utsav enjoys tackling challenging problems and loves turning complex concepts into seamless user experiences. He is driven by curiosity and thrives in fast-paced environments. Outside of development, he keeps up-to-date with advancements in AI and technology. Utsav is committed to building impactful, scalable, and intelligent systems. His love for learning and experimenting with new tools keeps him at the forefront of technological innovation. His goal is to bring the latest breakthroughs in AI and ML to real-world applications, making a tangible impact on society.'
    },
    {
        name: 'Nandani Daga',
        image: '/images/nandani.jpg',
        linkedin: 'https://www.linkedin.com/in/nandani-daga-493292204',
        github: 'https://github.com/Nandanidaga',
        shortDesc: 'ML enthusiast & backend brain',
        bio: 'Nandani is a tech enthusiast with a strong passion for machine learning, deep learning, and backend engineering. Her work focuses on designing efficient algorithms and optimizing system architecture for performance. With a deep understanding of data-driven solutions, she develops models that power intelligent applications. Nandani is well-versed in various machine learning libraries and frameworks, including TensorFlow, PyTorch, and scikit-learn. She believes that clean code and well-structured systems are essential for building scalable and maintainable solutions. Beyond her technical skills, Nandani is an advocate for ethical AI and works towards building responsible and inclusive technologies. She actively participates in tech communities and loves sharing her knowledge with others. Her goal is to contribute to cutting-edge advancements in AI while ensuring that solutions are practical and sustainable. Nandani’s passion for backend development enables her to build solid foundations for AI systems.'
    },
    {
        name: 'Shreya Gosavi',
        image: '/images/shreya.jpg',
        linkedin: 'https://linkedin.com/in/alicejohnson',
        github: 'https://github.com/Shreyagosavi811',
        shortDesc: 'Creative thinker & logic weaver',
        bio: 'Shreya is a passionate and curious developer, committed to creating impactful, user-friendly solutions through technology and innovation. With a background in both front-end and back-end development, she believes in the power of technology to create a positive change. Shreya enjoys solving complex problems through logical and creative thinking, often blending art with code. Her expertise spans JavaScript, React, and Node.js, and she is always exploring new ways to improve user experiences. Shreya is an advocate for clean code and efficient software practices, constantly refining her skills to stay ahead in the ever-changing tech landscape. She enjoys collaborating with teams, bringing fresh ideas to the table, and working together to deliver high-quality solutions. Her love for coding is matched by her passion for continuous learning and growth in the tech space. Shreya thrives in environments that encourage experimentation and embraces the challenge of building systems that are both scalable and intuitive. Ultimately, she aims to make a meaningful impact by creating products that delight users and push the boundaries of innovation.'
    },
    {
        name: 'Ranga Kavya',
        image: '/images/kavya.jpeg',
        linkedin: 'https://www.linkedin.com/in/ranga-kavya-448480264',
        github: 'https://github.com/kavya-ux-2',
        shortDesc: 'UX-focused developer & team glue',
        bio: 'Kavya is a passionate tech enthusiast, driven by a deep curiosity to innovate and learn. She has a keen interest in backend development, product management, blockchain technology, and marketing automation. With a background in UX design and front-end development, she seamlessly integrates user experience principles into technical solutions. Her goal is to create products that are both aesthetically pleasing and functionally robust. Kavya’s design-thinking approach ensures that user needs are always at the forefront of every project. She is dedicated to building products that are not only intuitive and engaging but also sustainable and scalable. Kavya believes that strong communication and collaboration are key to creating successful products, and she works closely with cross-functional teams to bring ideas to life. Her technical expertise, combined with her focus on user-centric design, enables her to bridge the gap between creativity and functionality. Kavya is also passionate about learning new technologies and staying updated with the latest trends in the tech industry. She envisions a future where technology empowers individuals and drives meaningful change.'
    }
];

function Team() {
    const [selectedMember, setSelectedMember] = useState(null);

    const handleCardClick = (member) => {
        setSelectedMember(member);
    };

    const handleBackClick = () => {
        setSelectedMember(null);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white py-12">
            <h1 className="text-3xl text-center mb-8">Meet Our Team</h1>

            {selectedMember ? (
                <div className="relative max-w-3xl mx-auto bg-slate-800 p-6 rounded-lg shadow-lg">
                    <div className="text-center">
                        <img src={selectedMember.image} alt={selectedMember.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold mb-4">{selectedMember.name}</h2>
                        <p className="text-lg text-gray-400 mb-4">{selectedMember.role}</p>
                        <p className="text-lg mb-4">{selectedMember.bio}</p>
                        <div className="flex gap-4 mb-6 justify-center">
                            <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                <FaLinkedin size={24} />
                            </a>
                            <a href={selectedMember.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                <FaGithub size={24} />
                            </a>
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teamMembers
                            .filter(member => member !== selectedMember)
                            .map((member, index) => (
                                <div
                                    key={index}
                                    className="team-card bg-slate-700 rounded-lg overflow-hidden relative cursor-pointer"
                                    onClick={() => handleCardClick(member)}
                                >
                                    <div className="absolute inset-0 bg-black bg-opacity-40 transition-all duration-300 opacity-0 hover:opacity-100"></div>
                                    <div className="relative p-6">
                                        <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold">{member.name}</h3>
                                        <p className="text-gray-400 text-sm italic">{member.shortDesc}</p>
                                        <div className="mt-4 flex gap-4 justify-center">
                                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                                <FaLinkedin size={20} />
                                            </a>
                                            <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                                <FaGithub size={20} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="absolute top-4 right-4">
                        <button onClick={handleBackClick} className="text-blue-400 hover:text-blue-600">Back to Team</button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto"> {/* 2x2 grid */}
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="team-card bg-slate-700 rounded-lg overflow-hidden relative cursor-pointer"
                            onClick={() => handleCardClick(member)}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-40 transition-all duration-300 opacity-0 hover:opacity-100"></div>
                            <div className="relative p-6"> {/* Increased padding */}
                                <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-center">{member.name}</h3> {/* Centered name */}
                                <p className="text-gray-400 text-sm italic text-center mb-4">{member.shortDesc}</p> {/* Centered description */}
                                <div className="mt-4 flex gap-4 justify-center">
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                        <FaLinkedin size={20} />
                                    </a>
                                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                        <FaGithub size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Team;