'use strict';
const alfy = require('alfy');

alfy.fetch('https://dexonline.ro/definitie/'+alfy.input+'/json').then(data => {

	const items = data.definitions
		.map(x => {
			const res = x.htmlRep;
			const def = res.replace('<sup>1<\/sup>',' ¹').replace('<sup>2<\/sup>',' ²').replace('<sup>3<\/sup>',' ³').replace('<sup>4<\/sup>',' ⁴').replace('<sup>5<\/sup>',' ⁵').replace('<sup>6<\/sup>',' ⁶').replace(/<\/?[^>]+>/gi, '').replace('&lt;','<');
			const definitie = def.replace('&#x2013;','-').replace('&#x25ca;','◊').replace('&#x2666;','♦');
			const cuvant = res.substr(0, res.indexOf('<\/b>')).replace('<sup>1<\/sup>',' ¹').replace('<sup>2<\/sup>',' ²').replace('<sup>3<\/sup>',' ³').replace('<sup>4<\/sup>',' ⁴').replace('<sup>5<\/sup>',' ⁵').replace('<sup>6<\/sup>',' ⁶').replace(/<\/?[^>]+>/gi, '');
			const defurl = 'https://dexonline.ro/definitie/'+alfy.input;

			return {
				title: cuvant,
				subtitle: definitie,
				arg: defurl,
				mods:
				{
					alt:
					{
						arg: defurl,
						subtitle: 'Vezi definitia completa pe dexonline.ro'
					}
				},
				quicklookurl:defurl,
				icon: {
					path: 'icon.png'
				}
			};
		});

	alfy.output(items);
});
