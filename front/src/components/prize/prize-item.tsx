import { Prize } from "../../interfaces/prize";

interface PrizeItemProps {
    prize: Prize;
    getPrize: (prizeId: string) => Promise<void>;
}

export default function PrizeItem({ prize, getPrize }: PrizeItemProps) {
    return (
        <div className="card card-compact w-30 lg:w-96 bg-base-100 shadow-xl">
            <figure>
                <img src={prize.image} alt="Prize image" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{prize.name}</h2>
                <p>{prize.description}</p>
                {prize.quantity > 0 && <p>{prize.quantity} disponibles</p>}
                <div className="card-actions justify-end">
                    {prize.quantity > 0 ? (
                        <button
                            onClick={() => getPrize(prize._id)}
                            className="btn btn-primary"
                        >
                            Obtenir pour {prize.price} points
                        </button>
                    ) : (
                        <button>Indisponible</button>
                    )}
                </div>
            </div>
        </div>
    );
}
