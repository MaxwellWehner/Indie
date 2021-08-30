const GameCarousel = ({ games }) => {
	return (
		<div>
			{games.map((gameId) => (
				<div key={gameId}>{gameId}</div>
			))}
		</div>
	);
};

export default GameCarousel;
