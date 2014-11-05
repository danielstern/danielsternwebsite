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
		url: '/project/:project',
		templateUrl:'partials/project.html',
    	controller:function($scope,portfolio,$stateParams){
    		$scope.item = portfolio.filter(function(item){
    			return item.shortname === $stateParams.project;
			})[0];
    	}		
	})
	.state('project.image',{
		url: '/:image',
		templateUrl:'partials/project-image-feature.html',
    	controller:function($scope,portfolio,$stateParams){
    		$scope.image = portfolio.map(function(item){
    			return item.img;
			}).reduce(function(prev,next,index,init){
				next.forEach(function(_next){
					prev.push(_next);
				});
				return prev;
			},[]).filter(function(img){
				return img.shortname === $stateParams.image;
			})[0];

			console.log("image?",$scope.image);

    	}
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
	img: [{
		url:"img/maple-a-month-1.png",
		shortname:'maple-logo',
		description:"A logo that I made in Photoshop",
		title:'Maple a Month Logo',
		alt:'Maple a month with a leaf behind it'
	},{
		url:"img/maple-a-month-2.png",
		shortname:'how-it-works',
		title:'some caption',
		alt:'some alt'
	},{
		url:"img/maple-a-month-3.png",
		shortname:'paypal-sales',
		title:'some caption',
		alt:'some alt'
	}]
},{
	name:"range.css",
	description:"HTML5 tool to create styled range inputs with CSS. Featured on css-tricks.com",
	skills:["bootstrap","angular","seo","facebook","twitter","css","less","git"],
	category:"Library",
	shortname:"range-css",
	link: "http://danielstern.ca/range.css/#/",
	img: [{
		url:"img/maple-a-month-1.png",
		shortname:'maple-a-month-1',
		title:'some caption',
		alt:'some alt'
	}]

	// img: "img/range-1.png"
},{
	name:"ngAudio",
	description:"A JavaScript library used to intergrate audio elements into Angular.js projects. Was featured at Full-Stack Conf in London, England where I did a talk.",
	skills:["bootstrap","angular","seo","html5","web audio","git"],
	category:"Library",
	shortname:"angular-audio",
	link: "http://danielstern.github.io/ngAudio/#/",
	img: [{
		url:"img/maple-a-month-1.png",
		shortname:'maple-a-month-1',
		title:'some caption',
		alt:'some alt'
	}]
	// img: "img/angular-audio-1.png"
}])