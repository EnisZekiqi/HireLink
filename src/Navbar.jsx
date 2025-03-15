import Modal from "./Modal";
import { useState, useEffect, useMemo, useCallback } from "react";

const Navbar = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch("./data/json")
            .then(response => response.json())
            .then(json => {
                setUsers(json);
                setLoading(false);
            });
    }, []);

    const handleSearch = useCallback((e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    }, []);

    const filteredResults = useMemo(() => {
        if (!searchQuery) {
            return [];
        }

        return users
            .map((item) => {
                const mainMatch = item.label.toLowerCase().includes(searchQuery);

                const subMatches =
                    item.more?.filter((sub) =>
                        Object.values(sub)
                            .join(" ")
                            .toLowerCase()
                            .includes(searchQuery)
                    ) || [];

                if (mainMatch && subMatches.length === 0) {
                    return { ...item, more: item.more || [] };
                }

                if (subMatches.length > 0) {
                    return { ...item, more: subMatches };
                }

                return null;
            })
            .filter(Boolean);
    }, [searchQuery, users]);

    useEffect(() => {
        setSearchResults(filteredResults);
    }, [filteredResults]);

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", padding: '6px' }}>
                <input type="text" value={searchQuery} onChange={handleSearch} className="border border-[#000]" />
                {searchResults.length < 0 ? 'Please Type something' :(
                    <div>
                        {searchResults.map((search) => (
                            <div key={search}>
                                <p>{search.username}</p>
                            </div>
                        ))}
                
                    </div>
                )
                
                }
            </div>
        </div>
    );
};

export default Navbar;