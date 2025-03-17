# Mailer Script

Ce projet est un script Node.js permettant d'envoyer un email à partir d'un fichier `.eml` en utilisant Nodemailer.

## Installation

Assurez-vous d'avoir **Node.js** installé sur votre machine.

1. Clonez le dépôt :
   ```sh
   git clone https://github.com/votre-utilisateur/mail.git
   cd mail
   ```

2. Installez les dépendances :
   ```sh
   npm install
   ```

## Utilisation

Exécutez le script avec le fichier `.eml` à envoyer (sans extension) :

```sh
node index.js nom_du_fichier
```

Exemple :
```sh
node index.js exemple
```

Le fichier `exemple.eml` doit être présent dans le dossier du projet.

## Dépendances

- `nodemailer`
- `dayjs`
- `mailparser`
- `fs`
- et d'autres listées dans `package.json`

## Auteurs

- **Votre Nom** - [Votre Profil GitHub](https://github.com/votre-utilisateur)

## Licence

Ce projet est sous licence ISC.

