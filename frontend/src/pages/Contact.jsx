import React, { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for reaching out! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section
            className="min-h-screen flex flex-col items-center justify-center text-white p-6 bg-cover bg-center"
            style={{
                backgroundImage: "url('https://source.unsplash.com/1600x900/?technology,abstract')",
            }}
        >
            <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-400">
                    Get in Touch
                </h1>
                <p className="text-center text-gray-300 mb-8">
                    Have questions or feedback? We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your Message"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white py-3 rounded-lg font-medium transition duration-300 transform hover:scale-105"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Contact;
