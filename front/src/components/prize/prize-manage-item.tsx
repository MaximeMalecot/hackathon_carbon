import { Prize } from "../../interfaces/prize";

interface PrizeItemProps {
    prize: Prize;
    disablePrize: (prizeId: string) => Promise<void>;
}

export default function PrizeItemManage({
    prize,
    disablePrize,
}: PrizeItemProps) {
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
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
                            onClick={() => disablePrize(prize._id)}
                            className="btn btn-primary"
                        >
                            Réduire le stock à 0
                        </button>
                    ) : (
                        <button>Indisponible</button>
                    )}
                </div>
            </div>
        </div>
    );
}
