import '../styles/rating.scss';

type Props = {
    voteAverage: number | undefined;
};

export default function Rating({ voteAverage }: Props) {
    return (
        voteAverage && (
            <div className='rating'>
                <div className='score'>{voteAverage.toFixed(1)}</div>
                <div className='outof'>/ 10</div>
            </div>
        )
    );
}
