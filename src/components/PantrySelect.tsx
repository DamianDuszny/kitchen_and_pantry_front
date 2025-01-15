import { useState, useEffect } from "react";
import '../assets/loading.css';
import { pantry } from "../../domain/pantry.js";
import getAvailablePantryInfo from "../../request/AvailablePantryInfo";

export default function PantrySelect() {
    const [pantries, setPantries] = useState<pantry[] | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Nowy stan

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Rozpoczęcie ładowania
            try {
                const result = await getAvailablePantryInfo();
                setPantries(result);
            } catch (error) {
                console.error('Error fetching pantry data:', error);
            } finally {
                setIsLoading(false); // Koniec ładowania
            }
        };

        fetchData(); // Wywołanie funkcji fetchData
    }, []); // Pusta tablica zależności, efekt uruchomi się tylko raz

    if (isLoading) {
        return (
            <div className="loader"></div> // Wskaźnik ładowania
        );
    }

    return (
        <select className={"form-select mb-2"}>
            <option key='all' selected={true}>Wszystkie</option>
            {pantries?.map((pantry) => (
                <option key={pantry.id}>{pantry.name}</option>
            ))}
        </select>
    );
}
