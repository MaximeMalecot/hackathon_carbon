import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PrizeItem from "../../components/prize/prize-item";
import { useAuthContext } from "../../contexts/auth.context";
import { Prize } from "../../interfaces/prize";
import prizeService from "../../services/prize.service";

export default function Prizes() {
    const { reload } = useAuthContext();
    const [prizes, setPrizes] = useState<Prize[]>([]);

    const fetchPrizes = useCallback(async () => {
        try {
            const res = await prizeService.getAll();
            setPrizes(res);
        } catch (e: any) {
            console.log(e);
        }
    }, []);

    const buyPrice = useCallback(
        async (prizeId: string) => {
            try {
                const res = await prizeService.buyPrize(prizeId);
                if (res.success) {
                    toast.success("Lot obtenu avec succès !", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    reload();
                    await fetchPrizes();
                } else {
                    throw new Error(res.message);
                }
            } catch (e: any) {
                console.log(e);
                toast.error("Erreur: " + e.message);
            }
        },
        [prizes]
    );

    useEffect(() => {
        fetchPrizes();
    }, []);

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-4xl mb-5">Prix</h1>
                <Link
                    to="/transactions"
                    className="btn btn-primary text-neutral"
                >
                    Historique
                </Link>
            </div>{" "}
            {prizes.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {prizes.map((prize, index) => (
                        <PrizeItem
                            prize={prize}
                            getPrize={buyPrice}
                            key={index}
                        />
                    ))}
                </div>
            ) : (
                <p>Il n'y a actuellement aucun prix.</p>
            )}
        </div>
    );
}
