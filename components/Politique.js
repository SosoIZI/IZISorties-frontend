import styles from "../styles/Politiques.module.css";
import Link from 'next/link';

function Politique() {
  return (
    <div className={styles.container}>
      <h1>Politique de confidentialité</h1>
      <div className={styles.article}>
        <h4 className={styles.articleTitle}>Article 1 : Introduction</h4>
        <p>
          La présente Politique de Confidentialité décrit comment izi-sorties.com collecte,
          utilise, et protège les données personnelles des utilisateurs du site. Nous nous
          engageons à protéger la vie privée de nos utilisateurs et à respecter les lois
          applicables en matière de protection des données.
        </p>
      </div>

      <div className={styles.article}>
        <h4 className={styles.articleTitle}>Article 2 : Données Collectées</h4>
        <p>
          Nous collectons les données suivantes : Informations fournies par l’utilisateur : Lors
          de l’inscription, nous recueillons des informations telles que le nom, l’adresse
          email, et autres informations de profil.
        </p>
        <p>
          Données d’utilisation : Nous collectons des informations sur la manière dont vous
          utilisez notre site, y compris les pages consultées, les clics, et les événements
          sauvegardés.
        </p>
        <p>
          Données de géolocalisation : Avec votre consentement, nous pouvons collecter et
          traiter des données de localisation pour vous proposer des événements proches de vous.
        </p>
      </div>


      <div className={styles.article}>
        <h4 className={styles.articleTitle}>  Article 3 : Utilisation des Données</h4>
        <p>
    
Les données collectées sont utilisées pour :
Amélioration du service : Personnaliser l’expérience utilisateur, proposer des événements en
fonction des préférences, et améliorer la fonctionnalité du site.
Communication : Envoyer des notifications, newsletters, et autres informations pertinentes à
propos des événements et des nouveautés du site.
Marketing et publicité : Proposer des annonces ciblées et des offres personnalisées. Vous
pouvez à tout moment refuser de recevoir ces communications.
</p>
</div>

<div className={styles.article}>
        <h4 className={styles.articleTitle}>  Article 4 : Partage des Données</h4>
        <p>

izi-sorties.com ne vend pas les données personnelles des utilisateurs. Cependant, nous
pouvons partager vos informations avec :
Partenaires : Pour la gestion des services proposés, tels que le traitement des paiements ou la
diffusion d’annonces publicitaires.
Autorités légales : Si cela est requis par la loi ou pour protéger nos droits et ceux de nos
utilisateurs.
</p>
</div>


<div className={styles.article}>
        <h4 className={styles.articleTitle}> Article 5 : Sécurité des Données</h4>
        <p>

Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées
pour protéger vos données contre tout accès non autorisé, altération, divulgation ou
destruction. Cependant, aucune méthode de transmission sur Internet n'est totalement
sécurisée, et nous ne pouvons garantir la sécurité absolue de vos données.
</p>
</div>

<div className={styles.article}>
        <h4 className={styles.articleTitle}> Article 6 : Vos Droits</h4>
        <p>


Vous disposez des droits suivants concernant vos données personnelles :
Droit d’accès : Vous pouvez demander l’accès à vos données personnelles que nous détenons.
Droit de rectification : Vous avez le droit de demander la correction des données inexactes ou
incomplètes.
Droit à l’effacement : Vous pouvez demander la suppression de vos données personnelles, sous
réserve des obligations légales ou contractuelles.
Droit d’opposition : Vous pouvez vous opposer au traitement de vos données à des fins de
marketing direct.
</p>
</div>

<div className={styles.article}>
        <h4 className={styles.articleTitle}> Article 7 : Cookies</h4>
        <p>


Le site utilise des cookies pour améliorer l’expérience utilisateur. Les cookies sont de petits
fichiers texte placés sur votre appareil. Vous pouvez contrôler l'utilisation des cookies via les
paramètres de votre navigateur. Toutefois, la désactivation des cookies peut affecter le
fonctionnement de certaines parties du site.
</p>
</div>

<div className={styles.article}>
        <h4 className={styles.articleTitle}> 
        Article 8 : Modifications de la Politique de Confidentialité</h4>
        <p>


Nous pouvons modifier cette Politique de Confidentialité à tout moment. Les utilisateurs seront
informés des modifications via le site ou par email. En continuant à utiliser le site après ces
modifications, vous acceptez la nouvelle version de la Politique de Confidentialité.
</p>
</div>


<div className={styles.article}>
        <h4 className={styles.articleTitle}> 
       
Article 9 : Contact</h4>
        <p>

Pour toute question relative à cette Politique de Confidentialité ou pour exercer vos droits, vous
pouvez nous contacter à : 

<Link  href="/Contact">contact@izi-sorties.com.</Link>
</p>
</div>
</div>
  );
}

export default Politique;