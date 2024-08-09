import styles from "../styles/MentionsLegales.module.css";
import Link from 'next/link';

    function MentionsLegales() {
      

          return (
            <div className={styles.container}>
              <h1>Mentions Légales</h1>
              <div className={styles.article}>
                <h4 className={styles.articleTitle}>1. Éditeur du Site</h4>
                <p>
                Le site izi-sorties.com est édité par la société IZI Sorties SAS, une société par actions simplifiée
(SAS) au capital de 5000 €, dont le siège social est situé à :
Adresse : XX, 35000 Rennes, France
Téléphone : 06.09.30.49.40
Email : contact@izi-sorties.com
RCS : XX
Numéro SIRET : XX
Directrice de la publication : Sonia Neji
                </p>
              </div>
        
              <div className={styles.article}>
                <h4 className={styles.articleTitle}>2. Hébergement du Site</h4>
                <p>
                Le site izi-sorties.com est hébergé par :
Nom de l'hébergeur : [Nom de l'hébergeur]
Adresse : [Adresse complète de l'hébergeur]
Téléphone : [Numéro de téléphone de l'hébergeur]
Site web : [URL du site de l'hébergeur]
                </p>
                
              </div>
        
        
              <div className={styles.article}>
                <h4 className={styles.articleTitle}> 3. Propriété Intellectuelle</h4>
                <p>
            
                L’ensemble du contenu du site izi-sorties.com (textes, images, logos, vidéos, etc.) est protégé
par les lois françaises et internationales relatives à la propriété intellectuelle. Toute
reproduction, distribution, modification, adaptation, retransmission ou publication de ces
éléments est strictement interdite sans l’accord écrit préalable de IZI Sorties SAS.
        </p>
        </div>
        
        <div className={styles.article}>
                <h4 className={styles.articleTitle}> 4. Données Personnelles</h4>
                <p>
                Le traitement des données personnelles des utilisateurs est régi par la Politique de
Confidentialité disponible sur le site, conformément à la réglementation applicable, notamment
le Règlement Général sur la Protection des Données (RGPD).
        </p>
        </div>

        <div className={styles.article}>
                <h4 className={styles.articleTitle}> 5. Limitation de Responsabilité</h4>
                <p>
                IZI Sorties SAS met tout en œuvre pour assurer l’exactitude des informations diffusées sur le site
izi-sorties.com. Toutefois, nous ne pouvons garantir l’exactitude, la complétude ou l’actualité
des informations présentes sur le site. Par conséquent, la responsabilité de l’éditeur ne pourra
être engagée en cas d’erreur ou d’omission dans le contenu publié.
Le site peut contenir des liens vers d’autres sites externes. IZI Sorties SAS ne peut être tenue
pour responsable du contenu de ces sites tiers.
        </p>
        </div>
        <div className={styles.article}>
                <h4 className={styles.articleTitle}> 6. Cookies</h4>
                <p>
                Le site izi-sorties.com utilise des cookies pour améliorer l’expérience utilisateur. Pour plus
                d’informations sur l’utilisation des cookies, veuillez consulter notre Politique de Confidentialité.
        </p>
        </div>
        <div className={styles.article}>
                <h4 className={styles.articleTitle}> 7. Droit Applicable</h4>
                <p>
                Les présentes mentions légales sont régies par le droit français. En cas de litige, et à défaut de
                résolution amiable, les tribunaux français seront seuls compétents.
        </p>
        </div>


        <div className={styles.article}>
                <h4 className={styles.articleTitle}> 8. Contact</h4>
                <p>
                Pour toute question relative au site ou aux mentions légales, vous pouvez nous contacter à
l'adresse suivante : 
<Link  href="/Contact">contact@izi-sorties.com.</Link>

        </p>
        </div>
        </div>


          );
        }
    
    export default MentionsLegales;