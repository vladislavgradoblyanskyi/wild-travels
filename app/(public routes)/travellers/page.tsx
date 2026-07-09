import TravellersList from '@/components/TravellersPage/TravellersList/TravellersList';
import css from './Page.module.css';
import { PageTitle } from '@/components/UI/PageTitle/PageTitle';

export default async function TravellersPage() {
  return (
    <div className={css.travellersPage}>
      <div className="container travellers-page-container">
        <PageTitle className={css.pageTitleTravellers}>Мандрівники</PageTitle>
        <TravellersList />
      </div>
    </div>
  );
}
