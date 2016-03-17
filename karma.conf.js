module.exports = (config) => {
	config.set({
		frameworks: ['jasmine'],

		files: [
			'node_modules/sinon/pkg/sinon.js',
			'node_modules/mockfirebase/browser/mockfirebase.js',
			'karma.entry.js'
		],

		preprocessors: {
			'karma.entry.js': ['webpack', 'sourcemap']
		},

		webpack: require('./webpack.test'),

		webpackServer: {
			noInfo: true
		},

		reporters: ['spec', 'coverage'],

		singleRun: false,

		autoWatch: true,

		coverageReporter: {
			dir: 'test/coverage/',
			type: 'html'
		},

		browsers: ['Chrome']
	});
};
