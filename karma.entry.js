require("jasmine-immutablejs-matchers");

//Override global 'firebase' with 'MockFirebase'
MockFirebase.override();

var context = require.context('./src', true, /\.spec\.js$/);

context.keys().forEach(context);
