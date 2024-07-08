pipeline {
    agent any
    
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


    }
}




