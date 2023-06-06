import { useCallback, useState } from "react";

export default function ListFormation() {
    const [research, setResearch] = useState("");
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setResearch(e.target.value);
        },
        []
    );
    return (
        <div className="">
            <h1 className="text-4xl mb-5">Liste des formations</h1>
            <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-secondary input-md w-full max-w-xs"
                value={research}
                onChange={handleChange}
            />
            <section>
                <div className="card bordered">
                    <div className="card-body">
                        <h2 className="card-title">Formation 1</h2>
                    </div>
                </div>
            </section>
            <div className="join mt-5">
                <button className="join-item btn">1</button>
                <button className="join-item btn btn-active">2</button>
                <button className="join-item btn">3</button>
                <button className="join-item btn">4</button>
            </div>
        </div>
    );
}
