import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Team', path: '/team' },
        { name: 'Contact', path: '/contact' },
        { name: 'Demo', path: '/demo' },
    ];

    const handleNavClick = (path) => {
        setActiveSection(path);
        console.log(`Navigating to ${path}`);
    };

    return (
        <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur shadow-lg py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" onClick={() => handleNavClick('/')} className="flex items-center gap-2">
                    {/* Left and Right Eye Logos */}
                    <div className="flex gap-1">
                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-black"></div>
                        </div>
                        <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-black"></div>
                        </div>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
                        GroqSight
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => handleNavClick(link.path)}
                            className={`relative font-medium transition-colors hover:text-blue-400 ${activeSection === link.path ? 'text-blue-400' : 'text-gray-200'}`}
                        >
                            {link.name}
                            {activeSection === link.path && (
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-amber-500" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;