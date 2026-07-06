import TravellersList from '@/components/TravellersPage/TravellersList/TravellersList';
import css from '@/components/TravellersPage/travellersPage.module.css';
// import TitlePage from '@/components/TitlePage/TitlePage';

export default async function TravellersPage() {
  return (
    <div className={css.travellersPage}>
      <div className="container travellers-page-container">
        {/* <TitlePage title="Мандрівники" /> */}
        <TravellersList />
      </div>
    </div>
  );
}
