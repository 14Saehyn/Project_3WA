import {Fragment} from "react";
import {NavLink} from "react-router-dom";

const Home = () => {
  return (
    <Fragment>
      <div className="home-container">
        <h1 className="home-title">Fureneshi</h1>
        <h2 className="home-title_h2">Vivez des émotions intenses avec nos mangas en boutique !</h2>
      </div>
      <div className="content-wrapper">
        <section className="about-section">
          <h2 className="about-title">Qui sommes-nous ?</h2>
          <div className="about-content">
            <div className="about-image-container">
              <img src="/img/home/fureneshi-identity.jpg" alt="Description de Fureneshi" className="about-image"/>
            </div>
            <div className="about-text-container">
              <p>
                Bienvenue chez Fureneshi, votre nouvelle destination manga préférée à Nantes ! Inspiré par le mot "Frénésie", Fureneshi est le lieu incontournable pour tous les fans de mangas qui souhaitent vivre une expérience unique et passionnée autour de la culture japonaise.
              </p>
              <p>
                Fureneshi, c'est avant tout un magasin de mangas qui propose un vaste choix d'œuvres allant des classiques aux nouveautés, en passant par les séries phares du moment. Notre équipe de passionnés est là pour vous conseiller et vous guider dans vos choix, afin de vous faire découvrir de nouvelles pépites du 9e art nippon.
              </p>
              <p>
                Notre boutique est également dotée d'une plateforme en ligne qui vous permet de réserver vos mangas préférés en quelques clics. Vous n'avez qu'à naviguer sur notre site, sélectionner vos titres et passer votre commande. Une fois votre réservation effectuée, vous pourrez venir récupérer vos mangas en magasin, dans les plus brefs délais.
              </p>
              <p>
                Mais Fureneshi, c'est bien plus qu'un simple magasin ! Nous avons aménagé un salon de lecture cosy et chaleureux, où vous pourrez vous détendre avec un bon manga tout en savourant une tasse de café, de lait ou en grignotant quelques biscuits. Dans cet espace, vous pourrez vous évader dans l'univers captivant des mangas, seul ou entre amis, en profitant d'une ambiance agréable et conviviale.
              </p>
              <p>
                Alors, n'attendez plus ! Rejoignez-nous chez Fureneshi à Nantes et vivez une véritable frénésie manga ! À très bientôt pour de nouvelles aventures passionnantes et gourmandes dans notre univers dédié à la culture japonaise et aux mangas.
              </p>
              <NavLink to="/collections">
              <button className="about-button">Voir nos collections</button>
              </NavLink>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Home;
