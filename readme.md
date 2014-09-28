
Implementation du proxy pour les webservices du site jsontest.com

curl ip.jsontest.com
curl headers.jsontest.com
curl echo.jsontest.com


dans le fichiers host en local : 

127.0.0.1 ip.jsontest.proxy.com
127.0.0.1 headers.jsontest.proxy.com
127.0.0.1 echo.jsontest.proxy.com

Le proxy en lui même :
ecoute sur le port 4000 (variable PROXY_PORT ds server.js )
lancement : node index.js

Les differents fichiers :
index.js : lance le serveur
server.js : copie les headers, récupère le host dans les headers et le modifie, appel le router
router.js : verifie si la requete doit etre intercepté ou non
requestHandlers.js : contient les differentes interceptions et la nominalRequest
rules.json : liste des règles disponibles

un petit exemple :

curl -X GET http://headers.jsontest.proxy.com:4000

- la requete arrive sur le proxy en localhost:4000
- on remplace headers.jsontest.proxy.com par headers.jsontest.com (server.js)
- on regarde si une règle est active (fichier rules.json) pour le host + path + method (router.js):
		- si oui on intercepte l appel et on renvoie le json + status.code de la methode (requestHandlers.js)
		- si non ou route la requete normalement (nominalRequest dans requestHandlers.js)

L'interface graphique d'administration (remplis de bugs):
node server.js
http://localhost:3000

Dans le dossier user-interface-admin
Permet d'activer/desactiver les règles.
Dans l'idéal permettrai d'ajouter et supprimer des règles.
Les regles sont activables et le type de retour choisissable en lançant le sous projet user-interface-admin


