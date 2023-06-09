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
            <h1>Historique des prix</h1>
            {transactions.length < 0 ? (
                <div>
                    <p>Vous n'avez aucune transactions</p>
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
