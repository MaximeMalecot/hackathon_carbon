import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PrizeItemManage from "../../components/prize/prize-manage-item";
import { useAuthContext } from "../../contexts/auth.context";
import { Prize } from "../../interfaces/prize";
import prizeService from "../../services/prize.service";

export default function ManagePrizes() {
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

    const disablePrize = useCallback(async (prizeId: string) => {
        try {
            const res = await prizeService.clearStock(prizeId);
            if (res) {
                toast.success("Stock du prix réduit à 0 !");
                reload();
                await fetchPrizes();
            } else {
                throw new Error("Impossible de réduire le stock à 0");
            }
        } catch (e: any) {
            console.log(e);
            toast.error("Erreur: " + e.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }, []);

    useEffect(() => {
        fetchPrizes();
    }, []);

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-4xl mb-5">Prix</h1>
                <Link
                    to="/gestion-prizes/create"
                    className="btn btn-primary text-neutral"
                >
                    Créer un prix
                </Link>
            </div>
            {prizes.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {prizes.map((prize, index) => (
                        <PrizeItemManage
                            prize={prize}
                            disablePrize={disablePrize}
                            key={index}
                        />
                    ))}
                </div>
            ) : (
                <p>Il n'y a actuellement aucun prix échangeable.</p>
            )}
        </div>
    );
}
