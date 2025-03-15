import { useState, useCallback, useContext } from "react";

const Modal = () => {
    const [modal, setModal] = useState(null);

    const openModal = useCallback(() => setModal(true));
    const closeModal = useCallback(() => setModal(false));

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        closeModal();
    };

    return (
        <div>
            {modal && 
                <div onClick={closeModal} style={{ zIndex: 100, backgroundColor: 'rgba(0,0,0,0.5)', transition: 'all 0.5s ease', position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
                    <div style={{ zIndex: 200, backgroundColor: '#fff', padding: '20px' }} onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>
                                    Name:
                                    <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Email:
                                    <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                </label>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            }
            <button onClick={openModal}>Log In</button>
        </div>
    );
};

export default Modal;