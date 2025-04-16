import { useState } from 'react';

// Dummy images
const teamImages = [
    'https://via.placeholder.com/150/0000FF/808080?Text=JohnDoe',
    'https://via.placeholder.com/150/FF6347/FFFFFF?Text=JaneSmith',
    'https://via.placeholder.com/150/228B22/FFFFFF?Text=AliceJohnson',
    'https://via.placeholder.com/150/FFD700/FFFFFF?Text=BobBrown'
];

// Dummy data for team members
const teamMembers = [
    {
        name: 'John Doe',
        role: 'Software Engineer',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        bio: 'John has 5+ years of experience in full-stack development and is passionate about AI.',
        moreDetails: 'John worked on several projects in AI and software development. He contributed to large-scale distributed systems.'
    },
    {
        name: 'Jane Smith',
        role: 'Product Manager',
        linkedin: 'https://linkedin.com/in/janesmith',
        github: 'https://github.com/janesmith',
        bio: 'Jane has a strong background in product design and management.',
        moreDetails: 'Jane has led product teams in various domains, including SaaS and mobile applications.'
    },
    {
        name: 'Alice Johnson',
        role: 'UX/UI Designer',
        linkedin: 'https://linkedin.com/in/alicejohnson',
        github: 'https://github.com/alicejohnson',
        bio: 'Alice specializes in creating intuitive user interfaces and engaging user experiences.',
        moreDetails: 'Alice has worked with multiple companies in the e-commerce and education sectors.'
    },
    {
        name: 'Bob Brown',
        role: 'Backend Developer',
        linkedin: 'https://linkedin.com/in/bobbrown',
        github: 'https://github.com/bobbrown',
        bio: 'Bob focuses on building scalable and secure backend systems.',
        moreDetails: 'Bob has expertise in cloud technologies, databases, and API development.'
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
                    {/* Selected member details */}
                    <div className="text-center">
                        <img src={teamImages[teamMembers.indexOf(selectedMember)]} alt={selectedMember.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold mb-4">{selectedMember.name}</h2>
                        <p className="text-lg text-gray-400 mb-4">{selectedMember.role}</p>
                        <p className="text-lg mb-4">{selectedMember.bio}</p>
                        <div className="flex gap-4 mb-6 justify-center">
                            <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">LinkedIn</a>
                            <a href={selectedMember.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">GitHub</a>
                        </div>
                        <p className="text-gray-300">{selectedMember.moreDetails}</p>
                    </div>

                    {/* Other members in 1x3 format */}
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
                                        <img src={teamImages[teamMembers.indexOf(member)]} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold">{member.name}</h3>
                                        <p className="text-gray-400">{member.role}</p>
                                        <div className="mt-4 flex gap-4 justify-center">
                                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">LinkedIn</a>
                                            <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">GitHub</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* Back to team button */}
                    <div className="absolute top-4 right-4">
                        <button onClick={handleBackClick} className="text-blue-400 hover:text-blue-600">Back to Team</button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="team-card bg-slate-700 rounded-lg overflow-hidden relative cursor-pointer"
                            onClick={() => handleCardClick(member)}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-40 transition-all duration-300 opacity-0 hover:opacity-100"></div>
                            <div className="relative p-6">
                                <img src={teamImages[index]} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-gray-400">{member.role}</p>
                                <div className="mt-4 flex gap-4 justify-center">
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">LinkedIn</a>
                                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">GitHub</a>
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