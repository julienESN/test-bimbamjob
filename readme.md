# BimBamJob - Test Technique

## Description du projet

Production: https://testtechnique.vercel.app

![preview](https://zupimages.net/up/23/23/94a3.gif)

N'hésitez pas à me contacter pour toute question ou remarque.

Esnault Julien
julien.esnau@gmail.com

Cordialement.
/////////
Ce projet est une simulation de tondeuse à gazon automatique programmée pour tondre des surfaces rectangulaires. La tondeuse est conçue pour parcourir l'intégralité de la surface. Pour contrôler la tondeuse, on lui envoie une séquence de lettres. Les lettres possibles sont « R », « L » et « F ».

## Comment démarrer le projet

Installer les dépendances avec la commande :
npm install
Lancer le projet en mode développement avec la commande :
npm run dev

Scripts disponibles
Dans le répertoire du projet, vous pouvez exécuter :

npm run dev
Exécute l'application en mode développement. Ouvrez http://localhost:5143 pour l'afficher dans le navigateur.

npm run lint
Lance le linter sur le projet et affiche les erreurs de linting.

npm run preview
Lance l'application en mode production pour la prévisualiser.

npm run test
Lance les tests unitaires via Jest.

## Tests

Ce projet utilise Jest pour la gestion des tests unitaires. Les tests se trouvent dans le dossier **tests** à la racine de chaque module. Vous pouvez exécuter les tests avec la commande npm run test.

### Description du projet

Ce projet est une simulation de tondeuse à gazon automatique programmée pour tondre des surfaces rectangulaires. La tondeuse est conçue pour parcourir l'intégralité de la surface. Pour contrôler la tondeuse, on lui envoie une séquence de lettres. Les lettres possibles sont « R », « L » et « F ».

Comment démarrer le projet
Installer les dépendances avec la commande :
Copy code
npm install
Lancer le projet en mode développement avec la commande :
arduino
Copy code
npm run dev
Scripts disponibles
Dans le répertoire du projet, vous pouvez exécuter :

npm run dev
Exécute l'application en mode développement. Ouvrez http://localhost:3000 pour l'afficher dans le navigateur.

npm run build
Compile le projet en mode production dans le dossier build.

npm run lint
Lance le linter sur le projet et affiche les erreurs de linting.

npm run preview
Lance l'application en mode production pour la prévisualiser.

npm run test
Lance les tests unitaires via Jest.

#### Structure du projet
Ce projet utilise React et TypeScript pour la création de l'interface utilisateur et la gestion de la logique métier. Les composants React sont organisés de manière modulaire, permettant une meilleure maintenabilité et évolutivité du code.

Les principaux fichiers et dossiers sont les suivants :

App.tsx : C'est le point d'entrée de l'application. Il gère l'état global de l'application et contient le code pour la manipulation des fichiers et le traitement des instructions de la tondeuse.

Grid : Ce composant représente la grille de la tondeuse. Il reçoit la grille sous forme de tableau 2D en props et l'affiche à l'écran.

utils/directions : Ce fichier contient un objet qui gère les directions de la tondeuse.

utils/handleFile : Ce fichier contient une fonction qui gère le chargement du fichier contenant les instructions pour la tondeuse.

utils/processFile : Ce fichier contient une fonction qui traite le contenu du fichier et exécute les instructions de la tondeuse.

Avertissements
La tondeuse ne bougera pas si la position après le mouvement est en dehors de la pelouse, elle conserve son orientation et traite la commande suivante. Si une erreur survient lors du traitement du fichier ou de l'exécution des instructions, un message d'erreur sera affiché à l'utilisateur.

Énoncé du test
L'objectif de ce test est de concevoir et d'écrire un programme en JavaScript ou TypeScript utilisant ReactJs, implémentant la spécification ci-dessus et passant le test ci-après.

Le fichier .txt(data.txt) suivant est fourni :

55
44 S
LFRRFFLFRFF
22 N
FFRLLRFRLF

On attend les positions finales suivantes :
Pour la tondeuse 1 [1, 3] et orientation W
Pour la tondeuse 2 [2, 5] et orientation N
