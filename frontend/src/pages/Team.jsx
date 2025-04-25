import { useState } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Import icons from react-icons

// Team member data with image paths and descriptions
const teamMembers = [
    {
        name: 'Utsav Singhal',
        image: '/images/utsav.jpeg',
        linkedin: 'https://linkedin.com/in/UTSAVS26',
        github: 'https://github.com/UTSAVS26',
        shortDesc: 'Frontend wizard & UI lover',
        bio: 'Utsav is a passionate frontend developer with a deep appreciation for stunning interfaces and smooth user experiences. He specializes in React, TailwindCSS, and loves turning complex ideas into elegant visuals.'
    },
    {
        name: 'Nandani Daga',
        image: '/images/nandani.jpg',
        linkedin: 'https://www.linkedin.com/in/nandani-daga-493292204',
        github: 'https://github.com/Nandanidaga',
        shortDesc: 'ML enthusiast & backend brain',
        bio: 'Nandani brings ideas to life with her strong foundation in machine learning and backend engineering. Her focus on clean architecture and model optimization powers the heart of the project.'
    },
    {
        name: 'Shreya Gosavi',
        image: '/images/shreya.jpg',
        linkedin: 'https://linkedin.com/in/alicejohnson',
        github: 'https://github.com/Shreyagosavi811',
        shortDesc: 'Creative thinker & logic weaver',
        bio: 'Shreya bridges creativity and code. With her diverse problem-solving mindset, she crafts intuitive logic systems and engages in multidisciplinary brainstorming for rich user-centric features.'
    },
    {
        name: 'Ranga Kavya',
        image: '/images/kavya.jpeg',
        linkedin: 'https://www.linkedin.com/in/ranga-kavya-448480264',
        github: 'https://github.com/kavya-ux-2',
        shortDesc: 'UX-focused developer & team glue',
        bio: 'Kavya focuses on creating meaningful experiences. With a strong sense of design empathy, she ensures the app feels right to users, while fostering team collaboration through proactive support.'
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