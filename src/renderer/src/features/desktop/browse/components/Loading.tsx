import FakeFiltersBar from './FakeFiltersBar';
import FakeMediaCard from './FakeMediaCard';

export default function Loading() {
    const numCards = 28;
    return (
        <>
            <FakeFiltersBar />
            <div className='browse-content'>
                {Array(numCards)
                    .fill(null)
                    .map((_, i: number) => (
                        <FakeMediaCard key={i} animationDelay={Math.random() * (-2000)} />
                    ))}
            </div>
        </>
    );
}
