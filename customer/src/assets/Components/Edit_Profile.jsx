import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Edit_Profile() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    
    const [formData, setFormData] = useState({
        username: currentUser.username || '',
        phone: currentUser.phone || '',
        email: currentUser.email || `${(currentUser.username || 'user').toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        address: currentUser.address || 'Gingoog City, Misamis Oriental',
        avatar: currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.username || 'User')}&background=67bc45&color=fff&size=128`
    });

    const [isSaving, setIsSaving] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        setIsSaving(true);

        // Update current user in localStorage
        const updatedUser = { ...currentUser, ...formData };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // Update users list in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map(u => u.phone === currentUser.phone ? { ...u, ...formData } : u);
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        setTimeout(() => {
            setIsSaving(false);
            setShowOverlay(true);
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#f4f7f6] font-body flex flex-col">
            <Navbar />

            <div className="flex-1 max-w-[800px] mx-auto w-full px-4 md:px-10 py-10">
                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-gray-100">
                    <div className="flex items-center justify-between mb-10">
                        <h1 className="text-3xl font-black text-black uppercase tracking-tighter font-serif">Edit Profile</h1>
                        <button onClick={() => navigate('/profile')} className="text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors">Cancel</button>
                    </div>

                    <form onSubmit={handleSave} className="space-y-8">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center mb-10">
                            <div className="relative group">
                                <img src={formData.avatar} alt="Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-[#67bc45] p-1 shadow-lg" />
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">Change Profile Picture</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-[#67bc45] uppercase tracking-widest ml-1">Display Name</label>
                                <input 
                                    type="text" 
                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                    className="w-full h-14 px-6 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-[#67bc45] font-bold text-gray-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-[#67bc45] uppercase tracking-widest ml-1">Phone Number</label>
                                <input 
                                    type="text" 
                                    value={formData.phone}
                                    readOnly
                                    className="w-full h-14 px-6 bg-gray-100 rounded-2xl border border-gray-100 text-gray-400 font-bold cursor-not-allowed"
                                />
                                <p className="text-[9px] text-gray-400 font-bold ml-2 italic">Phone number cannot be changed</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[#67bc45] uppercase tracking-widest ml-1">Email Address</label>
                            <input 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full h-14 px-6 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-[#67bc45] font-bold text-gray-800"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[#67bc45] uppercase tracking-widest ml-1">Home Address</label>
                            <textarea 
                                rows="3"
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                className="w-full p-6 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-[#67bc45] font-bold text-gray-800 resize-none"
                            ></textarea>
                        </div>

                        <div className="pt-6">
                            <button 
                                type="submit"
                                disabled={isSaving}
                                className={`w-full py-5 bg-[#1a4724] hover:bg-[#143c1f] text-white font-black text-sm rounded-2xl transition-all shadow-xl uppercase tracking-widest flex items-center justify-center gap-3 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Saving Changes...
                                    </>
                                ) : 'Save Profile Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Success Overlay */}
            {showOverlay && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[40px] p-10 md:p-16 max-w-sm w-full text-center shadow-2xl">
                        <div className="w-20 h-20 bg-[#def4d4] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <svg className="w-10 h-10 text-[#1a4724]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h2 className="text-2xl font-black text-black mb-2 uppercase tracking-tighter">Profile Updated!</h2>
                        <p className="text-gray-500 font-bold text-sm">Your information has been saved successfully.</p>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
