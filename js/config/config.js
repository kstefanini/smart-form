var config = {
		referentiels : ["BDTFX", "BDTXA", "ISFAN", "APD"],
		nom_fiche : 'SmartFlore{referentiel}nt{num_tax}',
		url_wikini : "http://www.tela-botanica.org/wikini/eFloreRedaction/wakka.php?wiki={tag}",
		url_service : "http://localhost/smart-form/services/Pages.php",
		url_fiche_mobile : "http://www.tela-botanica.org/mobile:{referentiel}-nn-{num_nom}",
		url_qr_code : "http://www.tela-botanica.org/tmp/eflore_v5_cache/qrcode/{referentiel}-{num_nom}.png",
		url_section_wiki : "http://localhost/yeswiki/api/rest/0.5/pages/{pageTag}?txt.format={format}&txt.section.titre={sectionTitre}&txt.template=PageTaxonSmartFlore",
		sections_pages : ["Introduction","Comment la reconnaître ?","Son histoire","Ses usages","Écologie & habitat","Ce qu'il faut savoir...","Sources"]
};