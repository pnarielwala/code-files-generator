## First run (no config or template files)

    1. Run yarn tfg (runCmd)
    1a. Detect no config file (fetchConfigPath)
    2. Prompt "Initialize config" (runCmd)
    3. Create config (initializeConfig)
    4. Create example files/folder (initializeConfig)
    5. Prompt template options (only example option will be available) (fetchTemplateOptions, runCmd)
    6. Select example option (runCmd)
    7. Collect variables (recordTemplateValues)
    8. Generate files (generateFiles)

## nth run

    1. Run yarn tfg (runCmd)
    1a. Detect config file (fetchConfigPath, fetchConfig)
    2. Prompt template options (only example option will be available) (fetchTemplateOptions, runCmd)
    3. Select existing option (runCmd)
    4. Collect variables (recordTemplateValues)
    5. Generate files (generateFiles)

## nth run and create new option

    1. Run yarn tfg (runCmd)
    1a. Detect config file (fetchConfigPath, fetchConfig)
    2. Prompt template options (only example option will be available) (fetchTemplateOptions, runCmd)
    3. Select <Create new> option (runCmd)
    4. Prompt for (createNewTemplateOption)
    4a. Name
    4b. key (if kebab cased name already exists)
    4c. Directory (default ./templates)
    4d. Variable 1
    4d 1. Variable (camel-cased)
    4d 2. Prompt
    4d 3. Add another (yes/no)
    5. Folder name (leave blank for no folder) (ie. {{variableFoo}}_Tests) (generateTemplateFiles)
    6a. File name (ie. {{componentName}}.test.js)
    6b. Add another (yes/no)
    7. Collect variables for created option (recordTemplateValues)
    8. Generate files (generateFiles)
