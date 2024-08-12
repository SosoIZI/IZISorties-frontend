import styles from "../styles/CGV.module.css";


    function CGV() {
      

          return (
            <div className={styles.container}>
              <h1>Conditions générales de vente</h1>
             <h4>Consultez nos conditions générales de vente pour réserver votre sortie en toute tranquillité.</h4>
              <div className={styles.article}>
                <h4 className={styles.articleTitle}> Article 1 : Objet </h4>
                <p>
                Les présentes Conditions Générales de Vente (CGV) ont pour objet de définir les droits et
obligations des utilisateurs et des professionnels utilisant le site izi-sorties.com. Le site propose
un service de découverte et de planification de sorties culturelles et de loisirs, ainsi qu’un
espace de promotion pour les professionnels du secteur.
                </p>
              </div>
           
              <div className={styles.article}>
                <h4 className={styles.articleTitle}> Article 2 : Services Proposés </h4>
                <br />

               <h5> 1. Pour les Utilisateurs Particuliers :</h5>
<br />o Accès gratuit à la recherche et la consultation des événements.
<br />
o Inscription nécessaire pour accéder à toutes les fonctionnalités.
<br />
o Possibilité de sauvegarder des événements, de créer un profil personnalisé et
d'interagir avec d'autres utilisateurs.

<p>
  <br />
<h5> 2. Pour les Professionnels :</h5>
<br />
o Options payantes pour la publication et la promotion d'événements.
<br />
o Abonnement pour la gestion de la page professionnelle et l'accès à des outils de
marketing.
<br />
o Tarification selon les options choisies (annonce à la une, annonce boostée, etc.).
                </p>
              

              <div className={styles.article}>
                <h4 className={styles.articleTitle}> Article 3 : Inscription et Compte Utilisateur </h4>
                <p>
                L’inscription sur le site est gratuite. Les utilisateurs doivent fournir des informations exactes et
les maintenir à jour. Les comptes sont strictement personnels et non transférables. izi-
sorties.com se réserve le droit de suspendre ou de supprimer tout compte en cas de non-
respect des présentes CGV.
                </p>
              </div>

              <div className={styles.article}>
                <h4 className={styles.articleTitle}> Article 4 : Tarification et Paiement </h4>
                <p>
                Les services payants pour les professionnels sont proposés sous forme d’abonnement mensuel
ou de paiement à la carte pour des services spécifiques. Les prix sont indiqués en euros et
incluent toutes les taxes applicables. Le paiement se fait en ligne via les méthodes de paiement
sécurisées disponibles sur le site.
                </p>
              </div>

              
              <div className={styles.article}>
                <h4 className={styles.articleTitle}> Article 5 : Rétractation et Remboursement </h4>
                <p>
                Conformément au Code de la consommation, les utilisateurs professionnels disposent d’un
délai de rétractation de 14 jours à compter de la souscription à un abonnement ou service
payant. Ce droit de rétractation ne s'applique pas aux services pleinement exécutés avant la fin
du délai de rétractation.
                </p>
              </div>
              <div className={styles.article}>
                <h4 className={styles.articleTitle}> Article 6 : Responsabilité </h4>
                <p>
                izi-sorties.com s'engage à fournir un service de qualité, mais ne peut être tenu responsable des
informations fournies par les organisateurs d'événements ou de tout manquement ou
annulation de ces événements. L’utilisateur est seul responsable de l'utilisation qu'il fait du
service.
                </p>
              </div>
              <div className={styles.article}>
                <h4 className={styles.articleTitle}> Article 7 : Données Personnelles </h4>
                <p>
                Les données personnelles des utilisateurs sont collectées et traitées conformément à la
politique de confidentialité du site. Les utilisateurs disposent d’un droit d'accès, de rectification
et de suppression de leurs données.
                </p>
              </div>

              <div className={styles.article}>
                <h4 className={styles.articleTitle}> Article 8 : Modification des CGV </h4>
                <p>
                izi-sorties.com se réserve le droit de modifier les présentes CGV à tout moment. Les
modifications seront notifiées aux utilisateurs via le site ou par email. En continuant d'utiliser le
site après ces modifications, les utilisateurs acceptent les nouvelles CGV.
                </p>
              </div>
              <div className={styles.article}>
                <h4 className={styles.articleTitle}>Article 9 : Droit Applicable et Litiges</h4>
                <p>
                Les présentes CGV sont régies par le droit français. Tout litige relatif à l’interprétation ou
                l’exécution des présentes sera soumis à la compétence des tribunaux français.
                </p>
              </div>



         
              </div>
  
        </div>
  


          );
        }
    
    export default CGV;