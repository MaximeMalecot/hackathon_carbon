import { useCallback, useEffect, useState } from "react";
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
                toast.success("Stock du prix réduit à 0 !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
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
            <h1 className={"text-xl"}>Prizes</h1>
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
                <p>There is no prize</p>
            )}
        </div>
    );
}
