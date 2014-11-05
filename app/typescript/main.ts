/// <reference path="portfolio.ts"/>
declare var angular:any;

angular.module("DemoApp",['ui.router'])
.config(function($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: '/',
    	templateUrl:'partials/main.html'
	})
	.state('portfolio',{
		url: '/portfolio?skill',
		// abstract: 'true'
    	templateUrl:'partials/portfolio.html'
	})
	.state('project',{
		url: '/project/:item',
    	templateUrl:function($stateParams){
    		return 'partials/portfolio/'+$stateParams.item+'.html';
    	}
    	// template:"An item"
	})
	.state('features',{
		url: '/features',
    	templateUrl:'partials/features.html'
	});
})
.run(function($rootScope,portfolio,$stateParams){
	$rootScope.portfolio = portfolio;
	$rootScope.$on('$locationChangeSuccess', function(event){
	    if ($stateParams.skill) {$rootScope.portfolioSearch = $stateParams.skill};
	})
})
.value("portfolio",[{
	name:"Maple-A-Month",
	description:"Website for a curated consumer packaged goods service.",
	skills:["bootstrap","angular","paypal","seo","facebook","css","git"],
	category:"Website",
	shortname:"maple-a-month",
	link: "http://mapleamonth.com",
	img: "img/maple-a-month-1.png"
},{
	name:"range.css",
	description:"HTML5 tool to create styled range inputs with CSS. Featured on css-tricks.com",
	skills:["bootstrap","angular","seo","facebook","twitter","css","less","git"],
	category:"Library",
	shortname:"range-css",
	link: "http://danielstern.ca/range.css/#/",
	img: "img/range-1.png"
},{
	name:"ngAudio",
	description:"A JavaScript library used to intergrate audio elements into Angular.js projects. Was featured at Full-Stack Conf in London, England where I did a talk.",
	skills:["bootstrap","angular","seo","html5","web audio","git"],
	category:"Library",
	shortname:"angular-audio",
	link: "http://danielstern.github.io/ngAudio/#/",
	img: "img/angular-audio-1.png"
}])