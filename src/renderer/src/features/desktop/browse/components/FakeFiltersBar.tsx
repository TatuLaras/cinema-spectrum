import '../styles/fake_filters_bar.scss';

export default function FakeFiltersBar() {
    return (
        <>
            <div className='search-bar placeholder'>
                <div className='search-field'></div>
            </div>
            <div className='filters-bar placeholder'>
                <div className="filters"></div>
            </div>
        </>
    );
}
