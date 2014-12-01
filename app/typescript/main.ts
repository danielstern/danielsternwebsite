/// <reference path="portfolio.ts"/>
declare var angular:any;

angular.module("DemoApp",['ui.router','ngAnimate','ngMaterial'])
.config(function($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: '/',
    	templateUrl:'partials/main.html'
	})
	.state('portfolio',{
		url: '/portfolio?skill',
		controller:function($stateParams,$scope){
			if ($stateParams.skill) {$scope.portfolioSearch = $stateParams.skill};
			$scope.$on('$locationChangeSuccess', function(event){
			    if ($stateParams.skill) {$scope.portfolioSearch = $stateParams.skill};
			})
		},
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

			// console.log("image?",$scope.image);

    	}
	})
	.state('features',{
		url: '/features',
    	templateUrl:'partials/features.html'
	});
})
.run(function($rootScope,portfolio){
	$rootScope.portfolio = portfolio;

	// console.log("Run...",$stateParams);

	
})
.controller('AppCtrl', function($scope, $timeout, $mdSidenav) {
  $scope.toggleLeft = function() {
  	console.log("Toggling left")
    $mdSidenav('left').toggle();
  };
  $scope.toggleRight = function() {
    $mdSidenav('right').toggle();
  };
})
.controller('LeftCtrl', function($scope, $timeout, $mdSidenav) {
	console.log("Left ctrl init.");
  $scope.close = function() {
    $mdSidenav('left').close();
  };
})
.controller('RightCtrl', function($scope, $timeout, $mdSidenav) {
  $scope.close = function() {
    $mdSidenav('right').close();
  };
})
.value("portfolio",[{
	name:"Maple-A-Month",
	description:"Website for a curated consumer packaged goods service.",
	skills:["bootstrap","angular","paypal","seo","facebook","css","git","google-analytics"],
	category:"Website",
	shortname:"maple-a-month",
	link: "http://mapleamonth.com",
	year:'2014',
	img: [{
		url:"img/maple-a-month-1.png",
		shortname:'maple-logo',
		description:"This website used Photoshop for image retouching as well as original graphics",
		title:'Maple a Month Logo',
		alt:'Maple a month with a leaf behind it'
	},{
		url:"img/maple-a-month-2.png",
		shortname:'how-it-works',
		title:'Typography and Layout',
		alt:'A layout showing a two-image split view and social buttons.',
		description:"This project used Bootstrap for its layout. I also did the photgraphy for this website."
	},{
		url:"img/maple-a-month-3.png",
		shortname:'paypal-sales',
		title:'Paypal Sales Integration',
		alt:'An image of maple syrup bottles and several paypal buttons',
		description:"Maple-a-month is fully integrated with paypal and offers two options - subscription and single time buy."
	}]
},{
	name:"range.css",
	year:'2014',
	description:"HTML5 tool to create styled range inputs with CSS. Featured on css-tricks.com",
	skills:["bootstrap","angular","seo","facebook","twitter","css","less","git"],
	category:"Library",
	shortname:"range-css",
	link: "http://danielstern.ca/range.css/#/",
	img: [{
		url:"img/range-1.png",
		shortname:'range-css-logo',
		title:'Open Source Library',
		alt:'the words range.css with social elements below',
		description:"I developed this tool to help the community in general, and I also made the contents open source for anyone to check out on Github. I used Twitter and Github to spread the word."
	},{
		url:"img/range-2.png",
		shortname:'range-css-sliders',
		title:'Using Sliders to style Sliders',
		alt:"Colorful html range inputs (sliders)",
		description:'In this unique tool, as you slide the inputs to generate styles, they change in real time. This is possible thanks to a combination of angular.js and less.js.'
	},{
		url:"img/range-3.png",
		shortname:'range-css-generated',
		title:'Generating CSS in Real Time',
		alt:'sliders with css output beside them',
		description:"This tool generates CSS that developers can put straight into their websites or Wordpress sites. The CSS generated is compatible with Internet Explorer, Chrome and Firefox."
	}]

	// img: "img/range-1.png"
},{
	name:"angular audio",
	year:'2014',
	description:"A JavaScript library used to intergrate audio elements into Angular.js projects. Was featured at Full-Stack Conf in London, England.",
	skills:["bootstrap","angular","html5","web-audio","git",'javascript'],
	category:"Library",
	shortname:"angular-audio",
	link: "http://danielstern.github.io/ngAudio/#/",
	img: [{
		url:"img/angular-audio-2.png",
		shortname:'angular-audio-title',
		title:'A New Way to Handle Audio',
		alt:"A banner saying ngAudio",
		description:'Before I made this library, the most advanced way to manipulate sounds in HTML was written in jQuery. By writing a new tool in Angular, I was able to create a library that allowed users to leverage the power of audio without needing to include jQuery.'
	},{
		url:"img/angular-audio-1.png",
		shortname:'angular-audio-controls',
		title:'Combining angular.js and the HTML5 web audio API',
		alt:'An mp3-player-like interface',
		description:"Using Angular, my library lets the user control audio files using simple interfaces like sliders and text inputs. To demonstrate this, I used Angular's ui-router library and Bootstrap 3."
	},{
		url:"img/angular-audio-3.png",
		shortname:'angular-audio-docs',
		title:'Documenting the Library',
		alt:"Impressive-looking documentation",
		description:'To make angular audio a practical solution for developers on real-world projects, I documented it in thorough detail.'
	}]
},{
	name:"Lorien Ipsum",
	year:'2014',
	description:"This website is a tool that generates Lorem Ipsum in Elvish.",
	skills:["bootstrap","angular","html5"],
	category:"Website",
	shortname:"lorien-ipsum",
	link: "http://danielstern.ca/lorienIpsum/",
	img: [{
		url:"img/lorien-1.png",
		shortname:'lorien-ipsum-main',
		title:'A fast, responsive interface',
		alt:"A picture of Legolas and some options",
		description:'A few simple options and a colorful button are all it takes to generate this text.'
	},{
		url:"img/lorien-2.png",
		shortname:'lorien-text',
		title:'More than filler text',
		alt:'English text being translated to elvish',
		description:"This tool generates filler text in English or Elvish, and provides translations!"
	},{
		url:"img/lorien-3.png",
		shortname:'lorien-contrls',
		title:'Using Angular to speed development',
		alt:"Impressive-looking controls",
		description:'Angular.js allowed me to add simple customization of output with very little impact on development time or maintanance.'
	}]
},{
	name:"Magic Circles",
	year:'2014',
	description:"This library generates animated circular SVG art.",
	skills:["d3","svg"],
	category:"Library",
	shortname:"magic-circles",
	link: "https://github.com/danielstern/MagicCircles",
	img: [{
		url:"img/circles-1.png",
		shortname:'magic-circle',
		title:'And now for something completely different',
		alt:"A series of circles with text around the circumference of many, rings around that of others",
		description:'I made a library for the unique purpose of leveraging SVG to make moving, circular art. The possibilities are endless.'
	},{
		url:"img/circles-2.png",
		shortname:'detailed-examples',
		title:'Detailed Examples',
		description:'The websites includes detailed examples to allow developers to apply the circles in their own projects.',
		alt:"Some documentation"
	},{
		url:"img/circles-3.png",
		shortname:'magic-github',
		title:'Active Github Page',
		alt:"Some examples and code on Github",
		description:'Github page is maintained to keep track of issues and let developers get involved.'
	}]
},{
	name:"CYO",
	year:'2013',
	description:"This library lets people with little code knowledge make their own choose-your-own-adventure stories.",
	skills:["angular"],
	category:"Library",
	shortname:"cyo",
	link: "https://github.com/danielstern/cyo",
	img: [{
		url:"img/cyo-4.png",
		shortname:'cyo-logo',
		title:'A creative library',
		alt:"The letters C-Y-O in different colors.",
		description:'The colorful logo suggests it is a creative library.'
	},{
		url:"img/cyo-2.png",
		shortname:'cyo-docs',
		title:'Clear Documentation',
		description:'Clear documentation and simple classes make this library easy to use.',
		alt:"Some documentation"
	},{
		url:"img/cyo-3.png",
		shortname:'cyo-story',
		title:'A Platform for Storytelling',
		alt:"A choose your own adventure story",
		description:'CYO is a tool for making stories and games. See the links in this section.'
	}]
}])