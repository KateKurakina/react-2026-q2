import { useSelectedStore } from "../../store/selectedStore";

export default function SelectedBar() {
    const selected = useSelectedStore(state => state.selected);

    const clearSelected = useSelectedStore(state => state.clearSelected);

    if (!selected.length) return null;

    const handleDownload = () => {
        const headers = "name,description,stats,detailsUrl\n";

        const escape = (value: string) => `"${value ?? ""}"`;

        const rows = selected.map(pokemon => 
            [
                escape(pokemon.name),
                escape(pokemon.description),
                escape(pokemon.stats),
                escape(pokemon.detailsUrl),
            ].join(",")
        );

        const csv = headers + rows.join("\n");

        const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"}); //creating a Blob from a string with the type text/csv

        const url = URL.createObjectURL(blob); //creating a link to the Blob object

        const link = document.createElement("a");
        link.href = url;
        link.download = `${selected.length}_items.csv`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url); //release the memory
    };

    return (
        <div className="selected-bar">
            <p>Selected items: <strong>{selected.length}</strong> </p>

            <div className="selected-actions">
                <button onClick={clearSelected}>Clear All</button>
                <button onClick={handleDownload}>Download</button>
            </div>
        </div>
    );
}
