Use 'maestro record <path to flow> in the following way:
    1. create a javascript which runs maestro record command for each flow (specify flow paths as an array)
    2. store all recordings in some dir
    3. create a javascript which generates a test-report.html file and embeds flow spec names and flow spec recorded videos into it so you can view how tests ran
    4. create a script to serve it locally on port 2077
    5. automate report sending via email (for multiple receivers)