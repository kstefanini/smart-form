smartFormApp.service('wikiniService', function($http, etatApplicationService) {

	var wikiniService = {};
	// variable globale contenue dans un script au début de l'application
	wikiniService.config = config;

	wikiniService.getUrlPageWiki = function(fiche) {
		return wikiniService.config.url_wikini.replace("{tag}" , fiche.tag);
	};

	wikiniService.formaterUrlSectionWiki = function(tag, titre, format) {
		url = config.url_section_wiki.replace('{pageTag}', tag);
		url = url.replace('{sectionTitre}', window.encodeURIComponent(titre));
		url = url.replace('{format}', format);

		return url;
	};

	wikiniService.getFichePourEdition = function(fiche, surSucces, surEchec) {
		// On a besoin aussi du jeton ici pour associer la page au bon auteur
		url = wikiniService.formaterUrlSectionWiki(fiche.tag, config.sections_pages.join(), 'text/html');
		$http({
		    method: 'GET',
		    url: url,
		    headers: etatApplicationService.getHeadersAuth()
		}).
		success(function(data, status, headers, config) {
			surSucces(data);
		}).
		error(function(data, status, headers, config) {
			surEchec(data);
		});
	};

	wikiniService.getFicheSectionPourEdition = function(fiche, titre, surSucces, surEchec) {
		url = wikiniService.formaterUrlSectionWiki(fiche.tag, titre, 'text/plain');
		$http.get(url).
		success(function(data, status, headers, config) {
			surSucces(data);
		}).
		error(function(data, status, headers, config) {
			surEchec(data);
		});
	};

	wikiniService.validerEditionSection = function(fiche_edition, titre, texte_saisi, surSucces, surEchec) {
		url = wikiniService.formaterUrlSectionWiki(fiche_edition.tag, titre, 'text/plain');
		donnees_post = {pageContenu : texte_saisi, pageSectionTitre : titre};

	    headers_requete = etatApplicationService.getHeadersAuth();
	    headers_requete['Content-Type'] = 'application/x-www-form-urlencoded';

		// Besoin d'un objet particulier ici car sinon angular poste du json
		$http({
		    method: 'POST',
		    url: url,
		    headers: headers_requete,
		    transformRequest: function(obj) {
		        var str = [];
		        for(var p in obj)
		        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		        return str.join("&");
		    },
		    data: donnees_post
		}).
		success(function(data, status, headers, config) {
			surSucces(data);
		}).
		error(function(data, status, headers, config) {
			surEchec();
		});
	};

	wikiniService.getSectionFiche = function(fiche, titre, surSucces, surEchec) {
		url = wikiniService.formaterUrlSectionWiki(fiche.tag, titre, 'text/html');

		$http.get(url).
		success(function(data, status, headers, config) {
			surSucces(data);
		}).
		error(function(data, status, headers, config) {
			surEchec();
		});
	};

	return wikiniService;
});
