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
        
        stage('Build React Native App') {
            steps {
                dir('app') {
                    // Instalar dependencias de la app React Native
                    sh 'npm install'
                    
                    // Construir la app React Native
                    sh 'npm run build'
                }
            }
        }
        
        stage('Run API Tests') {
            steps {
                dir('api') {
                    // Ejecutar pruebas de la API
                    sh 'pytest api_tests.py'
                }
            }
        }
        
        stage('Run React Native Tests') {
            steps {
                dir('app') {
                    // Ejecutar pruebas de la app React Native
                    sh 'npm test'
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


