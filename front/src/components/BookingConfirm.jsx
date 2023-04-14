import {Fragment} from "react"

const BookingConfirm = () => {
    return (
        <Fragment>
            <div className="header-container">
                <h1 className="header-title">Merci !</h1>
            </div>
            <div className="content-wrapper_header booking-confirm">
            <p>Votre réservation a bien été enregitrée.</p>
            <p>Vous avez un délai d'un mois pour payer et récupérer votre produit, atteint la limite vous serez obligé(e) de faire une nouvelle réservation.</p>
            </div>
        </Fragment>
    )
}

export default BookingConfirm