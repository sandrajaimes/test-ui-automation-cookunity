const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonFile: './report/cucumber-json.report.json',
    output: './report/cucumber_report.html',
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "App Version":"0.0.1",
        "Test Environment": "STAGING",
        "Platform": "Chrome",
        "Parallel": "Scenarios",
        "Executed": "Remote"
    }
};

reporter.generate(options);
