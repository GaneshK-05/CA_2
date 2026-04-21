import { useContext, useMemo } from "react";
import { AppContext } from "../context/orderContext.jsx";
import { isValidOrder } from "../utils/orderValidation";

const Stats = () => {
	const { state } = useContext(AppContext);
	const { orders, loading, error } = state;

	const stats = useMemo(() => {
		const totalOrders = orders.length;
		const validOrders = orders.filter(isValidOrder);
		const invalidOrders = totalOrders - validOrders.length;

		const revenue = validOrders.reduce((sum, order) => {
			const amount = Number(order?.totalAmount);
			return Number.isFinite(amount) ? sum + amount : sum;
		}, 0);

		const deliveredCount = validOrders.filter(
			order => String(order?.status).toLowerCase() === "delivered"
		).length;

		const avgRatingData = validOrders
			.map(order => Number(order?.rating))
			.filter(rating => Number.isFinite(rating));

		const avgRating = avgRatingData.length
			? avgRatingData.reduce((sum, rating) => sum + rating, 0) / avgRatingData.length
			: 0;

		return {
			totalOrders,
			validOrders: validOrders.length,
			invalidOrders,
			revenue,
			deliveredCount,
			avgRating
		};
	}, [orders]);

	if (loading) return <p>Loading stats...</p>;
	if (error) return <p>Unable to load stats: {error}</p>;

	return (
		<section>
			<h2>Order Statistics</h2>
			<p>Total Orders: {stats.totalOrders}</p>
			<p>Valid Orders: {stats.validOrders}</p>
			<p>Invalid Orders: {stats.invalidOrders}</p>
			<p>Total Revenue: ${stats.revenue.toFixed(2)}</p>
			<p>Delivered Orders: {stats.deliveredCount}</p>
			<p>Average Rating: {stats.avgRating.toFixed(2)}</p>
		</section>
	);
};

export default Stats;
