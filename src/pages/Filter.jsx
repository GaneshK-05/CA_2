import { useMemo, useContext } from "react";
import { AppContext } from "../context/orderContext.jsx";
import { getInconsistentOrders } from "../utils/orderValidation";

const Filter = () => {
	const { state } = useContext(AppContext);
	const inconsistentOrders = useMemo(() => getInconsistentOrders(state.orders), [state.orders]);

	return (
		<section>
			<h2>Inconsistent Orders</h2>
			<p>Total inconsistent: {inconsistentOrders.length}</p>

			{inconsistentOrders.length === 0 ? (
				<p>All orders are consistent.</p>
			) : (
				inconsistentOrders.map(({ order, reasons }, index) => (
					<article
						key={order?.orderID || `invalid-${index}`}
						style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "12px" }}
					>
						<h3>Order: {order?.orderID || "N/A"}</h3>
						<ul>
							{reasons.map(reason => (
								<li key={reason}>{reason}</li>
							))}
						</ul>
					</article>
				))
			)}
		</section>
	);
};

export default Filter;
