pipeline {
    agent any

    environment {
        // Define the path to the requirements file
        REQUIREMENTS_FILE = 'api/requirements.txt'
    }

    stages {
        
        stage('Set up Python') {
            steps {
                // Install Python and dependencies
                sh 'sudo apt-get update'
                sh 'sudo apt-get install -y python3 python3-venv python3-pip'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Create a virtual environment and install dependencies
                sh 'python3 -m venv venv'
                sh '. venv/bin/activate && pip install -r ${REQUIREMENTS_FILE}'
            }
        }

        stage('Run Tests') {
            steps {
                // Activate the virtual environment and run tests
                sh '. venv/bin/activate && python3 -m unittest discover -s tests'
            }
        }

        stage('Run API') {
            steps {
                // Activate the virtual environment and run the API
                sh '. venv/bin/activate && python3 api.py'
            }
        }
    }

    post {
        always {
            // Clean up the workspace
            cleanWs()
        }
    }
}
