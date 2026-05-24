import { useSelectedStore } from "../../store/selectedStore";

export default function SelectedBar() {
    const selected = useSelectedStore(state => state.selected);

    const clearSelected = useSelectedStore(state => state.clearSelected);

    if (!selected.length) return null;

    return (
        <div className="selected-bar">
            <p>Selected: <strong>{selected.length}</strong> </p>

            <div className="selected-actions">
                <button onClick={clearSelected}>Clear All</button>
                <button>Download</button>
            </div>
        </div>
    );
}
