default: serve

CURRENT_BINARY_CHROME_VERSION := $(shell node chromeVersion.js --systembinary-version)
CURRENT_BINARY_CHROME_MAYOR_VERSION := $(shell node chromeVersion.js --mayortsystembinary-version)

# In order to check the project status
eslint:
	./node_modules/.bin/eslint -c .eslintrc.js . --ext .js

gherkinlint:
	./node_modules/.bin/gherkin-lint features/**/*

dryrun-all:
	./node_modules/.bin/protractor runners/cucumber_conf.dryrun.js --cucumberOpts.tags="@complete" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunLocal" --cucumberOpts.tags="~@tests" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@individualRecords" --cucumberOpts.tags="~@nps" --cucumberOpts.tags="~@checklist" --cucumberOpts.tags="~@addressBook" --cucumberOpts.tags="~@metricBuilder" --disableChecks

wdryrun:
	npm run wdio -- --cucumberOpts.tagExpression="@$(arg) and not @todo" --cucumberOpts.dryRun=true

wdryrun-all:
	npm run wdio -- --cucumberOpts.tagExpression="@complete and not @todo" --cucumberOpts.dryRun=true

dryrun:
	./node_modules/.bin/protractor runners/cucumber_conf.dryrun.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="@complete" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunLocal" --cucumberOpts.tags="~@tests" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@individualRecords" --cucumberOpts.tags="~@nps" --cucumberOpts.tags="~@checklist" --cucumberOpts.tags="~@addressBook" --cucumberOpts.tags="~@metricBuilder" --disableChecks


# Remotes commands
wrer-module:
	clear && npm run wdio -- --cucumberOpts.tagExpression="@$(arg) and not @todo"
