import { useState, useEffect } from "react";
import '../assets/loading.css';
import { pantry } from "../../domain/pantry.js";
import getAvailablePantryInfo from "../../request/AvailablePantryInfo";

export interface pantrySelectPros {
    pantrySelectCallback: ((arg: number) => void) | null;
    selectedPantryId: number
}

export function PantrySelect({pantrySelectCallback, selectedPantryId} : pantrySelectPros) {
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

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="loader"></div>
        );
    }

    return (
        <>
            <label htmlFor={'pantrySelect'}>
                Wybierz spiżarnie:
            </label>
            <select
                className={"form-select mb-2"}
                onChange={(e) => pantrySelectCallback(Number(e.target.value))}
                id={'pantrySelect'}
            >
                <option value="0" key="0" selected={selectedPantryId == 0}>Wszystkie</option>
                {pantries?.map((pantry) => (
                    <option value={pantry.id} key={pantry.id} selected={selectedPantryId == pantry.id}>{pantry.name}</option>
                ))}
            </select>
        </>
    );
}
