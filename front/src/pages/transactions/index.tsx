import { useCallback, useEffect, useState } from "react";
import { Transaction } from "../../interfaces/transaction";
import prizeService from "../../services/prize.service";

export default function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const getTransactions = useCallback(async () => {
        try {
            const res = await prizeService.getSelfTransactions();
            setTransactions(res);
        } catch (e: any) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-4xl mb-5">Historique d'échange de prix</h1>
            </div>{" "}
            {transactions.length < 1 ? (
                <div>
                    <p>Aucun échange trouvé.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Prix</th>
                                <th>Points dépensés</th>
                                <th>Date de la transaction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr className="hover" key={index}>
                                    <th>
                                        <div className="avatar">
                                            <div className="w-24 rounded">
                                                <img
                                                    src={
                                                        transaction.prize.image
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        {transaction.prize.name} |
                                        {transaction.prize.price} pts
                                    </th>
                                    <th>{transaction.price} points</th>
                                    <th>
                                        {new Date(
                                            transaction.createdAt
                                        ).toLocaleDateString()}
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
