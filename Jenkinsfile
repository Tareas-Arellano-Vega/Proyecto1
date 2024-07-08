pipeline {
    agent any
    
    stages {
        stage('Build and Test API') {
            steps {
                dir('api') {
                    // Instalar dependencias de la API
                    sh 'pip install -r requirements.txt'
                }
            }
        }
        
        
        
        stage('Deploy') {
            steps {
                // Despliegue de la API
                dir('api') {
                    sh 'python api.py &'  // Ejecutar api.py en segundo plano
                }
                
                // Puedes agregar comandos específicos para desplegar tu app React Native aquí
            }
        }
    }
}


