import React, { useEffect, useState } from 'react';
import './EditModel.css';

function EditModel({ isOpen, closeModal, editid, result, editdata }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

// It Helps To Set The Data In Modal When We Click On Edit Button
    useEffect(() => {
        if (editid) {
            const selected = result.find((item) => item._id === editid);
            if (selected) {
                setEmail(selected.email);
                setName(selected.name);
            }
        }
    }, [editid, result]);

const handleSubmit = async(e) => {
    e.preventDefault();
    await editdata(editid, { name, email });
    closeModal();
};

return (
        <>
            {isOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                        <header className="modal-header">
                            <h3>Edit Contact</h3>
                            <button className="icon-btn" onClick={closeModal} aria-label="Close">✖</button>
                        </header>

                        <form className="modal-body" onSubmit={handleSubmit}>
                            <label className="label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <label className="label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            <footer className="modal-footer">
                                <button type="button" className="btn" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn primary">
                                    Save
                                </button>
                            </footer>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}


export default EditModel