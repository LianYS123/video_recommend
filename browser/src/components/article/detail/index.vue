<template>
	<article class="article">
		<header class="header">
			<div class="category">Life</div>
			<h1 class="headline">这是第{{$route.params.id}}篇文章</h1>
			<div class="meta">
				<span class="author">
					by
					<span class="author-name">Jimmy Wafflehoff</span>
				</span>
				<span class="pub-date">Posted Sept. 22, 2015</span>
			</div>
		</header>

		<p>
			A pancake is a flat cake, often thin, and round, prepared from a starch-based batter that may also contain eggs, milk and butter and cooked on a hot surface such as a griddle or frying pan, often with oil or butter. In Britain, pancakes are often unleavened,
			and resemble a crêpe. In North America, a raising agent is used (typically baking powder). The North American pancake is similar to a Scotch pancake or drop scone. Commercially prepared pancake mixes are produced in some countries.
		</p>

		<p>
			They may be served at any time with a variety of toppings or fillings including jam, fruit, syrup, chocolate chips, or meat. In America, they are typically considered to be a breakfast food. In Britain and the Commonwealth, they are associated with
			Shrove Tuesday, commonly known as Pancake Day, when perishable ingredients had to be used up before the fasting period of Lent began.
		</p>

		<p>
			Archaeological evidence suggests that pancakes are probably the earliest and most widespread cereal food eaten in prehistoric societies.
			<sup>[1]</sup> The pancake's shape and structure varies worldwide. A crêpe is a thin Breton pancake cooked on one or both sides
			in a special pan or crepe maker to achieve a lacelike network of fine bubbles. A well-known variation originating in Southeast Europe is Palačinke, a thin moist pancake fried on both sides and filled with jam, cheese cream, chocolate, or ground walnuts,
			but many other fillings, both sweet or savory, can also be used.
		</p>

		<figure>
			<img
				src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/8533/pancakes.jpg"
				alt="American style pancakes"
			/>
			<figcaption>
				<strong>Figure 1.</strong> American style pancakes.
			</figcaption>
		</figure>
		<h2>History</h2>
		<p>
			The Ancient Greeks made pancakes called τηγανίτης (tēganitēs), ταγηνίτης (tagēnitēs)
			<sup>[2]</sup> or ταγηνίας (tagēnias),
			<sup>[3]</sup> all words deriving from τάγηνον (tagēnon), "frying pan".
			<sup>[4]</sup> The earliest attested references on tagenias are in the works of the 5th century BC poets Cratinus
			<sup>[5]</sup> and Magnes.
			<sup>[6]</sup> Tagenites were made with wheat flour, olive oil, honey, and curdled milk, and were served for breakfast.
		</p>
		<h2>Regional varieties</h2>
		<h3>Africa</h3>
		<p>Lahoh is a pancake-like bread originating in Somalia, Djibouti and Yemen.[18][19] It is often eaten along with honey, ghee and tea. During lunch, lahoh is sometimes consumed with curry, soup or stew.</p>
		<h3>Europe</h3>
		<p>Eastern-Slavic cuisines have a long tradition of pancake cooking and include a large variety of pancake types. In Belarus, Russia and Ukraine, pancakes may be breakfast food, appetizer, main course, or even dessert.</p>
		<figure>
			<img
				src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/8533/nalesniki.jpg"
				alt="Polish nalesniki"
			/>
			<figcaption>
				<strong>Figure 2.</strong> Polish style stuffed crepes.
			</figcaption>
		</figure>
		<h3>Asia</h3>
		<p>Banana pancakes are a menu item in Western-oriented backpackers' cafes in Asian countries such as Thailand, Cambodia, Vietnam, India, and China. This has elicited the term Banana Pancake Trail.</p>
		<h3>Americas</h3>
		<p>American and Canadian pancakes (sometimes called hotcakes, griddlecakes, or flapjacks) are usually served at breakfast, in a stack of two or three pancakes topped with real or artificial maple syrup and butter, and often served with sides such as bacon, toast, eggs or sausage. Other popular topping alternatives include jam, peanut butter, nuts, fruit, honey, powdered sugar, whipped cream, cane syrup, and molasses.</p>
		<h2>Common Ingridients</h2>
		<p>
			A
			<code>ul</code> tag is a good example of why you should set good default
			<code>font-size</code> and
			<code>line-height</code> above the context of simply paragraph tags. Let any sort of article content get sizing from its parents.
		</p>
		<ul>
			<li>Eggs</li>
			<li>Flour or other starchy base.</li>
			<li>Pure deliciousness.</li>
		</ul>
	</article>
</template>

<script>
	export default {};
</script>

<style scoped lang='less'>
	* {
		box-sizing: border-box;
	}

	.article {
		font-family: "Montserrat", sans-serif;
		font-weight: 400;
		font-size: 16px; /* showing the default */
		line-height: 1.8;
		max-width: (550px + 60px);
		margin: 0 auto;

		/* for mobile */
		padding-left: 30px;
		padding-right: 30px;
		padding-top: 60px;
		padding-bottom: 90px;
		/* (shorthand) padding: 60px 30px 90px; */
	}

	/* yoink! dropbox colors http://brandcolors.net/ */
	@blue: #007ee5;
	@gray: #7b8994;
	@darkgray: #3d464d;

	/* sizes: http://www.modularscale.com/?16&px&1.8,1.34164&web&table */

	/* HEADER */
	.category {
		font-family: "Montserrat", sans-serif;
		color: @gray;
		text-transform: uppercase;
		letter-spacing: 2px;
		font-size: 1.342em;
		line-height: 1;
	}

	h1 {
		font-family: "Montserrat", sans-serif;
		font-weight: bold; /* default */
		font-size: 2.415em;
		line-height: 1.2;
	}

	.pub-date {
		display: block;
		font-family: "Open Sans", sans-serif;
		color: @gray;
		text-transform: uppercase;
		font-size: 74.5%;
		font-size: 0.745em; /* 74.5% of parent */
	}
	/* END HEADER */

	/* ARTICLE CONTENT */
	p {
		/* we did most of the work in the body tag! */
		margin-bottom: 1em;
	}

	h2 {
		font-size: 1.8rem;
		line-height: 1;
		margin-top: 1em;
		margin-bottom: 0.5em;
	}

	h3 {
		font-size: 1.342rem;
		line-height: 1;
		margin-top: 1.8em;
		margin-bottom: 0.5em;
	}

	/* inline vs inline-block; */
	code {
		display: inline;
		/* display: inline-block; */
		vertical-align: baseline;
		padding-top: 0px;
		/* padding-bottom: 300px; */
		padding-left: 10px;
		padding-right: 10px;
		background-color: whitesmoke;
		/* background-color: fade(teal, 30%); */
	}

	img {
		max-width: 100%;
	}

	sup {
		font-family: "Open Sans", sans-serif;
	}

	figure {
		margin: 2em 0 1em;
	}

	figcaption {
		font-family: "Open Sans", sans-serif;
		color: @gray;

		line-height: 1.8em;
		text-align: center;
		padding: 0.5em 1em;
	}
</style>