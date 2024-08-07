pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "$NODEJS_HOME/bin:$PATH"
        CI = 'false'  // Deshabilitar el tratamiento de advertencias como errores
    }
    
    stages {
        stage('Build and Test API') {
            steps {
                dir('api') {
                    // Instalar dependencias de la API
                    sh 'pip3 install -r requirements.txt'
                }
            }
        }
        
        stage('Deploy API') {
            steps {
                // Despliegue de la API
                sh 'python3 api.py &'  // Ejecutar api.py en segundo plano usando python3
            }
        }

         stage('Build React App') {
            steps {
                dir('app') {
                    // Instalar dependencias de la app React
                    sh 'npm install'
                    
                    // Construir la app React
                    sh 'npm run build'
                }
            }
        }

        stage('Run Selenium Tests') {
            steps {
                // Instalar pytest si no está instalado
                sh 'pip3 install pytest'
                // Ejecutar las pruebas de Selenium
                dir('TestsSelenium') {
                    sh 'pip3 install -r requirements.txt'
                    sh 'pytest Test_api.py --maxfail=5 --disable-warnings --html=report.html'  // Ejecutar pruebas y generar informe HTML
                }
            }
        }


    }
}




