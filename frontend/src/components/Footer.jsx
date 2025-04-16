import React from 'react';

function Footer() {
    return (
        <footer className="bg-slate-800 text-center text-white py-4 mt-8">
            <div>
                <p>&copy; 2025 GroqSight. All rights reserved.</p>
            </div>
            <div className="mt-2">
                <a href="/about" className="text-white hover:text-blue-400">
                    About
                </a>
                {' | '}
                <a href="/contact" className="text-white hover:text-blue-400">
                    Contact
                </a>
                {' | '}
                <a href="/privacy-policy" className="text-white hover:text-blue-400">
                    Privacy Policy
                </a>
            </div>
        </footer>
    );
}

export default Footer;