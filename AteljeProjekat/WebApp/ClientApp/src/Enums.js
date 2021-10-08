export const umetnickiPravacEnum = [
	'Barok',
	'Klasicizam',
	'Kubizam',
	'Renesansa',
	'Romantizam',
	'Impresionizam',
	'Ekspresionizam'
];

export const umetnickiStilEnum = [
	'Pejzaz',
	'MrtvaPriroda',
	'Portret',
	'FigurativnoSlikarstvo',
	'Apstrakcija'
];

export function GetIndxFromPravac(pravac) {
    for (let i = 0; i < umetnickiPravacEnum.length; i++) {
		if (pravac == umetnickiPravacEnum[i])
			return i;
	}

	return -1;
};

export function GetIndxFromStil(stil) {
	
	for (let i = 0; i < umetnickiStilEnum.length; i++) {
		if (stil == umetnickiStilEnum[i])
			return i;
	}

	return -1;
};