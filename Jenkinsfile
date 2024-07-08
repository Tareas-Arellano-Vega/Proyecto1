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
        
        stage('Deploy') {
            steps {
                // Despliegue de la API
                sh 'python3 api.py &'  // Ejecutar api.py en segundo plano usando python3
            }
        }
    }
}




