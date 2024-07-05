pipeline {
    agent any
    
    stages {
        stage('Build API') {
            steps {
                dir("${PWD}") {
                    sh 'pip install -r requirements.txt'
                    sh 'python manage.py migrate'
                }
            }
        }
        
        stage('Build React Native App') {
            steps {
                dir('app') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('api') {
                    sh 'pytest'
                }
                dir('app') {
                    sh 'npm test'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                // Ejemplo de despliegue de API
                dir('api') {
                    sh 'chmod +x deploy_script.sh' // Dar permisos de ejecución al script de despliegue si es necesario
                    sh './deploy_script.sh' // Ejecutar script de despliegue de la API
                }
                
                // Ejemplo de despliegue de App React Native (ejemplo ficticio)
                dir('app') {
                    // Puedes agregar aquí comandos específicos para desplegar tu app React Native
                    // Por ejemplo, compilar APK, enviar a servicios de despliegue como Firebase, etc.
                }
            }
        }
    }
}
